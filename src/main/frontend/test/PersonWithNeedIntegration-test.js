import React from 'react'

// See README for discussion of chai, enzyme, and sinon
import { expect } from 'chai';
import { mount , shallow } from 'enzyme';
import PersonWithNeed from '../app/FormPages/PersonWithNeedForm';

/**
 * In this file we're doing an integration test. Thus we need to hook up our
 * form component to Redux and Redux-Form. To do that, we need to create the
 * simplest redux store possible that will work with Redux-Form.
 */
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';

/**
 * To be able to find and work with the bootstrap-elements, they need to be implemented here as well.
 * (Not only in the classes we want to test)
 */
var FormControl = require('react-bootstrap/lib/FormControl');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

/**
 * Describe is the start of the test-class. Since we want to test ApplicationIntegration, we
 * note this in quotation marks (this is the name of the test)
 */
describe("PersonWithNeedIntegration", () => {
    let store = null;
    let subject = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        store = createStore(combineReducers({ form: formReducer }));
        // the fields that are individual for each page
        const props = {
            store
        };
        //Renders the PersonWithNeed with props
        subject = mount(<PersonWithNeed {...props}/>);
    });

    /**
     * A test is described with the text in the quotation marks, and this will also be
     * what the test is called when run in Karma. If you want to look at one particular test
     * you just find the description under the name of the test-class.
     */
    it("Shows errormessage when only pnr have correct value, and checkbox is not checked", function () {
        //Expect the rendered PersonWithNeed to exist
        expect(subject).to.have.length(1);

        const name = subject.find('.formName');
        const pnr = subject.find('.formPnr');
        // We change the value to a correct value and expect no errormessage
        name.simulate('change', {target: {value: ''}});
        pnr.simulate('change', {target: {value: '01108019146'}});

        // Need to push button to be able to maybe see the error message. And the button is supposed to be of
        // the type disabledButton, and not next-btn
        const nextButton = subject.find('.disabledButton-nxt');
        expect (nextButton).to.have.length.of(1);
        nextButton.simulate('click');

        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
        expect(errorMessage.text()).to.equal("Vennligst fyll inn fullt navn.");
    });

    it("Shows errormessage when only name have correct value, and checkbox is not checked", function () {
        //Expect the rendered PersonWithNeed to exist
        expect(subject).to.have.length(1);

        const name = subject.find('.formName');
        const pnr = subject.find('.formPnr');
        // We change the value to a correct value and expect no errormessage
        name.simulate('change', {target: {value: 'Eldar'}});
        pnr.simulate('change', {target: {value: ''}});

        // Need to push button to be able to maybe see the error message. And the button is supposed to be of
        // the type disabledButton, and not next-btn
        const nextButton = subject.find('.disabledButton-nxt');
        expect (nextButton).to.have.length.of(1);
        nextButton.simulate('click');

        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
        expect(errorMessage.text()).to.equal("Vennligst fyll inn et ellevesifret fødselsnummer.");
    });

    /**
     * In this file we do not have access to a server, so we are not able to test if
     *  the application shows an errormessage when name and pnr is not matching, and checkbox is not checked
     */

    it("Do not show error message when name has a valid value and checkbox is checked", function () {
        //Expect the rendered PersonWithNeed to exist
        expect(subject).to.have.length(1);

        const name = subject.find('.formName');
        // We change the value to a correct value and expect no errormessage
        name.simulate('change', {target: {value: 'Eldar'}});

        const checkBox = subject.find('input[type="checkbox"]');
        expect (checkBox).to.have.length(1);
        checkBox.simulate('change',{ target: { value: true } });

        // Need to push button to be able to maybe see the error message. And the button is supposed to be of
        // the type next-btn, and not disabledButton. If there exists a next-btn, we are able to move forward.
        const nextButton = subject.find('.next-btn');
        expect (nextButton).to.have.length.of(1);
    });
});