import React from 'react';
import { connect } from 'react-redux';
import { finishedBlockInstructions } from '../actions';
import './BlockInstructionsContainer.css'

const BlockInstructions = ({listId, blockId, participantRole, instructions, onFinished}) => {
    if(instructions.finished_instructions){
        return null;
    }
    let displayedInstructions = participantRole === 'speaker' ? instructions.forSpeaker : instructions.forPartner;
    return (
        <div className="BlockInstructions-box">
            <p>{displayedInstructions}</p>
            <button type='button' onClick={onFinished}>
                {participantRole === 'speaker' ? "My turn to send messages" : "My turn to sort pictures"}
            </button>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        instructions: state.experimentalLists[ownProps.listId][ownProps.blockId].instructions,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onFinished: () => {
            dispatch(finishedBlockInstructions(ownProps.listId, ownProps.blockId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockInstructions);
