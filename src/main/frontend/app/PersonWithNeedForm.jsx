/**
 * Created by camp-cha on 24.06.2016.
 */

import React from 'react';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');
var Formsy = require('formsy-react');
var checked = false;

export default class PersonWithNeed extends React.Component {
    constructor() {
        super();
        this.state = {
            isChecked: false
        };
        this.handlePno = this.handlePno.bind(this);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
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
        return (
            <div>
                <Formsy.Form>
                    <Row className="form-row">
                        <Col sm={1.5} md={2}>
                            <label>Fødselsnummer</label>
                        </Col>
                        <Col sm={4.5} md={5}>
                            <FormControl
                                type="text"
                                placeholder="Fødselsnummer"
                                
                                defaultValue={this.props.fieldValues.person.pnr}
                                onChange={this.handleChange}/>
                        </Col>
                        <Col sm={6} md={7}></Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={1.5} md={2}></Col>
                        <Col sm={3} md={5}>
                            <input type="checkbox" name="noPno" checked={this.state.isChecked}
                                   onChange={this.handlePno}/> Jeg kan ikke
                            fødselsnummeret
                        </Col>
                        <Col sm={1} md={1}>
                        </Col>
                        <Col sm={6} md={4}></Col>
                    </Row>
                    <Row className="form-row-name">
                        <Col sm={1.5} md={2}>
                            <label>Navn</label>
                        </Col>
                        <Col sm={4.5} md={5}>
                            <FormControl
                                type="text"
                                placeholder="Navn"
                                defaultValue={this.props.fieldValues.person.name}
                                onChange={this.handleChange}/>
                        </Col>
                        <Col sm={6} md={7}></Col>
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
                </Formsy.Form>
            </div>
        )
    }
};