/**
 * Created by camp-cha on 24.06.2016.
 */

import React from 'react';

import AddressField from './AddressField.jsx';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM= require('react-dom');


export default class PersonWithNeed extends React.Component {

    saveFieldValues(){
        // Get values via this.refs
        var address = this.refs.addressfield.getFieldValues();
        var data = {
            person: {
                pnr: "???",
                name: ReactDOM.findDOMNode(this.refs.name).value,
                address: address,
                telephone: ReactDOM.findDOMNode(this.refs.phone).value
            }
        };
        this.props.saveValues(data);
        console.log(data);
    }
    
    nextStep() {
        this.saveFieldValues();
        this.props.nextStep();
    }
    
    previousStep(){
        this.saveFieldValues();
        this.props.previousStep();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <Row className="form-row">
                    <Col sm={1.5} md={2}>
                        <label>Navn</label>
                    </Col>
                    <Col sm={4.5} md={5}>
                        <FormControl
                            type="text"
                            ref="name"
                            placeholder="Navn"
                            onChange={this.handleChange}/>
                    </Col>
                    <Col sm={6} md={7}></Col>
                </Row>
                <Row className="form-row">
                    <Col sm={1.5} md={2}>
                        <label>Folkeregistrert adresse</label>
                    </Col>
                    <Col sm={4.5} md={5}>
                        <AddressField ref='addressfield' includeCountry={false}/>
                    </Col>
                    <Col sm={1} md={1}>
                    </Col>
                    <Col sm={6} md={4}></Col>
                </Row>
                <Row className="form-row-name">
                    <Col sm={1.5} md={2}>
                        <label>Telefon</label>
                    </Col>
                    <Col sm={4.5} md={5}>
                        <FormControl
                            type="text"
                            ref="phone"
                            placeholder="Telefonnr"
                            onChange={this.handleChange}/>
                    </Col>
                    <Col sm={6} md={7}></Col>
                </Row>


                <Row className="back-forward-buttons">
                    <Col sm={1.5} md={2}>
                        <Button onClick={this.previousStep.bind(this)} className="button-next" bsStyle="success">&larr;
                            Tilbake</Button>
                    </Col>
                    <Col sm={6} md={6}></Col>
                    <Col sm={1.5} md={2}>
                        <Button onClick={this.nextStep.bind(this)} className="button-next"
                                bsStyle="success">Neste &rarr;</Button>
                    </Col>
                    <Col sm={6} md={2}></Col>
                </Row>
            </div>
        )
    }
};