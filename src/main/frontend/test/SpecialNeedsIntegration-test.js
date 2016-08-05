import React from 'react'

// See README for discussion of chai, enzyme, and sinon
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import SpecialNeeds from '../app/FormPages/SpecialNeeds';

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
describe("SpecialNeeds-Integration", () => {
    let store = null;
    let subject = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        store = createStore(combineReducers({ form: formReducer }));
        // the fields that are individual for each page
        const props = {
            store
        };
        //Renders the SpecialNeeds with props
        subject = mount(<SpecialNeeds {...props}/>);
    });

    /**
     * A test is described with the text in the quotation marks, and this will also be
     * what the test is called when run in Karma. If you want to look at one particular test
     * you just find the description under the name of the test-class.
     */
    it('Does not show error-message when field has valid value', function () {
        //Expect the rendered SpecialNeeds to exist
        expect(subject).to.have.length(1);

        const input = subject.find('#mandatoryField');
        expect(input).to.have.length(1);

        //Change the value to be valid, so we won't see an errormessage
        input.simulate('change', {target: {value: "bein"}});
        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(0);
    });

    it("Shows error message when first field is touched", () => {
        //Expect the rendered SpecialNeeds to exist
        expect(subject).to.have.length(1);

        const input = subject.find('#mandatoryField');
        expect(input).to.have.length(1);

        //Change the value to be not valid, so we will see an errormessage
        input.simulate('change', {target: {value: ""}});

        const nextButton = subject.find('.disabledButton-nxt');
        expect (nextButton).to.have.length.of(1);
        //Need to push button to fin errormessage.
        nextButton.simulate('click');
        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
        expect(errorMessage.text()).to.equal("Vennligst svar på hva som er grunnen til at det søkes om plass på sykehjem, før du går videre.");
    });
});