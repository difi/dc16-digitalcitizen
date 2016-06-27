import React from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
require('!style!css!less!./Application.less');
import TypeAhead from './AutoComplete';

export default class GeneralPractitioner extends React.Component {
    render() {
        var fastleger = ["Ola Nordmann", "Kari Nordmann"];
        return (
            <componentClass>
                <label className="form-header">Velg søkers fastlege</label>
                <Row className="form-row">
                    <Col sm={2} md={1}>
                        <label>Fastlege</label>
                    </Col>
                    <Col sm={5} md={6}>
                        <TypeAhead array={fastleger} placeholder="Skriv inn søkers fastlege"/>
                    </Col>
                    <Col sm={6} md={7}></Col>
                </Row>
            </componentClass>
        );
    }
}