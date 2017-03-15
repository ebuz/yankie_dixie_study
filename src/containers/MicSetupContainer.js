import React from 'react';
import { connect } from 'react-redux';
import { getAudioContext, getMic } from '../actions';

const MicSetup = ({haveMic, setupMic}) => {
    if(haveMic){
        return null;
    }
    return(
        <div className="MicSetup-box">
            <p> This task requires a microphone.</p>
            <button type="button" onClick={setupMic}>
                Click to start microphone
            </button>
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        haveMic: state.selfInfo.micInput
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setupMic: () => {
            dispatch(getAudioContext());
            dispatch(getMic());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MicSetup);
