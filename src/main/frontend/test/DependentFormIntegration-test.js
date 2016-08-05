import React from 'react'

// See README for discussion of chai, enzyme, and sinon
import { expect } from 'chai';
import { mount } from 'enzyme';
import AddDependent from '../app/FormPages/AddDependent';
import DependentForm from '../app/FormPages/Components/DependentForm'

/**
 * In this file we're doing an integration test. Thus we need to hook up our
 * form component to Redux and Redux-Form. To do that, we need to create the
 * simplest redux store possible that will work with Redux-Form.
 */
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';

var FormControl = require('react-bootstrap/lib/FormControl');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

/**
 * In this test we look for errormessages when they are supposed to show, and see if they do not
 * shoow if they are not supposed to.
 * If the errormessage does not exists you are able to move to the next page.
 * This functionality is tested in ApplicationIntegration-test, and not here.
 *
 * Describe is the start of the test-class. Since we want to test AddDependent, we
 * note this in quotation marks (this is the name of the test)
 */
describe("DependentFormIntegration", () => {
    let store = null;
    let subject = null;
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        store = createStore(combineReducers({ form: formReducer }));

        // the fields that are individual for each page inside this program
        const props = {
            store,
            name: 'ds',
            mail: {value: '', error: " ", touched: false},
            phone: {value: '', error: " ", touched: false},
            relation: {value: ''},
            showDeleteButton: true
        };
        //Renders the AddDependent-class with the given props
        subject = mount(<AddDependent {...props}/>);
        /**
         * Find the first element of DependentForm in AddDependent, because
         * this is the form we want to test, but we still need the props and
         * functionality of AddDependent to be able to test the integration
         */
        wrapper = subject.find(DependentForm).first();
    });

    /**
    * Was not able to set the correct value for the DropdownList, so this input
     * will never be valid.
    */

    /**
     * A test is described with the text in the quotation marks, and this will also be
     * what the test is called when run in Karma. If you want to look at one particular test
     * you just find the description under the name of the test-class.
     */
    it("Shows error message when name and relation fields has wrong input", () => {
        //Expect the rendered DependentForm to exist
        expect(wrapper).to.have.length(1);

        // Need to fill in unvalid info into the fields we want to get errormessage from
        const name = wrapper.find(".nameField");
        expect (name).to.have.length(1);
        name.simulate('change', {target: {value: "O"}});

        //Need to fill in valid info into the fields we are not going to test
        const tlf = wrapper.find('.tlfForm');
        expect(tlf).to.have.length(1);
        tlf.simulate('change', {target: {value: "123 45 678"}});

        //Need to fill in valid info into the fields we are not going to test
        const mail = wrapper.find('.mailForm');
        expect(mail).to.have.length(1);
        mail.simulate('change', {target: {value: "fgf@gmail.com"}});

        // Need to fill in unvalid info into the fields we want to get errormessage from
        const rel = wrapper.find('.depRel');
        expect(rel).to.have.length(1);
        rel.simulate('change', {target: {value: "K"}});

        //Find the disabled button, and click it
        const nextButton = subject.find('.disabledButton-nxt');
        expect(nextButton).to.have.length.of(1);
        nextButton.simulate('click');

        //After the click, we are supposed to find an errormessage with the following text.
        const errorMessage = wrapper.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
        expect(errorMessage.text()).to.equal("Vennligst fyll inn fullt navn, relasjon, før du kan gå videre.");
    });


    it("Shows error message when email and relation fields has wrong input", () => {
        //Expect the rendered DependentForm to exist
        expect(wrapper).to.have.length(1);

        //Need to fill in valid info into the fields we are not going to test
        const name = wrapper.find(".nameField");
        expect (name).to.have.length(1);
        name.simulate('change', {target: {value: "Ola Nordmann"}});

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

        //Find the disabled button, and click it
        const nextButton = subject.find('.disabledButton-nxt');
        expect(nextButton).to.have.length.of(1);
        nextButton.simulate('click');

        //After the click, we are supposed to find an errormessage with the following text.
        const errorMessage = wrapper.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
        expect(errorMessage.text()).to.equal("Vennligst fyll inn en epostadresse (eksempel: kari@eksempel.no), relasjon, før du kan gå videre.");
    });

    it("Shows error message when telephone and relation fields has wrong input", () => {
        //Expect the rendered DependentForm to exist
        expect(wrapper).to.have.length(1);

        //Need to fill in valid info into the fields we are not going to test
        const name = wrapper.find(".nameField");
        expect (name).to.have.length(1);
        name.simulate('change', {target: {value: "Ola Nordmann"}});

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

        //Find the disabled button, and click it
        const nextButton = subject.find('.disabledButton-nxt');
        expect(nextButton).to.have.length.of(1);
        nextButton.simulate('click');

        //After the click, we are supposed to find an errormessage with the following text.
        const errorMessage = wrapper.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
        expect(errorMessage.text()).to.equal("Vennligst fyll inn et åttesifret telefonnummer, relasjon, før du kan gå videre.");
    });
});