import React from 'react';
import { connect } from 'react-redux';
import { updateQuestionValue } from '../actions';

const SurveyQuestion = ({pageId, questionId, question, handleOnChange, handleOnChangeMultiple}) => {
    let questionDiv = <div />;
    let {element, name, label, ...subparts} = question;
    switch (element){
        case 'select':
            questionDiv =
                <div className="SelectQuestion-box">
                    <label htmlFor={name}>{label}</label><br />
                    <select name={name} multiple={subparts.multiple}
                        value={subparts.value}
                        onChange={subparts.multiple ? handleOnChangeMultiple : handleOnChange}>
                        {subparts.options.map((item, i) => {
                            return (
                                <option key={i} value={item}
                                >{item}</option>
                            )
                        })
                        }
                    </select>
                </div>
            break;
        case 'input':
            questionDiv =
                <div className="InputQuestion-box">
                    <label htmlFor={name}>{label}</label><br />
                    <input {...subparts} onChange={handleOnChange}/>
                </div>
            break;
        case 'textarea':
            questionDiv =
                <div className="TextareaQuestion-box">
                    <label htmlFor={name}>{label}</label><br />
                    <textarea {...subparts} onChange={handleOnChange}/>
                </div>
            break;
        default:
            questionDiv = <div />;
    }
    return(questionDiv);
}

const mapStateToProps = (state, ownProps) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleOnChange: (event) => {
            dispatch(
                updateQuestionValue(ownProps.pageId, ownProps.questionId,
                    event.target.value));
        },
        handleOnChangeMultiple: (event) => {
            dispatch(
                updateQuestionValue(ownProps.pageId, ownProps.questionId,
                    [...event.target.options].filter(({selected}) => selected).map(({value}) => value)));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SurveyQuestion);
