import React from 'react';
import BlockInstructionsContainer from './BlockInstructionsContainer';
import TrialsContainer from './TrialsContainer';

const TrialBlock = ({blockId, participantRole}) => {
    return(
        <div className="TrialBlock-box">
            <BlockInstructionsContainer blockId={blockId}
                participantRole={participantRole} />
            <TrialsContainer blockId={blockId} participantRole={participantRole} />
        </div>
    )
};

export default TrialBlock;
