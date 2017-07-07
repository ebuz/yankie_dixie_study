import React from 'react';
import { connect } from 'react-redux';
import SyncPartnersContainer from './SyncPartnersContainer';
import StimuliContainer from './StimuliContainer';

const Trials = ({blockId, participantRole, finished_instructions, trialId, trialData}) => {
    if(!finished_instructions || trialId === -1){
        return null;
    }
    return(
        <div className="Trial-box">
            <SyncPartnersContainer blockId={blockId} trialId={trialId}
                participantRole={participantRole} />
            <StimuliContainer blockId={blockId} participantRole={participantRole}
                trialId={trialId} trialData={trialData} />
        </div>
    );
};

const getNextTrialId = (blockId, trialBlocks) => {
    let trials = trialBlocks[blockId].trials
    let trialId = trials.findIndex(trial => {return(!trial.completed)})
    return {
        trialId: trialId,
        trialData: trials[trialId]
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        finished_instructions: state.trialBlocks[ownProps.blockId].instructions.finished_instructions,
        ...getNextTrialId(ownProps.blockId, state.trialBlocks)
    }
};

export default connect(mapStateToProps)(Trials)
