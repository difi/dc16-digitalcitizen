import React from 'react';
import {reduxForm} from 'redux-form';
import $ from 'jquery'

import RESTpaths from '../static_data/RESTpaths.js';
import NavigationButtons from './Components/NavigationButtons.js';
import TypeAhead from '../../node_modules/react-bootstrap-typeahead/lib/Typeahead.react.js';

import {onlyLettersInString} from './Utilities/validation.js';
import {fieldIsEmpty} from './Utilities/validation.js';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var FormControl = require('react-bootstrap/lib/FormControl');
var Alert = require('react-bootstrap/lib/Alert');

var alertContent = null;
var clickNextButton = false;
export var alertMessage = false;
export const fields = [
    'doctorName',
    'doctors',
    'municipality'
];

export class GeneralPractitionerClass extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.getPractitionersByMunicipality = this.getPractitionersByMunicipality.bind(this);
        this.getPractitionersByMunicipality(this.props.fields.municipality.value);
    }

    /**
     * Handle the click on the back-button
     */
    handleClickBack() {
        console.log("State 4");
        this.props.previousStep(4);
    }

    /**
     * Handle the click on the next-button
     */
    handleClickNext() {
        const {fields: {doctorName, doctors}} = this.props;
        var valid = doctorName.value;

        if ((valid == undefined || !valid)) {
            clickNextButton = true;
            this.forceUpdate();
        } else {
            console.log("State 6");
            this.props.nextStep(6);
        }
    }

    /**
     * @param municipality
     * Loads the doctors located in the municipality from the server
     * Adds the doctors to the TypeAhead-component
     */
    getPractitionersByMunicipality(municipality){
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
        var valid = doctorName.value;
        if (clickNextButton && (valid == undefined || !valid)) {
            var errorMessage = <p>Vennligst fyll inn <b><i>fastlege</i></b>, før du går videre.</p>
            alertContent =
                <componentClass>
                    <div className="alertClass_Fdfs">
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
            <componentClass>
                <label htmlFor="genPract" className="form-header">Velg søkers fastlege</label>
                <div id="genPract" className="form-container">
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label htmlFor="practitioner" className="genPract" id="generalPract">Fastlege</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormGroup id="practitioner" validationState={(doctorName.touched || alertMessage) ? "error" : ""}>
                                <TypeAhead
                                    options={doctors.value ? doctors.value : [{name: " "}]}
                                    ref="doctorSelect"
                                    labelKey="name"
                                    selected={doctorName.value ? [{name: doctorName.value}] : []}
                                    textReducer={onlyLettersInString}
                                    onInputChange={value=> doctorName.onChange(value)}
                                    aria-labelledby="generalPract"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    {alertContent}
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
    nextStep: React.PropTypes.func.isRequired
};

/**
 * Sets up reduxForm - needs fields and validation functions
 */
const GeneralPractitioner = reduxForm({
    form: 'application',
    fields: fields,
    destroyOnUnmount: false
})(GeneralPractitionerClass);

export default GeneralPractitioner

