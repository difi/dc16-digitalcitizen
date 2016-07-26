import React from 'react';
import {reduxForm} from 'redux-form';

import NavigationButtons from './Components/NavigationButtons.js';

import {fieldIsEmpty} from './Utilities/validation.js'

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Alert = require('react-bootstrap/lib/Alert');

var content = null;
var clickNextButton = false;
export var alertMessage = false;

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
        const {fields: {medical, changes, other}} = this.props;
        var valid = changes.value && !changes.error;

        if ((valid == undefined || !valid)) {
            clickNextButton = true;
            this.forceUpdate();

        } else {
            this.saveFieldValues();
            console.log("State 9");
            this.props.nextStep(9);
        }

    }

    saveFieldValues() {
        // Get values via this.refs
        const {fields: {medical, changes, other}} = this.props;

        var med = medical.value;
        var cha = changes.value;
        var oth = other.value;

        if (medical.value) {
            med = med.replace(/[\n]/g, '. ');
        }
        if (changes.value) {
            cha = cha.replace(/[\n]/g, '. ');
        }
        if (other.value) {
            oth = oth.replace(/[\n]/g, '. ');
        }

        var data = {
            medicalNeeds: med,
            conditionChanges: cha,
            otherNeeds: oth
        };
     
    }

    limitTextFields(e, field) {
        var changes = (e.target.value);
        var limitLength = 300;
        var totalLength = changes.length;

        if ((totalLength <= limitLength)) {
            field.onChange(changes.substring(0, limitLength));
        }
    }

    render() {
        const {fields: {medical, changes, other}} = this.props;
        var valid = changes.value && !changes.error;

        if (clickNextButton && (valid == undefined || !valid)) {

            var errorMessage = document.getElementById('changesLabel').innerHTML;

            content =
                <componentClass>
                    <div className="alertClass_Fdfs">
                        <Alert bsStyle="danger">
                            Vennligst svar på spørsmålet <b><i>{errorMessage}</i></b>, før du kan gå videre.
                        </Alert>
                    </div>
                </componentClass>;
            clickNextButton = false;
            alertMessage = true;
        } else {
            if (valid) {
                content = null;
                alertMessage = false;
            }
        }

        return (
            <div>
                <label className="form-header">Utfyllende informasjon </label>
                <div className="form-container">
                    <Row className="form-row-special">
                        <Col sm={12} md={12}>
                            <label className="from-col-address" id="changesLabel">Hva er grunnen til at det søkes om
                                plass på sykehjem?</label>
                        </Col>
                        <Col sm={12} md={12}>
                            <FormGroup
                                validationState={changes.error && (changes.touched || alertMessage)  ? "error" : ""}>
                                <FormControl componentClass="textarea" className="special-needs-textarea"
                                             id="mandatoryField"
                                             ref="conditionChanges" {...changes}
                                             onChange={event => this.limitTextFields(event, changes)}/>
                                <FormControl.Feedback />
                            </FormGroup>
                        </Col>
                        <p className="info-label">{changes.value ? changes.value.length : 0}/300</p>
                    </Row>
                    <Row className="form-row-special">
                        <Col sm={12} md={12}>
                            <label className="from-col-address">Er det noen medisinske behov vi burde vite om?</label>
                        </Col>
                        <Col sm={12} md={12}>
                            <FormControl componentClass="textarea" className="special-needs-textarea"
                                         ref="medicalNeeds" {...medical}
                                         onChange={event => this.limitTextFields(event, medical)}/>
                        </Col>
                    </Row>
                    <Row className="form-row-special">
                        <p className="info-label">{medical.value ? medical.value.length : 0}/300</p>
                    </Row>
                    <Row className="form-row-special">
                        <Col sm={12} md={12}>
                            <label className="from-col-address">Er det andre behov vi burde vite om? -Behov for tolk,
                                hørselapparat e.l.</label>
                        </Col>
                        <Col sm={12} md={12}>
                            <FormControl componentClass="textarea" className="special-needs-textarea"
                                         ref="otherNeeds" {...other}
                                         onChange={event => this.limitTextFields(event, other)}/>
                        </Col>
                    </Row>
                    <Row className="form-row-special">
                        <p className="info-label">{other.value ? other.value.length : 0}/300</p>
                    </Row>
                    {content}
                </div>

                <NavigationButtons
                    handleClickBack={this.handleClickBack}
                    handleClickNext={this.handleClickNext}
                    buttonDisabled={!valid}
                />

            </div>
        );
    }
}
SpecialNeedsClass.propTypes = {
    previousStep: React.PropTypes.func.isRequired,
    nextStep:  React.PropTypes.func.isRequired
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