/**
 * Created by camp-vha on 11.07.2016.
 */

import React from 'react'

// See README for discussion of chai, enzyme, and sinon
import { expect } from 'chai';
import { mount } from 'enzyme';
import AddDependent from '../app/FormPages/AddDependent';
import DependentForm from '../app/FormPages/Components/DependentForm'

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

describe("DependentFormIntegration", () => {
    let store = null;
    let subject = null;
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        store = createStore(combineReducers({ form: formReducer }));

        const props = {
            store,
            fieldValues
        };
        subject = mount(<AddDependent {...props}/>);
        // Find the first element of DependentForm in AddDependent.
        wrapper = subject.find(DependentForm).first();
    });
    it("Shows error message when telephone field is touched", () => {
        //expect wrapper to exist
        expect(wrapper).to.have.length(1);

        // Find the element with classname "tlfForm
        const input = wrapper.find('.tlfForm');
        expect(input).to.have.length(1);

        // Our form component only shows error messages (help text) if the
        // field has been touched. To mimic touching the field, we simulate a
        // blur event, which means the input's onBlur method will run, which
        // will call the onBlur method supplied by Redux-Form.
        input.simulate('blur');
        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
        expect(errorMessage.text()).to.equal("Dette er ikke et gyldig telefonnummer");

    });

    it("Do not show error message when telephone field has correct value", () => {
        expect(wrapper).to.have.length(1);

        const input = wrapper.find('.tlfForm');
        expect(input).to.have.length(1);

        input.simulate('blur');
        input.simulate('change', {target: {value: "123 45 678"}});
        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(0);
        //expect(errorMessage.text()).to.equal("Dette er ikke et gyldig telefonnummer");
    });

    it("Shows error message when email field is touched", () => {
        expect(wrapper).to.have.length(1);

        const input = wrapper.find('.mailForm');
        expect(input).to.have.length(1);

        input.simulate('blur');
        input.simulate('change', {target: {value: "email"}});
        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
        expect(errorMessage.text()).to.equal("Dette er ikke en gyldig epostadresse");


    });

    it("Do not show error message when email field has correct value", () => {
        expect(wrapper).to.have.length(1);

        const input = wrapper.find('.mailForm');
        expect(input).to.have.length(1);

        input.simulate('blur');
        input.simulate('change', {target: {value: "vh@f.no"}});
        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(0);
    });

});