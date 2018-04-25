import React, { Component } from 'react';
import { connect } from 'react-redux';
import SetupContainer from './SetupContainer';
import TrialBlocksContainer from './TrialBlocksContainer';
import SurveyContainer from './SurveyContainer';
import DebriefContainer from './DebriefContainer';
import MturkSubmitContainer from './MturkSubmitContainer';
import { gotMturkInfo } from '../actions';
import './App.css';

class App extends Component {
    componentDidMount() {
        this.props.parseMturkFields();
    }
    render() {
        if(!this.props.finishedStudy){
            return(
                <div className="Main-box">
                    <SetupContainer />
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
        parseMturkFields: () => {
            dispatch(gotMturkInfo(ownProps.location));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

