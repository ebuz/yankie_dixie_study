import React from 'react';
import { connect } from 'react-redux';
import { getAudioContext, getMic, adapter } from '../actions';
import { MediaRecorder } from '../actions/AudioRecorder';
import './MicSetupContainer.css'

const MicSetup = ({haveMic, setupMic}) => {
    if(MediaRecorder === null || MediaRecorder === undefined || adapter.browserShim === null || adapter.browserShim === undefined){
        return(
            <div className="MicSetup-box">
                <p>This experiment requires audio functionality that your browser does not support.</p>
                <p>If you wish to participate, please retry using an up-to-date version of the <a key='googleChrome' target="_blank" rel="noopener noreferrer" href="https://www.mozilla.org/en-US/firefox/">Firefox</a> or <a key='googleChrome' target="_blank" rel="noopener noreferrer" href="https://www.google.com/chrome/">Google Chrome</a> web browser.</p>
            </div>
        )
    }
    if(haveMic){
        return null;
    }
    if(haveMic === false){
        return(
            <div className="MicSetup-box">
                <p>There was a problem with starting your microphone.</p>
                <p>This could be due to your web browser being out of date or malfunctioning. Refreshing the page may help. If it does not, retry using an up-to-date version of the <a key='googleChrome' target="_blank" rel="noopener noreferrer" href="https://www.mozilla.org/en-US/firefox/">Firefox</a> or <a key='googleChrome' target="_blank" rel="noopener noreferrer" href="https://www.google.com/chrome/">Google Chrome</a> web browser.</p>
                <br />
                <p>This message will also appear if you, or a browser plugin, denied this webpage access to your microphone. If this was in error, you can refresh the page and allow access. You cannot participate unless you provide access to the microphone.</p>
            </div>
        )
    }
    return(
        <div className="MicSetup-box">
            <p>This task requires a microphone.</p>
            <button type="button" onClick={setupMic}
                className="MicAccess-button"
            >
                Click here to grant us access
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
