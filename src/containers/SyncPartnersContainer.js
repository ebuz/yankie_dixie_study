import React from 'react';
import { connect } from 'react-redux';
import { readyToStart, startTrial } from '../actions';

const SyncPartners = ({havePartner, blockId, trialId, participantRole, readyToStart, partnerReady, notifyPartner, initiateTrial}) => {
    if (havePartner && !readyToStart){
        return (<div className="PartnerSync-box">
            <button type='button' onClick={notifyPartner}>
                Click to tell partner you are ready
            </button>
        </div>
        );
    }
    if (partnerReady && participantRole === 'speaker'){
        return (<div className="PartnerSync-box">
            <button type='button' onClick={() => {initiateTrial(blockId, trialId, participantRole)}}>
                Click to start the trial
            </button>
        </div>
        );
    } else {
        return (<div className="PartnerSync-box">
            <p>Waiting on your partner, stay put!</p>
        </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        havePartner: state.partnerInfo.peerId,
        readyToStart: state.selfInfo.readyToStart,
        partnerReady: state.partnerInfo.readyToStart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        notifyPartner: () => {
            dispatch(readyToStart());
        },
        initiateTrial: (blockId, trialId, participantRole) => {
            dispatch(readyToStart());
            dispatch(startTrial(blockId, trialId, participantRole));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SyncPartners);
