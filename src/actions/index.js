import adapter from 'webrtc-adapter';
import AudioRecorder from './AudioRecorder';
import { sha3_224 } from 'js-sha3';

import * as types from '../actionTypes';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const alert = window.alert;

export { adapter, AudioContext };

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

export const uploadAssignment = () =>
    (dispatch, getState) => {
        let state = getState();
        let form = new FormData();
        form.append('assignmentId', state.mturkInfo.assignmentId)
        form.append('data', JSON.stringify({
            trialData: state.experimentalLists[state.mturkInfo.listId],
            surveyData: state.survey,
            mturkInfo: state.mturkInfo,
        }))
        fetch('/submitassignment', {
            method: 'POST',
            body: form
        }).then(() => dispatch({
            type: types.UPLOADED_ASSIGNMENT
        }));
    }

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

export const finishedDebrief = (data = {}) => ({
    type: types.FINISHED_DEBRIEF,
    data: data
});

export const participantConsent = (data = {}) => ({
    type: types.CONSENT,
    data: data
});

export const cueSpeaker = (listId, blockId, trialId, data = {}) =>
    (dispatch, getState) => {
        const cueAction = {
            type: types.CUE_SPEAKER,
            listId: listId,
            blockId: blockId,
            id: trialId,
            data: data
        };
        dispatch(cueAction);
    }

export const displayWords = (listId, blockId, trialId, data = {}) =>
    (dispatch, getState) => {
        const displayAction = {
            type: types.DISPLAY_WORDS,
            listId: listId,
            blockId: blockId,
            id: trialId,
            data: data
        };
        dispatch(displayAction);
        dispatch(cueSpeaker(listId, blockId, trialId));
    };

export const saveRecording = (blob, id, filename = 'introduction.ogg') => {
    let formD = new FormData();
    formD.append('recording', blob, filename);
    fetch(
        `/recording/${id}`,
        {method: 'post', body: formD}
    )
};

export const playedInstructions = (listId, blockId, trialId) => ({
    type: types.INSTRUCTIONS_PLAYED,
    listId: listId,
    blockId: blockId,
    id: trialId
});

export const endTrial = (listId, blockId, trialId, data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.END_TRIAL,
            listId: listId,
            blockId: blockId,
            id: trialId,
            data: data
        });
        dispatch(notReadyToStart());
        dispatch(partnerNotReady());
    };

export const startTrial = (listId, blockId, trialId, data = {}) =>
    (dispatch, getState) => {
        const startAction = {
            type: types.START_TRIAL,
            listId: listId,
            blockId: blockId,
            id: trialId,
            data: data
        };
        dispatch(startAction);
        dispatch(displayWords(listId, blockId, trialId));
    };

export const waitOnPartnerToStartTrial = (listId, blockId, trialId, data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        //delay start by some amount, might be good idea to make this random
        let start_delay = 0;
        setTimeout(() => {
            dispatch(partnerReady());
            dispatch(startTrial(listId, blockId, trialId, data));
            const file_to_play =
                state.experimentalLists[listId][blockId].trials[trialId].mock_recording;
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
                            playedInstructions(listId, blockId, trialId);
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

export const speakerRecording = (listId, blockId, trialId, recordingUrl) => ({
    type: types.SPEAKER_RECORDING,
    listId: listId,
    blockId: blockId,
    id: trialId,
    speaker_recording: recordingUrl
});

export const gotDirections = (listId, blockId, trialId, recordingUrl) =>
    (dispatch, getState) => {
        dispatch(speakerRecording(listId, blockId, trialId, recordingUrl));
        let state = getState();
        fetch(recordingUrl).then(fileResponse => {
            return fileResponse.arrayBuffer()
        }).then(buffer => {
            let source = state.selfInfo.speakerOutput.createBufferSource();
            state.selfInfo.speakerOutput.decodeAudioData(buffer).then(decoded => {
                source.buffer = decoded;
                source.connect(state.selfInfo.speakerOutput.destination);
                source.start(0);
                let playedInstructionsAction = playedInstructions(listId, blockId, trialId);
                dispatch(playedInstructionsAction);
            });
        });
    };

export const sendDirections = (listId, blockId, trialId, blob, id, filename) =>
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
            dispatch(speakerRecording(listId, blockId, trialId, `/recordings/${id}/${filename}`));
            const partner_rt_adjust = state.experimentalLists[listId][blockId].trials[trialId].partner_rt_adjust;
            //respond on behalf of partner
            //read in just-finished recording and get duration
            let reader = new FileReader();
            reader.readAsArrayBuffer(blob);
            reader.addEventListener("loadend", () => {
                state.selfInfo.speakerOutput.decodeAudioData(reader.result).then(decoded => {
                    let partner_rt = decoded.duration + partner_rt_adjust; //do not multiply since partner_rt_adjust could be null
                    setTimeout(() => {
                        //respond for partner
                        dispatch(partnerReady());
                        dispatch(endTrial(listId, blockId, trialId))
                    }, (partner_rt * 1000) + 3000);
                });
            });
            dispatch(playedInstructions(listId, blockId, trialId));
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

export const partnerMicTestRedo = () => ({
    type: types.MIC_PARTNER_REDO_CHECK
});

export const requestNewPartnerMicTestFile = () =>
    (dispatch, getState) => {
        let state = getState();
        //find new next audio file from set
        let newMicTestFile =
            state.partnerInfo.micTestFileSet[state.partnerInfo.micCheckRedos];
        let newPartnerMicTestAction = gotPartnerMicTest(newMicTestFile);
        // before dispatching we need to delay this so it's realistic
        // download and decode fild to figure out length
        fetch(newMicTestFile).then(fileResponse => {
            return fileResponse.arrayBuffer()
        }).then(buffer => {
            // decode the buffer to get duration
            state.selfInfo.speakerOutput.decodeAudioData(buffer).then(
                decoded => {
                    // set delay on triggering partner mic test
                    // consider adding some slush for request?
                    let delay = decoded.duration + 0; // value in seconds but setTimeout uses ms
                    setTimeout(() => {
                        dispatch(newPartnerMicTestAction);
                    }, delay * 1000);
                });
        });
    };

export const requestNewPartnerMicTest = () =>
    (dispatch, getState) => {
        dispatch(gotPartnerMicTest(null));
        dispatch(partnerMicTestRedo());
        dispatch(requestNewPartnerMicTestFile());
    };

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

export const recordDirections = (listId, blockId, trialId, data = {}) =>
    (dispatch, getState) => {
        let state = getState();
        const stimuli = state.experimentalLists[listId][blockId].trials[trialId].stimuli;
        const speakerOrder = state.experimentalLists[listId][blockId].trials[trialId].speaker_order;
        const speakerOrderedStimuli = speakerOrder.map(i => stimuli[i]);
        const recordingInfo = [listId, blockId, trialId].concat(speakerOrderedStimuli);
        const recordingName = recordingInfo.join('_') + (state.selfInfo.recorder.recorderOptions.mimeType.startsWith('audio/webm') ? '.webm' : '.ogg');
        const publicId = state.selfInfo.publicId
        state.selfInfo.recorder.record().then((blob) => {
            dispatch(sendDirections(listId, blockId, trialId, blob, publicId, recordingName));
        });
        dispatch(recordingState('recording'));
};

export const partnerSelect = (listId, blockId, trialId, optionSelected, data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.PARTNER_SELECTION,
            listId: listId,
            blockId: blockId,
            id: trialId,
            optionSelected: optionSelected,
            data: data
        });
}

export const partnerUnSelect = (listId, blockId, trialId, optionSelected, data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.PARTNER_UNSELECTION,
            listId: listId,
            blockId: blockId,
            id: trialId,
            optionSelected: optionSelected,
            data: data
        });
}

export const selectOption = (listId, blockId, trialId, myResponse, data = {}) =>
    (dispatch, getState) => {
        dispatch(partnerSelect(listId, blockId, trialId, myResponse, data));
        dispatch(readyToStart());
    };

export const unSelectOption = (listId, blockId, trialId, myResponse, data = {}) =>
    (dispatch, getState) => {
        dispatch(partnerUnSelect(listId, blockId, trialId, myResponse, data));
        dispatch(readyToStart());
    };

export const finishResponse = (listId, blockId, trialId, data = {}) =>
    (dispatch, getState) => {
        let trial = getState().experimentalLists[listId][blockId].trials[trialId];
        if(trial.response.length >= trial.stimuli.length - 1){
            setTimeout(() => {
                dispatch(readyToStart());
                dispatch(endTrial(listId, blockId, trialId));
            }, 0);
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
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                dispatch(gotMic(stream));
            })
            .catch((err) => {
                dispatch(micError())
            });
};

export const foundPartner = (peerId, publicId, data = {}) => ({
    type: types.FOUND_PARTNER,
    peerId: peerId,
    publicId: publicId,
    data: data
})

export const mockConnectionChild = (data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.CREATED_CONNECTION,
            peerSocket: 'mockSocket',
            data: data
        });
        dispatch(gotId('mockSocketId'));
        dispatch(foundPartner('mockPartner', 'mockPartnerId'));
        let newMicTestFile =
            getState().partnerInfo.micTestFileSet[0];
        dispatch(gotPartnerMicTest(newMicTestFile));
        //simulate waiting for partner
    };

export const mockConnection = (data = {}) =>
    (dispatch, getState) => {
        dispatch({
            type: types.CREATED_CONNECTION,
            peerSocket: 'mockSocket',
            data: data
        });
        dispatch(gotId('mockSocketId'));
        //simulate waiting for partner
        let waitTime = 400 + 75 * 1000 + Math.random() * 60 * 1000;
        setTimeout(() => {
            alert('Got a partner, please return to the study!')
            let state = getState();
            let newMicTestFile =
                state.partnerInfo.micTestFileSet[state.partnerInfo.micCheckRedos];
            // dispatch new partner and new test file in one go
            dispatch(foundPartner('mockPartner', 'mockPartnerId'));
            dispatch(gotPartnerMicTest(newMicTestFile));
        }, waitTime);
    };

export const getPartner = () =>
    (dispatch, getState) => {
        dispatch(mockConnectionChild());
};

export const finishedBlockInstructions = (listId, blockId, data = {}) => ({
    type: types.FINISHED_BLOCK_INSTRUCTIONS,
    listId: listId,
    blockId: blockId,
    data: data
});

export const gotPublicId = (publicId) => ({
    type: types.GOT_PUBLICID,
    publicId: publicId,
});

export const genPublicId = (identifier) =>
    (dispatch, getState) => {
        dispatch(gotPublicId(sha3_224(identifier)));
    };

export const gotWorkerId = (workerId) => ({
    type: types.GOT_WORKERID,
    workerId: workerId
});

export const gotHitId = (hitId) => ({
    type: types.GOT_HITID,
    hitId: hitId
});

export const gotAssignmentId = (assignmentId) => ({
    type: types.GOT_ASSIGNMENTID,
    assignmentId: assignmentId
});

export const gotTurkSubmitTo = (turkSubmitTo) => ({
    type: types.GOT_TURKSUBMITTO,
    turkSubmitTo: (['https://www.mturk.com/', 'https://workersandbox.mturk.com/'].indexOf(turkSubmitTo) === -1) ? turkSubmitTo : turkSubmitTo + 'mturk/externalSubmit'
});

export const gotListId = (listId) => ({
    type: types.GOT_LISTID,
    listId: parseInt(listId, 10)
});

export const gotMturkInfo = (query) =>
    (dispatch, getState) => {
        if (query.workerId) {
            dispatch(gotWorkerId(query.workerId));
            dispatch(genPublicId(query.workerId));
        }
        if (query.hitId) {
            dispatch(gotHitId(query.hitId));
        }
        if (query.assignmentId) {
            dispatch(gotAssignmentId(query.assignmentId));
        }
        if (query.turkSubmitTo) {
            dispatch(gotTurkSubmitTo(query.turkSubmitTo));
        }
    };

export const gotQuery = (query) =>
    (dispatch, getState) => {
        if (query.listId) {
            dispatch(gotListId(query.listId));
        }
        dispatch(gotMturkInfo(query));
    };

export const completeSurveyPage = (pageId) => ({
    type: types.SURVEY_PAGE_COMPLETED,
    pageId: pageId
});

export const updateQuestionValue = (pageId, questionId, value) => ({
    type: types.SURVEY_QUESTION_VALUE,
    pageId: pageId,
    questionId: questionId,
    value: value
});

export const endEarly = (issue) => ({
    type: types.ENDED_EARLY,
    issue: issue,
});

export const finishSurvey = () =>
    (dispatch, getState) => {
        getState().survey.forEach((page, pageId) => {
            dispatch(completeSurveyPage(pageId))
        });
    };

export const finishTrials = () =>
    (dispatch, getState) => {
        let state = getState();
        let listId = state.mturkInfo.listId;
        let blocks = state.experimentalLists[listId];
        blocks.forEach((block, blockId) => {
            block.trials.forEach((trial, trialId) => {
                dispatch(endTrial(listId, blockId, trialId))
            })
        })
    };

