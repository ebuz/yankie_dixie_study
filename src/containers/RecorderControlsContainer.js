import React from 'react';
import { connect } from 'react-redux';
import { recordDirections, stopRecording } from '../actions';

const RecorderControls = ({recorder, recording_state, trialStarted, providedInstructions, startRecordingAction, stopRecordingAction, participantRole, listId, blockId, trialId}) => {
    if (!recorder || !trialStarted || participantRole !== 'speaker'){
        return null;
    }
    if (providedInstructions){
        return(
            <div> Waiting for your partner to finish. </div>
        );
    }
    let buttonAction = recording_state === 'recording' ? stopRecordingAction : startRecordingAction;
    return (
        <div className="RecorderControls-box">
            <button type='button' onClick={buttonAction} >
                    Click to {recording_state === 'recording' ? 'send instructions' : 'begin recording instructions'}
            </button>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        recorder: state.selfInfo.recorder,
        recording_state: state.selfInfo.recording_state,
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
