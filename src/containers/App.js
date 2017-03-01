import React from 'react';
import { connect } from 'react-redux';
import TrialContainer from './TrialContainer'
import MicSetupContainer from './MicSetupContainer'
import ConsentContainer from './ConsentContainer'
import InstructionsContainer from './InstructionsContainer'
import PartnerStatusContainer from './PartnerStatusContainer'
import './App.css';

let App = ({location, haveMic, finished_instructions, consented, nextTrial}) => {
    if(!haveMic) {
        return(
            <div className="Main-box">
                <MicSetupContainer />
            </div>
        )
    }
    if(!finished_instructions) {
        return(
            <div className="Main-box">
                <InstructionsContainer />
                <PartnerStatusContainer />
            </div>
        )
    }
    if(!consented) {
        return(
            <div className="Main-box">
                <ConsentContainer />
                <PartnerStatusContainer />
            </div>
        )
    }
    if(nextTrial !== null) {
        let participantRole = location.query.participantRole || 'speaker';
        return(
            <div className="Main-box">
                <TrialContainer participantRole={participantRole} />
                <PartnerStatusContainer />
            </div>
        )
    }
    return (
        <div>
            <p> all done </p>
        </div>
    );
};

const nextTrial = (trials) => {
    let nextTrial = trials.findIndex(trial => {return(!trial.completed)});
    nextTrial = nextTrial === -1 ? null : nextTrial
    return nextTrial;
};

let mapStateToAppProps = (state) => {
    return {
        nextTrial: nextTrial(state.trials),
        consented: state.consent.consented,
        finished_instructions: state.instructions.finished_instructions,
        haveMic: state.selfInfo.micInput
    }
};

export default connect(mapStateToAppProps)(App);

