/**
 * Created by camp-cha on 24.06.2016.
 */

import React from 'react';

import AddressField from './AddressField.jsx';
import NavigationButtons from './NavigationButtons.jsx';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');
import {checkPhoneNumber} from'./validation.js';
import {reduxForm} from 'redux-form';
import {onlyLettersInString} from "./validation.js";
import {onlyDigitsInString} from './validation.js'
import {alphaNumericInString} from './validation.js'


export class PersonWithNeedInfoClass extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.saveFieldValues = this.saveFieldValues.bind(this);
    }

    handleClickBack() {
        console.log("State 3");
        this.saveFieldValues();
        this.props.previousStep(3);
    }

    handleClickNext() {

        console.log("State 5");
        this.saveFieldValues();
        this.props.nextStep(5);

    }

    saveFieldValues() {
        // Get values via this.refs
        const {fields: {name, number, street, zipcode, postal, municipality}} = this.props;
        var address = {
            street: street.value,
            zipcode: zipcode.value,
            postal: postal.value,
            municipality: municipality.value,
            country: "NO"
        };
        var data = {
            person: {
                pnr: this.props.fieldValues.person.pnr,
                name: ReactDOM.findDOMNode(this.refs.name).value,
                address: address,
                telephone: ReactDOM.findDOMNode(this.refs.phone).value
            }
        };
        this.props.saveValues(data);
        console.log(data);
    }


    render() {
        const {fields: {name, number, street, zipcode}} = this.props;
        var valid = name.value && number.value && street.value && zipcode.value && !number.error;
        console.log(valid);
        return (
            <form>
                <div>
                    <label className="form-header">Informasjon om person med behov</label>
                    <div className="form-container">
                        <Row className="form-row">
                            <Col sm={4} md={4}>
                                <label className="name">Navn</label>
                            </Col>
                            <Col sm={8} md={8}>
                                <FormControl
                                    type="text"
                                    className="name"
                                    ref="name"
                                    placeholder="Navn"

                                    {...name}/>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col sm={4} md={4}>
                                <label className="adr">Folkeregistrert adresse</label>
                            </Col>
                            <Col sm={8} md={8}>
                                <AddressField className="adr" ref='addressfield' address={this.props.fieldValues.person.address}
                                              includeCountry={false}/>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col sm={4} md={4}>
                                <label className="tlf">Telefon</label>
                            </Col>
                            <Col sm={8} md={8}>
                                <FormControl
                                    type="numeric"
                                    className="tlf"
                                    ref="phone"
                                    placeholder="Telefonnr"
                                    {...number}

                                />

                                {number.touched && number.error && <div>{number.error}</div>}
                            </Col>
                        </Row>
                    </div>

                    <NavigationButtons
                        handleClickBack={this.handleClickBack}
                        handleClickNext={this.handleClickNext}
                        disabled={!valid}
                    />

                </div>
            </form>
        )
    }
}
;


//Validation for form
const validate = values => {
    const errors = {};

    if (!(checkPhoneNumber(values.number))) {
        errors.number = "Dette er ikke et gyldig telefonnummer";
    }
    return errors;
}

//Sets up reduxForm - needs fields and validation functions
const PersonWithNeedInfo = reduxForm({
    form: 'application',
    fields: ["name", "number", "street", "zipcode", "postal", "municipality"],
    destroyOnUnmount: false,
    validate
}, null, null)(PersonWithNeedInfoClass);

export default PersonWithNeedInfo
