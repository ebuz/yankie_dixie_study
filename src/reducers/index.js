import { combineReducers } from 'redux'
import trialBlocks from './trialBlocksReducer';
import * as types from '../actionTypes'

function consent(state = {consented: false, instructions: ''}, action) {
    switch (action.type) {
        case types.CONSENT:
            return {...state, consented: true}
        default:
            return state;
    }
};

function instructions(state = {finished_instructions: false, instructions: ''}, action) {
    switch (action.type) {
        case types.FINISHED_INSTRUCTIONS:
            return {...state, finished_instructions: true}
        default:
            return state;
    }
};

const partnerInfoInitialState = {
    publicId: null,
    peerId: null,
    peerSocket: null,
    readyToStart: false,
    audio: null,
    volume: 1,
    micTestFile: null,
    micCheck: false
}

const partnerInfo = (state = partnerInfoInitialState, action) => {
    switch (action.type) {
        case types.PARTNER_READY:
        case types.PARTNER_NOT_READY:
            return {...state, readyToStart: action.type === types.PARTNER_READY}
        case types.PARTNER_VOLUME:
            return {...state, volume: action.volume}
        case types.GOT_PARTNER_AUDIO:
            return {...state, audio: action.audio}
        case types.GOT_PARTNER_MIC_TEST:
            return {...state, micTestFile: action.micTestFile}
        case types.MIC_PARTNER_CHECK:
            return {...state, micCheck: true}
        case types.FOUND_PARTNER:
            return {...state, peerId: action.peerId, publicId: action.publicId}
        case types.CREATED_CONNECTION:
            return {...state, peerSocket: action.peerSocket}
        default:
            return state;
    }
};

const mturkInfoInitialState = {
    workerId: null,
    hidId: null,
    assignmentId: null,
    turkSubmitTo: null
}

const mturkInfo = (state = mturkInfoInitialState, action) => {
    switch (action.type) {
        case types.GOT_TURKSUBMITTO:
            return {...state, turkSubmitTo: action.turkSubmitTo};
        case types.GOT_WORKERID:
            return {...state, workerId: action.workerId};
        case types.GOT_HITID:
            return {...state, hitId: action.hitId};
        case types.GOT_ASSIGNMENTID:
            return {...state, assignmentId: action.assignmentId };
        default:
            return state;
    }
}

const selfInfoInitialState = {
    publicId: null,
    peerId: null,
    readyToStart: false,
    micInput: null,
    recorder: null,
    recording_state: null,
    speakerOutput: null,
    micTestFile: null,
    micSelfCheck: false
}

const selfInfo = (state = selfInfoInitialState, action) => {
    switch (action.type) {
        case types.READY_TO_START:
        case types.NOT_READY_TO_START:
            return {...state, readyToStart: action.type === types.READY_TO_START}
        case types.GOT_PUBLICID:
            return {...state, publicId: action.publicId}
        case types.GOT_PEERID:
            return {...state, peerId: action.peerId}
        case types.GOT_MIC:
            return {...state, micInput: action.micInput}
        case types.MIC_ERROR:
            return {...state, micInput: false}
        case types.GOT_RECORDER:
            return {...state, recorder: action.recorder}
        case types.RECORDING_STATE:
            return {...state, recording_state: action.recording_state}
        case types.GOT_AUDIO_CONTEXT:
            return {...state, speakerOutput: action.speakerOutput}
        case types.MIC_TEST_FILE:
            return {...state, micTestFile: action.micTestFile}
        case types.MIC_SELF_CHECK:
            return {...state, micSelfCheck: true}
        default:
            return state;
    }
};

const reducer = combineReducers({
    trialBlocks,
    consent,
    instructions,
    partnerInfo,
    selfInfo,
    mturkInfo
});

export default reducer;
