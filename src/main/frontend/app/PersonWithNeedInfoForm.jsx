/**
 * Created by camp-cha on 24.06.2016.
 */

import React from 'react';

import AddressField from './AddressField.jsx';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');
import {checkPhoneNumber} from'./validation.js';
import {reduxForm} from 'redux-form';
import {onlyLettersInString} from "./validation.js";
import {onlyDigitsInString} from './validation.js'
import {alphaNumericInString} from './validation.js'


class PersonWithNeedInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.fieldValues.person.name,
            number: this.props.fieldValues.person.telephone,
            validForm: false
        };
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.saveFieldValues = this.saveFieldValues.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleKey=this.handleKey.bind(this);
    }

    handleClickBack() {
        console.log("State 3");
        this.saveFieldValues();
        this.props.previousStep(3);
    }

    handleClickNext() {

        console.log("State 5");
        this.saveFieldValues();
        this.props.nextStep(5);

    }

    saveFieldValues() {
        // Get values via this.refs
        var address = this.refs.addressfield.getFieldValues();
        var data = {
            person: {
                pnr: this.props.fieldValues.person.pnr,
                name: ReactDOM.findDOMNode(this.refs.name).value,
                address: address,
                telephone: ReactDOM.findDOMNode(this.refs.phone).value
            }
        };
        this.props.saveValues(data);
        console.log(data);
    }

    handleNameChange(event) {
        var text = onlyLettersInString(event.target.value);
        this.setState({
            name: text
        });
    }
    handleNumberChange(event){
        var text = onlyDigitsInString(event.target.value);
        this.setState({
            number: text
        })
    }
    handleKey(e){
        const re = /[0-9]+/g;
        if(!re.test(e.key)){
            e.preventDefault();
        }
        this.setState({
            number: e.target.value
        })
    }
    componentWillUpdate(nextProps, nextState) {
        nextState.validForm = (nextState.name && nextState.number );
    }

    render() {
        const {fields: {number}} = this.props;
        return (
            <form>
                <div>
                    <label className="form-header">Informasjon om person med behov</label>
                    <div className="form-container">
                        <Row className="form-row">
                            <Col sm={4} md={4}>
                                <label>Navn</label>
                            </Col>
                            <Col sm={8} md={8}>
                                <FormControl
                                    type="text"
                                    ref="name"
                                    placeholder="Navn"
                                    value={this.state.name}
                                    onChange={this.handleNameChange}/>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col sm={4} md={4}>
                                <label>Folkeregistrert adresse</label>
                            </Col>
                            <Col sm={8} md={8}>
                                <AddressField ref='addressfield' address={this.props.fieldValues.person.address}
                                              includeCountry={false}/>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col sm={4} md={4}>
                                <label>Telefon</label>
                            </Col>
                            <Col sm={8} md={8}>
                                <FormControl
                                    type="numeric"
                                    ref="phone"
                                    value={this.state.number}
                                    placeholder="Telefonnr"
                                    onKeyPress={this.handleKey}
                                    onChange={this.handleNumberChange}
                                    {...number}

                                />

                                {number.touched && number.error && <div>{number.error}</div>}
                            </Col>
                        </Row>
                    </div>

                    <Row className="back-forward-buttons">
                        <Col sx={2} sm={2} md={2}>
                            <Button onClick={this.handleClickBack} className="button-next" bsStyle="success">&larr;
                                Tilbake</Button>
                        </Col>
                        <Col sx={7} sm={8} md={8}></Col>
                        <Col sx={2} sm={2} md={2}>
                            <Button onClick={this.handleClickNext} disabled={!this.state.validForm}className="button-next"
                                    bsStyle="success">Neste &rarr;</Button>

                        </Col>
                    </Row>

                </div>
            </form>
        )
    }
}
;


//Validation for form
const validate = values => {
    const errors = {};

    if (!(checkPhoneNumber(values.number))) {
        errors.number = "Dette er ikke et gyldig telefonnummer";
    }
    return errors;
}

//Sets up reduxForm - needs fields and validation functions
PersonWithNeedInfo = reduxForm({
    form: 'PersonWithNeedInfo',
    fields: ["number"],
    validate
}, null, null)(PersonWithNeedInfo);

export default PersonWithNeedInfo
