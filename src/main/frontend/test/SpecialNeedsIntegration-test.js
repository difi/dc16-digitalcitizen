/**
 * Created by camp-vha on 12.07.2016.
 */

import React from 'react'

// See README for discussion of chai, enzyme, and sinon
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import SpecialNeeds from '../app/FormPages/SpecialNeeds';

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

    it('Does not show error-message when field has valid value', function () {
        //expect wrapper to exist
        expect(subject).to.have.length(1);

        const input = subject.find('#mandatoryField');
        expect(input).to.have.length(1);

        // Our form component only shows error messages (help text) if the
        // field has been touched. To mimic touching the field, we simulate a
        // blur event, which means the input's onBlur method will run, which
        // will call the onBlur method supplied by Redux-Form.

        input.simulate('blur');
        input.simulate('change', {target: {value: "bein"}});
        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(0);
        //expect(errorMessage.text()).to.equal("Dette feltet må fylles ut. ");
    });

    it("Shows error message when first field is touched", () => {
        //expect wrapper to exist
        expect(subject).to.have.length(1);

        const input = subject.find('#mandatoryField');
        expect(input).to.have.length(1);

        // Our form component only shows error messages (help text) if the
        // field has been touched. To mimic touching the field, we simulate a
        // blur event, which means the input's onBlur method will run, which
        // will call the onBlur method supplied by Redux-Form.

        input.simulate('blur');
        input.simulate('change', {target: {value: ""}});

        const nextButton = subject.find('.disabledButton-nxt');
        expect (nextButton).to.have.length.of(1);

        nextButton.simulate('click');


        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
        //expect(errorMessage.text()).to.equal("Dette feltet må fylles ut. ");*/

    });
});
