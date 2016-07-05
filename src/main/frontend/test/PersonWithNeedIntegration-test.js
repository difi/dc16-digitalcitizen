/**
 * Created by camp-vhe on 05.07.2016.
 */


import Application from '../app/Application.jsx';
import React from 'react'

// See README for discussion of chai, enzyme, and sinon
import { expect } from 'chai';
import { mount } from 'enzyme';
import WhosSearching from '../app/WhosSearchingForm.jsx';
import PersonWithNeed from '../app/PersonWithNeedForm';
import PersonWithNeedInfoForm from '../app/PersonWithNeedInfoForm';
var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
import RelationForm from '../app/RelationForm';
import PersonWithNeedForm from '../app/PersonWithNeedForm';
import GeneralPractitioner from '../app/GeneralPractitioner';
import SpecialNeeds from '../app/SpecialNeeds';
import NeedsForm from'../app/NeedsForm';
import AddDependent from '../app/AddDependent';
import SubmitSuccess from '../app/SubmitPage';

// In this file we're doing an integration test. Thus we need to hook up our
// form component to Redux and Redux-Form. To do that, we need to create the
// simplest redux store possible that will work with Redux-Form.
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';




describe("PersonWithNeedForm", () => {
    let store = null;
    let subject = null;
    beforeEach(() => {
        store = createStore(combineReducers({ form: formReducer }));

        const props = {
            store
        };
        subject = mount(<Application {...props}/>);
    });
    it("shows help text when first name is set to blank", () => {
        //expect(subject).to.have.length(1);
        /*
        const input = subject.find('.fnr');
        // Our form component only shows error messages (help text) if the
        // field has been touched. To mimic touching the field, we simulate a
        // blur event, which means the input's onBlur method will run, which
        // will call the onBlur method supplied by Redux-Form.
        input.simulate('blur');
        const firstNameHelpBlock = subject.find('div').first();
        // Ensure only one node is returned, otherwise our call to text() below will yell at us.
        expect(firstNameHelpBlock).to.have.length.of(1)*/

    });
});