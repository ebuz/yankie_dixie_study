import React from 'react';
import { connect } from 'react-redux';

const isInPreview = ({assignmentId, workerId, hitId, turkSubmitTo, listId}) => {
    return (['ASSIGNMENT_ID_NOT_AVAILABLE', 'assignment_id_not_available'].indexOf(assignmentId) >= 0)
}

const MturkStatus = ({assignmentId, workerId, hitId, turkSubmitTo, listId, previewMode}) => {
    let hitParamLabels = ['workerId', 'hitId', 'turkSubmitTo', 'listId']
    let hitParams = [workerId, hitId, turkSubmitTo, listId]
    if (assignmentId && ['https://www.mturk.com/mturk/externalSubmit', 'https://workersandbox.mturk.com/mturk/externalSubmit'].indexOf(turkSubmitTo) === -1){
        hitParamLabels = ['workerId', 'turkSubmitTo', 'listId']
        hitParams = [workerId, turkSubmitTo, listId]
    }
    let hitMissingParams = hitParamLabels.filter(
        (label, index) => hitParams[index] === null || hitParams[index] === ''
    )
    let hitStatus = <span style={{color: 'red'}}>
        {!previewMode && assignmentId !== '' && hitMissingParams.length > 0 ? 'MISSING PARAMETERS: ' + hitMissingParams.join(', ') : ''}
        </span>
    let previewStatus = <span style={{color: 'red'}}>
        {previewMode ? 'PREVIEW MODE' : ''}
        </span>
    return (
        <div className="MturkStatus-box">
            <p>{hitStatus} {previewStatus}</p>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ...state.mturkInfo,
        previewMode: isInPreview(state.mturkInfo)
    }
};

export default connect(mapStateToProps)(MturkStatus)
