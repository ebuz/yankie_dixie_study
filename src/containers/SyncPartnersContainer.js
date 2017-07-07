import React, { Component } from 'react';
import { connect } from 'react-redux';
import { workingPartnerMic, readyToStart, startTrial, waitOnPartnerToStartTrial, partnerReady } from '../actions';

class SyncPartners extends Component {
    componentWillReceiveProps(nextProps) {
        if(nextProps.trialStarted || !nextProps.havePartner || !nextProps.micCheck || nextProps.participantRole === 'partner'){
            return;
        }
        if(!this.props.partnerReady){
            this.props.getPartnerReady();
        }
    }
    render() {
        if(this.props.trialStarted){
            return null;
        }
        if(this.props.havePartner){
            if(!this.props.micCheck){
                return(<div className="PartnerSync-box">
                    <p>We found you a partner!</p>
                    <p>We need you to check if you can hear them. Below is their recording (if it doesn't start playing automatically press the play button).</p>
                    <audio src={this.props.micTestFile} controls="controls" autoPlay="autoplay" />
                    <button type="button" onClick={this.props.okPartnerMic}>
                        Click here if you can hear your partner
                    </button>
                    <p>If you can't hear your partner, check your speaker volume and then press the play button. If you still can't hear your partner we'll ask them to re-record themselves.</p>
                    <button type="button" onClick={this.props.notOkPartnerMic}>
                        Click here to ask for another recording
                    </button>
                </div>
                );
            }
            if(this.props.participantRole === 'speaker' && this.props.partnerReady){
                return(<div className="PartnerSync-box">
                    <button type='button' onClick={() => {this.props.initiateTrial(this.props.blockId, this.props.trialId, this.props.participantRole)}}>
                        Click to start the trial
                    </button>
                </div>
                );
            };
            if(!this.props.readyToStart){
                return(<div className="PartnerSync-box">
                    <button type='button' onClick={this.props.notifyPartner}>
                        Click to tell your partner you are ready
                    </button>
                </div>
                );
            }
            return(<div className="PartnerSync-box">
                <p>Waiting on your partner to start the trial, <span style={{fontWeight: "bold"}}>stay put</span>!</p>
            </div>
            );
        }
        return(<div className="PartnerSync-box">
            <p>We are looking for a partner for you. This may take a while. When one is found you'll get an alert.</p>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        trialStarted: state.trialBlocks[ownProps.blockId].trials[ownProps.trialId].displayed_pictures,
        havePartner: state.partnerInfo.peerId,
        micCheck: state.partnerInfo.micCheck,
        micTestFile: state.partnerInfo.micTestFile,
        readyToStart: state.selfInfo.readyToStart,
        partnerReady: state.partnerInfo.readyToStart
    }
};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        okPartnerMic: () => {
            dispatch(workingPartnerMic())
        },
        notOkPartnerMic: () => {
            //dispatch(requestNewRecording())
        },
        notifyPartner: () => {
            dispatch(readyToStart());
            if(ownProps.participantRole !== 'speaker'){
                console.log('simulate speaker trial initiation')
                dispatch(waitOnPartnerToStartTrial(ownProps.blockId,
                    ownProps.trialId));
            }
        },
        initiateTrial: () => {
            dispatch(readyToStart());
            dispatch(startTrial(ownProps.blockId, ownProps.trialId));
        },
        getPartnerReady: () => {
            setTimeout(() => {
                dispatch(partnerReady());
            }, 500 + getRandomInt(200, 2000));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SyncPartners);
