"use strict";

import React from 'react';
import $ from 'jquery';
import {Form} from './Form.jsx';
require('!style!css!less!./Application.less');
import RadioButtonClick from './RadioButtons.jsx';
var assign = require('object-assign')
var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
import RelationForm from './RelationForm';
import SpecialNeeds from './SpecialNeeds';

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

export default class Application extends React.Component {

    constructor() {
        super();
        this.state = {
            step: 1
        };
        this.nextStep = this.nextStep.bind(this);
        this.saveValues = this.saveValues.bind(this);
        this.previousStep = this.previousStep.bind(this);
    }
    
    onChildChange(others) {
        this.setState({
            writesForOthers: others,
            firstRender: false
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

    nextStep(step) {
        this.setState({
            step: this.state.step + step
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

        var header = <PageHeader>Søk sykehjemsplass</PageHeader>;
        var content;
        //TODO: Remove test data and update the content to actual forms
        switch (this.state.step) {
            case 1:
                content =
                    <SpecialNeeds fieldValues={fieldValues}
                                  nextStep={this.nextStep.bind(null, 1)}
                                  previousStep={this.previousStep.bind(null, 0)}
                                  saveValues={this.saveValues}/>;
                break;
            case 2:
                content =
                    <div>
                        <p> TESTVIEW 2 </p>
                        <Button onClick={this.previousStep.bind(null, 1)}> Previous </Button>
                        <Button onClick={this.nextStep.bind(null, 1)}> Next </Button>
                        <Button onClick={this.nextStep.bind(null, 2)}> Last page </Button>
                    </div>;
                break;
            case 3:
                content =
                    <div>
                        <p> TESTVIEW 3 </p>
                        <Button onClick={this.previousStep.bind(null, 1)}> Previous </Button>
                        <Button onClick={this.nextStep.bind(null, 1)}> Next </Button>
                    </div>;
                break;
            case 4:
                content =
                    <div>
                        <p> TESTVIEW 4 </p>
                        <Button onClick={this.previousStep.bind(null, 3)}> First page </Button>
                        <Button onClick={this.previousStep.bind(null, 1)}> Previous </Button>
                        <Button onClick={this.nextStep.bind(null, 1)}> Next </Button>
                    </div>;
                break;

            /*
             content = <
             nextStep={this.nextStep}
             saveValues={this.saveValues}/>;
             break;
             case 4:
             content = <
             nextStep={this.nextStep}
             saveValues={this.saveValues}/>;
             break;
             case 5:
             content = <
             nextStep={this.nextStep}
             saveValues={this.saveValues}/>;
             break;
             case 6:
             content = <
             nextStep={this.nextStep}
             saveValues={this.saveValues}/>;
             break;
             case 7:
             content = <
             nextStep={this.nextStep}
             saveValues={this.saveValues}
             submitRegistration={this.handleSubmit}/>;
             break; */
                
        }

        return (
            <div>
                {header}
                {content}
                <Button onClick={this.handleSubmit}> Submit form </Button>
            </div>
        )
    }
}


