/**
 * Created by camp-cha on 24.06.2016.
 */

import React from 'react';

import AddressField from './Components/AddressField.js';
import NavigationButtons from './Components/NavigationButtons.js';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');
import {checkPhoneNumber} from'./Utilities/validation.js';
import {validPostCode} from'./Utilities/validation.js';
import {fieldIsEmpty} from './Utilities/validation.js';

import {reduxForm} from 'redux-form';

var Collapse = require('react-bootstrap/lib/Collapse');
var Alert = require('react-bootstrap/lib/Alert');


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
        const {fields: {name, number, street, zipcode, postal}} = this.props;
        console.log(postal.placeholder);
        var valid = name.value && number.value && street.value && zipcode.value && !number.error && (postal.value != "Ugyldig postnr") && (validPostCode(zipcode.value));
        console.log(this.props.fieldValues.person);
        return (
            <form>
                <div>
                    <label className="form-header">Informasjon om søker</label>
                    <div className="form-container">
                        <Row className="form-row">
                            <Col sm={4} md={4}>
                                <label className="name">Navn</label>
                            </Col>
                            <Col sm={8} md={8}>
                                <FormGroup validationState={name.error ? "error" : ""}>
                                    <FormControl
                                        type="text"
                                        className="name"
                                        ref="name"
                                        placeholder="Navn"

                                        {...name}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col sm={4} md={4}>
                                <label className="adr">Folkeregistrert adresse</label>
                            </Col>
                            <Col sm={8} md={8}>
                                <AddressField store={this.props.store} className="adr" ref='addressfield'
                                              address={this.props.fieldValues.person.address}
                                              includeCountry={false}/>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col sm={4} md={4}>
                                <label className="tlf">Telefon</label>
                            </Col>
                            <Col sm={8} md={8}>
                                <FormGroup validationState={number.error ? "error" : ""}>
                                    <FormControl
                                        type="numeric"
                                        className="tlfFrom"
                                        ref="phone"
                                        placeholder="Telefonnr"
                                        {...number}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Collapse in={ name.error || street.error || zipcode.error || number.error}>
                            <div>
                                <Alert bsStyle="danger">
                                    Du må fylle inn markerte felt, før du kan gå videre.
                                </Alert>
                            </div>
                        </Collapse>

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
PersonWithNeedInfoClass.propTypes = {
    fieldValues: React.PropTypes.object.isRequired,
    previousStep: React.PropTypes.func.isRequired,
    nextStep: React.PropTypes.func.isRequired,
    saveValues: React.PropTypes.func.isRequired,
};


//Validation for form
const validate = values => {
    const errors = {};

    if(fieldIsEmpty(values.name)){
        console.log(values.name);
        errors.name = "Ugyldig navn.";
    }

    if(fieldIsEmpty(values.street)){
        errors.street = "Ugyldig adresse";
    }

    if(values.postal == "Ugyldig postnr."){
        errors.zipcode = "Dette er ikke et gyldig postnummer";
    }
    if(!validPostCode(values.zipcode)){
        errors.zipcode = "Dette er ikke et gyldig postnummer";
    }

    if (!(checkPhoneNumber(values.number))) {
        console.log(values.number);
        errors.number = "Dette er ikke et gyldig telefonnummer";
    }

    return errors;
};

//Sets up reduxForm - needs fields and validation functions
const PersonWithNeedInfo = reduxForm({
    form: 'application',
    fields: ["name", "number", "street", "zipcode", "postal", "municipality"],
    destroyOnUnmount: false,
    validate
}, null, null)(PersonWithNeedInfoClass);

export default PersonWithNeedInfo


/*number.touched && number.error ||
 zipcode.touched && zipcode.error
* || name.touched && fieldIsEmpty(name.value)
*
*
* || (values.postal != "Ugyldig postnr.")*/