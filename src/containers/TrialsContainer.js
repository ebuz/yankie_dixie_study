import React from 'react';
import { connect } from 'react-redux';
import SyncPartnersContainer from './SyncPartnersContainer';
import StimuliContainer from './StimuliContainer';

const Trials = ({listId, blockId, participantRole, finished_instructions, trialId, trialData}) => {
    if(!finished_instructions || trialId === -1){
        return null;
    }
    return(
        <div className="Trial-box">
            <SyncPartnersContainer listId={listId} blockId={blockId} trialId={trialId}
                participantRole={participantRole} />
            <StimuliContainer listId={listId} blockId={blockId} trialId={trialId}
                participantRole={participantRole} trialData={trialData} />
        </div>
    );
};

const getNextTrialId = (listId, blockId, experimentalLists) => {
    let trials = experimentalLists[listId][blockId].trials
    let trialId = trials.findIndex(trial => {return(!trial.completed)})
    return {
        trialId: trialId,
        trialData: trials[trialId]
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        finished_instructions: state.experimentalLists[ownProps.listId][ownProps.blockId].instructions.finished_instructions,
        ...getNextTrialId(ownProps.listId, ownProps.blockId, state.experimentalLists)
    }
};

export default connect(mapStateToProps)(Trials)
