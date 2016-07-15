/**
 * Created by camp-cha on 24.06.2016.
 */
import {getValues} from 'redux-form';
import React from 'react';
import {reduxForm} from 'redux-form';
import NavigationButtons from './Components/NavigationButtons.js';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');
var checked = false;

import $ from 'jquery'
import RESTpaths from '../static_data/RESTpaths.js';

export const fields = ["pnr", "name", "checked"];

import {checkPersonalnumberNo} from'./Utilities/validation.js';


export class PersonWithNeedClass extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.savePerson = this.savePerson.bind(this);
        this.saveFieldValues = this.saveFieldValues.bind(this);
    }

    
    handleClickBack() {
        this.saveFieldValues();

        console.log("State 2");
        (this.props.previousStep(2));
    }

    handleClickNext() {
        if (this.props.fields.checked.value) {
            this.saveFieldValues();
        } else {
            this.savePerson();
        }


        if (this.props.fields.checked.value) {
            console.log("State 4");
            (this.props.nextStep(4));
        } else {
            console.log("State 6");
            (this.props.nextStep(6));

        }
    }

    saveFieldValues() {

        var pnr = this.props.fields.pnr.value;
        if (this.props.fields.checked.value) {
            pnr = null;
        }
        var data = {
            dontGotPNRnumber: this.props.fields.checked.value,
            person: {
                pnr: pnr,
                name: this.props.fields.name.value,
                address: this.props.fieldValues.person.address,
                telephone: this.props.fieldValues.person.telephone
            }
        };
        this.props.saveValues(data);
        console.log(data);
    }


    savePerson() {
        var pnr = this.props.fields.pnr.value;

        var personP = {};
        $.ajax({
            url: RESTpaths.PATHS.DEPENDENT_BASE + '?pnr=' + pnr,
            dataType: 'json',
            cache: false,
            success: function (data) {
                personP = {
                    dontGotPNRnumber: this.props.fields.checked.value,
                    person: {
                        pnr: pnr,
                        name: this.props.fields.name.value,
                        address: {
                            country: data.address.country,
                            municipality: data.address.municipality,
                            streetAddress: data.address.street,
                            zipcode: data.address.zipcode,
                            postal: data.address.postal
                        },
                        telephone: data.telephone
                    }
                };
                this.props.saveValues(personP);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }


    render() {

        //Add fields from redux form to component so they can be connected

        const { asyncValidating, fields: { pnr, checked, name } } = this.props;
        var valid = (name.value && pnr.value && !pnr.error && !name.error && asyncValidating != 'name') || (name.value && checked.value);
        if (checked.value) {
            return (
                <form>
                    <componentClass>
                        <label className="form-header">Informasjon om søker</label>
                        <div className="form-container">
                            <Row className="form-row">
                                <Col sx={4} md={4}>
                                    <label>Fødselsnummer</label>
                                </Col>
                                <Col sx={8} md={8}>
                                    <FormControl
                                        type="text"
                                        placeholder="Fødselsnummer"
                                        ref="pno"

                                        //value={this.state.pnr}
                                        //onChange={this.handlePNRChange}
                                        //{...pnr} Removing this resets the text field
                                        disabled/>


                                </Col>
                            </Row>
                            <Row className="form-row">
                                <Col sx={4} md={4}></Col>
                                <Col sx={8} md={8}>
                                    <input type="checkbox" className="pnrCheck" name="noPno" checked={checked.value}
                                           onChange={value=>checked.onChange(value)}/> Jeg kan ikke fødselsnummeret
                                </Col>
                                <Col sm={0} md={5}></Col>
                            </Row>

                            <Row className="form-row-name">
                                <Col sx={4} md={4}>
                                    <label>Navn</label>
                                </Col>
                                <Col sx={8} md={8}>
                                    <FormControl
                                        type="text"
                                        placeholder="Navn"
                                        ref="name"
                                        {...name}/>
                                </Col>
                                <Col sm={0} md={5}></Col>
                            </Row>
                        </div>


                        <NavigationButtons
                            handleClickBack={this.handleClickBack}
                            handleClickNext={this.handleClickNext}
                            disabled={!valid}
                        />

                    </componentClass>
                </form>
            )
        }
        return (
            <form>
                <componentClass>
                    <label className="form-header">Informasjon om søker</label>
                    <div className="form-container">
                        <Row className="form-row">
                            <Col sx={4} md={4}>
                                <label className="fnr">Fødselsnummer</label>
                            </Col>
                            <Col sx={8} md={8}>
                                <FormControl
                                    type="text"
                                    name="pno"
                                    className="fnr"
                                    placeholder="Fødselsnummer"
                                    ref="pno"

                                    //Connects field to redux form component//
                                    {...pnr}
                                />
                                {pnr.touched && pnr.error && <div className="error">{pnr.error}</div>}

                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col sx={4} md={4}></Col>
                            <Col sx={8} md={8}>
                                <input type="checkbox" name="noPno" className="pnrCheck"
                                       checked={checked.value} onChange={value=>checked.onChange(value)}/> Jeg kan ikke
                                fødselsnummeret
                            </Col>
                            <Col sm={0} md={5}></Col>
                        </Row>

                        <Row className="form-row-name">
                            <Col sx={4} md={4}>
                                <label className="name">Navn</label>
                            </Col>
                            <Col sx={8} md={8}>
                                <FormControl
                                    type="text"
                                    className="name"
                                    placeholder="Navn"
                                    ref="name"

                                    {...name}
                                    onChange={name.onBlur}
                                />
                                {asyncValidating === 'name'}
                                {name.touched && name.error && <div className="error">{name.error}</div>}
                            </Col>
                            <Col sm={0} md={5}></Col>
                        </Row>
                    </div>

                    <NavigationButtons
                        handleClickBack={this.handleClickBack}
                        handleClickNext={this.handleClickNext}
                        disabled={!valid}
                    />
                </componentClass>
            </form>
        )
    }
}

PersonWithNeedClass.propTypes = {
    asyncValidating: React.PropTypes.string.isRequired,
    fieldValues: React.PropTypes.object.isRequired,
    previousStep: React.PropTypes.func.isRequired,
    nextStep:  React.PropTypes.func.isRequired,
    saveValues:  React.PropTypes.func.isRequired
};

//Validation for form
const validate = values => {
    const errors = {};

    if (!(checkPersonalnumberNo(values.pnr))) {
        errors.pnr = "Dette er ikke et gyldig fødselsnummer";
    }
    return errors;
};

const asyncValidate = (values) => {
    return new Promise((resolve, reject) =>{
        //console.log("NAVN: " + values.name);

        $.ajax({
            url: RESTpaths.PATHS.PERSON_BASE + '?pnr=' + values.pnr + '&name=' + values.name,
            dataType: 'json',
            cache: false,
            success: function (data) {
                //console.log(data);
                if (data == true) {
                    resolve()
                } else {
                    reject({name: "Fødselsnummer og navn matcher ikke."});
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error("url", status, err.toString());
            }.bind(this)
        });
    })
};


//Sets up reduxForm - needs fields and validation functions
const PersonWithNeed = reduxForm({
    form: 'application',
    fields,
    asyncValidate,
    asyncBlurFields: [ 'name', 'pnr' ],
    destroyOnUnmount: false,
    validate
})(PersonWithNeedClass);

export default PersonWithNeed
