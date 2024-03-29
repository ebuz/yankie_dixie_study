import React from 'react';
import { connect } from 'react-redux';
import { finishedBlockInstructions } from '../actions';

const BlockInstructions = ({blockId, participantRole, instructions, onFinished}) => {
    if(instructions.finished_instructions){
        return null;
    }
    let displayedInstructions = participantRole === 'speaker' ? instructions.forSpeaker : instructions.forPartner;
    return (
        <div className="BlockInstructions-box">
            <p>{displayedInstructions}</p>
            <button type='button' onClick={onFinished}>
                I understand these instructions
            </button>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        instructions: state.trialBlocks[ownProps.blockId].instructions
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onFinished: () => {
            dispatch(finishedBlockInstructions(ownProps.blockId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockInstructions);
