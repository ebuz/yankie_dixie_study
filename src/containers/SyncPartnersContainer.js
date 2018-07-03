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
        return(
            <div className="PartnerSync-box">
                <div className="Header">
                </div>
                <div className="Footer">
                    <button type='button' onClick={this.props.initiateTrial}
                        className="GreenButton CenterButton"
                    >
                        {this.props.participantRole === 'speaker' ? "I'm ready to make a message" : "I'm ready to sort pictures"}
                    </button>
                </div>
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
            if(ownProps.participantRole !== 'speaker'){
                dispatch(waitOnPartnerToStartTrial(ownProps.listId, ownProps.blockId,
                    ownProps.trialId));
            } else {
                dispatch(startTrial(ownProps.listId, ownProps.blockId, ownProps.trialId));
            }
        },
        getPartnerReady: () => {
            dispatch(partnerReady());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SyncPartners);
