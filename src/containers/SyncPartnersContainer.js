import React from 'react';
import { connect } from 'react-redux';
import { workingPartnerMic, readyToStart, startTrial } from '../actions';

const SyncPartners = ({havePartner, micCheck, micTestFile, notOkPartnerMic, okPartnerMic, readyToStart, partnerReady, blockId, trialId, participantRole, notifyPartner, initiateTrial}) => {
    if (micCheck && !readyToStart){
        return(<div className="PartnerSync-box">
            <button type='button' onClick={notifyPartner}>
                Click to tell your partner you are ready
            </button>
        </div>
        );
    }
    if(havePartner && !micCheck){
        return(<div className="PartnerSync-box">
            <p>We found you a partner!</p>
            <p>We need you to check if you can hear them. Below is their recording (if it doesn't start playing automatically press the play button).</p>
            <audio src={micTestFile} controls="controls" autoPlay="autoplay" />
            <button type="button" onClick={okPartnerMic}>
                Click here if you can hear your partner
            </button>
            <p>If you can't hear your partner, check your speaker volume. If you still can't hear your partner we'll ask them to re-record themselves.</p>
            <button type="button" onClick={notOkPartnerMic}>
                Click here to ask for another recording.
            </button>
        </div>
        );
    }
    if (partnerReady && micCheck && participantRole === 'speaker'){
        return(<div className="PartnerSync-box">
            <button type='button' onClick={() => {initiateTrial(blockId, trialId, participantRole)}}>
                Click to start the trial
            </button>
        </div>
        );
    } else {
        return(<div className="PartnerSync-box">
            <p>Waiting on your partner, stay put!</p>
        </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        havePartner: state.partnerInfo.peerId,
        micCheck: state.partnerInfo.micCheck,
        micTestFile: state.partnerInfo.micTestFile,
        readyToStart: state.selfInfo.readyToStart,
        partnerReady: state.partnerInfo.readyToStart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        okPartnerMic: () => {
            dispatch(workingPartnerMic())
        },
        notOkPartnerMic: () => {
            //dispatch(requestNewRecording())
        },
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
