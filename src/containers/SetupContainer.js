import React from 'react';
import MturkStatusContainer from './MturkStatusContainer'
import MicSetupContainer from './MicSetupContainer'
import ConsentContainer from './ConsentContainer'
import InstructionsContainer from './InstructionsContainer'
import MicCheckContainer from './MicCheckContainer'

const Setup = () => {
    return(
        <div className="Setup-box">
            <MturkStatusContainer />
            <MicSetupContainer />
            <MicCheckContainer />
            <InstructionsContainer />
            <ConsentContainer />
        </div>
    )
}

export default Setup;
