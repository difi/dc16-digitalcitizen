/**
 * Created by camp-cha on 24.06.2016.
 */
import {getValues} from 'redux-form';
import React from 'react';
import {reduxForm} from 'redux-form';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');
var checked = false;

export const fields =  ["pnr", "name", "checked"];

import {checkPersonalnumberNo} from'./validation.js';

class PersonWithNeed extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }

    handleClickBack(pnr, name, checked) {
        this.saveFieldValues(pnr, name, checked);
        console.log("State 2");
        (this.props.previousStep(2));
    }

    handleClickNext(pnr, name, checked) {
        this.saveFieldValues(pnr, name, checked);
        if (checked == false) {
            console.log("State 6");
            (this.props.nextStep(6));
        } else if (checked == true) {
            console.log("State 4");
            (this.props.nextStep(4));
        }
    }

    saveFieldValues(pnr, name, checked) {
        var data = {
            gotPNRnumber: checked,
            person: {
                pnr: pnr,
                name: name,
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
        var valid = (name.value && pnr.value) || (name.value && checked.value);
        if(checked.value){
            return(
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

                        <Row className="back-forward-buttons">
                            <Col sx={2} sm={2} md={2}>
                                <Button onClick={this.handleClickBack.bind(this, pnr.value, name.value, checked.value)} className="button-next" bsStyle="success">&larr;
                                    Tilbake</Button>
                            </Col>
                            <Col sx={7} sm={8} md={8}></Col>
                            <Col sx={2} sm={2} md={2}>
                                <Button onClick={this.handleClickNext.bind(this, pnr.value, name.value, checked.value)} disabled={!valid} className="button-next"
                                        bsStyle="success">Neste &rarr;</Button>
                            </Col>
                        </Row>
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
                                <label>Fødselsnummer</label>
                            </Col>
                            <Col sx={8} md={8}>
                                <FormControl
                                    type="text"
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
                                <input type="checkbox" name="noPno" defaultSelected={this.props.fieldValues.gotPNRnumber}{...checked}/> Jeg kan ikke
                                fødselsnummeret
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
                                    defaultValue={this.props.fieldValues.person.name}
                                    {...name}
                                    />
                            </Col>
                            <Col sm={0} md={5}></Col>
                        </Row>
                    </div>

                    <Row className="back-forward-buttons">
                        <Col sx={2} sm={2} md={2}>
                            <Button onClick={this.handleClickBack.bind(this, pnr.value, name.value, checked.value)} className="button-next" bsStyle="success">&larr;
                                Tilbake</Button>
                        </Col>
                        <Col sx={7} sm={8} md={8}></Col>
                        <Col sx={2} sm={2} md={2}>
                            <Button onClick={this.handleClickNext.bind(this, pnr.value, name.value, checked.value)} disabled={!valid} className="button-next"
                                    bsStyle="success">Neste &rarr;</Button>
                        </Col>
                    </Row>
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
PersonWithNeed = reduxForm({
    form: 'application',
    fields,
    destroyOnUnmount: false,
    validate
})(PersonWithNeed);

export default PersonWithNeed
