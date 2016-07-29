/**
 * Created by camp-vha on 11.07.2016.
 */

import React from 'react'

// See README for discussion of chai, enzyme, and sinon
import { expect } from 'chai';
import { mount } from 'enzyme';
import PersonWithNeedInfo from '../app/FormPages/PersonWithNeedInfoForm';

// In this file we're doing an integration test. Thus we need to hook up our
// form component to Redux and Redux-Form. To do that, we need to create the
// simplest redux store possible that will work with Redux-Form.
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';

var FormControl = require('react-bootstrap/lib/FormControl');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

var Collapse = require('react-bootstrap/lib/Collapse');
var Alert = require('react-bootstrap/lib/Alert');

//Added these values from Application to simulate that this file have received these values from Application,
// because it is dependent on these Application values
var fieldValues = {
    // First form
    applyingForSelf: null,    // Boolean
    // Second form
    relation: null,             // String
    guardianName: null,          //String
    typeOfRelation: null,        //String
    dependent: null,          // Boolean
    dontGotPNRnumber: false,        //Boolean
    // Third form
    person: {                   // Person object
        pnr: null,                  // String
        name: null,                 // String
        address: {                  // Address Object
            country: "NO",              // String
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
    medicalNeeds: null,         // String
    conditionChanges: null,     // String
    otherNeeds: null            // String
};

describe("PersonWithNeedInfoIntegration", () => {
    let store = null;
    let subject = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each page
        store = createStore(combineReducers({ form: formReducer }));

        const props = {
            store,
            fieldValues
        };
        //Renders the PersonWithNeedInfo with props
        subject = mount(<PersonWithNeedInfo {...props}/>);
    });

    it("Do not show error message before next-button is pused", () => {
        //expect wrapper to exist
        expect(subject).to.have.length(1);

        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(0);
        //expect(errorMessage.text()).to.equal("Dette er ikke et gyldig telefonnummer");
    });

    it("Do not show error message when all fields contains correct input", () => {
        expect(subject).to.have.length(1);

        const nameField = subject.find('.nameField');
        expect(nameField).to.have.length(1);
        // We change the value to a correct value and expect no errormessage
        nameField.simulate('change', {target: {value: "name"}});

        const adrField = subject.find('.adressField');
        expect(adrField).to.have.length(1);
        adrField.simulate('change', {target: {value: "adr"}});

        const zipcode = subject.find('.zipcode');
        expect(zipcode).to.have.length(1);
        zipcode.simulate('change', {target: {value: "6055"}});

        const tlfFrom = subject.find('.tlfFrom');
        expect(tlfFrom).to.have.length(1);
        tlfFrom.simulate('change', {target: {value: "152 34 564"}});

        const errorMessage = subject.find('.error');
        expect(errorMessage).to.have.length.of(0);
    });

    it("Shows error message when fields contain no input and next-button is pressed", () => {
        //expect wrapper to exist
        expect(subject).to.have.length(1);

        const nextButton = subject.find('.disabledButton-nxt');
        expect (nextButton).to.have.length.of(1);

        nextButton.simulate('click');

        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
    });

});

