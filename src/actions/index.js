import 'webrtc-adapter';
import AudioRecorder from './AudioRecorder';
import { sha3_224 } from 'js-sha3';

import * as types from '../actionTypes';

const AudioContext = window.AudioContext || window.webkitAudioContext;

export const notReadyToStart = (data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.NOT_READY_TO_START,
            data: data
        });
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

// ready timer instance
let timer = null;

export const readyToStart = (data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.READY_TO_START,
            data: data
        });
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

export const cueSpeaker = (blockId, trialId, data = {}) =>
    (dispatch, getState) => {
        const cueAction = {
            type: types.CUE_SPEAKER,
            blockId: blockId,
            id: trialId,
            data: data
        };
        dispatch(cueAction);
    }

export const displayWords = (blockId, trialId, data = {}) =>
    (dispatch, getState) => {
        const displayAction = {
            type: types.DISPLAY_WORDS,
            blockId: blockId,
            id: trialId,
            data: data
        };
        dispatch(displayAction);
        dispatch(cueSpeaker(blockId, trialId));
    };

export const saveRecording = (blob, id, filename = 'introduction.ogg') => {
    let formD = new FormData();
    formD.append('recording', blob, filename);
    fetch(
        `/recording/${id}`,
        {method: 'post', body: formD}
    )
};

export const playedInstructions = (blockId, trialId) => ({
    type: types.INSTRUCTIONS_PLAYED,
    blockId: blockId,
    id: trialId
});

export const endTrial = (blockId, trialId, data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.END_TRIAL,
            blockId: blockId,
            id: trialId,
            data: data
        });
        dispatch(notReadyToStart());
        dispatch(partnerNotReady());
    };

export const startTrial = (blockId, trialId, data = {}) =>
    (dispatch, getState) => {
        const startAction = {
            type: types.START_TRIAL,
            blockId: blockId,
            id: trialId,
            data: data
        };
        dispatch(startAction);
        dispatch(displayWords(blockId, trialId));
    };

export const waitOnPartnerToStartTrial = (blockId, trialId, data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        //delay start by some amount
        let start_delay = 1000;
        console.log(`delaying start by ${start_delay}`);
        setTimeout(() => {
            console.log(`simulate start of block ${blockId} trial ${trialId}`);
            dispatch(partnerReady());
            dispatch(startTrial(blockId, trialId, data));
            const file_to_play =
                state.trialBlocks[blockId].trials[trialId].mock_recording;
            fetch(file_to_play).then(fileResponse => {
                return fileResponse.arrayBuffer()
            }).then(buffer => {
                let source = state.selfInfo.speakerOutput.createBufferSource();
                state.selfInfo.speakerOutput.decodeAudioData(buffer).then(
                    decoded => {
                        source.buffer = decoded;
                        source.connect(state.selfInfo.speakerOutput.destination);
                        // start playing mock recording after length of recording
                        // consider adding slush to account for file transfer time
                        // consider adding slush to also
                        // account for recording onset time
                        let delay = decoded.duration + 0 + 0; // value in seconds
                        let playedInstructionsAction =
                            playedInstructions(blockId, trialId);
                        setTimeout(() => {
                            source.start();
                            dispatch(playedInstructionsAction);
                        }, delay * 1000);
                    });
            });
        }, start_delay);
    };

export const recordingState = (recording_state) => ({
    type: types.RECORDING_STATE,
    recording_state: recording_state
});

export const speakerRecording = (blockId, trialId, recordingUrl) => ({
    type: types.SPEAKER_RECORDING,
    blockId: blockId,
    id: trialId,
    speaker_recording: recordingUrl
});

export const gotDirections = (blockId, trialId, recordingUrl) =>
    (dispatch, getState) => {
        dispatch(speakerRecording(blockId, trialId, recordingUrl));
        let state = getState();
        fetch(recordingUrl).then(fileResponse => {
            return fileResponse.arrayBuffer()
        }).then(buffer => {
            let source = state.selfInfo.speakerOutput.createBufferSource();
            state.selfInfo.speakerOutput.decodeAudioData(buffer).then(decoded => {
                source.buffer = decoded;
                source.connect(state.selfInfo.speakerOutput.destination);
                source.start(0);
                let playedInstructionsAction = playedInstructions(blockId, trialId);
                dispatch(playedInstructionsAction);
            });
        });
    };

export const sendDirections = (blockId, trialId, blob, id, filename) =>
    (dispatch, getState) => {
        dispatch(recordingState('uploading'));
        let state = getState();
        let formD = new FormData();
        formD.append('recording', blob, filename);
        fetch(
            `/recording/${id}`,
            {method: 'post', body: formD}
        ).then(() => {
            dispatch(recordingState('inactive'));
            dispatch(speakerRecording(blockId, trialId, `/recordings/${id}/${filename}`));
            const partner_rt_adjust = state.trialBlocks[blockId].trials[trialId].partner_rt_adjust;
            //respond on behalf of partner
            //read in just-finished recording and get duration
            let reader = new FileReader();
            reader.readAsArrayBuffer(blob);
            reader.addEventListener("loadend", () => {
                state.selfInfo.speakerOutput.decodeAudioData(reader.result).then(decoded => {
                    let partner_rt = decoded.duration * partner_rt_adjust;
                    setTimeout(() => {
                        //respond for partner
                        dispatch(partnerReady());
                        dispatch(endTrial(blockId, trialId))
                    }, (partner_rt * 1000) + 3000);
                });
            });
            dispatch(playedInstructions(blockId, trialId));
        });
}

export const stopRecording = () =>
    (dispatch, getState) => {
        getState().selfInfo.recorder.stop();
};

export const gotMicTest = (micTestFile) => ({
    type: types.MIC_TEST_FILE,
    micTestFile: micTestFile
});

export const gotPartnerMicTest = (micTestFile) => ({
    type: types.GOT_PARTNER_MIC_TEST,
    micTestFile: micTestFile
});

export const workingPartnerMic = () => ({
    type: types.MIC_PARTNER_CHECK,
    micCheck: true
});

export const workingMic = () => ({
    type: types.MIC_SELF_CHECK,
    micSelfCheck: true
});

export const uploadTestRecording = (blob, id, filename = 'test_recording.ogg') =>
    (dispatch, getState) => {
        dispatch(recordingState('uploading'));
        let formD = new FormData();
        formD.append('recording', blob, filename);
        fetch(
            `/recording/${id}`,
            {method: 'post', body: formD}
        ).then(() => {
            dispatch(recordingState('inactive'));
            dispatch(gotMicTest(`/recordings/${id}/${filename}`));
        });
    };

export const recordMicTest = (data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        let micTestFile = `test_recording_${Date.now()}.` + (state.selfInfo.recorder.recorderOptions.mimeType.startsWith('audio/webm') ? 'webm' : 'ogg');
        state.selfInfo.recorder.record().then((blob) => {
            dispatch(uploadTestRecording(blob, state.selfInfo.publicId, micTestFile));
        });
        dispatch(recordingState('recording'));
};

export const recordDirections = (blockId, trialId, data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        state.selfInfo.recorder.record().then((blob) => {
            dispatch(sendDirections(blockId, trialId, blob,
                state.selfInfo.publicId, `${blockId}_${trialId}.` + (state.selfInfo.recorder.recorderOptions.mimeType.startsWith('audio/webm') ? 'webm' : 'ogg')
            ));
        });
        dispatch(recordingState('recording'));
};

export const partnerResponse = (blockId, trialId, theResponse, data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.PARTNER_RESPONSE,
            blockId: blockId,
            id: trialId,
            response: theResponse,
            data: data
        });
}

export const response = (blockId, trialId, myResponse, data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        dispatch(partnerResponse(blockId, trialId, myResponse, data));
        dispatch(readyToStart());
        let trial = state.trialBlocks[blockId].trials[trialId];
        if(trial.response.length >= trial.stimuli.length - 1){
            setTimeout(() => {
                dispatch(endTrial(blockId, trialId))
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

export const gotRecorder = (micInput, data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.GOT_RECORDER,
            recorder: new AudioRecorder(micInput)
        });
        dispatch(recordingState('inactive'));
    };

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
        echoCancellation: false,
        googEchoCancellation: false,
        googAutoGainControl: false,
        googNoiseSuppression: false,
        googHighpassFilter: false,
        googTypingNoiseDetection: false
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

export const mockConnection = (data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.CREATED_CONNECTION,
            peerSocket: 'mockSocket',
            data: data
        });
        dispatch(gotId('mockSocketId'));
        dispatch(foundPartner('mockPartner', 'mockPartnerId'));
        //simulate getting partner
        // setTimeout(() => {
        //     window.alert('Got a partner, please return to the webpage.')
        //     dispatch(foundPartner('mockPartner', 'mockPartnerId'));
        //     // dispatch(gotPartnerMicTest(data.micTestFile));
        // }, 5000);
    };

export const getPartner = () =>
    (dispatch, getState) => {
        dispatch(mockConnection());
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


