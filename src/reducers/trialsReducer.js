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
        case types.DISPLAY_WORDS:
        case types.CUE_SPEAKER:
        case types.PARTNER_RESPONSE:
        case types.END_TRIAL:
            return state.map((item, index) => {
                if(index !== action.id){
                    return item;
                }
                return trial(item, action);
            })
        default:
            return state;
    }
};

export default trials;
