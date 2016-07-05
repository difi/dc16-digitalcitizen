/**
 * Created by camp-cha on 24.06.2016.
 */
import {getValues} from 'redux-form';
import React from 'react';
import {reduxForm} from 'redux-form';
import NavigationButtons from './NavigationButtons.jsx';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');
var checked = false;

export const fields = ["pnr", "name", "checked"];

import {checkPersonalnumberNo} from'./validation.js';

export class PersonWithNeedClass extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }

    handleClickBack() {
        this.saveFieldValues();
        console.log("State 2");
        (this.props.previousStep(2));
    }

    handleClickNext() {
        this.saveFieldValues();

        if (this.props.fields.checked.value) {
            console.log("State 4");
            (this.props.nextStep(4));
        } else {
            console.log("State 6");
            (this.props.nextStep(6));
        }
    }

    saveFieldValues() {
        var data = {
            gotPNRnumber: this.props.fields.checked.value,
            person: {
                pnr: this.props.fields.pnr.value,
                name: this.props.fields.name.value,
                address: this.props.fieldValues.person.address,
                telephone: this.props.fieldValues.person.telephone
            }
        };
        this.props.saveValues(data);
        console.log(data);
    }

    render() {

        //Add fields from redux form to component so they can be connected

        const {fields: {pnr, checked, name}} = this.props;
        var valid = (name.value && pnr.value && !pnr.error) || (name.value && checked.value);
        if (checked.value) {
            return (
                <form>
                    <componentClass>
                        <label className="form-header">Informasjon om person med behov</label>
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
                                    <input type="checkbox" name="noPno" {...checked}/> Jeg kan ikke fødselsnummeret
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
                    <label className="form-header">Informasjon om person med behov</label>
                    <div className="form-container">
                        <Row className="form-row">
                            <Col sx={4} md={4}>
                                <label className="fnr">Fødselsnummer</label>
                            </Col>
                            <Col sx={8} md={8}>
                                <FormControl
                                    type="text"
                                    className="fnr"
                                    placeholder="Fødselsnummer"
                                    ref="pno"

                                    //Connects field to redux form component//
                                    {...pnr}
                                />
                                {pnr.touched && pnr.error && <div>{pnr.error}</div>}

                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col sx={4} md={4}></Col>
                            <Col sx={8} md={8}>
                                <input type="checkbox" name="noPno"
                                       defaultSelected={this.props.fieldValues.gotPNRnumber}{...checked}/> Jeg kan ikke
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
                                />
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

//Validation for form
const validate = values => {
    const errors = {};

    if (!(checkPersonalnumberNo(values.pnr))) {
        errors.pnr = "Dette er ikke et gyldig fødselsnummer";
    }
    return errors;
};

//Sets up reduxForm - needs fields and validation functions
const PersonWithNeed = reduxForm({
    form: 'application',
    fields,
    destroyOnUnmount: false,
    validate
})(PersonWithNeedClass);

<<<<<<< HEAD
=======
export default PersonWithNeed
>>>>>>> refs/remotes/origin/master
