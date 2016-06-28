/**
 * Created by camp-cha on 24.06.2016.
 */

import React from 'react';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

export default class WhosSearching extends React.Component {
    constructor() {
        super();
        this.handleClickMe = this.handleClickMe.bind(this);
        this.handleClickOther = this.handleClickOther.bind(this);
    }

    handleClickMe() {
        console.log("State 6")
        this.props.nextStep(6);
    }

    handleClickOther() {
        console.log("State 2")
        this.props.nextStep(2);
    }

    render() {
        return (
            <componentClass>
                <Row>
                    <Col>
                        <Button onClick={this.handleClickMe} className="button-search" bsStyle="primary" bsSize="large">Jeg
                            søker sykehjemsplass for meg selv</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={this.handleClickOther} className="button-search" bsStyle="primary"
                                bsSize="large">Jeg søker sykehjemsplass på vegne av noen
                            andre</Button>
                    </Col>
                </Row>
            </componentClass>
        )
    }
};
