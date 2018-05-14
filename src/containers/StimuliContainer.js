import React from 'react';
import { connect } from 'react-redux';
import { response } from '../actions';
import './Stimuli.css'
import RecorderControlsContainer from './RecorderControlsContainer';

const filledArray = (n, fillFunc = () => null) => {
    return Array.from({length: n}, fillFunc);
};

const Stimuli = ({trialStarted, instructionsPlayed, participantRole, listId, blockId, trialId, trialData, onClick}) => {
    if(!trialStarted){
        return null;
    }
    let displayInstructions = trialId === 0 && (blockId === 0 || blockId === 1);

    let selectedOptions = trialData.response.concat(
        filledArray(trialData.stimuli.length - trialData.response.length));

    let availableOptions = participantRole === 'partner' ? filledArray(trialData.stimuli.length, (_, i) => i) : trialData.speaker_order;
    availableOptions = availableOptions.filter((el) => {
        return(!trialData.response.includes(el));
    });
    availableOptions = availableOptions.concat(
        filledArray(trialData.response.length));

    let instructionMsg = '';
    let availableOptionComponents = [];

    if(participantRole === 'partner') {
        if(displayInstructions){
            instructionMsg = instructionsPlayed ? "Click the images in the order you hear them" : "Wait and listen for your partner's instructions";
        }
        availableOptionComponents = availableOptions.map((value, index) => {
                        return(
                            <PictureBox
                                picture={value === null ? null : trialData.stimuli[value]}
                                key={index.toString()}
                                onClick={instructionsPlayed && value !== null ? () => {onClick(listId, blockId, trialId, value)} : () => {}} />
                        )
                    })
    } else {
        if(displayInstructions){
            instructionMsg = instructionsPlayed ? "" : "When you are ready, click the button to start recording, then name each picture from left to right";
        }
        availableOptionComponents = availableOptions.map((value, index) => {
                        return(
                            <PictureBox
                                picture={value === null ? null : trialData.stimuli[value]}
                                key={index.toString()} />
                        )
                    })
    }
    return (
        <div className="Stimulus-box">
            <div className="TrialInstructions-box">
                {instructionMsg}
            </div>
            <RecorderControlsContainer participantRole={participantRole}
                listId={listId} blockId={blockId} trialId={trialId}/>
            <div className="Options-box">
                {availableOptionComponents}
            </div>
            <br />
            <div className="Selected-box">
                {
                    selectedOptions.map((value, index) => {
                        return(
                            <PictureBox key={index.toString()}
                                picture={value === null ? null : trialData.stimuli[value]} />
                        )
                    })
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        trialStarted: state.experimentalLists[ownProps.listId][ownProps.blockId].trials[ownProps.trialId].displayed_pictures,
        instructionsPlayed: state.experimentalLists[ownProps.listId][ownProps.blockId].trials[ownProps.trialId].instructions_played
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (listId, blockId, trialId, index) => {
            dispatch(response(listId, blockId, trialId, index));
        }
    };
};

const PictureBox = ({picture, onClick}) => {
    let imgSrc = `stimuli/pictures/${picture}.jpg`;
    let className = picture === null ? "Picture-holder-box" : "Picture-box";
    return (
        <div className={className} onClick={onClick}>
            {picture === null ? null : <img src={imgSrc} alt='' height="200" width="200" />}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Stimuli);
