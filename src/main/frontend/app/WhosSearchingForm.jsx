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

    saveFieldValues(status){
        var data = {
            applyingForSelf: status
        };
        this.props.saveValues(data);
        console.log(data);
    }

    nextStep(status, step) {
        this.saveFieldValues(status);
        this.props.nextStep(step);
    }
    
    handleClickMe() {
        console.log("State 6")
        this.nextStep(true, 6)
    }

    handleClickOther() {
        console.log("State 2")
        this.nextStep(false, 2);
    }

    render() {
        return (
            <componentClass>
                <label className="form-header">Hvem søker du sykehjemsplass for?</label>
                <Row>
                    <Col sm={7} md={6}>
                        <Button onClick={this.handleClickMe} className="button-search" bsStyle="primary" bsSize="large">Jeg
                            søker sykehjemsplass for meg selv</Button>
                    </Col>
                    <Col sm={7} md={6}></Col>
                </Row>
                <Row>
                    <Col sm={7} md={6}>
                        <Button onClick={this.handleClickOther} className="button-search" bsStyle="primary"
                                bsSize="large">Jeg søker sykehjemsplass på vegne av noen
                            andre</Button>
                    </Col>
                    <Col sm={7} md={6}></Col>
                </Row>
            </componentClass>
        )
    }
};
