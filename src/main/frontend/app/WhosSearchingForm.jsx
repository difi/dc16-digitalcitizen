/**
 * Created by camp-cha on 24.06.2016.
 */

import React from 'react';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

export default class Buttons extends React.Component {
    handleClickMe() {
        console.log("State 5")
        return (this.props.nextStep(5));
    }

    handleClickOther() {
        console.log("State 2")
        return (this.props.nextStep(2));
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={1} md={3}></Col>
                    <Col xs={10} md={6}>
                        <Button onClick={this.handleClickMe} className="button-search" bsStyle="primary" bsSize="large">Jeg
                            søker sykehjemsplass for meg selv</Button>
                    </Col>
                    <Col xs={1} md={3}></Col>
                </Row>
                <Row>
                    <Col xs={1} md={3}></Col>
                    <Col xs={10} md={6}>
                        <Button onClick={this.handleClickOther} className="button-search" bsStyle="primary"
                                bsSize="large">Jeg søker sykehjemsplass på vegne av noen
                            andre</Button>
                    </Col>
                    <Col xs={1} md={3}></Col>
                </Row>
            </div>
        )
    }
};
