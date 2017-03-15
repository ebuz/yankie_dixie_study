import React from 'react';
import { connect } from 'react-redux';
import TrialBlockContainer from './TrialBlockContainer';

const TrialBlocks = ({location, finishedSetup, blockId}) => {
    if(!finishedSetup || blockId === -1){
        return null;
    }
    let participantRole = location.query.participantRole || 'speaker';
    if((blockId + 1) % 2 === 0){
        participantRole = participantRole === 'speaker' ? 'partner' : 'speaker'
    }
    return(
        <TrialBlockContainer blockId={blockId} participantRole={participantRole} />
    )
};

const nextTrialBlock = (trialBlocks) => {
    const unfinishedBlock = (block) => {
        return block.trials.some((trial) => {return(!trial.completed)});
    }
    return trialBlocks.findIndex(unfinishedBlock);
}

const mapStateToProps = (state) => {
    return {
        finishedSetup: state.consent.consented && state.instructions.finished_instructions && state.selfInfo.micInput,
        blockId: nextTrialBlock(state.trialBlocks)
    };
};

export default connect(mapStateToProps)(TrialBlocks);
