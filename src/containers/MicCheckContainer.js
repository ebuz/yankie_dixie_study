import React from 'react';
import { connect } from 'react-redux';
import { recordMicTest, stopRecording, gotMicTest, workingMic } from '../actions';

const MicCheck = ({haveMic, okMic, micTestFile, recordingState, startRecordingAction, stopRecordingAction, redoRecordingAction, noRecordingAction, okMicAction}) => {
    if(haveMic === null || !haveMic || okMic){
        return null;
    }
    if(micTestFile){
        return(
            <div className="MicCheck-box">
                <audio src={micTestFile} controls="controls" autoPlay="autoplay" />
                <p>If your recording doesn't start on its own, press the play above.</p>
                <br />
                <p>Can you clearly hear yourself speaking?</p>
                <button type="button" onClick={okMicAction}>
                    Click here if you are happy with the recording
                </button>
                <p>If you can't hear yourself, check that your speakers are on and the volume is up and replay the sound clip above. If you still can't hear yourself, check that your microphone is on and its volume is up and try to re-record.</p>
                <button type="button" onClick={redoRecordingAction}>
                    Click here if you want to remake your recording
                </button>
                <button type="button" onClick={noRecordingAction}>
                    Click here if you still can't hear yourself
                </button>
            </div>
        )
    } else {
        return(
            <div className="MicCheck-box">
                <p>We need you to check your mic and make sure it's working. Click the botton below to start recording and read aloud the passge. When you finish reading, click the button to stop the recording.</p>
                <button disabled={recordingState === 'uploading'} type="button" onClick={recordingState === 'inactive' ? startRecordingAction : stopRecordingAction}>
                    {recordingState === 'inactive' ? 'Click here to start recording, then begin reading the passage below.' : 'Click here when you finish reading aloud.'}
                </button>
                <br />
                <div className="MicCheckPassage-box">
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
        noRecordingAction: () => {
        },
        okMicAction: () => {
            dispatch(workingMic())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MicCheck);
