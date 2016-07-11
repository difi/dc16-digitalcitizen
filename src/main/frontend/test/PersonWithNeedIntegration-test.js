/**
 * Created by camp-vhe on 05.07.2016.
 */

import React from 'react'
var FormControl = require('react-bootstrap/lib/FormControl');
// See README for discussion of chai, enzyme, and sinon
import { expect } from 'chai';
import { mount } from 'enzyme';
import PersonWithNeed from '../app/FormPages/PersonWithNeedForm';
var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

// In this file we're doing an integration test. Thus we need to hook up our
// form component to Redux and Redux-Form. To do that, we need to create the
// simplest redux store possible that will work with Redux-Form.
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';

describe("Integration of PersonWithNeedForm", () => {
    let store = null;
    let subject = null;

    beforeEach(() => {
        store = createStore(combineReducers({ form: formReducer }));

        const props = {
            store
        };
        subject = mount(<PersonWithNeed {...props}/>);
    });
    it("Shows error message when field is touched", () => {
        expect(subject).to.have.length(1);

        const input = subject.find(FormControl).first();

        // Our form component only shows error messages (help text) if the
        // field has been touched. To mimic touching the field, we simulate a
        // blur event, which means the input's onBlur method will run, which
        // will call the onBlur method supplied by Redux-Form.
        input.simulate('blur');
        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
        expect(errorMessage.text()).to.equal("Dette er ikke et gyldig fødselsnummer");

    });

    it("Shows error message when field contains wrong input", () => {
        expect(subject).to.have.length(1);

        const input = subject.find(FormControl).first();

        // Our form component only shows error messages (help text) if the
        // field has been touched. To mimic touching the field, we simulate a
        // blur event, which means the input's onBlur method will run, which
        // will call the onBlur method supplied by Redux-Form.
        input.simulate('blur');
        // We change the value to a new incorrect value and expect an errormessage
        input.simulate('change', {target: {value: "12345678911"}});

        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(1);
        expect(errorMessage.text()).to.equal("Dette er ikke et gyldig fødselsnummer");

    });

    it("Does not show error message when field contains correct input", () => {
        expect(subject).to.have.length(1);

        const input = subject.find(FormControl).first();

        // Our form component only shows error messages (help text) if the
        // field has been touched. To mimic touching the field, we simulate a
        // blur event, which means the input's onBlur method will run, which
        // will call the onBlur method supplied by Redux-Form.
        input.simulate('blur');
        // We change the value to a correct value and expect no errormessage
        input.simulate('change', {target: {value: '26024003298'}});

        const errorMessage = subject.find('.error');
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(errorMessage).to.have.length.of(0);
    });

});