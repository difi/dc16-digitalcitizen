import React from 'react';
import {reduxForm} from 'redux-form';
import $ from 'jquery'

import NavigationButtons from './Components/NavigationButtons.js';

var ReactDOM = require('react-dom');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var FormControl = require('react-bootstrap/lib/FormControl');

import {fieldIsEmpty} from './Utilities/validation.js'


export class SpecialNeedsClass extends React.Component {
    //const {fields: {medical, changes, other}} = this.props;
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.saveFieldValues = this.saveFieldValues.bind(this);
        this.limitTextFields = this.limitTextFields.bind(this);
    }


    handleClickBack() {
        this.saveFieldValues();
        console.log("State 6");
        (this.props.previousStep(7));
    }

    handleClickNext() {
        this.saveFieldValues();
        console.log("State 9");
        this.props.nextStep(9);
    }


    saveFieldValues() {
        // Get values via this.refs
        const {fields: {medical, changes, other}} = this.props;

        var data = {
            medicalNeeds: medical.value,
            conditionChanges: changes.value,
            otherNeeds: other.value
        };
        return this.props.saveValues(data);
    }

    limitTextFields(e, field) {
        var changes =(e.target.value);
        var limitLines = 5;
        var newLines = changes.split("\n").length;
        var limitLength = 325;
        var totalLength = e.target.value.length
        console.log(totalLength);

        if (totalLength == 65) {
            changes += "\n"
        } else if (totalLength == 130) {
            changes += "\n"
        } else if (totalLength == 195) {
            changes += "\n"
        } else if (totalLength == 260) {
            changes += "\n"
        }
        console.log(changes);

        if ((newLines <= limitLines) && (totalLength <= limitLength)){
            field.onChange(changes.substring(0, 325));
        } else {
            if (newLines > limitLines) {
                var last = changes.lastIndexOf("\n");
                field.onChange(changes.substring(0, last));
            } else {
                field.onChange(changes.substring(0, 325));
            }
        }
    }

    render() {
        const {fields: {medical, changes, other}} = this.props;
        var valid = changes.value;

        return (
            <div>
                <label className="form-header">Utfyllende informasjon  </label>
                <div className="form-container">
                    <Row className="form-row-special">
                        <Col sm={12} md={12}>
                            <label className="from-col-address"> Hva er grunnen til at det søkes om plass på sykehjem? </label>
                        </Col>
                        <Col sm={12} md={12}>
                            <FormControl componentClass="textarea" className="special-needs-textarea" id="mandatoryField"
                                         ref="conditionChanges" {...changes} onChange={event => this.limitTextFields(event, changes)}/>
                            {changes.touched && changes.error && <div className="error">{changes.error}</div>}
                        </Col>
                    </Row>
                    <Row className="form-row-special">
                        <Col sm={12} md={12}>
                            <label className="from-col-address"> Er det noen medisinske behov vi burde vite om?</label>
                        </Col>
                        <Col sm={12} md={12}>
                            <FormControl componentClass="textarea" className="special-needs-textarea"
                                         ref="medicalNeeds" {...medical} onChange={event => this.limitTextFields(event, medical)}/>
                        </Col>
                    </Row>
                    <Row className="form-row-special">
                        <Col sm={12} md={12}>
                            <label className="from-col-address">Er det andre behov vi burde vite om? (Behov for tolk,
                                hørselapparat e.l) </label>
                        </Col>
                        <Col sm={12} md={12}>
                            <FormControl componentClass="textarea" className="special-needs-textarea"
                                         ref="otherNeeds" {...other} onChange={event => this.limitTextFields(event, other)}/>
                        </Col>
                    </Row>
                </div>
                
                <NavigationButtons
                    disabled={!valid}
                    handleClickBack={this.handleClickBack}
                    handleClickNext={this.handleClickNext}
                />

            </div>
        );
    }
}
SpecialNeedsClass.propTypes = {
    fieldValues: React.PropTypes.object.isRequired,
    previousStep: React.PropTypes.func.isRequired,
    nextStep:  React.PropTypes.func.isRequired,
    saveValues:  React.PropTypes.func.isRequired,
};


//Validation for form
const validate = values => {
    const errors = {};

    if (fieldIsEmpty(values.changes)) {
        errors.changes = "Dette feltet må fylles ut. ";
    }
    return errors;
};

const SpecialNeeds = reduxForm({
    form: 'application',
    fields: ["medical", "changes", "other"],
    destroyOnUnmount: false,
    validate

}, null, null)(SpecialNeedsClass);

export default SpecialNeeds