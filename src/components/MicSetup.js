import React from 'react';

const MicSetup = ({setupMic}) => {
    return(
        <div className="MicSetup-box">
            <p> This task requires a microphone.</p>
            <button type="button" onClick={setupMic}>
                Click to start microphone
            </button>
    </div>
    )
}

export default MicSetup
