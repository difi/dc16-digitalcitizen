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

var alertContent = null;
var clickNextButton = false;
export var alertMessage = false;
export const fields = [
    "medical",
    "changes",
    "other"
];

export class SpecialNeedsClass extends React.Component {
    //const {fields: {medical, changes, other}} = this.props;
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.limitTextFields = this.limitTextFields.bind(this);
    }

    handleClickBack() {
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
            console.log("State 9");
            this.props.nextStep(9);
        }

    }

    limitTextFields(e, field) {
        var changes = (e.target.value);
        var limitLength = 300;
        var totalLength = changes.length;

        if ((totalLength <= limitLength)) {
            field.onChange(changes.substring(0, limitLength));
        }
    }

    changeLimitColor(value) {
        if (value) {
            return value.length >= 250 ? {color: "#F38630"} : {color: "black"}
        }
    }

    render() {
        const {fields: {medical, changes, other}} = this.props;
        var valid = changes.value && !changes.error;

        if (clickNextButton && (valid == undefined || !valid)) {

            var errorMessage = <p>Vennligst svar på <b><i>{changes.error}</i></b>, før du går videre.</p>;

            alertContent =
                <componentClass>
                    <div className="error">
                        <Alert bsStyle="danger">
                            {errorMessage}
                        </Alert>
                    </div>
                </componentClass>;
            clickNextButton = false;
            alertMessage = true;
        } else {
            if (valid) {
                alertContent = null;
                alertMessage = false;
            }
        }

        return (
            <div>
                <label htmlFor="specialNeeds" className="form-header">Utfyllende informasjon </label>
                <div id="specialNeeds" className="form-container">
                    <Row className="form-row-special">
                        <Col sm={12} md={12}>
                            <label htmlFor="mandatoryField" className="from-col-address" id="changesLabel">Hva er grunnen til at det søkes om
                                plass på sykehjem?</label>
                        </Col>
                        <Col sm={12} md={12}>
                            <FormGroup
                                validationState={changes.error && (changes.touched || alertMessage) ? "error" : ""}>
                                <FormControl componentClass="textarea" className="special-needs-textarea"
                                             id="mandatoryField"
                                             ref="conditionChanges" {...changes}
                                             onChange={event => this.limitTextFields(event, changes)}/>
                                <FormControl.Feedback/>
                            </FormGroup>
                        </Col>
                        <p className="info-label" style={this.changeLimitColor(changes.value)}>
                            {changes.value ? changes.value.length : 0}/300
                        </p>
                    </Row>
                    <Row className="form-row-special">
                        <Col sm={12} md={12}>
                            <label htmlFor="medicalNeeds" className="from-col-address">Er det noen medisinske behov vi burde vite om?</label>
                        </Col>
                        <Col sm={12} md={12}>
                            <FormControl componentClass="textarea" className="special-needs-textarea"
                                         id="medicalNeeds"
                                         ref="medicalNeeds" {...medical}
                                         onChange={event => this.limitTextFields(event, medical)}/>
                        </Col>
                    </Row>
                    <Row className="form-row-special">
                        <p className="info-label" style={this.changeLimitColor(medical.value)}>
                            {medical.value ? medical.value.length : 0}/300
                        </p>
                    </Row>
                    <Row className="form-row-special">
                        <Col sm={12} md={12}>
                            <label htmlFor="otherNeeds" className="from-col-address">Er det andre behov vi burde vite om? -Behov for tolk,
                                hørselapparat e.l.</label>
                        </Col>
                        <Col sm={12} md={12}>
                            <FormControl componentClass="textarea" className="special-needs-textarea" id="otherNeeds"
                                         ref="otherNeeds" {...other}
                                         onChange={event => this.limitTextFields(event, other)}/>
                        </Col>
                    </Row>
                    <Row className="form-row-special">
                        <p className="info-label"  style={this.changeLimitColor(other.value)}>
                            {other.value ? other.value.length : 0}/300
                        </p>
                    </Row>
                    {alertContent}
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
    nextStep: React.PropTypes.func.isRequired
};

/**
 * Validation for form
 */
const validate = values => {
    const errors = {};

    if (fieldIsEmpty(values.changes)) {
        errors.changes = "hva som er grunnen til at det søkes om plass på sykehjem";
    }
    return errors;
};

/**
 * Sets up reduxForm - needs fields and validation functions
 */
const SpecialNeeds = reduxForm({
    form: 'application',
    fields: fields,
    destroyOnUnmount: false,
    validate
}, null, null)(SpecialNeedsClass);

export default SpecialNeeds