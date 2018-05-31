import React, { Component } from 'react';
import { connect } from 'react-redux';
import { workingPartnerMic, readyToStart, startTrial, waitOnPartnerToStartTrial, partnerReady } from '../actions';
import './SyncPartnersContainer.css';

class SyncPartners extends Component {
    componentWillReceiveProps(nextProps) {
        if(nextProps.trialStarted || !nextProps.havePartner || !nextProps.micCheck || nextProps.participantRole === 'partner'){
            return;
        }
        if(!this.props.partnerReady){
            //simulate partner pressing 'ready' buton
            this.props.getPartnerReady();
        }
    }
    render() {
        if(!this.props.micCheck || this.props.trialStarted){
            return null;
        }
        if(this.props.participantRole === 'speaker' && this.props.partnerReady){
            return(
                <div className="PartnerSync-box">
                    <button type='button' onClick={() => {this.props.initiateTrial(this.props.listId, this.props.blockId, this.props.trialId, this.props.participantRole)}}>
                        You are the director this turn. Click to start the trial
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
        return(
            <div className="PartnerSync-box">
                <p>Waiting on your partner to start the trial, <span style={{fontWeight: "bold"}}>stay put</span>!</p>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        trialStarted: state.experimentalLists[ownProps.listId][ownProps.blockId].trials[ownProps.trialId].displayed_pictures,
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
                dispatch(waitOnPartnerToStartTrial(ownProps.listId, ownProps.blockId,
                    ownProps.trialId));
            }
        },
        initiateTrial: () => {
            dispatch(readyToStart());
            dispatch(startTrial(ownProps.listId, ownProps.blockId, ownProps.trialId));
        },
        getPartnerReady: () => {
            setTimeout(() => {
                dispatch(partnerReady());
            }, 500 + getRandomInt(200, 2000));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SyncPartners);
