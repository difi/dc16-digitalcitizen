/**
 * Created by camp-cha on 24.06.2016.
 */

import React from 'react';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');

var checked = false;

export default class PersonWithNeed extends React.Component {
    constructor() {
        super()
        this.state = {
            isChecked: false
        }
        this.handlePno = this.handlePno.bind(this);
    }

    handleClickBack() {
        console.log("State 2")
        return (this.props.nextStep(2));
    }

    handleClickNext() {
        if (checked == false) {
            console.log("State 5")
            return (this.props.nextStep(5));
        } else if (checked == true) {
            console.log("State 4")
            return (this.props.nextStep(4));
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
            <componetnClass>
                <label className="form-header">Informasjon om person med behov</label>
                <Row className="form-row">
                    <Col sm={5} md={2}>
                        <label>Fødselsnummer</label>
                    </Col>
                    <Col sm={7} md={5}>
                        <FormControl
                            type="text"
                            placeholder="Fødselsnummer"
                            onChange={this.handleChange}/>
                    </Col>
                    <Col sm={0} md={5}></Col>
                </Row>
                <Row className="form-row">
                    <Col sm={5} md={2}></Col>
                    <Col sm={7} md={5}>
                        <input type="checkbox" name="noPno" checked={this.state.isChecked} onChange={this.handlePno}/> Jeg kan ikke
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
            </componetnClass>
        )
    }
};