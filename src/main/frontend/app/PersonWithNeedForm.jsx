/**
 * Created by camp-cha on 24.06.2016.
 */

import React from 'react';
import {reduxForm} from 'redux-form';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');
var Formsy = require('formsy-react');
var checked = false;
import checkPersonalnumberNo from'./validation.js';

class PersonWithNeed extends React.Component {
    constructor() {
        super();
        this.state = {
            isChecked: false
        };
        this.handlePno = this.handlePno.bind(this);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClickBack() {
        console.log("State 2");
        (this.props.previousStep(2));
    }

    handleClickNext() {
        if (checked == false) {
            console.log("State 6");
            (this.props.nextStep(6));
        } else if (checked == true) {
            console.log("State 4");
            (this.props.nextStep(4));
        }
    }

    handlePno() {
        this.setState({isChecked: !this.state.isChecked});
        checked = !this.state.isChecked;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        //Add fields from redux form to component so they can be connected
        const {fields: {pnr, name}} = this.props;

        return (
            <form>
                <componentClass>
                    <label className="form-header">Informasjon om person med behov</label>
                    <Row className="form-row">
                        <Col sm={5} md={2}>
                            <label>Fødselsnummer</label>
                        </Col>
                        <Col sm={7} md={5}>

                            <FormControl
                                type="text"


                                placeholder="Fødselsnummer"
                                defaultValue={this.props.fieldValues.person.pnr}
                                onChange={this.handleChange}
                                //Connects field to redux form component//
                                {...pnr}

                               />

                            {pnr.touched && pnr.error && <div>{pnr.error}</div>}
                        </Col>
                        <Col sm={0} md={5}></Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={5} md={2}></Col>
                        <Col sm={7} md={5}>
                            <input type="checkbox" name="noPno" checked={this.state.isChecked}
                                   onChange={this.handlePno}/> Jeg kan ikke
                            fødselsnummeret
                        </Col>

                        <Col sm={0} md={5}></Col>
                    </Row>
                    <Row className="form-row-name">
                        <Col sm={5} md={2}>
                            <label>Navn</label>
                        </Col>
                        <Col sm={7} md={5}>

                            <FormControl
                                type="text"
                                placeholder="Navn"
                                defaultValue={this.props.fieldValues.person.name}
                                onChange={this.handleChange}/>
                        </Col>
                        <Col sm={0} md={5}></Col>
                    </Row>
                    <Row className="back-forward-buttons">
                        <Col sm={1.5} md={2}>
                            <Button onClick={this.handleClickBack} className="button-next" bsStyle="success">&larr;
                                Tilbake</Button>
                        </Col>
                        <Col sm={6} md={6}></Col>
                        <Col sm={1.5} md={2}>
                            <Button onClick={this.handleClickNext} className="button-next"
                                    bsStyle="success">Neste &rarr;</Button>
                        </Col>
                        <Col sm={6} md={2}></Col>
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
}

//Sets up reduxForm - needs fields and validation functions
PersonWithNeed = reduxForm({
    form: 'PersonWithNeed',
    fields: ["pnr", "Navn"],
    validate
}, null, null)(PersonWithNeed);

export default PersonWithNeed
