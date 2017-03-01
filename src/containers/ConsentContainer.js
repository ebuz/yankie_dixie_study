import React from 'react';
import { connect } from 'react-redux';
import { participantConsent, getPartner} from '../actions';

const Consent = ({instructions, onConsent}) => {
    return (
        <div className="Consent-box">
            <p>{instructions}</p>
            <button type='button' onClick={onConsent}>
                I consent to participate
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        instructions: state.consent.instructions
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
