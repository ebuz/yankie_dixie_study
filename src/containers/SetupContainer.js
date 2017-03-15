import React from 'react';
import MicSetupContainer from './MicSetupContainer'
import ConsentContainer from './ConsentContainer'
import InstructionsContainer from './InstructionsContainer'

const Setup = () => {
    return(
        <div className="Setup-box">
            <MicSetupContainer />
            <InstructionsContainer />
            <ConsentContainer />
        </div>
    )
}

export default Setup;
