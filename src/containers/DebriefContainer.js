import React from 'react';
import { connect } from 'react-redux';
import { finishedDebrief, uploadAssignment } from '../actions';
import './DebriefContainer.css'

const Debrief = ({finishedSurvey, debrief, onFinished}) => {
    if(debrief.finished_debrief || !finishedSurvey){
        return null;
    }
    return (
        <div className="Debrief-box">
            <div className="Header">
                <p>{debrief.debrief}</p>
            </div>
            <div className="Footer">
                <button type='button' onClick={onFinished}
                    className="Debrief-button GreenButton CenterButton"
                >
                    I have read this debriefing
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        finishedSurvey: state.survey.every((page) => {return page.completed}),
        debrief: state.debrief,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFinished: () => {
            dispatch(finishedDebrief());
            dispatch(uploadAssignment());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Debrief);
