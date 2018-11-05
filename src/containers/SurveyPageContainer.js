import React from 'react';
import { connect } from 'react-redux';
import SurveyQuestionContainer from './SurveyQuestionContainer';
import { completeSurveyPage } from '../actions';
import './SurveyPageContainer.css'

const SurveyPage = ({pageId, surveyPage, handleFinishPage}) => {
    return(
        <div className="SurveyPage-box">
            {surveyPage.instructions}
            <div className="SurveyQuestions-box">
                {surveyPage.questions.map((item, i) =>
                    (<SurveyQuestionContainer key={i}
                        pageId={pageId}
                        questionId={i}
                        question={item}
                    />)
                )}
            </div>
            <button className="SurveyPageFinish-button" onClick={handleFinishPage}>
                Click here to continue
            </button>
        </div>
    )
};


const mapStateToProps = (state, ownProps) => {
    return {
        surveyPage: state.survey[ownProps.pageId]
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleFinishPage: () => {
            dispatch(completeSurveyPage(ownProps.pageId));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyPage);
