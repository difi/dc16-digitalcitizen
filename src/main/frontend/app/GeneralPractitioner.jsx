import React from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
require('!style!css!less!./Application.less');
import TypeAhead from './AutoComplete';
var Button = require('react-bootstrap/lib/Button');
export default class GeneralPractitioner extends React.Component {
    constructor() {
        super();
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }

    handleClickBack() {
        console.log("State 4");
        this.props.previousStep(4);
    }

    handleClickNext() {

        console.log("State 6");
        this.props.nextStep(6);

    }

    render() {
        var fastleger = ["Ola Nordmann", "Kari Nordmann"];
        return (
            <div>
                <Row className="form-row">
                    <Col sm={1.5} md={1}>
                        <label>Fastlege</label>
                    </Col>
                    <TypeAhead array={fastleger} placeholder="Skriv inn søkers fastlege"/>
                    <Col sm={3} md={3}>
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
            </div>);
    }
}

