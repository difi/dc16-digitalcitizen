/**
 * Created by camp-cha on 24.06.2016.
 */

import React from 'react';
import {reduxForm} from 'redux-form';

import AddressField from './Components/AddressField.js';
import NavigationButtons from './Components/NavigationButtons.js';

import {checkPhoneNumber} from'./Utilities/validation.js';
import {validPostCode} from'./Utilities/validation.js';
import {fieldIsEmpty} from './Utilities/validation.js';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Button = require('react-bootstrap/lib/Button');
var Alert = require('react-bootstrap/lib/Alert');

var content = null;
var clickNextButton = false;
export var alertMessage = false;

export class PersonWithNeedInfoClass extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }
    
    handleClickBack() {
        console.log("State 3");
        this.props.previousStep(3);
    }
    
    handleClickNext() {
        const {fields: {name, number, street, zipcode, postal, municipality}} = this.props;
        var valid = name.value && !name.error && street.value && !street.error && zipcode.value && !zipcode.error && number.value && !number.error;

        if ((valid == undefined || !valid)) {
            clickNextButton = true;
            this.forceUpdate();

        } else {
            console.log("State 5");
            this.props.nextStep(5);
        }
    }

    render() {
        const {fields: {name, number, street, zipcode, postal}} = this.props;
        var valid = name.value && !name.error && street.value && !street.error && zipcode.value && !zipcode.error && number.value && !number.error;

        if (clickNextButton && (valid == undefined || !valid)) {

            var errorMessage = <p>Vennligst fyll inn <b><i>{name.error}</i></b><b><i>{street.error}</i></b><b><i>{zipcode.error}</i></b><b><i>{number.error}</i></b>før du kan gå videre.</p>;

            content =
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
                content = null;
                alertMessage = false;
            }
        }

        return (
            <form>
                <div>
                    <label className="form-header">Informasjon om søker</label>
                    <div className="form-container">
                        <Row className="form-row">
                            <Col sm={4} md={4}>
                                <label className="name" id="name">Navn</label>
                            </Col>
                            <Col sm={8} md={8}>
                                <FormGroup validationState={name.error && (name.touched || alertMessage) ? "error" : ""}>
                                    <FormControl
                                        type="text"
                                        className="nameField"
                                        ref="name"
                                        placeholder="Navn"
                                        {...name}/>
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col sm={4} md={4}>
                                <label className="adr" id="adr">Folkeregistrert adresse</label>
                            </Col>
                            <Col sm={8} md={8}>
                                <AddressField store={this.props.store} className="adr" ref='addressfield'
                                              
                                              includeCountry={false}/>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col sm={4} md={4}>
                                <label className="tlf" id="tlf">Telefon</label>
                            </Col>
                            <Col sm={8} md={8}>
                                <FormGroup validationState={number.error && (number.touched || alertMessage) ? "error" : ""}>
                                    <FormControl
                                        type="numeric"
                                        className="tlfFrom"
                                        ref="phone"
                                        placeholder="Telefonnr"
                                        {...number}
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </Row>
                        {content}
                    </div>

                    <NavigationButtons
                        handleClickBack={this.handleClickBack}
                        handleClickNext={this.handleClickNext}
                        buttonDisabled={!valid}
                    />
                </div>
            </form>
        )
    }
};

PersonWithNeedInfoClass.propTypes = {
    previousStep: React.PropTypes.func.isRequired,
    nextStep: React.PropTypes.func.isRequired
};

//Validation for form
const validate = values => {
    const errors = {};

    if (fieldIsEmpty(values.name)) {
        errors.name = "et navn, ";
    }
    if (fieldIsEmpty(values.street)) {
        errors.street = "en adresse, ";
    }
    if (values.postal == "Ugyldig postnr.") {
        errors.zipcode = "et fire siffret postnummer, ";
    }
    if (!validPostCode(values.zipcode)) {
        errors.zipcode = "et fire siffret postnummer, ";
    }
    if (!(checkPhoneNumber(values.number))) {
        errors.number = "et åtte siffret telefonnummer, ";
    }
    return errors;
};

//Sets up reduxForm - needs fields and validation functions
const PersonWithNeedInfo = reduxForm({
    form: 'application',
    fields: ["name", "number", "street", "zipcode", "postal", "municipality" ],
    destroyOnUnmount: false,
    validate
}, null, null)(PersonWithNeedInfoClass);

export default PersonWithNeedInfo
