"use strict";

import React from 'react';
import $ from 'jquery';
import {Form} from './Form.jsx';
require('!style!css!less!./Application.less');
import RadioButtonClick from './RadioButtons.jsx';

var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var assign = require('object-assign');

// TODO: Update object fields to match the form data & make matching model(s) on the server.
var fieldValues = {
    // First form
    isApplyingForSelf: null,    // Boolean
    // Second form
    relation: null,             // String
    isDependent: null,          // Boolean
    // Third form
    person: {                   // Person object
        pnr: null,                  // String
        name: null,                 // String
        address: null,              // String or object?
        telephone: null             // String
    },
    // Fourth form
    doctor: {                   // Doctor Object (add more fields?)
        name: null                  // String
    },
    // Fifth form
    dependents: [],             // List of Dependent objects { name: '', address: '', telephone: ''} (add more fields?)
    // Sixth form
    lengthOfStay: null,         // String
    // Seventh form
    specialNeeds: null,         // String     
    needsInterpreter: null      // Boolean
};

export class Application extends React.Component {
    constructor() {
        super()
        this.state = {
            writesForOthers: false,
            firstRender: true
        }
        this.onChildChange = this.onChildChange.bind(this)
    }

    onChildChange(others) {
        this.setState({
            writesForOthers: others,
            firstRender: false
        })
    }

    nextStep(step) {
        this.setState({
            step: this.state.step + step
        })
    }

    saveValues(field_value) {
        fieldValues = assign({}, fieldValues, field_value)
    }

    previousStep(step) {
        this.setState({
            step: this.state.step - step
        })
    }

    handleSubmit() {
        $.ajax({
            url: './send',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: JSON.stringify(fieldValues),
            dataType: 'json',
            success: function (data) {
                console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        var writesOthers = this.state.writesForOthers;
        var firstRender = this.state.firstRender;
        var data = {dependents: [{name: 'test'}]};
        this.saveValues(data);
        this.handleSubmit();


        var button = !firstRender ?
            <Button className="button-search" bsStyle="primary" type="submit" onClick={this.handleSubmit}>Søk
                sykehjemsplass</Button> : null;
        return (
            <form>
                <PageHeader>Søk sykehjemsplass</PageHeader>
                <RadioButtonClick callBackParent={this.onChildChange}/>
                {this.props.data.map(function (forms, i) {
                    if (!(writesOthers) && forms.formname == "Om deg som søker" || firstRender) {
                    }
                    else {
                        return (
                            <compontentClass>
                                <Form key={i} name={forms.formname} data={forms.data}/>
                            </compontentClass>
                        )
                    }
                })}
                <Row className="form-row">
                    <Col sm={7} md={7}>
                    </Col>
                    <Col sm={2} md={2}>
                        {button}
                    </Col>
                    <Col sm={3} md={3}>
                    </Col>
                </Row>
            </form>

        )
    }
}
;

