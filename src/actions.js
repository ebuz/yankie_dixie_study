import 'webrtc-adapter';
import io from 'socket.io-client';
import P2P from 'socket.io-p2p';

import * as types from './actionTypes'

window.AudioContext = window.AudioContext || window.webkitAudioContext;
let timer = null;

export const notReadyToStart = (data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        dispatch({
            type: types.NOT_READY_TO_START,
            data: data
        });
        state.partnerInfo.peerSocket.emit('notReady', {});
    };

export const mutePartner = (data = {}) =>
    (dispatch, getState) => {
        getState().partnerInfo.audio.volume = 0;
        dispatch({
            type: types.PARTNER_VOLUME,
            volume: 0,
            data: data
        })
    };

export const unMutePartner = (volume = 1, data = {}) =>
    (dispatch, getState) => {
        getState().partnerInfo.audio.volume = volume; //currently unavoidable side-effect
        dispatch({
            type: types.PARTNER_VOLUME,
            volume: volume,
            data: data
        })
    };

export const readyToStart = (data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        dispatch({
            type: types.READY_TO_START,
            data: data
        });
        state.partnerInfo.peerSocket.emit('imReady', {});
        clearTimeout(timer);
        timer = setTimeout(() => {
            dispatch(notReadyToStart())
        }, 30000);
    };

export const partnerNotReady = (data = {}) => ({
    type: types.PARTNER_NOT_READY,
    data: data
});

export const partnerReady = (data = {}) => ({
    type: types.PARTNER_READY,
    data: data
})

export const finishedInstructions = (data = {}) => ({
    type: types.FINISHED_INSTRUCTIONS,
    data: data
});

export const participantConsent = (data = {}) => ({
    type: types.CONSENT,
    data: data
});

export const cueSpeaker = (trialId, participantRole = 'partner', data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        let cueAction = {
            type: types.CUE_SPEAKER,
            id: trialId,
            data: data
        };
        dispatch(cueAction);
        if(participantRole === 'speaker'){
            state.partnerInfo.peerSocket.emit('action', cueAction);
            setTimeout(() => {
                dispatch(unMutePartner());
            }, 1000);
        }
    }

export const displayWords = (trialId, participantRole = 'partner', data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        let displayAction = {
            type: types.DISPLAY_WORDS,
            id: trialId,
            data: data
        };
        dispatch(displayAction);
        if(participantRole === 'speaker'){
            state.partnerInfo.peerSocket.emit('action', displayAction);
            setTimeout(() => {
                dispatch(cueSpeaker(trialId, participantRole))
            }, 1500);
        }
    };

export const startTrial = (trialId, participantRole = 'partner', data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        let startAction = {
            type: types.START_TRIAL,
            id: trialId,
            data: data
        };
        dispatch(startAction);
        if(participantRole === 'speaker'){
            state.partnerInfo.peerSocket.emit('action', startAction);
            // start recorder and or begin playback
            dispatch(displayWords(trialId, participantRole));
            dispatch(mutePartner());
        }
    };

export const endTrial = (trialId, data = {}) => ({
    type: types.END_TRIAL,
    id: trialId,
    data: data
});

export const partnerResponse = (trialId, response, data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        if (state.trials[trialId].speaker_cued && state.trials[trialId].response === null){
            let responseAction = {
                type: types.PARTNER_RESPONSE,
                id: trialId,
                response: response,
                data: data
            };
            dispatch(responseAction);
            state.partnerInfo.peerSocket.emit('action', responseAction);
            setTimeout(() => {
                dispatch(endTrial(trialId))
                state.partnerInfo.peerSocket.emit('action', endTrial(trialId));
            }, 3000);
        }
    };

export const gotId = (peerId, data = {}) => ({
    type: types.GOT_PEERID,
    peerId: peerId
});

export const gotPartnerAudio = (audioStream, data = {}) =>
    (dispatch, getState) => {
        let audio = new Audio(); //shouldn't need to do this but here we are
        audio.srcObject = audioStream;
        audio.play();
        audio.volume = getState().partnerInfo.volume;
        dispatch({
            type: types.GOT_PARTNER_AUDIO,
            audio: audio,
            data: data
        });
    }

export const gotAudioContext = (speakerOutput, data = {}) => ({
    type: types.GOT_AUDIO_CONTEXT,
    speakerOutput: speakerOutput
});

export const gotMic = (micInput, data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.GOT_MIC,
            micInput: micInput
        });
    };

export const micError = (data = {}) => ({
    type: types.MIC_ERROR
});

export const getAudioContext = () =>
    (dispatch, getState) => {
    dispatch(gotAudioContext(new AudioContext()));
};

const constraints = {
    audio: {
        mandatory: {
            "googEchoCancellation": "false",
            "googAutoGainControl": "false",
            "googNoiseSuppression": "false",
            "googHighpassFilter": "false"
        },
        optional: []
    },
    video: false
};

export const getMic = () =>
    (dispatch, getState) => {
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        dispatch(gotMic(stream));
    }).catch(() => dispatch(micError()));
};

export const foundPartner = (peerId, data = {}) => ({
    type: types.FOUND_PARTNER,
    peerId: peerId,
    data: data
})

export const createdConnection = (peerSocket, data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.CREATED_CONNECTION,
            peerSocket: peerSocket,
            data: data
        })
        peerSocket.on('idOffer', (data) => {
            dispatch(foundPartner(data.peerId));
            peerSocket.usePeerConnection = true;
        });
        peerSocket.on('askId', (data) => {
            dispatch(foundPartner(data.peerId));
            dispatch(gotId(peerSocket.peerId));
            peerSocket.usePeerConnection = true;
            peerSocket.emit('idOffer', { peerId: peerSocket.peerId });
        });
        peerSocket.on('imReady', (data) => {
            dispatch(partnerReady());
        });
        peerSocket.on('notReady', (data) => {
            dispatch(partnerNotReady());
        });
        peerSocket.on('action', action => dispatch(action));
        peerSocket.on('upgrade', () => {
            dispatch(gotId(peerSocket.peerId));
            peerSocket.emit('askId', { peerId: peerSocket.peerId });
        });
        peerSocket.on('stream', (stream) => {
            dispatch(gotPartnerAudio(stream));
        });
    }

export const getPartner = () =>
    (dispatch, getState) => {
        dispatch(createdConnection(new P2P(io(`${location.protocol}//${location.hostname}:8090`),
            {autoUpgrade: true, peerOpts: {stream: getState().selfInfo.micInput}})));
};


