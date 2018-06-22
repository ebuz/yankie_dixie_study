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
                <audio src={micTestFile} controls="controls" autoPlay="autoplay" />
                <p style={{fontSize: 'x-small'}}>
                    If your recording doesn't start on its own, press play.
                </p>
                <br />
                <button type="button" onClick={okMicAction}
                    className="RecordingOk-button"
                >
                    Send your message to your partner
                </button>
                <br />
                <hr />
                <p>Can't hear yourself? Check that the speakers are on and the volume is up.</p>
                <button type="button" onClick={redoRecordingAction}
                    className="RecordingRedo-button"
                >
                    Remake your message
                </button>
            </div>
        )
    } else {
        return(
            <div className="MicCheck-box">
                <p>
                    Tell your partner about yourself! Record a message saying your name, your favorite color, and your favorite food.
                </p>
                <button disabled={recordingState === 'uploading'}
                    type="button"
                    onClick={recordingState === 'inactive' ? startRecordingAction : stopRecordingAction}
                    className={recordingState === 'inactive' ? 'RecordingOff-button' : 'RecordingOn-button'}
                >
                    {recordingState === 'inactive' ? 'Start recording a message' : 'Stop recording'}
                </button>
                <br />
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
