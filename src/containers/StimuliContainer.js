import React from 'react';
import { connect } from 'react-redux';
import { response } from '../actions';
import './Stimuli.css'
import RecorderControlsContainer from './RecorderControlsContainer';

const Stimuli = ({participantRole, blockId, trialId, trialData, onColorClick}) => {
    let colorOptions = [];
    let selectedColors = [];
    if(participantRole === 'partner') {
        let options = [0, 1, 2, 3].filter((el) => {
            return !trialData.response.includes(el);
        });
        colorOptions = options.map((value, index) => {
            return <ColorBox color={trialData.stimuli[value]}
                onClick={() => {
                    return onColorClick(blockId, trialId, value);
                }} />
        });
        selectedColors = trialData.response.map((value, index) => {
            return <ColorBox color={trialData.stimuli[value]} />
        });
    } else {
        colorOptions = trialData.speaker_order.map((value, index) => {
            return <ColorBox color={trialData.stimuli[value]} />
        });
    }
    return (
        <div className="Stimulus-box">
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

const mapDispatchToProps = (dispatch) => {
    return {
        onColorClick: (blockId, trialId, index) => {
            dispatch(response(blockId, trialId, index));
        }
    };
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

export default connect(null, mapDispatchToProps)(Stimuli);
