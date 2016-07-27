/* Created by camp-cha on 24.06.2016. */

import React from 'react';
import {reduxForm} from 'redux-form';
import {getValues} from 'redux-form';
import $ from 'jquery';

import RESTpaths from '../static_data/RESTpaths.js';
import NavigationButtons from './Components/NavigationButtons.js';

import {checkPersonalnumberNo} from'./Utilities/validation.js';
import {fieldIsEmpty} from './Utilities/validation.js';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var HelpBlock = require('react-bootstrap/lib/HelpBlock');
var Button = require('react-bootstrap/lib/Button');
var Alert = require('react-bootstrap/lib/Alert');

var alertContent = null;
var clickNextButton = false;
var alertMessage = false;
var nameContent = null;
var pnrContent = null;
var checked = false;

export class PersonWithNeedClass extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.savePerson = this.savePerson.bind(this);
  
    }

    handleClickBack() {
        console.log("State 2");
        (this.props.previousStep(2));
    }

    handleClickNext() {
        const {asyncValidating, fields: {pnr, checked, name}} = this.props;
        var valid = (name.value && pnr.value && !pnr.error && !name.error) || (name.value && checked.value);

        if ((valid == undefined || !valid)) {
            clickNextButton = true;
            this.forceUpdate();

        } else {
            //Saves value from ajax call to person if PNR is known, otherwise saves inputted field values.


            if (this.props.fields.checked.value) {
                console.log("State 4");
                (this.props.nextStep(4));
            } else {
                console.log("State 6");
                this.savePerson();
                (this.props.nextStep(6));

            }
        }
    }

    savePerson() {
        var pnr = this.props.fields.pnr.value;
        
        $.ajax({
            url: RESTpaths.PATHS.DEPENDENT_BASE + '?pnr=' + pnr,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.props.fields.municipality.onChange(data.address.municipality);


            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }


    render() {
        //Add fields from redux form to component so they can be connected
        const {asyncValidating, fields: {pnr, checked, name}} = this.props;
        var valid = (name.value && pnr.value && !pnr.error && !name.error) || (name.value && checked.value);
        var errormessage = null;

        //Decide which errormessage is the correct one to show to the user
        if (name.error && pnr.error && !checked.value) {
            errormessage = <p>Vennligst fyll inn <b><i>{name.error}</i></b>, og <b><i>{pnr.error}</i></b>.</p>;
        }
        else if (name.error) {
            errormessage = <p>Vennligst fyll inn <b><i>{name.error}</i></b>.</p>;
        }
        else if (pnr.error && !checked.value) {
            if(pnr.error == "et ellevesifret fødselsnummer"){
                errormessage = <p>Vennligst fyll inn <b><i>{pnr.error}</i></b>.</p>;
            }
            else if(pnr.error == "matcher ikke"){
                errormessage = <p><b><i>Fødselsnummer</i></b> og <b><i>navn</i></b> matcher ikke.</p>
            }

        }

        //If the user has clicked on next-button, and the form is not valid. Show errormessage.
        if (clickNextButton && (valid == undefined || !valid)) {
            alertContent =
                <componentClass>
                    <div className="error">
                        <Alert bsStyle="danger">
                            {errormessage}
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

        if (checked.value) {
            nameContent = <FormGroup
                validationState={name.error && (name.touched || alertMessage) ? "error" : ""}>
                <FormControl
                    type="text"
                    className="formName"
                    placeholder="Navn"
                    ref="name"
                    {...name}/>
                <FormControl.Feedback />
            </FormGroup>;
            pnrContent = <FormGroup>
                <FormControl
                    type="text"
                    className="formPnr"
                    placeholder="Fødselsnummer"
                    ref="pno"
                    //value={this.state.pnr}
                    //onChange={this.handlePNRChange}
                    //{...pnr} Removing this resets the text field
                    disabled/>
            </FormGroup>;
        }
        else {
            nameContent = <FormGroup
                validationState={(name.error || pnr.error == "matcher ikke") && (name.touched || alertMessage) ? "error" : ""}>
                <FormControl
                    type="text"
                    className="formName"
                    placeholder="Navn"
                    ref="name"
                    {...name}
                    onChange={name.onBlur}
                />
                {asyncValidating === 'name'}
                <FormControl.Feedback />
            </FormGroup>;

            pnrContent = <FormGroup
                validationState={(pnr.touched || alertMessage) && pnr.error ? "error" : null}>
                <FormControl
                    type="text"
                    name="pno"
                    className="formPnr"
                    placeholder="Fødselsnummer"
                    ref="pno"
                    //Connects field to redux form component//
                    {...pnr}
                />
                {asyncValidating === 'pnr'}
                <FormControl.Feedback />
            </FormGroup>;
        }

        return (
            <form>
                <componentClass>
                    <label className="form-header">Informasjon om søker</label>
                    <div className="form-container">
                        <Row className="formgroup-row">
                            <Col sx={4} md={4}>
                                <label className="name">Navn</label>
                            </Col>
                            <Col sx={8} md={8}>
                                {nameContent}
                            </Col>
                            <Col sm={0} md={5}></Col>
                        </Row>
                        <Row className="form-row">
                            <Col sxOffset={4} mdOffset={4} sx={8} md={8}>
                                <input type="checkbox" name="noPno" className="pnrCheck" style={{marginBottom: '15px'}}
                                       checked={checked.value} onChange={value=>checked.onChange(value)}/> Jeg kan ikke
                                fødselsnummeret
                            </Col>
                        </Row>

                        <Row className="formgroup-row">
                            <Col sx={4} md={4}>
                                <label className="fnr">Fødselsnummer</label>
                            </Col>
                            <Col sx={8} md={8}>
                                {pnrContent}
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
            </form >
        )
    }
}

PersonWithNeedClass.propTypes = {
    asyncValidating: React.PropTypes.string.isRequired,
    previousStep: React.PropTypes.func.isRequired,
    nextStep: React.PropTypes.func.isRequired
};

//Validation for form
const validate = values => {
    const errors = {};

    if (fieldIsEmpty(values.name)) {
        errors.name = "et navn";
    }

    if (!(checkPersonalnumberNo(values.pnr))) {
        errors.pnr = "et ellevesifret fødselsnummer";
    }
    return errors;
};

const asyncValidate = (values) => {
    return new Promise((resolve, reject) => {

        // Checks if pnr and name match if a full-length pnr is typed
        if (values.pnr.length > 10 && !checked.value) {
            $.ajax({
                url: RESTpaths.PATHS.PERSON_BASE + '?pnr=' + values.pnr + '&name=' + values.name,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    //console.log(data);
                    if (data == true) {
                        resolve()
                    } else {
                        reject({pnr: "matcher ikke"});
                    }
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error("url", status, err.toString());
                }.bind(this)
            });
        } else {
            //reject({name: "matcher ikke"});
            resolve()
        }
    })
};

//Sets up reduxForm - needs fields and validation functions
const PersonWithNeed = reduxForm({
    form: 'application',
    fields: ["pnr", "name", "checked", "municipality"],
    asyncValidate,
    asyncBlurFields: ['name', 'pnr'],
    destroyOnUnmount: false,
    validate
})(PersonWithNeedClass);

export default PersonWithNeed
