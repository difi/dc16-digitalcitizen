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
import {onlyLettersInString} from "./validation.js";
import {onlyDigitsInString} from './validation.js'

import {checkPersonalnumberNo} from'./validation.js';

class PersonWithNeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.fieldValues.gotPNRnumber,
            pnr: this.props.fieldValues.person.pnr,
            name: this.props.fieldValues.person.name,
            validForm: (this.props.fieldValues.pnr && this.props.fieldValues.name) || (this.props.fieldValues.isChecked && this.props.fieldValues.name)

        };
        this.handlePno = this.handlePno.bind(this);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.handlePNRChange = this.handlePNRChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleKey = this.handleKey.bind(this);
    }

    handleClickBack() {
        this.saveFieldValues();
        console.log("State 2");
        (this.props.previousStep(2));
    }

    handleClickNext() {
        this.saveFieldValues();
        if (checked == false) {
            console.log("State 6");
            (this.props.nextStep(6));
        } else if (checked == true) {
            console.log("State 4");
            (this.props.nextStep(4));
        }
    }

    saveFieldValues() {
        var data = {
            gotPNRnumber: checked,
            person: {
                pnr: ReactDOM.findDOMNode(this.refs.pno).value,
                name: ReactDOM.findDOMNode(this.refs.name).value,
                address: this.props.fieldValues.person.address,
                telephone: this.props.fieldValues.person.telephone
            }
        };
        this.props.saveValues(data);
        console.log(data);
    }

    handlePno() {
        this.setState({isChecked: !this.state.isChecked});
        checked = !this.state.isChecked;

    }

    handlePNRChange(event) {

        var text = onlyDigitsInString(event.target.value);
        console.log(text);

    }
    handleNameChange(event) {
        var text = onlyLettersInString(event.target.value);
        this.setState({name: text});
    }
    handleKey(e){
        const re = /[0-9]+/g;
        if(!re.test(e.key)){
            e.preventDefault();
        }
        this.setState({pnr: e.target.value});
    }
    componentWillUpdate(nextProps, nextState) {
        nextState.validForm = (nextState.pnr && nextState.name) || (nextState.isChecked && nextState.name);
    }

    render() {

        //Add fields from redux form to component so they can be connected

        const {fields: {pnr, name}} = this.props;
        if(this.state.isChecked){
            //TODO: Gray out and empty PNR Number
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
                                    value={this.state.pnr}
                                    onKeyPress={this.handleKey}
                                    onChange={this.handlePNRChange}
                                    //Connects field to redux form component//
                                    {...pnr}

                                />

                                {pnr.touched && pnr.error && <div>{pnr.error}</div>}

                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col sx={4} md={4}></Col>
                            <Col sx={8} md={8}>
                                <input type="checkbox" name="noPno" checked={this.state.isChecked}
                                       onChange={this.handlePno}/> Jeg kan ikke
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
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                    />
                            </Col>
                            <Col sm={0} md={5}></Col>
                        </Row>
                    </div>


                    <Row className="back-forward-buttons">
                        <Col sx={2} sm={2} md={2}>
                            <Button onClick={this.handleClickBack} className="button-next" bsStyle="success">&larr;
                                Tilbake</Button>
                        </Col>
                        <Col sx={7} sm={8} md={8}></Col>
                        <Col sx={2} sm={2} md={2}>
                            <Button onClick={this.handleClickNext} disabled={!this.state.validForm} className="button-next"
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
}

//Sets up reduxForm - needs fields and validation functions
PersonWithNeed = reduxForm({
    form: 'PersonWithNeed',
    fields: ["pnr", "name"],
    validate
}, null, null)(PersonWithNeed);

export default PersonWithNeed
