import React, { Component } from 'react';
import { connect } from 'react-redux';
import SetupContainer from './SetupContainer';
import TrialBlocksContainer from './TrialBlocksContainer';
import { gotMturkInfo } from '../actions';
import './App.css';

class App extends Component {
    componentDidMount() {
        this.props.parseMturkFields();
    }
    render() {
        if(!this.props.finishedStudy){
            return(
                <div className="Main-box">
                    <SetupContainer location={this.props.location} />
                    <TrialBlocksContainer location={this.props.location} />
                </div>
            )
        }
        return (
            <div>
                <p> You finished the study---thanks for participating! </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        finishedStudy: state.consent.consented &&
        state.instructions.finished_instructions &&
        state.trialBlocks.every((block) =>
            {return block.trials.every((trial) => {return trial.completed})})
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        parseMturkFields: () => {
            dispatch(gotMturkInfo(ownProps.location));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

