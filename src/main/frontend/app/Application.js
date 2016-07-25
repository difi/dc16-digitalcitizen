"use strict";

import React from 'react';
import {Form} from './unused/Form.jsx';
//require('!style!css!less!./Application.less');

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
import $ from 'jquery';
import RESTpaths from './static_data/RESTpaths.js';

// TODO: Update object fields to match the form data & make matching model(s) on the server.


class Application extends React.Component {

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

        this.getUserData = this.getUserData.bind(this);
        this.getUserData();
    }


    getUserData(){
        $.ajax({
            url: RESTpaths.PATHS.USER_BASE,
            dataType: 'json',
            cache: false,
            success: function (data) {
                var user = {
                    pnr: data.pnr,
                    name: data.name

                };

                this.saveUserData(user);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
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

Application.propTypes = {
    fieldValues: React.PropTypes.object.isRequired,
    userData: React.PropTypes.object.isRequired
};


export default Application