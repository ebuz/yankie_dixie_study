import React from 'react';
import { connect } from 'react-redux';
import './MturkSubmitContainer.css'

const MturkSubmitForm = ({turkSubmitTo, assignmentId, qualtricsCompletionCode, data}) => {
    let turkSubmitToURL = new URL(turkSubmitTo);
    if(turkSubmitToURL.hostname.endsWith('qualtrics.com')){
        let redirectCompletionCodeURL = turkSubmitToURL.origin + turkSubmitToURL.pathname + '?redirectCompletionCode=' + qualtricsCompletionCode + '&' + turkSubmitToURL.search.slice(1);
        return (
            <div className="MturkSubmit-box">
                <p>Thank you for participating. Here is your validation code:</p>
                <br />
                <h3>{qualtricsCompletionCode}</h3>
                <br />
                <a href={redirectCompletionCodeURL}>Click here to return to the qualtics survey</a>
            </div>
        )
    }
    return (
        <div className="MturkSubmit-box">
            <form action={turkSubmitTo} method='post'>
                <input type='hidden' id='assignmentId' name='assignmentId' value={assignmentId} />
                <input type='hidden' id='data' name='data' value={JSON.stringify(data)} />
                <label htmlFor='comment'>Feel free to leave a comment!</label> <br />
                <textarea cols={40} rows={2} id='comment' name='comment' /> <br />
                <input type='submit' value='Click here to complete hit'
                    className="MturkSubmit-button"
                />
            </form>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        turkSubmitTo: state.mturkInfo.turkSubmitTo,
        assignmentId: state.mturkInfo.assignmentId,
        qualtricsCompletionCode: 'qualtricsEBYD2018',
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
