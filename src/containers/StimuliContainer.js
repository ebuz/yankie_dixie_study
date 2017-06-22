import React from 'react';
import { connect } from 'react-redux';
import { response } from '../actions';
import './Stimuli.css'
import RecorderControlsContainer from './RecorderControlsContainer';

const Stimuli = ({instructionsPlayed, participantRole, blockId, trialId, trialData, onColorClick}) => {
    let colorOptions = [];
    let selectedColors = [];
    let displayInstructions = trialId === 0 && (blockId === 0 || blockId === 1);
    let instructionMsg = '';
    if(participantRole === 'partner') {
        if(displayInstructions){
            instructionMsg = instructionsPlayed ? "Wait and listen for your partner's instructions" : "Click the images in the order you hear them";
        }
        let options = [0, 1, 2, 3].filter((el) => {
            return !trialData.response.includes(el);
        });
        colorOptions = options.map((value, index) => {
            return <PictureBox picture={trialData.stimuli[value]}
                onClick={instructionsPlayed ? () => {
                    return onColorClick(blockId, trialId, value);
                } : () => {}} />
        });
        selectedColors = trialData.response.map((value, index) => {
            return <PictureBox picture={trialData.stimuli[value]} />
        });
    } else {
        instructionMsg = displayInstructions ? "When you are ready, click the button to start recording, then name each picture from left to right" : '';
        colorOptions = trialData.speaker_order.map((value, index) => {
            return <PictureBox picture={trialData.stimuli[value]} />
        });
    }
    return (
        <div className="Stimulus-box">
            <div className="TrialInstructions-box">
                {instructionMsg}
            </div>
            <div className="Options-box">
                {colorOptions}
            </div>
            <br />
            <hr />
            <div className="Selected-box">
                {selectedColors}
            </div>
            <RecorderControlsContainer participantRole={participantRole}
                blockId={blockId} trialId={trialId}/>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        instructionsPlayed: state.trialBlocks[ownProps.blockId].trials[ownProps.trialId].instructions_played
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onColorClick: (blockId, trialId, index) => {
            dispatch(response(blockId, trialId, index));
        }
    };
};

const PictureBox = ({picture, onClick}) => {
    let imgSrc = `stimuli/pictures/${picture}.jpg`;
    let style = {borderStyle: picture === null ? 'dashed' : 'solid'};
    return (
        <div style={style} className="Picture-box" onClick={onClick}>
            <img src={imgSrc} alt='' height="200" width="200" />
        </div>
    );
};

const WordBox = ({word, onClick}) => {
    let style = {borderStyle: word === null ? 'dashed' : 'solid'};
    return (
        <div style={style} className="Word-box" onClick={onClick}>
            {word}
        </div>
    );
};

const ColorBox = ({color, onClick}) => {
    let style = {}
    if (color === null){
        style = {...style, borderStyle: 'dashed', backgroundColor: 'white' };
    } else {
        style = {...style, borderStyle: 'solid', backgroundColor: color };
    }
    return (
        <div style={style} className="Color-box" onClick={onClick}>
            {color === null ? '?' : ''}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Stimuli);
