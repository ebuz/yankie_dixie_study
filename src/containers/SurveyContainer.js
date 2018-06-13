import React from 'react';
import { connect } from 'react-redux';
import SurveyPageContainer from './SurveyPageContainer';

const Survey = ({finishedSetup, finishedTrials, currentSurveyPage}) => {
    if(!finishedSetup || !finishedTrials || currentSurveyPage === -1){
        return null;
    }
    return(
        <SurveyPageContainer pageId={currentSurveyPage} />
    )
};

const mapStateToProps = (state) => {
    let currentSurveyPage = state.survey.findIndex((page) =>
        {return !page.completed }
    );
    return {
        finishedSetup: state.consent.consented && state.instructions.finished_instructions && state.selfInfo.micSelfCheck,
        finishedTrials: state.mturkInfo.listId === '' ? false : state.experimentalLists[state.mturkInfo.listId].every((block) =>
            {return block.trials.every((trial) => {return trial.completed})}),
        currentSurveyPage: currentSurveyPage,
    };
};

export default connect(mapStateToProps)(Survey);
