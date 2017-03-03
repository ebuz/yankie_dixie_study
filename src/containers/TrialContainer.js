import React from 'react';
import { connect } from 'react-redux';
// import PartnerStatusContainer from './PartnerStatusContainer'
import SyncPartnersContainer from './SyncPartnersContainer';
import StimuliContainer from './StimuliContainer';

let TrialContainer = ({participantRole, trialId, trialStarted, trialData}) => {
    if(!trialStarted){
        return <SyncPartnersContainer trialId={trialId} participantRole={participantRole}/>;
    }
    return <StimuliContainer participantRole={participantRole} trialId={trialId}
        trialData={trialData}
    />
};

const getNextTrialId = (trials) => {
    let trialId = trials.findIndex(trial => {return(!trial.completed)})
    return {trialId: trialId,
        trialData: trials[trialId],
        trialStarted: trials[trialId].displayed_words};
};

let mapStateToTrialProps = (state) => {
    return {
        ...getNextTrialId(state.trials)
    }
};

TrialContainer = connect(mapStateToTrialProps)(TrialContainer)

export default TrialContainer
