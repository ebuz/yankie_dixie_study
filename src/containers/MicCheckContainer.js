import React from 'react';
import { connect } from 'react-redux';
import { recordMicTest, stopRecording, gotMicTest, workingMic } from '../actions';
import './MicCheckContainer.css';

const MicCheck = ({haveMic, okMic, micTestFile, recordingState, startRecordingAction, stopRecordingAction, redoRecordingAction, noRecordingAction, okMicAction}) => {
    if(haveMic === null || !haveMic || okMic){
        return null;
    }
    if(micTestFile){
        return(
            <div className="MicCheck-box">
                <div className="Header">
                    <audio src={micTestFile} controls="controls" autoPlay="autoplay" />
                    <p style={{fontSize: 'small'}}>
                        If your recording doesn't start on its own, press play.
                    </p>
                    <p>Can't hear yourself? Check that the speakers are on and the volume is up.</p>
                </div>
                <div className="Footer">
                        <button type="button" onClick={redoRecordingAction}
                            className="RecordingRedo-button GreyButton LeftButton"
                        >
                            Remake your message
                        </button>
                    <button type="button" onClick={okMicAction}
                        className="RecordingOk-button GreenButton RightButton"
                    >
                        Send your message to your partner
                    </button>
                </div>
            </div>
        )
    } else {
        return(
            <div className="MicCheck-box">
                <div className="Header">
                    <p>Tell your partner about yourself!</p>
                    <p>Record a message saying your name, your favorite color, and your favorite food.
                    </p>
                </div>
                <div className="Footer">
                    <button disabled={recordingState === 'uploading'}
                        type="button"
                        onClick={recordingState === 'inactive' ? startRecordingAction : stopRecordingAction}
                        className={recordingState === 'inactive' ? 'GreenButton CenterButton' : 'RedButton CenterButton'}
                    >
                        {recordingState === 'inactive' ? 'Start recording a message' : 'Stop recording'}
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        haveMic: state.selfInfo.micInput,
        okMic: state.selfInfo.micSelfCheck,
        micTestFile: state.selfInfo.micTestFile,
        recordingState: state.selfInfo.recording_state
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        startRecordingAction: () => {
            dispatch(recordMicTest());
        },
        stopRecordingAction: () => {
            dispatch(stopRecording());
        },
        redoRecordingAction: () => {
            dispatch(gotMicTest(null));
        },
        noRecordingAction: () => {
        },
        okMicAction: () => {
            dispatch(workingMic())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MicCheck);
