/**
 * Created by camp-cha on 24.06.2016.
 */

import React from 'react';

import AddressField from './AddressField.jsx';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');


export default class AddRelationsToForm extends React.Component {
    constructor() {
        super()
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }

    handleClickBack() {
        console.log("State 5");
        (this.props.previousStep(5));
    }

    handleClickNext() {
        console.log("State 7");
        this.props.nextStep(7);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value});
    }

    render() {
        return (
            <div>
                <p>Pårørende</p>
                <Row className="form-row">
                    <Col sm={1.5} md={2}>
                        <label>Navn</label>
                    </Col>
                    <Col sm={4.5} md={5}>
                        <FormControl
                            type="text"
                            placeholder="Navn"
                            defaultValue={this.props.fieldValues.person.name}
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col sm={6} md={7}></Col>
                </Row>
                
                <Row className="form-row">
                    <Col sm={1.5} md={2}>
                        <label>Folkeregistrert adresse</label>
                    </Col>
                    <Col sm={4.5} md={5}>
                        <AddressField includeCountry={false}/>
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
                            defaultValue={this.props.fieldValues.person.telephone}
                            placeholder="Telefonnr"
                            onChange={this.handleChange}
                        />
                    </Col>
                    <Col sm={6} md={7}></Col>
                </Row>

                <Row className="form-row-relation">
                    <Col sm={1.5} md={2}>
                        <label>Relasjon</label>
                    </Col>
                    <Col sm={4.5} md={5}>
                    </Col>
                </Row>

                <Row className="relations-button">
                    <Col sm={1.5} md={2}>
                        <Button onClick={this.handleClickYes} className="button-search" bsStyle="info"
                                bsSize="medium">Jeg ønsker å legge til flere pårørende
                        </Button>
                    </Col>
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