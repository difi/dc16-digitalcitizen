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
export const fields = [
    "pnr",
    "name",
    "checked",
    "municipality"
];

export class PersonWithNeedClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextBtnIsLoading: false
        };
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.savePerson = this.savePerson.bind(this);
        this.validToGoNext = this.validToGoNext.bind(this);
        this.notValidToGoNext = this.notValidToGoNext.bind(this);

    }

    /**
     * Handle the click on the back-button
     */
    handleClickBack() {
        console.log("State 2");
        (this.props.previousStep(2));
    }

    /**
     * Handle the click on the next-button
     */
    handleClickNext() {
        const {fields: {pnr, checked, name}} = this.props;
        var valid = (!pnr.error && !name.error) || (checked.value && !name.error);

        // Checks if pnr and name match if a full-length pnr is typed, and a name is given
        if ((pnr.value && pnr.value.length > 10) && !checked.value && name.value) {

            //State need some time to be set, so if you print the state-value just after this, you wont be able to get the correct result
            this.setState({nextBtnIsLoading: true});

            $.ajax({
                url: RESTpaths.PATHS.PERSON_BASE + '?pnr=' + pnr.value + '&name=' + name.value,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    // setTimeout is only used for testing
                    //setTimeout(() => {
                    if (data == true) {
                        this.setState({nextBtnIsLoading: false});
                        this.validToGoNext();
                    } else {
                        pnr.error = "matcher ikke";
                        this.setState({nextBtnIsLoading: false});
                        this.notValidToGoNext();
                    }
                    //}, 3000);
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error("url", status, err.toString());
                }.bind(this)
            });
        } else {
            if ((valid == undefined || valid==false)) {
                this.notValidToGoNext();

            } else {
                this.validToGoNext();
            }
        }
    }

    notValidToGoNext() {
        clickNextButton = true;
        this.forceUpdate();
    }

    validToGoNext() {
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
        const {fields: {pnr, checked, name}} = this.props;
        var valid = (!pnr.error && !name.error) || (checked.value && !name.error);
        var errormessage = null;

        //Decide which errormessage is the correct one to show to the user
        if (name.error && pnr.error && (pnr.error != "matcher ikke") && !checked.value) {
            errormessage = <p>Vennligst fyll inn <b><i>{name.error}</i></b>, og <b><i>{pnr.error}</i></b>.</p>;
        }
        else if (name.error) {
            errormessage = <p>Vennligst fyll inn <b><i>{name.error}</i></b>.</p>;
        }
        else if (pnr.error && !checked.value) {
            if (pnr.error == "et ellevesifret fødselsnummer") {
                errormessage = <p>Vennligst fyll inn <b><i>{pnr.error}</i></b>.</p>;
            }
            else if (pnr.error == "matcher ikke") {
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
            nameContent =
                <div>
                    <Col sx={4} md={4}>
                        <label htmlFor="checkedName" className="name">Navn</label>
                    </Col>
                    <Col sx={8} md={8}>
                        <FormGroup
                            validationState={name.error && (name.touched || alertMessage) ? "error" : ""}>
                            <FormControl
                                id="checkedName"
                                type="text"
                                className="formName"
                                placeholder="Navn"
                                ref="name"
                                {...name}/>
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                </div>;
            pnrContent =
                <div>
                    <Col sx={4} md={4}>
                        <label htmlFor="checkedPnr" className="fnr">Fødselsnummer</label>
                    </Col>
                    <Col sx={8} md={8}>
                        <FormGroup>
                            <FormControl
                                id="checkedPnr"
                                type="text"
                                className="formPnr"
                                placeholder="Fødselsnummer"
                                ref="pno"
                                //value={this.state.pnr}
                                //onChange={this.handlePNRChange}
                                //{...pnr} Removing this resets the text field
                                disabled/>
                        </FormGroup>
                    </Col>
                </div>;
        }
        else {
            nameContent =
                <div>
                    <Col sx={4} md={4}>
                        <label htmlFor="notCheckedName" className="name">Navn</label>
                    </Col>
                    <Col sx={8} md={8}>
                        <FormGroup
                            validationState={(name.error || pnr.error == "matcher ikke") && (name.touched || alertMessage) ? "error" : ""}>
                            <FormControl
                                id="notCheckedName"
                                type="text"
                                className="formName"
                                placeholder="Navn"
                                ref="name"
                                {...name}
                                onChange={name.onBlur}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                </div>;

            pnrContent =
                <div>
                    <Col sx={4} md={4}>
                        <label htmlFor="notCheckedPnr" className="fnr">Fødselsnummer</label>
                    </Col>
                    <Col sx={8} md={8}>
                        <FormGroup
                            validationState={(pnr.touched || alertMessage) && pnr.error ? "error" : null}>
                            <FormControl
                                id="notCheckedPnr"
                                type="text"
                                name="pno"
                                className="formPnr"
                                placeholder="Fødselsnummer"
                                ref="pno"
                                //Connects field to redux form component//
                                {...pnr}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                </div>;
        }

        return (
            <form>
                <componentClass>
                    <label htmlFor="infoAbout" className="form-header">Informasjon om søker</label>
                    <div id="infoAbout" className="form-container">
                        <Row className="formgroup-row">
                            {nameContent}
                            <Col sm={0} md={5}></Col>
                        </Row>
                        <Row className="form-row">
                            <Col sxOffset={4} mdOffset={4} sx={8} md={8}>
                                <input id="pnrCheck" type="checkbox" name="noPno" className="pnrCheck" style={{marginBottom: '15px'}}
                                       checked={checked.value} onChange={value=>checked.onChange(value)}/>
                                <label htmlFor="pnrCheck" className="check-button-label"> Jeg kan ikke fødselsnummeret</label>
                            </Col>
                        </Row>

                        <Row className="formgroup-row">
                            {pnrContent}
                        </Row>
                        {alertContent}
                    </div>
                    <NavigationButtons
                        handleClickBack={this.handleClickBack}
                        handleClickNext={this.handleClickNext}
                        buttonDisabled={!valid}
                        nextBtnIsLoading={this.state.nextBtnIsLoading}
                    />
                </componentClass>
            </form >
        )
    }
}

PersonWithNeedClass.propTypes = {
    previousStep: React.PropTypes.func.isRequired,
    nextStep: React.PropTypes.func.isRequired
};

/**
 * Validation for the form
 */
const validate = values => {
    const errors = {};

    if (fieldIsEmpty(values.name)) {
        errors.name = "fullt navn";
    }
    else if(values.name.replace(" ", "").length<=2){
        errors.name="fullt navn";
    }
    if (!(checkPersonalnumberNo(values.pnr))) {
        errors.pnr = "et ellevesifret fødselsnummer";
    }

    return errors;
};

/**
 * Sets up reduxForm - needs fields and validation functions
 */
const PersonWithNeed = reduxForm({
    form: 'application',
    fields: fields,
    destroyOnUnmount: false,
    validate
})(PersonWithNeedClass);

export default PersonWithNeed