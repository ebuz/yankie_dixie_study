import React from 'react';
import { connect } from 'react-redux';

const MturkSubmitForm = ({turkSubmitTo, assignmentId, data}) => {
    return (
        <form action={turkSubmitTo} method='post'>
            <input type='hidden' id='assignmentId' name='assignmentId' value={assignmentId} />
            <input type='hidden' id='data' name='data' value={JSON.stringify(data)} />
            <label htmlFor='comment'>Feel free to leave a comment!</label> <br />
            <input type='text' id='comment' name='comment' /> <br />
            <input type='submit' value='Click here to complete hit' />
        </form>
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
        }
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MturkSubmitForm)
