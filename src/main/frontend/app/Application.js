"use strict";

import React, {Component, PropTypes} from 'react';

import $ from 'jquery';
import {Form} from './unused/Form.jsx';
//require('!style!css!less!./Application.less');

import {reduxForm} from 'redux-form';

var assign = require('object-assign');
import WhosSearching from './FormPages/WhosSearchingForm.js';

import PersonWithNeedInfoForm from './FormPages/PersonWithNeedInfoForm';
var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Navbar = require('react-bootstrap/lib/Navbar');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');
var Button = require('react-bootstrap/lib/Button');
import RelationForm from './FormPages/RelationForm';
import PersonWithNeedForm from './FormPages/PersonWithNeedForm';
import GeneralPractitioner from './FormPages/GeneralPractitioner';
import LocationPage from './FormPages/LocationPage';
import SpecialNeeds from './FormPages/SpecialNeeds';
import NeedsForm from'./FormPages/NeedsForm';
import AddDependent from './FormPages/AddDependent';
import SubmitSuccess from './FormPages/SubmitPage';


export const fields=[
        "pnr",
        "name",
        "checked" ,
        "number",
        "street",
        "zipcode",
        "postal",
        "municipality",
        'form1.firstName',
        'form1.lastName',
        'form1.mail',
        'form1.phone',
        'form1.relation',
        'form2.show',
        'form2.firstName',
        'form2.lastName',
        'form2.mail',
        'form2.phone',
        'form2.relation',
        'form3.show',
        'form3.firstName',
        'form3.lastName',
        'form3.mail',
        'form3.phone',
        'form3.relation',
        'displayButton',
        'form1.depOtherRelation',
        'form2.depOtherRelation',
        'form3.depOtherRelation',
        'numDep',
        "relation",
        "typeOfRelation",
        "nameOfChild",
        "dependent",
        "otherRelation",
        "guardianFor",
        "need",
        "medical",
        "changes",
        "other",
        "municipalityApp",
        "homeApp"
];

/*
const data = {
    "pnr":"04119149261",
    "name":"Kari",
    "checked":true,
    "number":"81549300",
    "street":"Kjuttavika 1",
    "zipcode":"7030",
    "postal",
    "municipality":"Trondheim",
    'form1.firstName',
    'form1.lastName',
    'form1.mail',
    'form1.phone',
    'form1.relation',
    'form2.show',
    'form2.firstName',
    'form2.lastName',
    'form2.mail',
    'form2.phone',
    'form2.relation',
    'form3.show',
    'form3.firstName',
    'form3.lastName',
    'form3.mail',
    'form3.phone',
    'form3.relation',
    'displayButton',
    'form1.depOtherRelation',
    'form2.depOtherRelation',
    'form3.depOtherRelation',
    'numDep',
    "relation",
    "typeOfRelation",
    "nameOfChild",
    "dependent",
    "otherRelation",
    "guardianFor",
    "need",
    "medical",
    "changes",
    "other",
    "municipalityApp",
    "homeApp"
};
*/

// TODO: Update object fields to match the form data & make matching model(s) on the server.


class Application extends React.Component {
// add test values somewhere in here
    constructor(props) {
        super(props);

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
        this.props.fields.name.onChange("test");

    }


    saveValues(field_value) {
        this.setState({
            fieldValues: assign({}, this.state.fieldValues, field_value)
        });
        console.log(this.state.fieldValues);
        return assign({}, this.state.fieldValues, field_value)
    }


    saveUserData(field_value) {
        this.setState({
            userData: assign({}, this.state.userData, field_value)
        });
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
        var fieldValues = this.state.fieldValues;
        var userData = this.state.userData;

        switch (this.state.step) {
            case 1:
                content = <WhosSearching
                    store={this.props.store}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    userData={userData}/>;
                break;
            case 2:
                content = <RelationForm
                    store={this.props.store}
                    fieldValues={fieldValues}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    userData={userData}/>;

                break;
            case 3:
                content = <PersonWithNeedForm
                    store={this.props.store}
                    fieldValues={fieldValues}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    name={fieldValues.person.name}/>;
                break;
            case 4:
                content = <PersonWithNeedInfoForm
                    store={this.props.store}
                    fieldValues={fieldValues}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    name={fieldValues.person.name}/>;
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
                    fieldValues={fieldValues}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    userData={userData}/>;
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
                    fieldValues={fieldValues}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    saveUserData={this.saveUserData}/>;

                break;
            case 9:
                content =
                    < LocationPage
                        store={this.props.store}
                        fieldValues={fieldValues}
                        previousStep={this.previousStep}
                        nextStep={this.nextStep}
                        saveValues={this.saveValues}
                        saveUserData={this.saveUserData}
                        submitRegistration={this.handleSubmit}/>;
                break;
            case 10:
                content =
                    < SubmitSuccess
                        store={this.props.store}
                        fieldValues={fieldValues}
                        previousStep={this.previousStep}
                        nextStep={this.nextStep}
                        saveValues={this.saveValues}
                        userData={userData}
                        submitRegistration={this.handleSubmit}/>
                break;
        }

        return (
            <div className="container">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href=".">Digitalcitizen</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Navbar.Text>
                            Logget inn som: <Navbar.Link href="#">{userData.name}</Navbar.Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                {header}
                <Col className="well application-wrapper" mdOffset={3} lgOffset={3} smOffset={3} xsOffset={2} md={6}
                     xs={8} sm={6} lg={6}>
                    <Col md={11} xs={11} sm={11} lg={11} mdOffset={1} lgOffset={1} smOffset={1} xsOffset={1}>
                        {content}
                    </Col>
                </Col>
            </div>
        )
    }
}

/*
Application.propTypes = {
    fields: PropTypes.object.isRequired,
    fieldValues: React.PropTypes.object.isRequired,
    userData: React.PropTypes.object.isRequired
};

export default reduxForm({
    form:'application',
    fields
},
    state => ({initialValues: state.app.data
    }),
    {load:}
)(Application)
*/

 Application.propTypes = {
 fieldValues: React.PropTypes.object.isRequired,
 userData: React.PropTypes.object.isRequired
 };

const ApplicationAutofill = reduxForm({
 form: 'application',
    fields: fields,
    //initialValues: ,
    destroyOnUnmount: false,
 })(Application);


//export default ApplicationAutofill

export default ApplicationAutofill