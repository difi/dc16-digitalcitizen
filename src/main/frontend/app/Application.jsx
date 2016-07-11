"use strict";

import React from 'react';
import $ from 'jquery';
import {Form} from './unused/Form.jsx';
//require('!style!css!less!./Application.less');

var assign = require('object-assign');
import WhosSearching from './WhosSearchingForm.jsx';
import PersonWithNeed from './PersonWithNeedForm';
import PersonWithNeedInfoForm from './PersonWithNeedInfoForm';
var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
import RelationForm from './RelationForm';
import PersonWithNeedForm from './PersonWithNeedForm';
import GeneralPractitioner from './GeneralPractitioner';
import SpecialNeeds from './SpecialNeeds';
import NeedsForm from'./NeedsForm';
import AddDependent from './AddDependent';
import SubmitSuccess from './SubmitPage';

// TODO: Update object fields to match the form data & make matching model(s) on the server.


export default class Application extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            step: 1,
            prevStep: 1,
            fieldValues: props.fieldValues,
            userData: props.userData
        };
        this.nextStep = this.nextStep.bind(this);
        this.saveValues = this.saveValues.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.saveUserData = this.saveUserData.bind(this);

    }
    

<<<<<<< HEAD

    saveValues(field_value) {
        this.setState({
            fieldValues: assign({}, this.state.fieldValues, field_value)})
        console.log(this.props.fieldValues);
        return assign({}, this.state.fieldValues, field_value)
    }

=======
    saveValues(field_value) {
        this.setState({
            fieldValues: assign({}, this.state.fieldValues, field_value)})
        console.log(this.state.fieldValues);
        return assign({}, this.state.fieldValues, field_value)
    }

>>>>>>> refs/remotes/origin/master

    saveUserData(field_value) {
        this.setState({
            userData: assign({}, this.state.userData, field_value)});
        return this.state.userData;
    }

    previousStep(step) {
        this.setState({
            step: step
        })
    }

    nextStep(step) {
        this.setState({
            prevStep: this.state.step,
            step: step
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
            data: JSON.stringify(this.state.fieldValues),
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
        var fieldValues=this.state.fieldValues;
        var userData = this.state.userData;
<<<<<<< HEAD
        console.log(userData);
=======
        console.log(fieldValues);
>>>>>>> refs/remotes/origin/master
        switch (this.state.step) {
            case 1:
                content = <WhosSearching
                    store={this.props.store}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 2:
                content = <RelationForm
                    store={this.props.store}
                    fieldValues={fieldValues}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 3:
                content = <PersonWithNeedForm
                    store={this.props.store}
                    fieldValues={fieldValues}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    name = {fieldValues.person.name}/>;
                break;
            case 4:
                content = <PersonWithNeedInfoForm
                    store={this.props.store}
                    fieldValues={fieldValues}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    name = {fieldValues.person.name}/>

                break;
            case 5:
                content = <GeneralPractitioner
                    store={this.props.store}
                    fieldValues={fieldValues}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 6:
                content = < AddDependent
                    store={this.props.store}
                    fieldValues = {fieldValues}
                    previousStep = {this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 7:
                content = < NeedsForm
                    store={this.props.store}
                    fieldValues={this.props.fieldValues}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;

            case 8:
                content = < SpecialNeeds
                    store={this.props.store}
                    fieldValues = {fieldValues}
                    previousStep = {this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    saveUserData={this.saveUserData}
                    submitRegistration={this.handleSubmit}/>;
                break;
            case 9:
                content = < SubmitSuccess
                    store={this.props.store}
                    fieldValues = {fieldValues}
                    previousStep = {this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    userData={userData}
                    submitRegistration={this.handleSubmit}/>;
        }

        return (
            <div>
                <p> Logget inn som: {userData.name} </p>
                {header}
                <Col className="well application-wrapper" mdOffset={2} lgOffset={2} smOffset={2} xsOffset={1} md={8} xs={10} sm={8} lg={8}>
                    <Col md={11} xs={11} sm={11} lg={11} mdOffset={1} lgOffset={1} smOffset={1} xsOffset={1}>
                        {content}
                    </Col>
                </Col>
            </div>
        )
    }
}
