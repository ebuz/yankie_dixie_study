import React from 'react';
import { connect } from 'react-redux';
import './MturkSubmitContainer.css'

const MturkSubmitForm = ({turkSubmitTo, assignmentId, data}) => {
    return (
        <div className="MturkSubmit-box">
            <form action={turkSubmitTo} method='post'>
                <div className="Header">
                    <input type='hidden' id='assignmentId' name='assignmentId' value={assignmentId} />
                    <input type='hidden' id='data' name='data' value={JSON.stringify(data)} />
                    <label htmlFor='comment'>
                        Study comments
                        <br />
                        <textarea cols={40} rows={2} id='comment' name='comment' />
                    </label>
                </div>
                <div className="Footer">
                    <input type='submit' value="Save data"
                        className="MturkSubmit-button GreenButton CenterButton"
                    />
                </div>
            </form>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        turkSubmitTo: state.mturkInfo.turkSubmitTo,
        assignmentId: state.mturkInfo.assignmentId,
        data: {
            trialData: state.experimentalLists[state.mturkInfo.listId],
            surveyData: state.survey,
            mturkInfo: state.mturkInfo,
            endedEarly: state.selfInfo.endedEarly
        }
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MturkSubmitForm)
