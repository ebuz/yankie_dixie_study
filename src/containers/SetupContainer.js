import React from 'react';
import MturkStatusContainer from './MturkStatusContainer'
import MicSetupContainer from './MicSetupContainer'
import ConsentContainer from './ConsentContainer'
import InstructionsContainer from './InstructionsContainer'

const Setup = () => {
    return(
        <div className="Setup-box">
            <MturkStatusContainer />
            <MicSetupContainer />
            <InstructionsContainer />
            <ConsentContainer />
        </div>
    )
}

export default Setup;
