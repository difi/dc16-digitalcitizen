import React from 'react'

// See README for discussion of chai, enzyme, and sinon
import { expect } from 'chai';
import { mount } from 'enzyme';
import PersonWithNeedInfo from '../app/FormPages/PersonWithNeedInfoForm';

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
var Collapse = require('react-bootstrap/lib/Collapse');
var Alert = require('react-bootstrap/lib/Alert');

/**
 * In this test we look for errormessages when they are supposed to show, and see if they do not
 * shoow if they are not supposed to.
 * If the errormessage does not exists you are able to move to the next page.
 * This functionality is tested in ApplicationIntegration-test, and not here.
 *
 * Describe is the start of the test-class. Since we want to test ApplicationIntegration, we
 * note this in quotation marks (this is the name of the test)
 */
describe("PersonWithNeedInfoIntegration", () => {
    let store = null;
    let subject = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each page
        store = createStore(combineReducers({ form: formReducer }));

        // the fields that are individual for each page inside this program
        const props = {
            store
        };
        //Renders the PersonWithNeedInfo with props
        subject = mount(<PersonWithNeedInfo {...props}/>);
    });

    /**
     * A test is described with the text in the quotation marks, and this will also be
     * what the test is called when run in Karma. If you want to look at one particular test
     * you just find the description under the name of the test-class.
     */
    it("Do not show error message before next-button is pushed", () => {
        //Expect the rendered PersonWithNeedInfo to exist
        expect(subject).to.have.length(1);

        //Nothing has been done in the page yet, then the errormessage should not be shown.
        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(0);
        //expect(errorMessage.text()).to.equal("Dette er ikke et gyldig telefonnummer");
    });

    it("Do not show error message when all fields contains correct input", () => {
        //Expect the rendered PersonWithNeedInfo to exist
        expect(subject).to.have.length(1);

        //Fill in valid input
        const nameField = subject.find('.nameField');
        expect(nameField).to.have.length(1);
        // We change the value to a correct value and expect no errormessage
        nameField.simulate('change', {target: {value: "Ola Norman"}});

        const adrField = subject.find('.adressField');
        expect(adrField).to.have.length(1);
        adrField.simulate('change', {target: {value: "Testveien 2"}});

        const zipcode = subject.find('.zipcode');
        expect(zipcode).to.have.length(1);
        zipcode.simulate('change', {target: {value: "6055"}});

        const tlfFrom = subject.find('.tlfFrom');
        expect(tlfFrom).to.have.length(1);
        tlfFrom.simulate('change', {target: {value: "152 34 564"}});

        //See that the valid button exists
        const nextButton = subject.find('.next-btn');
        expect (nextButton).to.have.length.of(1);

        //Since all the testdata are valid, and the next-button is not pushed
        // no error message will be found
        const errorMessage = subject.find('.error');
        expect(errorMessage).to.have.length.of(0);
    });

    it("Shows error message when fields contain no input and next-button is pressed", () => {
        //Expect the rendered PersonWithNeedInfo to exist
        expect(subject).to.have.length(1);

        //With no input, the program should find the disabled next-btn.
        const nextButton = subject.find('.disabledButton-nxt');
        expect (nextButton).to.have.length.of(1);
        nextButton.simulate('click');

        //The errormessage will show, because we have yet to give an input to the fields that needs it
        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
    });
});

