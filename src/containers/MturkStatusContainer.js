import React from 'react';
import { connect } from 'react-redux';

const isInPreview = ({assignmentId, workerId, hitId, turkSubmitTo}) => {
    let result = assignmentId === null ||
                ['ASSIGNMENT_ID_NOT_AVAILABLE', 'assignment_id_not_available', '']
                .indexOf(assignmentId) >= 0
    return result
}

const MturkStatus = ({assignmentId, workerId, hitId, turkSubmitTo, previewMode}) => {
    let hitStatus = <span style={{color: 'red'}}>
        {!previewMode && !(assignmentId && workerId && hitId && turkSubmitTo) ? 'MISSING PARAMETERS' : ''}
        </span>
    let previewStatus = <span style={{color: 'red'}}>
        {previewMode ? 'PREVIEW' : ''}
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
