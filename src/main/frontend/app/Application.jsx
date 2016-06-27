"use strict";

import React from 'react';
import $ from 'jquery';
import {Form} from './Form.jsx';
require('!style!css!less!./Application.less');
import RadioButtonClick from './RadioButtons.jsx';
import WhosSearching from './WhosSearchingForm.jsx';
import PersonWithNeed from './PersonWithNeedForm';
import PersonWithNeedInfo from './PersonWithNeedInfoForm'

var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
import RelationForm from './RelationForm';
import SpecialNeeds from './SpecialNeeds';
import NeedsForm from'./NeedsForm';
import GeneralPractitioner from './GeneralPractitioner';


var fieldValues = {
    // First form
    isApplyingForSelf: null,    // Boolean
    // Second form
    relation: null,             // String
    guardianName: null,          //String
    familyRelation: null,        //String
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
            step: 1,
            prevStep: 1
        };
        this.nextStep = this.nextStep.bind(this);
        this.saveValues=this.saveValues.bind(this);
        this.previousStep=this.saveValues.bind(this);
    }


    nextStep(step) {
        this.setState({
            prevStep: this.state.step,
            step: this.state.step + step
        })
    }

        saveValues(data) {


    }

    previousStep() {
        this.setState({
            step: this.state.prevStep
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

            data: JSON.stringify({location: "Boston"}),
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
        switch (this.state.step) {
            case 1:
                content = < WhosSearching
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 2:
                content = <RelationForm
                    fieldValues = {fieldValues}
                    previousStep = {this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 3:
                content = <PersonWithNeedForm
                    fieldValues = {fieldValues}
                    previousStep = {this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 4:
                content = <PersonWithNeedInfoForm
                    fieldValues = {fieldValues}
                    previousStep = {this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 5:
                content = <GeneralPractitioner
                    fieldValues = {fieldValues}
                    previousStep = {this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 6:
                content = < NeedsForm
                    fieldValues = {fieldValues}
                    previousStep = {this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 7:
                content = < SpecialNeeds
                    fieldValues = {fieldValues}
                    previousStep = {this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    submitRegistration={this.handleSubmit}/>;
                break;
        }

        return (
            {header},
            {content}
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