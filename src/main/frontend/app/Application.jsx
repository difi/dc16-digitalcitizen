"use strict";

import React from 'react';
import $ from 'jquery';
import {Form} from './Form.jsx';
require('!style!css!less!./Application.less');
import RadioButtonClick from './RadioButtons.jsx';
var assign = require('object-assign');
import WhosSearching from './WhosSearchingForm.jsx';
import PersonWithNeed from './PersonWithNeedForm';
import PersonWithNeedInfoForm from './PersonWithNeedInfoForm'

var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
import RelationForm from './RelationForm';
import SpecialNeeds from './SpecialNeeds';
import NeedsForm from './NeedsForm';

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
        address: {                  // Address Object
            country: null,              // String
            streetAddress: null,        // String
            zipcode: null,              // String
            postal: null                // String
        },
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
        fieldValues = assign({}, fieldValues, field_value);
        console.log(fieldValues);
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
                    <PersonWithNeedInfoForm fieldValues={fieldValues}
                                            nextStep={this.nextStep.bind(null, 1)}
                                            previousStep={this.previousStep.bind(null, 1)}
                                            saveValues={this.saveValues}/>;
                break;
            case 3:
                content =
                    <RelationForm fieldValues={fieldValues}
                                  nextStep={this.nextStep.bind(null, 1)}
                                  previousStep={this.previousStep.bind(null, 1)}
                                  saveValues={this.saveValues}/>;
                break;
            case 4:
                content =
                    <WhosSearching fieldValues={fieldValues}
                                   nextStep={this.nextStep.bind(null, 1)}
                                   previousStep={this.previousStep.bind(null, 0)}
                                   saveValues={this.saveValues}/>;
                break;
            
            case 5:
                content =
                    <NeedsForm fieldValues={fieldValues}
                                   nextStep={this.nextStep.bind(null, 1)}
                                   previousStep={this.previousStep.bind(null, 0)}
                                   saveValues={this.saveValues}/>;

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


/*<RadioButtonClick callBackParent={this.onChildChange} />
 {this.props.data.map(function(forms, i){
 if(!(writesOthers) && forms.formname=="Om deg som søker" || firstRender){
 }
 else{
 return (
 <compontentClass>
 <Form key={i} name={forms.formname} data={forms.data}/>
 </compontentClass>
 )}
 })}
 <Row className="form-row">
 <Col sm={7} md={7}>
 </Col>
 <Col sm={2} md={2}>
 {button}
 </Col>
 <Col sm={3} md={3}>
 </Col>
 </Row>*/