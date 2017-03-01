import React from 'react';
import { connect } from 'react-redux';
import { finishedInstructions } from '../actions';

let InstructionsContainer = ({instructions, onFinished}) => {
    return (
        <div className="Instructions-box">
            <p>{instructions}</p>
            <button type='button' onClick={onFinished}>
                I understand these instructions
            </button>
        </div>
    );
};

const mapStateToInstructionsProps = (state) => {
    return {
        instructions: state.instructions.instructions
    }
};

const mapDispatchToInstructionsProps = (dispatch) => {
    return {
        onFinished: () => {
            dispatch(finishedInstructions());
        }
    };
};

InstructionsContainer = connect(mapStateToInstructionsProps,
    mapDispatchToInstructionsProps)(InstructionsContainer)

export default InstructionsContainer
