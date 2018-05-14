import React from 'react';
import { connect } from 'react-redux';
import { workingPartnerMic, requestNewPartnerMicTest, endEarly, finishTrials, finishSurvey, finishedDebrief, uploadAssignment } from '../actions';
import './FindPartnerContainer.css';

const FindPartner = ({finishedSetup, havePartner, micTestFile, micCheck, micCheckRedos, okPartnerMic, notOkPartnerMic, endStudyEarly}) => {
    if(!finishedSetup || micCheck){
        return null;
    }
    if(micCheckRedos >= 2){
        return(
            <div className="FindPartner-box">
                <p>You seem to be having technical issues that prevent you from hearing your partner. It is likely that you will have issues with other partners as well. We cannot troubleshoot problems like this while a study is running so we need to cut short your participation.</p>
                <button type="button" onClick={endStudyEarly}>
                    Click here to continue
                </button>
            </div>
        );
    }
    if(havePartner){
        if(micTestFile){
            return(<div className="FindPartner-box">
                {micCheckRedos > 0 ? '' : <p>We found you a partner!</p>}
                <p>We need you to check if you can hear your partner. Below is their microphone check recording (if it doesn't start playing automatically press the play button).</p>
                <audio src={micTestFile} controls="controls" autoPlay="autoplay" />
                <button type="button" onClick={okPartnerMic}>
                    Click here if you can hear your partner
                </button>
                <p>If you can't hear your partner, check your speaker volume and replay their recording. If you still can't hear your partner, click the button below to request a new recording from them.</p>
                <button type="button" onClick={notOkPartnerMic}>
                    Click here to ask for another recording
                </button>
            </div>
            );
        }
        return(
            <div className="FindPartner-box">
                {micCheckRedos > 0 ? '' : <p>We found you a partner!</p>}
                <p>Your partner is making a microphone check recording like the one you made earlier. When they are finished you will be asked to confirm you can hear it.</p>
            </div>
        );
    }
    return(
        <div className="FindPartner-box">
            <p>We are looking for a partner for you. This may take a while. When one is found you'll get an alert. You can switch to another tab or window but do not close this page.</p>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        finishedSetup: state.consent.consented && state.instructions.finished_instructions && state.selfInfo.micSelfCheck,
        havePartner: state.partnerInfo.peerId,
        micTestFile: state.partnerInfo.micTestFile,
        micCheck: state.partnerInfo.micCheck,
        micCheckRedos: state.partnerInfo.micCheckRedos,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        okPartnerMic: () => {
            dispatch(workingPartnerMic());
        },
        notOkPartnerMic: () => {
            dispatch(requestNewPartnerMicTest());
        },
        endStudyEarly: () =>{
            dispatch(endEarly('Failed to pass partner mic check.'));
            dispatch(finishSurvey());
            dispatch(finishTrials());
            dispatch(finishedDebrief());
            dispatch(uploadAssignment());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPartner);
