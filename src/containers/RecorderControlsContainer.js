import React from 'react';
import { connect } from 'react-redux';
import { recordDirections, stopRecording } from '../actions';
import './RecorderControlsContainer.css';

const RecorderControls = ({recorder, recordingState, trialStarted, providedInstructions, startRecordingAction, stopRecordingAction, participantRole, listId, blockId, trialId}) => {
    if (!recorder || !trialStarted || participantRole !== 'speaker'){
        return null;
    }
    let buttonAction = recordingState === 'recording' ? stopRecordingAction : startRecordingAction;
    let className = recordingState === 'inactive' ? 'RecordingOff-button' : 'RecordingOn-button';
    let buttonText = recordingState === 'recording' ? 'Send your message' : 'Record your message';
    if (providedInstructions){
        className = 'RecordingDisable-button';
        buttonText = 'You partner is working';
    }
    return (
        <div className="RecorderControls-box">
            <button type='button' onClick={buttonAction}
                disabled={providedInstructions}
                className={className}
            >
                {buttonText}
            </button>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        recorder: state.selfInfo.recorder,
        recordingState: state.selfInfo.recording_state,
        trialStarted: state.experimentalLists[ownProps.listId][ownProps.blockId].trials[ownProps.trialId].displayed_pictures,
        providedInstructions: state.experimentalLists[ownProps.listId][ownProps.blockId].trials[ownProps.trialId].speaker_recording
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        startRecordingAction: () => {
            dispatch(recordDirections(ownProps.listId, ownProps.blockId, ownProps.trialId));
        },
        stopRecordingAction: () => {
            dispatch(stopRecording());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecorderControls);
