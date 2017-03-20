import React from 'react';
import { connect } from 'react-redux';
import SetupContainer from './SetupContainer'
import TrialBlocksContainer from './TrialBlocksContainer'
import './App.css';

const App = ({location, finishedStudy}) => {
    if(!finishedStudy){
        return(
            <div className="Main-box">
                <SetupContainer location={location} />
                <TrialBlocksContainer location={location} />
            </div>
        )
    }
    return (
        <div>
            <p> You finished the study---thanks for participating! </p>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        finishedStudy: state.consent.consented &&
        state.instructions.finished_instructions &&
        state.trialBlocks.every((block) =>
            {return block.trials.every((trial) => {return trial.completed})})
    }
};

export default connect(mapStateToProps)(App);

