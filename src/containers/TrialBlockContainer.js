import React from 'react';
import BlockInstructionsContainer from './BlockInstructionsContainer';
import TrialsContainer from './TrialsContainer';

const TrialBlock = ({listId, blockId, participantRole}) => {
    return(
        <div className="TrialBlock-box">
            <BlockInstructionsContainer listId={listId} blockId={blockId}
                participantRole={participantRole} />
            <TrialsContainer listId={listId} blockId={blockId}
                participantRole={participantRole} />
        </div>
    )
};

export default TrialBlock;
