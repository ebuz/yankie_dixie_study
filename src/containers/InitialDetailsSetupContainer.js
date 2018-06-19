import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gotWorkerId, gotTurkSubmitTo, gotListId } from '../actions';

import './InitialDetailsSetupContainer.css';
import './SurveyQuestionContainer.css';

class InitialDetailsSetup extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        //validate?
        this.props.handleOnChange(this.workerId.value, this.listId.value, this.turkSubmitTo.value);
    }

    render(){
        if(this.props.assignmentId !== '' || (this.props.workerId !== '' && this.props.listId !== '' && this.props.turkSubmitTo !== '')){
            return null
        }
        return(
            <div className="InitialSetup-Box">
                <form onSubmit={this.handleSubmit} >
                    <div className="InputQuestion-box">
                        <label>
                            Participant ID:
                            <input type="text" placeholder="A unique ID"
                                defaultValue={this.props.workerId ? this.props.workerId : ""}
                                required={true}
                                ref={workerId => this.workerId = workerId}/>
                        </label>
                    </div>
                    <br />
                    <div className="SelectQuestion-box">
                        <label>
                            List:
                            <select name="listId" defaultValue={this.props.listId}
                                required={true}
                                ref={listId => this.listId = listId} >
                                {this.props.availableLists.map((item, _) => {
                                    return (
                                        <option key={item} value={item}>{item}</option>
                                    )
                                })
                                }
                            </select>
                        </label>
                    </div>
                    <br />
                    <div className="InputQuestion-box">
                        <label>
                            Submit URL:
                            <input type="text"
                                defaultValue={this.props.turkSubmitTo ? this.props.turkSubmitTo : "/submitassignment"}
                                required={true}
                                ref={turkSubmitTo => this.turkSubmitTo = turkSubmitTo}/>
                        </label>
                    </div>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        assignmentId: state.mturkInfo.assignmentId,
        workerId: state.mturkInfo.workerId,
        listId: state.mturkInfo.listId,
        turkSubmitTo: state.mturkInfo.turkSubmitTo,
        availableLists: Array.from({length: state.experimentalLists.length},
            (_, i) => i),
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleOnChange: (workerId, listId, turkSubmitTo) => {
            dispatch(gotWorkerId(workerId));
            dispatch(gotListId(listId));
            dispatch(gotTurkSubmitTo(turkSubmitTo));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InitialDetailsSetup);
