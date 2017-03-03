import React from 'react';
import { connect } from 'react-redux';
import TrialContainer from './TrialContainer'
import MicSetupContainer from './MicSetupContainer'
import ConsentContainer from './ConsentContainer'
import InstructionsContainer from './InstructionsContainer'
import './App.css';

const App = ({location, haveMic, finished_instructions, consented, nextTrial}) => {
    if(!haveMic) {
        return(
            <div className="Main-box">
                <MicSetupContainer />
            </div>
        )
    }
    if(haveMic && !finished_instructions) {
        return(
            <div className="Main-box">
                <InstructionsContainer />
            </div>
        )
    }
    if(haveMic && !consented) {
        return(
            <div className="Main-box">
                <ConsentContainer />
            </div>
        )
    }
    if(haveMic && nextTrial !== null) {
        let participantRole = location.query.participantRole || 'speaker';
        return(
            <div className="Main-box">
                <TrialContainer participantRole={participantRole} />
            </div>
        )
    }
    return (
        <div>
            <p> finished Study---thanks for participating! </p>
        </div>
    );
};

const nextTrial = (trials) => {
    let nextTrial = trials.findIndex(trial => {return(!trial.completed)});
    nextTrial = nextTrial === -1 ? null : nextTrial
    return nextTrial;
};

const mapStateToProps = (state) => {
    return {
        nextTrial: nextTrial(state.trials),
        consented: state.consent.consented,
        finished_instructions: state.instructions.finished_instructions,
        haveMic: state.selfInfo.micInput
    }
};

export default connect(mapStateToProps)(App);

