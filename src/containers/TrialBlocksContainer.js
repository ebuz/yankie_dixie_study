import React from 'react';
import { connect } from 'react-redux';
import TrialBlockContainer from './TrialBlockContainer';

const TrialBlocks = ({finishedSetup, blockId, participantRole}) => {
    if(!finishedSetup || blockId === -1){
        return null;
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
    let currentBlock = nextTrialBlock(state.trialBlocks);
    let participantRole = null;
    if(currentBlock !== -1){
        participantRole = state.trialBlocks[currentBlock].role;
    }
    return {
        finishedSetup: state.consent.consented && state.instructions.finished_instructions && state.selfInfo.micSelfCheck,
        blockId: currentBlock,
        participantRole: participantRole,
    };
};

export default connect(mapStateToProps)(TrialBlocks);
