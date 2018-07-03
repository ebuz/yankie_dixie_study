import React from 'react';
import InitialDetailsSetupContainer from './InitialDetailsSetupContainer'
import MicSetupContainer from './MicSetupContainer'
import ConsentContainer from './ConsentContainer'
import InstructionsContainer from './InstructionsContainer'
import MicCheckContainer from './MicCheckContainer'

const Setup = () => {
    return(
        <div className="Setup-box">
            <InitialDetailsSetupContainer />
            <MicSetupContainer />
            <MicCheckContainer />
            <InstructionsContainer />
            <ConsentContainer />
        </div>
    )
}

export default Setup;
