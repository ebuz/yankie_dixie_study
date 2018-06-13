import React from 'react';
import { connect } from 'react-redux';
import { participantConsent, getPartner} from '../actions';
import './ConsentContainer.css'

const isInPreview = ({assignmentId, workerId, hitId, turkSubmitTo, listId}) => {
    let result = ['ASSIGNMENT_ID_NOT_AVAILABLE', 'assignment_id_not_available']
                .indexOf(assignmentId) >= 0
    let missingParams = [workerId, turkSubmitTo, listId].filter(
        (param) => param === null || ''
    )
    return result || missingParams.length > 0
}

const Consent = ({inPreview, haveMic, readInstructions, consent, onConsent}) => {
    if(haveMic === null || !haveMic || !readInstructions || consent.consented){
        return null;
    }
    return (
        <div className="Consent-box">
            <p>Please read our <a href={consent.consentFileURL} target="_blank">consent form</a>.</p>
            <br />
            <p>{consent.instructions}</p>
            <br />
            <p>Once you consent we will begin matching you with a partner.</p>
            <button type='button' onClick={onConsent} disabled={inPreview}
                className="Consent-button"
            >
                {inPreview ? 'cannot continue in preview mode' : 'I consent to participate'}
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        inPreview : isInPreview(state.mturkInfo),
        haveMic: state.selfInfo.micSelfCheck,
        readInstructions: state.instructions.finished_instructions,
        consent: state.consent
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onConsent: () => {
            dispatch(participantConsent());
            dispatch(getPartner());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Consent)
