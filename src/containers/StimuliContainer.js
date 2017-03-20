import React from 'react';
import { connect } from 'react-redux';
import { response } from '../actions';
import './Stimuli.css'

const Stimuli = ({participantRole, blockId, trialId, trialData, onWordClick}) => {
    let words = trialData.stimuli.map((value, index) => {
        return <WordBox key={index} id={index} word={value}
            cued={participantRole === 'speaker' && index === trialData.target && trialData.speaker_cued}
            selected={index === trialData.response}
            onClick={() => {
                if(participantRole === 'partner') {
                    return onWordClick(blockId, trialId, index);}
                return {};}} />
    });
    return (
        <div className="Stimulus-box">
            {words}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onWordClick: (blockId, trialId, index) => {
            dispatch(response(blockId, trialId, index));
        }
    };
};

const WordBox = ({word, cued, selected, onClick}) => {
    let style = selected ? {backgroundColor: 'grey'} : {};
    style = {...style, borderStyle: cued ? 'dashed': 'solid'};
    style = {...style, borderColor: cued ? 'black': 'white'};
    return (
        <div style={style} className="Word-box" onClick={onClick}>
            {word}
        </div>
    );
};

export default connect(null, mapDispatchToProps)(Stimuli);
