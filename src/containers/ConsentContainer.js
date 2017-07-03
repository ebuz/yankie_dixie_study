import React from 'react';
import { connect } from 'react-redux';
import { participantConsent, getPartner} from '../actions';

const Consent = ({haveMic, readInstructions, consent, onConsent}) => {
    if(haveMic === null || !haveMic || !readInstructions || consent.consented){
        return null;
    }
    return (
        <div className="Consent-box">
            <p>{consent.instructions}</p>
            <button type='button' onClick={onConsent}>
                I consent to participate
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
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
