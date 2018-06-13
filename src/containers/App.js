import React, { Component } from 'react';
import { connect } from 'react-redux';
import SetupContainer from './SetupContainer';
// import SkipSectionsContainer from './SkipSectionsContainer';
import FindPartnerContainer from './FindPartnerContainer.js'
import TrialBlocksContainer from './TrialBlocksContainer';
import SurveyContainer from './SurveyContainer';
import DebriefContainer from './DebriefContainer';
import MturkSubmitContainer from './MturkSubmitContainer';
import { gotQuery } from '../actions';
import './App.css';

class App extends Component {
    componentDidMount() {
        this.props.parseQueryString();
    }
    render() {
        // avoid loading submit container because it will re-render
        // with each state change since it builds a json payload to server
        if(!this.props.finishedStudy){
            return(
                <div className="Main-box">
                    <SetupContainer />
                    <FindPartnerContainer />
                    <TrialBlocksContainer />
                    <SurveyContainer />
                    <DebriefContainer />
                </div>
            )
        }
        return (
            <MturkSubmitContainer />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        finishedStudy: state.consent.consented &&
        state.instructions.finished_instructions &&
        state.experimentalLists[state.mturkInfo.listId].every((block) =>
            {return block.trials.every((trial) => {return trial.completed})}) &&
        state.survey.every((page) => {return page.completed}) &&
        state.debrief.finished_debrief
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        parseQueryString: () => {
            dispatch(gotQuery(ownProps.location.query));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

