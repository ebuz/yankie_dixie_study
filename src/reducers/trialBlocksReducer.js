import * as types from '../actionTypes'

const trial_shape = {
    stimuli: ['red', 'blue', 'green', 'navy'],
    speaker_order: [1, 2, 0, 3],
    response: [],
    displayed_pictures: false,
    completed: false,
    mock_recording: null,
    speaker_recording: null,
    data: {}
};

const trial = (state = trial_shape, action) => {
    switch (action.type) {
        case types.START_TRIAL:
            return state;
        case types.END_TRIAL:
            return {...state, completed: true};
        case types.DISPLAY_WORDS:
            return {...state, displayed_pictures: true};
        case types.CUE_SPEAKER:
            return {...state, speaker_cued: true};
        case types.SPEAKER_RECORDING:
            return {...state, speaker_recording: action.speaker_recording};
        case types.PARTNER_RESPONSE:
            return {...state, response: state.response.concat(action.response)};
        default:
            return state;
    }
};

const trials = (state = [], action) => {
    switch (action.type) {
        case types.START_TRIAL:
        case types.END_TRIAL:
        case types.DISPLAY_WORDS:
        case types.CUE_SPEAKER:
        case types.PARTNER_RESPONSE:
        case types.SPEAKER_RECORDING:
            return state.map((item, index) => {
                if(index !== action.id){
                    return item;
                }
                return trial(item, action);
            });
        default:
            return state;
    }
}

const instructions = (state = {}, action) => {
    switch (action.type) {
        case types.FINISHED_BLOCK_INSTRUCTIONS:
            return {...state, finished_instructions: true}
        default:
            return state;
    }
}

const trialBlock_shape = {
    instructions: {
        forSpeaker : "",
        forPartner : "",
        finished_instructions: false},
    trials: []
};

const trialBlock = (state = trialBlock_shape, action) => {
    return {
        instructions: instructions(state.instructions, action),
        trials: trials(state.trials, action)
    }
};

const trialBlocks = (state = [], action) => {
    return state.map((item, index) => {
        if(index !== action.blockId){
            return item;
        }
        return trialBlock(item, action);
    });
};

export default trialBlocks;
