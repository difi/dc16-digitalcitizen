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
import {reduxForm} from 'redux-form';
import $ from 'jquery';
import RESTpaths from './static_data/RESTpaths.js';

export const fields = [
    "applyingForSelf",
    "pnr",
    "name",
    "checked",
    "number",
    "street",
    "zipcode",
    "postal",
    "municipality",
    "doctorName",
    'form1.name',
    'form1.mail',
    'form1.phone',
    'form1.relation',
    'form2.show',
    'form2.name',
    'form2.mail',
    'form2.phone',
    'form2.relation',
    'form3.show',
    'form3.name',
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
    "homeApp",
    "setDependent",
    'guardianPnr'
];

// TODO: Update object fields to match the form data & make matching model(s) on the server.

// add test values somewhere in here
export class ApplicationClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            prevStep: 1,
            userData: props.userData
        };
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.saveUserData = this.saveUserData.bind(this);
        this.saveDependents = this.saveDependents.bind(this);
        this.saveValuesFromRedux = this.saveValuesFromRedux.bind(this);
        this.resetDependent = this.resetDependent.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.props.fields.guardianPnr.onChange(this.state.userData.pnr);
        this.getUserData();

        /**
         * The following if-sentences needs to be commented out of the code if the ApplicationIntegration-test is going to run as expected
         */

         if (this.props.fields.applyingForSelf.onChange()) {
         this.testScriptPerson();
         }

         if (this.props.fields.relation.onChange()) {
         this.testScriptRelations();
         }

         //dependent form 1
         if (this.props.fields.form1.name.onChange()) {
         this.testScriptAddDependent1();
         }
         //dependent form 2
         if (this.props.fields.form2.name.onChange()) {
         this.testScriptAddDependent2();
         }
         //dependent form 3
         if (this.props.fields.form3.name.onChange()) {
         this.testScriptAddDependent3();
         }
    }

    /**
     * Functions for person applied for; adding relations; forms for dependents.
     */
    testScriptPerson() {

        //person with need
        this.props.fields.applyingForSelf.onChange();
        this.props.fields.pnr.onChange("15028047425");
        this.props.fields.name.onChange("Elias Eliassen");
        this.props.fields.checked.onChange(true); //check box for pnr
        this.props.fields.number.onChange("99999991");
        this.props.fields.street.onChange("testveien 2");
        this.props.fields.zipcode.onChange("7030");
        this.props.fields.postal.onChange("Trondheim");
        this.props.fields.municipality.onChange("Trondheim");
        this.props.fields.doctorName.onChange("Tore");

        //needs form
        this.props.fields.need.onChange("long");
        this.props.fields.medical.onChange("No");
        this.props.fields.changes.onChange("No");
        this.props.fields.other.onChange("No");

        //
        this.props.fields.displayButton.onChange();

        //
        this.props.fields.form1.depOtherRelation.onChange();
        this.props.fields.form2.depOtherRelation.onChange();
        this.props.fields.form3.depOtherRelation.onChange();

        //
        this.props.fields.numDep.onChange(1);
        this.props.fields.municipalityApp.onChange();
        this.props.fields.homeApp.onChange();
    }

    testScriptRelations() {
        //relations
        this.props.fields.relation.onChange(); //guardian; family; other for choosing radio button
        this.props.fields.typeOfRelation.onChange();
        this.props.fields.nameOfChild.onChange();
        this.props.fields.dependent.onChange(false); //true for register as dependent
        this.props.fields.otherRelation.onChange();
        this.props.fields.guardianFor.onChange();
    }

    testScriptAddDependent1() {
        //add dependent
        this.props.fields.form1.name.onChange("Solfrid Solfridsen");
        this.props.fields.form1.phone.onChange("99999995");
        this.props.fields.form1.mail.onChange("test@test.com");
        this.props.fields.form1.relation.onChange("Søsken");
    }

    testScriptAddDependent2() {
        this.props.fields.form2.name.onChange("Mia Miasen");
        this.props.fields.form2.phone.onChange("99999993");
        this.props.fields.form2.mail.onChange("test@test.sexy");
        this.props.fields.form2.relation.onChange("Barn");
    }

    testScriptAddDependent3() {
        this.props.fields.form3.name.onChange("Vegard den tøffe gutten");
        this.props.fields.form3.phone.onChange("99999996");
        this.props.fields.form3.mail.onChange("test@test.no");
        this.props.fields.form3.relation.onChange("Barn");
    }

    getUserData() {
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
                this.props.fields.guardianPnr.onChange(data.pnr)
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    //This function exists as callback to the forms that may change the value of dependent. It exists to reset the dependent form that may have been autofilled. Very specific use-case.
    resetDependent() {
        const {fields: {form1}} = this.props;
        form1.name.onChange(null);
        form1.phone.onChange(null);
        form1.mail.onChange(null);
        form1.relation.onChange(null);
        form1.depOtherRelation.onChange(null)
    }

    saveDependents() {
        const {fields: {form1, form2, form3, numDep}} = this.props;
        var form2Data = null;
        var form3Data = null;
        var form1Data = {
            name: form1.name.value,
            telephone: form1.phone.value,
            email: form1.mail.value,
            relation: form1.relation.value,
            depOtherRelation: form1.depOtherRelation.value
        };
        if (numDep.value >= 2) {
            form2Data = {
                name: form2.name.value,
                telephone: form2.phone.value,
                email: form2.mail.value,
                relation: form2.relation.value,
                depOtherRelation: form2.depOtherRelation.value
            }
        }
        if (numDep.value >= 3) {
            form3Data = {
                name: form3.name.value,
                lastName: form3.lastName.value,
                telephone: form3.phone.value,
                email: form3.mail.value,
                relation: form3.relation.value,
                depOtherRelation: form3.depOtherRelation.value
            }
        }
        return [form1Data, form2Data, form3Data];
    }

    saveValuesFromRedux() {
        const {fields: {applyingForSelf, pnr, name, checked, number, street, zipcode, postal, municipality, doctorName, form1, form2, form3, relation, typeOfRelation, nameOfChild, dependent, otherRelation, guardianFor, need, medical, changes, other, municipalityApp, homeApp, guardianPnr}} = this.props;
        var dependents = this.saveDependents();

        //fixes Special Needs Values so they will fit the pdf.
        var med = medical.value;
        var cha = changes.value;
        var oth = other.value;

        if (medical.value) {
            med = med.replace(/[\n]/g, '. ');
        }
        if (changes.value) {
            cha = cha.replace(/[\n]/g, '. ');
        }
        if (other.value) {
            oth = oth.replace(/[\n]/g, '. ');
        }

        var fields = {
            applyingForSelf: applyingForSelf.value,                     // Boolean
            relation: relation.value,                                   // String
            guardianName: nameOfChild.value,                            // String
            typeOfRelation: typeOfRelation.value,                       // String
            dependent: dependent.value,                                 // Boolean
            dontGotPNRnumber: checked.value,                            // Boolean
            person: {                                                   // Person object
                pnr: pnr.value,                                             // String
                name: name.value,                                           // String
                address: {                                                  // Address Object
                    country: "NO",                                              // String
                    municipality: municipality.value,                           // String
                    street: street.value,                                       // String
                    zipcode: zipcode.value,                                     // String
                    postal: postal.value                                        // String
                },
                telephone: number.value,                                    // String
                doctor: {                                                   // Doctor Object
                    name: doctorName.value                                      // String
                }
            },
            dependents: dependents,                                     // List of Dependent objects { name: '', address: '', telephone: ''}
            lengthOfStay: need.value,                                   // String
            medicalNeeds: med,                                          // String
            conditionChanges: cha,                                      // String
            otherNeeds: oth,                                            // String
            nursingHome: {                                              // NursingHome Object
                municipality: municipalityApp.value,                        // String
                name: homeApp.value                                         // String
            },
            guardianPnr: guardianPnr.value
        };
        console.log("Returning fields");
        return fields
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

    render() {
        var header = <PageHeader>Søk sykehjemsplass</PageHeader>;
        var content;
        var userData = this.state.userData;

        switch (this.state.step) {
            case 1:
                content = <WhosSearching
                    store={this.props.store}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    userData={userData}
                    resetDep={this.resetDependent}/>;
                break;
            case 2:
                content = <RelationForm
                    store={this.props.store}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    userData={userData}
                    resetDep={this.resetDependent}/>;

                break;
            case 3:
                content = <PersonWithNeedForm
                    store={this.props.store}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 4:
                content = <PersonWithNeedInfoForm
                    store={this.props.store}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 5:
                content = <GeneralPractitioner
                    store={this.props.store}
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
                        previousStep={this.previousStep}
                        nextStep={this.nextStep}
                        saveValues={this.saveValues}
                        saveUserData={this.saveUserData}
                        submitRegistration={this.handleSubmit}
                        newFieldValues={this.saveValuesFromRedux}/>;
                break;
            case 10:
                content =
                    < SubmitSuccess
                        store={this.props.store}
                        name={this.props.fields.name.value}
                        previousStep={this.previousStep}
                        nextStep={this.nextStep}
                        saveValues={this.saveValues}
                        userData={userData}
                        submitRegistration={this.handleSubmit}/>;
                break;
        }
        /* className="well application-wrapper"*/
        return (
            <div>
                <Navbar staticTop>
                    <Row>
                        <Col mdOffset={3} lgOffset={3} smOffset={2}>
                            <Navbar.Header className="nav-header">
                                <Navbar.Brand>
                                    <a href=".">DigitalCitizen</a>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                        </Col>
                        <Col>
                            <Navbar.Collapse>
                                <Navbar.Text>
                                    Logget inn som: <Navbar.Link href="#">{userData.name}</Navbar.Link>
                                </Navbar.Text>
                            </Navbar.Collapse>
                        </Col>
                    </Row>
                </Navbar>
                <div className="container">
                    <Col mdOffset={3} lgOffset={3} smOffset={2} xsOffset={0} md={6}
                         xs={12} sm={8} lg={6}> {header} </Col>
                    <Col mdOffset={3} lgOffset={3} smOffset={2} xsOffset={0} md={6}
                         xs={12} sm={8} lg={6}>
                        <Col md={11} xs={11} sm={11} lg={11} mdOffset={1} lgOffset={1} smOffset={1} xsOffset={1}>
                            {content}
                        </Col>
                    </Col>
                    <Col className="footer" mdOffset={3} lgOffset={3} smOffset={2} xsOffset={0} md={6}
                         xs={12} sm={8} lg={6}>
                        <div className="footer-wrapper">
                            <p className="footer-text"> Tlf: 800 30 300 | Driftet av Direktoratet for forvaltning og IKT(Difi)</p>
                        </div>
                    </Col>
                </div>
            </div>
        )
    }
}

ApplicationClass.propTypes = {
    userData: React.PropTypes.object.isRequired
};

/**
 * Sets up reduxForm - needs fields and validation functions
 */
const Application = reduxForm({
    form: 'application',
    fields: fields,
    destroyOnUnmount: false,
})(ApplicationClass);

export default Application