import React from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
require('!style!css!less!./Application.less');
import TypeAhead from './AutoComplete';
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');

export default class GeneralPractitioner extends React.Component {
    constructor() {
        super();
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }

    handleClickBack() {
        this.saveFieldValues();
        console.log("State 4");
        this.props.previousStep(4);
    }

    handleClickNext() {
        this.saveFieldValues();
        console.log("State 6");
        this.props.nextStep(6);
    }

    saveFieldValues() {
        var data = {
            doctor: {name: this.refs.doctorSelect.getFieldValue()}
        };
        this.props.saveValues(data);
        console.log(data);
    }

    render() {
        var fastleger = ["Ola Nordmann", "Kari Nordmann"];
        return (
            <componentClass>
                <label className="form-header">Velg søkers fastlege</label>
                <div className="form-container">
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label>Fastlege</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <TypeAhead array={fastleger} ref="doctorSelect" placeholder="Skriv inn søkers fastlege"/>
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
                        <Button onClick={this.handleClickNext} className="button-next"
                                bsStyle="success">Neste &rarr;</Button>
                    </Col>
                </Row>
            </componentClass>
        );
    }
}