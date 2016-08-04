import React from 'react';
import {reduxForm} from 'redux-form';
import {getValues} from 'redux-form';
import $ from 'jquery'

import RESTpaths from '../static_data/RESTpaths.js';
import DropdownList from './Components/DropdownList.js';
import NavigationButtons from './Components/NavigationButtons.js';

import dropdownContent from '../static_data/dropdown-list-content.js';

import {fieldIsEmpty} from './Utilities/validation.js';

var FormGroup = require('react-bootstrap/lib/FormGroup');
var Radio = require('react-bootstrap/lib/Radio');
//var Checkbox = require('react-bootstrap/lib/Checkbox');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');
var Alert = require('react-bootstrap/lib/Alert');

var alertContent = null;
var clickNextButton = false;
export var alertMessage = false;
export const fields= [
    "relation",
    "typeOfRelation",
    "nameOfChild",
    "dependent",
    "otherRelation",
    "guardianFor",
    "municipality",
    'pnr',
    "name"
];

export class RelationFormClass extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.handleGuardianRadioButton = this.handleGuardianRadioButton.bind(this);
        this.handleFamilyRadioButton = this.handleFamilyRadioButton.bind(this);
        this.handleOtherRadioButton = this.handleOtherRadioButton.bind(this);
        this.getGuardianFor = this.getGuardianFor.bind(this);
        this.getGuardianFor();
    }


    /**
     * Loads person(s) the logged in user is registered as guardian for from the server
     */
    getGuardianFor() {
        $.ajax({
            url: RESTpaths.PATHS.GUARDIAN_BASE + '?pnr=' + this.props.userData.pnr,
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
                data = data.map(data => {
                    return {
                        value: data.pnr + ":" + data.name + ":" + data.address + ":" + data.telephone,
                        name: data.name
                    }
                });

                data.unshift({value: 0, name: "Velg..."});
                this.props.fields.guardianFor.onChange(data);
                this.forceUpdate();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    /**
     * Handle the click on the back-button
     */
    handleClickBack() {
        //Sends the  user to state 1 - WhosSearchingForm
        console.log("State 1");
        this.saveFieldValues();
        (this.props.previousStep(1));
    }

    /**
     * Handle the click on the next-button
     * If guardian-relation is chosen, the next step is step 6 - Add Dependent Page
     * Otherwise, next step is step 3 - Person With Need Page
     */
    handleClickNext() {
        const {fields: {relation, typeOfRelation, nameOfChild, dependent, otherRelation, guardianFor}} = this.props;
        var valid = relation.value && ((nameOfChild.value && !nameOfChild.error) || (typeOfRelation.value && !typeOfRelation.error) || (otherRelation.value && !otherRelation.error));
        //const {fields: {relation}} = this.props;

        if ((valid == undefined || !valid)) {
            clickNextButton = true;
            this.forceUpdate();

        } else {
            //Sends the  user to state 3 - PersonWithNeedForm
            console.log("State 3");
            this.saveFieldValues();
            if (relation.value == "guardian") {
                this.props.nextStep(6);
            }
            else {
                this.props.nextStep(3);
            }
        }
    }


    /**
     * When chosen radiobutton for guardian relation, reset the other dropdowns
     */
    handleGuardianRadioButton() {
        this.props.fields.otherRelation.onChange(null);
        this.props.fields.typeOfRelation.onChange(null);
    }

    /**
     * When chosen radiobutton for family relation, reset the other dropdowns
     */
    handleFamilyRadioButton() {
        this.props.fields.nameOfChild.onChange(null);
        this.props.fields.otherRelation.onChange(null);
    }

    /**
     * When chosen radiobutton for other relation, reset the other dropdowns
     */
    handleOtherRadioButton() {
        this.props.fields.nameOfChild.onChange(null);
        this.props.fields.typeOfRelation.onChange(null);
    }


    resetDependent(event) {
        this.props.fields.dependent.onChange(event.target.value);
        if(!event.target.value){
            this.props.resetDep();
        }
    }
    saveFieldValues() {
        // Get values via this.refs
        const {fields: {relation, nameOfChild, dependent, pnr, name}} = this.props;

        if (relation.value == "guardian") {
            dependent.onChange(true);
            pnr.onChange(nameOfChild.value.split(":")[0]);
            var pnrAjax = nameOfChild.value.split(":")[0];
            name.onChange(nameOfChild.value.split(":")[1]);

            $.ajax({
                url: RESTpaths.PATHS.MUNICIPALITY_BASE + '?pnr=' + pnrAjax,
                dataType: 'text',
                cache: false,
                success: function (data) {
                    this.props.fields.municipality.onChange(data);
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    }

    render() {
        const {fields: {relation, typeOfRelation, nameOfChild, dependent, otherRelation, guardianFor}} = this.props;
        var content = <p/>;
        var valid = relation.value && ((nameOfChild.value && !nameOfChild.error) || (typeOfRelation.value && !typeOfRelation.error) || (otherRelation.value && !otherRelation.error));
        var errorMessage = null;

        if (clickNextButton && (valid == undefined || !valid)) {
            if (!relation.value) {
                errorMessage = <p>Vennligst velg <b><i>din relasjon til søker</i></b></p>;
            } else {
                if(relation.value == "guardian"){
                    errorMessage = <p>Vennligst velg <b><i>hvem du fyller ut på vegne av</i></b>, før du går videre.</p>;
                }
                else{
                    errorMessage = <p>Vennligst oppgi <b><i>hva som er din relasjon til søker</i></b>, før du går videre.</p>;
                }
            }

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
            if (valid  || relation.value) {
                alertContent = null;
                alertMessage = false;
            }
        }


        switch (relation.value) {
            case "guardian":
                content =
                    <componentClass>
                        <Row className="form-row">
                            <Col>
                                <label htmlFor="1" className="guardian-rel">Jeg fyller ut på vegne av</label>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col>
                                <FormGroup validationState={nameOfChild.error && (nameOfChild.touched || (alertMessage)) ? "error" : ""}>
                                <DropdownList id="1"
                                              ref="nameOfChild"
                                              className="guardian-rel"
                                              options={guardianFor.value? guardianFor.value : []}
                                              labelField="name"
                                              valueField="value"
                                              defaultValue=""
                                              {...nameOfChild}
                                    //value={nameOfChild.value}
                                              onChange={change => nameOfChild.onChange(change.newValue)}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                    </componentClass>;
                break;
            case "family":
                content =
                    <componentClass>
                        <Row className="form-row">
                            <Col>
                                <label htmlFor="1" className="family-rel">Hva er din relasjon til søker?</label>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col>
                                <FormGroup validationState={typeOfRelation.error && (typeOfRelation.touched || (alertMessage)) ? "error" : ""}>
                                <DropdownList id="1"
                                              ref="familyRelation"
                                              className="family-rel"
                                              options={dropdownContent.FAMILYRELATIONS}
                                              labelField="relation"
                                              valueField="value"
                                              {...typeOfRelation}
                                    //value={typeOfRelation.value}
                                              onChange={change => typeOfRelation.onChange(change.newValue)}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col>
                                <input type="checkbox" id="checkboxFamily" ref="setDependent" {...dependent} onChange={this.resetDependent}/>
                                    <label htmlFor="checkboxFamily" className="check-button-label"> Registrer meg som pårørende</label>
                            </Col>
                        </Row>
                    </componentClass>;
                break;
            case "other":
                content = <componentClass>
                    <Row className="form-row">
                        <Col>
                            <label htmlFor="otherRelForm" className="other-rel">Hva er din relasjon til søker?</label>
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col>
                            <FormGroup validationState={otherRelation.error && (otherRelation.touched || alertMessage) ? "error" : ""}>
                                <FormControl
                                    id="otherRelForm"
                                    type="text"
                                    ref="otherRelation"
                                    className="other-rel"
                                    placeholder="Relasjon"
                                    {...otherRelation}
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col>
                            <input type="checkbox" id="checkboxOther" ref="setDependent" {...dependent} onChange={this.resetDependent}/>
                                <label htmlFor="checkboxOther" className="check-button-label"> Registrer meg som pårørende </label>
                        </Col>
                    </Row>
                </componentClass>
        }
        return (
            <div>
                <label htmlFor="radioForm" className="form-header">Hva er din relasjon til søkeren?</label>
                <div className="form-container">
                    <form id="radioForm" className="relation">
                        <input type="radio" id="guardian-radio" className="radio-Relation"
                               name="radio-buttons" {...relation} value="guardian"
                               checked={relation.value=="guardian"} onClick={this.handleGuardianRadioButton}/>
                        <label htmlFor="guardian-radio" className="button-label">Jeg er verge for søkeren</label>
                        <br/>
                        <input type="radio" id="family-radio" name="radio-buttons" {...relation} value="family"
                               checked={relation.value=="family"} onClick={this.handleFamilyRadioButton}/>
                        <label htmlFor="family-radio" className="button-label">Jeg er i familie med søkeren</label>
                        <br/>
                        <input type="radio" id="other-radio" name="radio-buttons" className="radio-other" {...relation}
                               value="other" checked={relation.value=="other"} onClick={this.handleOtherRadioButton}/>
                        <label htmlFor="other-radio" className="button-label">Annet</label>
                    </form>
                    {content}
                    {alertContent}
                </div>
                <NavigationButtons
                    handleClickBack={this.handleClickBack}
                    handleClickNext={this.handleClickNext}
                    buttonDisabled={!valid}
                />
            </div>
        )
    }
}
RelationFormClass.propTypes = {
    previousStep: React.PropTypes.func.isRequired,
    nextStep: React.PropTypes.func.isRequired
};

/**
 * Validation for form
 */
const validate = values => {
    const errors = {};

    if(values.nameOfChild == 0){
        console.log("I error");
        errors.nameOfChild = "Vennligst velg hvem du fyller ut på vegne av, før du går videre."
    }

    if(values.typeOfRelation == 0){
        errors.typeOfRelation = "Vennligst velg fra listen hva som er din relasjon til søker, før du går videre."
    }

    if (fieldIsEmpty(values.otherRelation)) {
        errors.otherRelation = "Vennligst oppgi hva som er din relasjon til søker, før du går videre.";
    }
    return errors;
};

/**
 * Sets up reduxForm - needs fields and validation functions
 */
const RelationForm = reduxForm({
    form: 'application',
    fields: fields,
    destroyOnUnmount: false,
    validate}, null, null)(RelationFormClass);

export default RelationForm