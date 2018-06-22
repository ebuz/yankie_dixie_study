import React from 'react';
import { connect } from 'react-redux';
import { finishedInstructions, getPartner } from '../actions';
import './InstructionsContainer.css'

const Instructions = ({haveMic, instructions, onFinished}) => {
    if(haveMic === null || !haveMic || instructions.finished_instructions){
        return null;
    }
    return (
        <div className="Instructions-box">
            <p>{instructions.instructions}</p>
            <button type='button' onClick={onFinished}
                className="Instructions-button"
            >
                I'm ready
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        haveMic: state.selfInfo.micSelfCheck,
        instructions: state.instructions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFinished: () => {
            dispatch(finishedInstructions());
            dispatch(getPartner());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Instructions)
