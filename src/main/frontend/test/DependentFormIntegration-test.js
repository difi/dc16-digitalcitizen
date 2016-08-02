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

/*
* If the errormessage does not exists you are able to move to the next page.
* This functionality is tested in ApplicationIntegration-test
*/
describe("DependentFormIntegration", () => {
    let store = null;
    let subject = null;
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        store = createStore(combineReducers({ form: formReducer }));

        const props = {
            store,
            name: 'ds',
            mail: {value: '', error: " ", touched: false},
            phone: {value: '', error: " ", touched: false},
            relation: {value: ''},
            fieldValues: {fieldValues},
            showDeleteButton: true
        };
        subject = mount(<AddDependent {...props}/>);
        // Find the first element of DependentForm in AddDependent.
        wrapper = subject.find(DependentForm).first();
    });

    /*
    * Was not able to set the correct value for the DropdownList, so this will alway be wrong.
    */

    it("Shows error message when name and relation fields has wrong input", () => {
        //expect wrapper to exist
        expect(wrapper).to.have.length(1);

        //Need to fill in valid info into the fields we are not going to test
        const name = wrapper.find(".nameField");
        expect (name).to.have.length(1);
        name.simulate('change', {target: {value: "O"}});

        //Need to fill in valid info into the fields we are not going to test
        const tlf = wrapper.find('.tlfForm');
        expect(tlf).to.have.length(1);
        tlf.simulate('change', {target: {value: "123 45 678"}});

        // Need to fill in unvalid info into the fields we want to get errormessage from
        const mail = wrapper.find('.mailForm');
        expect(mail).to.have.length(1);
        mail.simulate('change', {target: {value: "fgf@gmail.com"}});

        // Need to fill in unvalid info into the fields we want to get errormessage from
        const rel = wrapper.find('.depRel');
        expect(rel).to.have.length(1);
        rel.simulate('change', {target: {value: "K"}});

        const nextButton = subject.find('.disabledButton-nxt');
        expect(nextButton).to.have.length.of(1);
        nextButton.simulate('click');

        const errorMessage = wrapper.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
        expect(errorMessage.text()).to.equal("Vennligst fyll inn fullt navn, relasjon, før du kan gå videre.");

    });


    it("Shows error message when email and relation fields has wrong input", () => {
        //expect wrapper to exist
        expect(wrapper).to.have.length(1);

        //Need to fill in valid info into the fields we are not going to test
        const name = wrapper.find(".nameField");
        expect (name).to.have.length(1);
        name.simulate('change', {target: {value: "Ola"}});

        //Need to fill in valid info into the fields we are not going to test
        const tlf = wrapper.find('.tlfForm');
        expect(tlf).to.have.length(1);
        tlf.simulate('change', {target: {value: "123 45 678"}});

        // Need to fill in unvalid info into the fields we want to get errormessage from
        const mail = wrapper.find('.mailForm');
        expect(mail).to.have.length(1);
        mail.simulate('change', {target: {value: ""}});

        // Need to fill in unvalid info into the fields we want to get errormessage from
        const rel = wrapper.find('.depRel');
        expect(rel).to.have.length(1);
        rel.simulate('change', {target: {value: "K"}});

        const nextButton = subject.find('.disabledButton-nxt');
        expect(nextButton).to.have.length.of(1);
        nextButton.simulate('click');

        const errorMessage = wrapper.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
        expect(errorMessage.text()).to.equal("Vennligst fyll inn en epostadresse på formatet \"epost-id@domene-navn\", relasjon, før du kan gå videre.");

    });

    it("Shows error message when telephone and relation fields has wrong input", () => {
        //expect wrapper to exist
        expect(wrapper).to.have.length(1);

        //Need to fill in valid info into the fields we are not going to test
        const name = wrapper.find(".nameField");
        expect (name).to.have.length(1);
        name.simulate('change', {target: {value: "Ola"}});

        // Need to fill in unvalid info into the fields we want to get errormessage from
        const tlf = wrapper.find('.tlfForm');
        expect(tlf).to.have.length(1);
        tlf.simulate('change', {target: {value: "123"}});

        //Need to fill in valid info into the fields we are not going to test
        const mail = wrapper.find('.mailForm');
        expect(mail).to.have.length(1);
        mail.simulate('change', {target: {value: "fgf@gmail.com"}});

        // Need to fill in unvalid info into the fields we want to get errormessage from
        const rel = wrapper.find('.depRel');
        expect(rel).to.have.length(1);
        rel.simulate('change', {target: {value: "K"}});

        const nextButton = subject.find('.disabledButton-nxt');
        expect(nextButton).to.have.length.of(1);
        nextButton.simulate('click');

        const errorMessage = wrapper.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
        expect(errorMessage.text()).to.equal("Vennligst fyll inn et åttesifret telefonnummer, relasjon, før du kan gå videre.");

    });

});