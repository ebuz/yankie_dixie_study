import React from 'react';
import { connect } from 'react-redux';

import { mutePartner, unMutePartner } from '../actions';

const PartnerStatus = ({children, myId, partnerId, partnerReady, onMute, onUnMute}) => {
    let partnerStatus = <span style={{color: partnerReady ? 'green' : 'red'}}>
        {partnerReady ? 'ready' : 'not ready'}
        </span>
    return (
        <div className="PartnerStatus-box">
            <p>my id: {myId}</p>
            <p>partner id: {partnerId}, partner is ready: {partnerStatus}</p>
            <button type='button' onClick={onMute}>mute</button>
            <button type='button' onClick={onUnMute}>unmute</button>
            {children}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        myId: state.selfInfo.peerId,
        partnerId: state.partnerInfo.peerId,
        partnerReady: state.partnerInfo.readyToStart
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onMute: () => {
            dispatch(mutePartner())
        },
        onUnMute: () => {
            dispatch(unMutePartner())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerStatus)
