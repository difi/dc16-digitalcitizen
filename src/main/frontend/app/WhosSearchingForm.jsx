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
                <label className="form-header">Søker du sykehjemsplass for deg selv?</label>
                <div className="form-container">
                    <Row>
                        <Col>
                            <Button onClick={this.handleClickMe} className="button-search" bsStyle="primary"
                                    bsSize="large">Ja, for meg selv</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={this.handleClickOther} className="button-search" bsStyle="primary"
                                    bsSize="large">Nei, for noen andre</Button>
                        </Col>
                    </Row>
                </div>
            </componentClass>
        )
    }
};
