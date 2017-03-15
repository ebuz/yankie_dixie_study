import * as types from '../actionTypes'

const trial_shape = {stimuli: ['word99', 'word98', 'word97'],
    target: 0,
    response: null,
    displayed_words: false,
    speaker_cued: false,
    completed: false,
    data: {}
};

const trial = (state = trial_shape, action) => {
    switch (action.type) {
        case types.START_TRIAL:
            return {...state, displayed_words: false, response: null,
                speaker_cued: false, completed: false};
        case types.END_TRIAL:
            return {...state, completed: true};
        case types.DISPLAY_WORDS:
            return {...state, displayed_words: true};
        case types.CUE_SPEAKER:
            return {...state, speaker_cued: true};
        case types.PARTNER_RESPONSE:
            return {...state, response: action.response};
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
