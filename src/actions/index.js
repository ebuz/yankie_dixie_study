import 'webrtc-adapter';
import io from 'socket.io-client';
import P2P from 'socket.io-p2p';
import AudioRecorder from './AudioRecorder';
import { sha3_224 } from 'js-sha3';

import * as types from '../actionTypes';

const AudioContext = window.AudioContext || window.webkitAudioContext;
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
// currently unavoidable side-effect
        getState().partnerInfo.audio.volume = 0;
        dispatch({
            type: types.PARTNER_VOLUME,
            volume: 0,
            data: data
        })
    };

export const unMutePartner = (volume = 1, data = {}) =>
    (dispatch, getState) => {
// currently unavoidable side-effect
        getState().partnerInfo.audio.volume = volume;
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

export const cueSpeaker = (blockId, trialId, participantRole = 'partner', data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        const myRole = participantRole; //should this be in state?
        const cueAction = {
            type: types.CUE_SPEAKER,
            blockId: blockId,
            id: trialId,
            data: data
        };
        dispatch(cueAction);
        if(myRole === 'speaker'){
            state.partnerInfo.peerSocket.emit('action', cueAction);
            setTimeout(() => {
                dispatch(unMutePartner());
            }, 1000);
        }
    }

export const displayWords = (blockId, trialId, participantRole = 'partner', data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        const myRole = participantRole; //should this be in state?
        const cue_delay = 1500;
        const displayAction = {
            type: types.DISPLAY_WORDS,
            blockId: blockId,
            id: trialId,
            data: data
        };
        dispatch(displayAction);
        if(myRole === 'speaker'){
            state.partnerInfo.peerSocket.emit('action', displayAction);
            setTimeout(() => {
                dispatch(cueSpeaker(blockId, trialId, myRole))
            }, cue_delay);
        }
    };

const saveRecording = (blob, id, filename = 'introduction.ogg') => {
    let formD = new FormData();
    formD.append('recording', blob, filename);
    fetch(
        `/recording/${id}`,
        {method: 'post', body: formD}
    )
}

export const startTrial = (blockId, trialId, participantRole = 'partner', data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        const myRole = participantRole; //should this be in state?
        const theirRole = myRole === 'speaker' ? 'partner' : 'speaker';
        const startAction = {
            type: types.START_TRIAL,
            blockId: blockId,
            id: trialId,
            data: data
        };
        dispatch(startAction);
        if(myRole === 'speaker'){
            state.partnerInfo.peerSocket.emit('createAction', {
                actionCreator: 'startTrial',
                actionArgs: [blockId, trialId, theirRole]
            });
            state.selfInfo.recorder.record().then((blob) => {
                let filename = [blockId, trialId].join('_') + '.ogg';
                saveRecording(blob, state.selfInfo.publicId, filename);
            });
            dispatch(mutePartner());
            dispatch(displayWords(blockId, trialId, myRole));
        } else {
            const file_to_play = state.trialBlocks[blockId].trials[trialId].pre_recorded_audio;
            if(file_to_play){
                fetch(file_to_play).then(fileResponse => {
                    return fileResponse.arrayBuffer()
                }).then(buffer => {
                    let source = state.selfInfo.speakerOutput.createBufferSource();
                    state.selfInfo.speakerOutput.decodeAudioData(buffer).then(decoded => {
                        source.buffer = decoded;
                        source.connect(state.selfInfo.speakerOutput.destination);
                        source.start(0)})
                })
            }
        }
    };

export const endTrial = (blockId, trialId, data = {}) => ({
    type: types.END_TRIAL,
    blockId: blockId,
    id: trialId,
    data: data
});

export const partnerResponse = (blockId, trialId, theResponse, myRole, data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.PARTNER_RESPONSE,
            blockId: blockId,
            id: trialId,
            response: theResponse,
            data: data
        });
        if(myRole === 'speaker'){
            setTimeout(() => {
                getState().selfInfo.recorder.stop();
            }, 1000);
        }
}

export const response = (blockId, trialId, myResponse, data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        if (state.trialBlocks[blockId].trials[trialId].speaker_cued && state.trialBlocks[blockId].trials[trialId].response === null){
            const myRole = 'partner';
            const theirRole = myRole === 'speaker' ? 'partner' : 'speaker';
            dispatch(partnerResponse(blockId, trialId, myResponse, myRole));
            dispatch(readyToStart());
            state.partnerInfo.peerSocket.emit('createAction', {
                actionCreator: 'partnerResponse',
                actionArgs: [blockId, trialId, myResponse, theirRole]
            });
            setTimeout(() => {
                dispatch(endTrial(blockId, trialId))
                state.partnerInfo.peerSocket.emit('action', endTrial(blockId, trialId));
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

export const gotRecorder = (micInput, data = {}) => ({
    type: types.GOT_RECORDER,
    recorder: new AudioRecorder(micInput)
})

export const gotMic = (micInput, data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.GOT_MIC,
            micInput: micInput
        });
        dispatch(gotRecorder(micInput));
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

export const foundPartner = (peerId, publicId, data = {}) => ({
    type: types.FOUND_PARTNER,
    peerId: peerId,
    publicId: publicId,
    data: data
})

const remoteCommands = {
    startTrial: startTrial,
    partnerResponse: partnerResponse
};

export const createdConnection = (peerSocket, data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.CREATED_CONNECTION,
            peerSocket: peerSocket,
            data: data
        })
        peerSocket.on('idOffer', (data) => {
            dispatch(foundPartner(data.peerId, data.publicId));
            peerSocket.usePeerConnection = true;
        });
        peerSocket.on('askId', (data) => {
            dispatch(foundPartner(data.peerId, data.publicId));
            dispatch(gotId(peerSocket.peerId));
            peerSocket.usePeerConnection = true;
            peerSocket.emit('idOffer',
                { peerId: peerSocket.peerId,
                    publicId: getState().selfInfo.publicId });
        });
        peerSocket.on('imReady', (data) => {
            dispatch(partnerReady());
        });
        peerSocket.on('notReady', (data) => {
            dispatch(partnerNotReady());
        });
        peerSocket.on('action', action => {
            if(action.type === types.PARTNER_RESPONSE){
                getState().selfInfo.recorder.stop();
            }
            dispatch(action);
        });
        peerSocket.on('createAction', toCreate => {
            dispatch(remoteCommands[toCreate.actionCreator](...toCreate.actionArgs));
        });
        peerSocket.on('upgrade', () => {
            dispatch(gotId(peerSocket.peerId));
            peerSocket.emit('askId', { peerId: peerSocket.peerId,
                    publicId: getState().selfInfo.publicId });
        });
        peerSocket.on('stream', (stream) => {
            dispatch(gotPartnerAudio(stream));
        });
    }

export const getPartner = () =>
    (dispatch, getState) => {
        dispatch(createdConnection(new P2P(io(),
            {autoUpgrade: true, peerOpts: {trickle: true, stream: getState().selfInfo.micInput}})));
};

export const finishedBlockInstructions = (blockId, data = {}) => ({
    type: types.FINISHED_BLOCK_INSTRUCTIONS,
    blockId: blockId,
    data: data
});

export const gotPublicId = (publicId) => ({
    type: types.GOT_PUBLICID,
    publicId: publicId,
})

export const gotMturkInfo = (urlParams) =>
    (dispatch, getState) => {
        if (urlParams.query.workerId) {
            dispatch({
                type: types.GOT_WORKERID,
                workerId: urlParams.query.workerId
            });
            dispatch(gotPublicId(sha3_224(urlParams.query.workerId)));
        }
        if (urlParams.query.hitId) {
            dispatch({
                type: types.GOT_HITID,
                hitId: urlParams.query.hitId
            });
        }
        if (urlParams.query.assignmentId) {
            dispatch({
                type: types.GOT_ASSIGNMENTID,
                assignmentId: urlParams.query.assignmentId
            });
        }
        if (urlParams.query.turkSubmitTo) {
            dispatch({
                type: types.GOT_TURKSUBMITTO,
                turkSubmitTo: urlParams.query.turkSubmitTo
            });
        }
    };

