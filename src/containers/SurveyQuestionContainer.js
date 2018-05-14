import React from 'react';
import { connect } from 'react-redux';
import { updateQuestionValue } from '../actions';
import './SurveyQuestionContainer.css';

const numberStringEqCheck = (v1, v2) => {
    return v1 === v2 || v1.toString() === v2 || v1 === v2.toString();
};

const SurveyQuestion = ({pageId, questionId, question, handleOnChange, handleOnChangeMultiple}) => {
    let questionDiv = <div />;
    let {questionType, name, label, ...subparts} = question;
    switch (questionType){
        case 'select':
            questionDiv =
                <div className="SelectQuestion-box">
                    <label htmlFor={name}>{label}</label><br />
                    <select name={name} multiple={subparts.multiple}
                        value={subparts.value}
                        onChange={subparts.multiple ? handleOnChangeMultiple : handleOnChange}>
                        {subparts.options.map((item, index) => {
                            return (
                                <option key={index} value={item}
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
        case 'likert':
            let likertRange = Array.from(new Array(subparts.range[1] - subparts.range[0] + 1),
                (v, i) => i + subparts.range[0]);
            questionDiv =
                <div className="LikertQuestion-box">
                    <label htmlFor={name}>{label}</label><br />
                    <ul className="LikertQuestion-list">
                        {likertRange.map((item, index) => {
                            return(
                                <li key={index} >
                                    <label>
                                        <input type='radio' name={name} value={item}
                                            checked={numberStringEqCheck(subparts.value, item)}
                                            onChange={handleOnChange}
                                        />
                                        {subparts.rangeLabels[index]}
                                    </label>
                                </li>
                            )
                        })
                        }
                    </ul>
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
