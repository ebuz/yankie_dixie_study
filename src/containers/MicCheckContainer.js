import React from 'react';
import { connect } from 'react-redux';
import { recordMicTest, stopRecording, gotMicTest, workingMic } from '../actions';
import './MicCheckContainer.css';

const MicCheck = ({haveMic, okMic, micTestFile, recordingState, startRecordingAction, stopRecordingAction, redoRecordingAction, okMicAction}) => {
    if(haveMic === null || !haveMic || okMic){
        return null;
    }
    if(micTestFile){
        return(
            <div className="MicCheck-box">
                <audio src={micTestFile} controls="controls" autoPlay="autoplay" />
                <p style={{fontSize: 'x-small'}}>
                    If your recording doesn't start on its own, press play above.
                </p>
                <br />
                <p>Can you clearly hear yourself speaking?</p>
                <button type="button" onClick={okMicAction}
                    className="RecordingOk-button"
                >
                    Click here if you are happy with the recording
                </button>
                <br />
                <hr />
                <p>Can't hear yourself?</p>
                <p> Check that your speakers are on and the volume is up. If you still can't hear yourself, check that your microphone is on and its volume is up and try to re-record.</p>
                <button type="button" onClick={redoRecordingAction}
                    className="RecordingRedo-button"
                >
                    Click here if you want to remake your recording
                </button>
            </div>
        )
    } else {
        return(
            <div className="MicCheck-box">
                <p style={{color: recordingState === 'inactive' ? 'black' : 'lightgrey'}}
                >
                    Let's test your mic. We will have you read aloud a short passage while your microphone is on then have you listen to the recording. Click the botton below to start.</p>
                <button disabled={recordingState === 'uploading'}
                    type="button"
                    onClick={recordingState === 'inactive' ? startRecordingAction : stopRecordingAction}
                    className={recordingState === 'inactive' ? 'RecordingOff-button' : 'RecordingOn-button'}
                >
                    {recordingState === 'inactive' ? 'Click here to start recording' : 'Read the passage below and click here when you finish.'}
                </button>
                <br />
                <div className="MicCheckPassage-box"
                    style={{visibility: recordingState === 'inactive' ? 'hidden' : 'visible'}}
                >
                    <p>Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice "without pictures or conversations?"</p>
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
        okMicAction: () => {
            dispatch(workingMic())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MicCheck);
