import React from 'react';
import { connect } from 'react-redux';
import TrialBlockContainer from './TrialBlockContainer';

const TrialBlocks = ({finishedSetup, listId, blockId, participantRole}) => {
    if(!finishedSetup || blockId === -1){
        return null;
    }
    return(
        <TrialBlockContainer listId={listId} blockId={blockId}
            participantRole={participantRole} />
    )
};

const nextTrialBlock = (trialBlocks) => {
    const unfinishedBlock = (block) => {
        return block.trials.some((trial) => {return(!trial.completed)});
    }
    return trialBlocks.findIndex(unfinishedBlock);
}

const mapStateToProps = (state) => {
    let currentBlock = state.mturkInfo.listId !== '' ? nextTrialBlock(state.experimentalLists[state.mturkInfo.listId]) : -1;
    let participantRole = null;
    if(currentBlock !== -1){
        participantRole = state.experimentalLists[state.mturkInfo.listId][currentBlock].role;
    }
    return {
        finishedSetup: state.consent.consented && state.instructions.finished_instructions && state.selfInfo.micSelfCheck && state.partnerInfo.micCheck,
        listId: state.mturkInfo.listId,
        blockId: currentBlock,
        participantRole: participantRole,
    };
};

export default connect(mapStateToProps)(TrialBlocks);
