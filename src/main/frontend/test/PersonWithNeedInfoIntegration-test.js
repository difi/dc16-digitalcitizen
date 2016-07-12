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

describe("Integration of PersonWithNeedInfoForm", () => {
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

    it("Shows error message when field contains wrong input", () => {
        //expect wrapper to exist
        expect(subject).to.have.length(1);

        const input = subject.find('.tlfFrom');

        // Our form component only shows error messages (help text) if the
        // field has been touched. To mimic touching the field, we simulate a
        // blur event, which means the input's onBlur method will run, which
        // will call the onBlur method supplied by Redux-Form.
        input.simulate('blur');
        // We change the value to a new incorrect value and expect an errormessage
        input.simulate('change', {target: {value: "1234567"}});

        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
        expect(errorMessage.text()).to.equal("Dette er ikke et gyldig telefonnummer");
    });

    it("Do not show error message when field contains wrong input", () => {
        expect(subject).to.have.length(1);

        const input = subject.find('.tlfFrom');

        // Our form component only shows error messages (help text) if the
        // field has been touched. To mimic touching the field, we simulate a
        // blur event, which means the input's onBlur method will run, which
        // will call the onBlur method supplied by Redux-Form.
        input.simulate('blur');
        // We change the value to a new incorrect value and expect an errormessage
        input.simulate('change', {target: {value: "123 45 678"}});

        const errorMessage = subject.find('.error');
        expect(errorMessage).to.have.length.of(0);
    });

});

