/**
 * Created by camp-vhe on 05.07.2016.
 */


import Application from '../app/Application.jsx';
import React from 'react'
var FormControl = require('react-bootstrap/lib/FormControl');
// See README for discussion of chai, enzyme, and sinon
import {expect} from 'chai';
import {mount} from 'enzyme';
import WhosSearching from '../app/WhosSearchingForm.jsx';
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
import NavigationButtons from '../app/NavigationButtons.jsx';
import AddressField from '../app/AddressField.jsx';
import TypeAhead from '../app/AutoComplete.jsx';

// In this file we're doing an integration test. Thus we need to hook up our
// form component to Redux and Redux-Form. To do that, we need to create the
// simplest redux store possible that will work with Redux-Form.
import {reducer as formReducer} from 'redux-form';
import {createStore, combineReducers} from 'redux';


describe("Application", () => {
    let store = null;
    let subject = null;

    beforeEach(() => {
        store = createStore(combineReducers({form: formReducer}));

        const props = {
            store,

        };
        subject = mount(<Application {...props}/>);
    });
    it("First page forwards you to correct step", () => {
        expect(subject).to.have.length(1);

        var firstPage = subject.find(WhosSearching);


        firstPage.find(Button).first().simulate('click');
        expect(subject.state().step).to.equal(6);
        subject.setState({
            step: 1
        });
        firstPage = subject.find(WhosSearching);
        firstPage.find(Button).last().simulate('click');
        expect(subject.state().step).to.equal(2);

    });
    it("Second page forwards you to correct step", () => {
        var secondPage = subject.find(RelationForm);

    });
    it("Third page forwards you to correct step", () => {
        subject.setState({
            step: 3
        });
        var thirdPage = subject.find(PersonWithNeedForm);
        //With PNR it should forward you to page 6
        thirdPage.find(FormControl).first().simulate('change', {target: {value: '26024003298'}});
        thirdPage.find(FormControl).last().simulate('change', {target: {value: 'Snorre'}});
        var nextButton = thirdPage.find(NavigationButtons).find('.next-btn');
        nextButton.simulate('click');
        expect(subject.state().step).to.equal(6);
        subject.setState({
            step: 3
        });
        //Checked for not knowing and name is filled - Does not yet work

        thirdPage = subject.find(PersonWithNeedForm);
        expect(thirdPage.find('input[type="checkbox"]')).to.have.length(1);
        //thirdPage.find('input[type="checkbox"]').simulate('change', {target: {value: true}});
        console.log(thirdPage.props());
        /* thirdPage.find(FormControl).last().simulate('change', {target: {value: 'Snorre'}});
         thirdPage.find(FormControl).first().simulate('change', {target: {value: ''}});
         nextButton = subject.find(NavigationButtons).find('.next-btn');
         nextButton.simulate('click');
         expect(subject.state().step).to.equal(4);*/


    });
    it("fourth page forwards you to correct step", () => {
        subject.setState({
            step: 4
        });
        var fourthPage = subject.find(PersonWithNeedInfoForm);

        fourthPage.find(FormControl).first().simulate('change', {target: {value: 'Vegard'}});
        var addressField = fourthPage.find(AddressField);
        addressField.find(FormControl).first().simulate('change', {target: {value: "Testveien 7"}});
        var nextButton = fourthPage.find(NavigationButtons).find('.next-btn');
        nextButton.simulate('click');
        //Button shouldnt be clickable before zipcode and phone number is entered.
        expect(subject.state().step).to.equal(4);
        addressField.find('.zipcode').simulate('change', {target: {value: "0678"}});
        fourthPage.find(FormControl).last().simulate('change', {target: {value: '22222222'}});
        nextButton.simulate('click');
        expect(subject.state().step).to.equal(5);
    });

    it("fifth page forwards you to correct step", () => {
        subject.setState({
            step: 5
        });
        var fifthPage = subject.find(GeneralPractitioner);
        var nextButton = fifthPage.find(NavigationButtons).find('.next-btn');
        nextButton.simulate('click');
        //Button shouldnt be clickable before something is entered
        expect(subject.state().step).to.equal(5);
        fifthPage.find(TypeAhead).simulate('change', {target: {value: 'O'}});

        nextButton.simulate('click');

        expect(subject.state().step).to.equal(6);

    });
    });