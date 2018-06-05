import * as types from '../actionTypes';

const question = (state = {class: 'input', type: 'text'}, action) => {
    switch (action.type) {
        case types.SURVEY_QUESTION_VALUE:
            return {...state, value: action.value}
        default:
            return state;
    }
};

const questions = (state = [], action) => {
    return state.map((item, index) => {
        if(index !== action.questionId){
            return item;
        }
        return question(item, action);
    });
};

const surveyPage = (state = {}, action) => {
    switch (action.type) {
        case types.SURVEY_PAGE_INSTRUCTIONS:
            return {...state, instructions: action.instructions}
        case types.SURVEY_PAGE_COMPLETED:
            return {...state, completed: true}
        case types.SURVEY_QUESTION_VALUE:
            return {...state, questions: questions(state.questions, action)}
        default:
            return state;
    }
};

const survey = (state = [], action) => {
    return state.map((item, index) => {
        if(index !== action.pageId){
            return item;
        }
        return surveyPage(item, action);
    });
};

export default survey;
