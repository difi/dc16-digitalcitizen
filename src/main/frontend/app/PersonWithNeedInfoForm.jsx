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

export default class PersonWithNeedInfo extends React.Component {
    constructor() {
        super()
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.saveFieldValues = this.saveFieldValues.bind(this);
        this.handleChange=this.handleChange.bind(this);
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

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        return (
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
                                defaultValue={this.props.fieldValues.person.name}
                                onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label>Folkeregistrert adresse</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <AddressField ref='addressfield' address={this.props.fieldValues.person.address} includeCountry={false}/>
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label>Telefon</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl
                                type="text"
                                ref="phone"
                                defaultValue={this.props.fieldValues.person.telephone}
                                placeholder="Telefonnr"
                                onChange={this.handleChange}/>
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
                        <Button onClick={this.handleClickNext} className="button-next" bsStyle="success">Neste &rarr;</Button>

                    </Col>
                </Row>

            </div>
    )
    }
    };