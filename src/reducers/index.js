import { combineReducers } from 'redux'
import trials from './trialsReducer';
import * as types from '../actionTypes'

function consent(state = {}, action) {
    switch (action.type) {
        case types.CONSENT:
            return {...state, consented: true}
        default:
            return state;
    }
};

function instructions(state = {}, action) {
    switch (action.type) {
        case types.FINISHED_INSTRUCTIONS:
            return {...state, finished_instructions: true}
        default:
            return state;
    }
};

function partnerInfo(state = {peerId: null, peerSocket: null, readyToStart: false, audio: null, volume: false}, action) {
    switch (action.type) {
        case types.PARTNER_READY:
        case types.PARTNER_NOT_READY:
            return {...state, readyToStart: action.type === types.PARTNER_READY}
        case types.PARTNER_VOLUME:
            return {...state, volume: action.volume}
        case types.GOT_PARTNER_AUDIO:
            return {...state, audio: action.audio}
        case types.FOUND_PARTNER:
            return {...state, peerId: action.peerId}
        case types.CREATED_CONNECTION:
            return {...state, peerSocket: action.peerSocket}
        default:
            return state;
    }
};

function selfInfo(state = {peerId: null, readyToStart: false, micInput: null, speakerOutput: null}, action) {
    switch (action.type) {
        case types.READY_TO_START:
        case types.NOT_READY_TO_START:
            return {...state, readyToStart: action.type === types.READY_TO_START}
        case types.GOT_PEERID:
            return {...state, peerId: action.peerId}
        case types.GOT_MIC:
            return {...state, micInput: action.micInput}
        case types.MIC_ERROR:
            return {...state, micInput: false}
        case types.GOT_AUDIO_CONTEXT:
            return {...state, speakerOutput: action.speakerOutput}
        default:
            return state;
    }
};

const reducer = combineReducers({
    trials,
    consent,
    instructions,
    partnerInfo,
    selfInfo
});

export default reducer;
