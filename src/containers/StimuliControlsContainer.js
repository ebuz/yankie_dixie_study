import React from 'react';
import { connect } from 'react-redux';
import { recordDirections, stopRecording, finishResponse } from '../actions';
import './StimuliControlsContainer.css';

const StimuliControls = ({recorder, recordingState, trialStarted, providedInstructions, fullResponse, startRecordingAction, stopRecordingAction, finishResponseAction, participantRole, listId, blockId, trialId}) => {
    if (!recorder || !trialStarted){
        return null;
    }
    let buttonAction = () => {};
    let className = 'GreyButton';
    let buttonText = 'Wait for your partner';
    let buttonDisabled = true;
    if(participantRole === 'partner'){
        buttonAction = finishResponseAction;
        className = fullResponse ? 'GreenButton' : 'GreyButton';
        buttonText = "I'm done sorting";
        buttonDisabled = !fullResponse;
    } else {
        buttonAction = recordingState === 'recording' ? stopRecordingAction : startRecordingAction;
        buttonDisabled = providedInstructions;
        if(providedInstructions){
            className = 'GreyButton';
            buttonText = 'You partner is working';
        } else {
            className = recordingState === 'inactive' ? 'GreenButton' : 'RedButton';
            buttonText = recordingState === 'recording' ? 'Send your message' : 'Record your message';
        }
    }
    return (
        <div className="StimuliControls-box CenterButton">
            <button type='button' onClick={buttonAction}
                disabled={buttonDisabled}
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
        providedInstructions: state.experimentalLists[ownProps.listId][ownProps.blockId].trials[ownProps.trialId].speaker_recording,
        fullResponse: state.experimentalLists[ownProps.listId][ownProps.blockId].trials[ownProps.trialId].stimuli.length === state.experimentalLists[ownProps.listId][ownProps.blockId].trials[ownProps.trialId].response.length
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        startRecordingAction: () => {
            dispatch(recordDirections(ownProps.listId, ownProps.blockId, ownProps.trialId));
        },
        stopRecordingAction: () => {
            dispatch(stopRecording());
        },
        finishResponseAction: () => {
            dispatch(finishResponse(ownProps.listId, ownProps.blockId, ownProps.trialId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StimuliControls);
