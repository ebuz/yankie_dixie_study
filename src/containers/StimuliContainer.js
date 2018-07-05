import React from 'react';
import { connect } from 'react-redux';
import { selectOption, unSelectOption } from '../actions';
import './Stimuli.css'
import StimuliControlsContainer from './StimuliControlsContainer';

const filledArray = (n, fillFunc = () => null) => {
    return Array.from({length: n}, fillFunc);
};

const Stimuli = ({trialStarted, instructionsPlayed, participantRole, listId, blockId, trialId, trialData, onSelect, onUnSelect}) => {
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
            instructionMsg = instructionsPlayed ? "Press the pictures as you hear them" : "Wait for your partner's message";
        }
        availableOptionComponents = availableOptions.map((value, index) => {
                        return(
                            <PictureBox
                                picture={value === null ? null : trialData.stimuli[value]}
                                key={index.toString()}
                                onClick={instructionsPlayed && value !== null ? () => {onSelect(listId, blockId, trialId, value)} : () => {}} />
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
            <div className="Header">
                <div className="TrialInstructions-box">
                    {instructionMsg}
                </div>
                <div className="Options-box">
                    {availableOptionComponents}
                </div>
                <div className="Selected-box">
                    {
                        selectedOptions.map((value, index) => {
                            return(
                                <PictureBox key={index.toString()}
                                    picture={value === null ? null : trialData.stimuli[value]}
                                    onClick={instructionsPlayed && value !== null ? () => {onUnSelect(listId, blockId, trialId, value)} : () => {}}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className="Footer">
                <StimuliControlsContainer participantRole={participantRole}
                    listId={listId} blockId={blockId} trialId={trialId}/>
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
        onSelect: (listId, blockId, trialId, index) => {
            dispatch(selectOption(listId, blockId, trialId, index));
        },
        onUnSelect: (listId, blockId, trialId, index) => {
            dispatch(unSelectOption(listId, blockId, trialId, index));
        },
    };
};

const PictureBox = ({picture, onClick}) => {
    picture = picture || 'placeholder';
    let imgSrc = `stimuli/pictures/${picture}.jpg`;
    let className = picture === 'placeholder' ? "Picture-holder-box" : "Picture-box";
    return (
        <div className={className} onClick={onClick}>
            <img src={imgSrc} alt='' />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Stimuli);
