/**
 * Created by camp-cha on 24.06.2016.
 */

import React from 'react';

import AddressField from './AddressField.jsx';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');


export default class PersonWithNeedInfo extends React.Component {
    handleClickBack() {
        console.log("State 3")
        return (this.props.nextStep(3));
    }

    handleClickNext() {
        console.log("State 5")
        return (this.props.nextStep(5));
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <label className="form-header">Informasjon om person med behov</label>
                <Row className="form-row">
                    <Col sm={2} md={2}>
                        <label>Navn</label>
                    </Col>
                    <Col sm={5} md={5}>
                        <FormControl
                            type="text"
                            placeholder="Navn"
                            onChange={this.handleChange}/>
                    </Col>
                    <Col sm={6} md={7}></Col>
                </Row>
                <Row className="form-row">
                    <Col sm={2} md={2}>
                        <label>Folkeregistrert adresse</label>
                    </Col>
                    <Col sm={5} md={5}>
                        <AddressField includeCountry={false} />
                    </Col>
                    <Col sm={5} md={5}></Col>
                </Row>
                <Row className="form-row">
                    <Col sm={2} md={2}>
                        <label>Telefon</label>
                    </Col>
                    <Col sm={5} md={5}>
                        <FormControl
                            type="text"
                            placeholder="Telefonnr"
                            onChange={this.handleChange}/>
                    </Col>
                    <Col sm={5} md={5}></Col>
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
            </div>
        )
    }
};