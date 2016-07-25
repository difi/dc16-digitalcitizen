import React from 'react';
import {reduxForm} from 'redux-form';
import $ from 'jquery'

import RESTpaths from '../static_data/RESTpaths.js';
import NavigationButtons from './Components/NavigationButtons.js';
import TypeAhead from '../../node_modules/react-bootstrap-typeahead/lib/Typeahead.react.js';

import {onlyLettersInString} from './Utilities/validation.js';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var FormControl = require('react-bootstrap/lib/FormControl');
var Alert = require('react-bootstrap/lib/Alert');

var valid = null;
var content = null;
var clickNextButton = false;
export var alertMessage = false;

export class GeneralPractitionerClass extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.getPractitionersByMunicipality = this.getPractitionersByMunicipality.bind(this);
        this.getPractitionersByMunicipality(this.props.fields.municipality.value);
    }

    handleClickBack() {
        console.log("State 4");
        this.props.previousStep(4);
    }

    handleClickNext() {
        const {fields: {doctorName, doctors}} = this.props;
        valid = doctorName.value;

        if ((valid == undefined || !valid)) {
            clickNextButton = true;
            this.forceUpdate();

        } else {
            this.saveFieldValues();
            console.log("State 6");
            this.props.nextStep(6);
        }
        }



    getPractitionersByMunicipality(municipality) {
        $.ajax({
            url: RESTpaths.PATHS.DOCTORS_BASE + '?loc=' + municipality,
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
                this.props.fields.doctors.onChange(data);
                this.forceUpdate();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        const {fields: {doctorName, doctors}} = this.props;
        valid = doctorName.value;

        if (clickNextButton && (valid == undefined || !valid)) {
            content =
                <componentClass>
                    <div className="alertClass_Fdfs">
                        <Alert bsStyle="danger">
                            Vennligst fyll in fastlege, før du kan gå videre.
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
            <componentClass>
                <label className="form-header">Velg søkers fastlege</label>
                <div className="form-container">
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label className="genPract">Fastlege</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormGroup validationState={(doctorName.touched || alertMessage) ? "error" : ""}>
                                <TypeAhead options={doctors.value ? doctors.value : [{name: " "}]} ref="doctorSelect"
                                           labelKey="name"
                                           selected={doctorName.value? [{name: doctorName.value}]: []}
                                           textValue={onlyLettersInString}
                                           onInputChange={value=> doctorName.onChange(value)}
                                />
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
            </componentClass>
        );
    }
}
GeneralPractitionerClass.propTypes = {
    fieldValues: React.PropTypes.object.isRequired,
    previousStep: React.PropTypes.func.isRequired,
    nextStep:  React.PropTypes.func.isRequired
};

const GeneralPractitioner = reduxForm({
    form: 'application',
    fields: ["doctorName", "doctors", "municipality"],
    destroyOnUnmount: false
})(GeneralPractitionerClass);

export default GeneralPractitioner
