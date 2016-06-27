import React from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
require('!style!css!less!./Application.less');
import TypeAhead from './AutoComplete';

export default class GeneralPractitioner extends React.Component {
    render() {
        var fastleger = ["Ola Nordmann", "Kari Nordmann"];
        return(
            <Row className="form-row">
                <Col sm={1.5} md={1}>
                    <label>Fastlege</label>
                </Col>
                <TypeAhead array={fastleger} placeholder="Skriv inn søkers fastlege"/>
                <Col sm={3} md={3}>
                </Col>
            </Row>);
    }
}

