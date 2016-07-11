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
import TypeAhead from '../node_modules/react-bootstrap-typeahead/lib/Typeahead.react.js';

import DependentForm from '../app/DependentForm.jsx';
import DropdownList from '../app/DropdownList.jsx';
// In this file we're doing an integration test. Thus we need to hook up our
// form component to Redux and Redux-Form. To do that, we need to create the
// simplest redux store possible that will work with Redux-Form.
import {reducer as formReducer} from 'redux-form';
import {createStore, combineReducers} from 'redux';
var assign = require('object-assign');
var userData = {
    pnr: "01108019146",
    name: "TestPerson1",
    submissionId: null
};

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


describe("Application", () => {
    let store = null;
    let subject = null;

    beforeEach(() => {
        store = createStore(combineReducers({form: formReducer}));

        const props = {
            store,
            fieldValues,
            userData

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
        subject.setState({
            step: 2
        });
        var secondPage = subject.find(RelationForm);
        var nextButton = secondPage.find('.next-btn');
        nextButton.simulate('click');
        //Button shouldnt be clickable before something is entered
        expect(subject.state().step).to.equal(2);
        //Finds the first basic input element - that is the component that has to change and callbacks upwards.
        secondPage.find('.radio-other').simulate('change', {target: {value: "other"}});
        secondPage.find(FormControl).simulate('change', {target: {value: "elskerinne"}});
        nextButton.simulate('click');
        //Other information should forward to step 3 ;
        expect(subject.state().step).to.equal(3);

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
        expect(thirdPage.find('.pnrCheck')).to.have.length(1);
        thirdPage.find('.pnrCheck').simulate('change', {target: {value: true}});
        //console.log(thirdPage.props());
        thirdPage.find(FormControl).last().simulate('change', {target: {value: 'Snorre'}});
        thirdPage.find(FormControl).first().simulate('change', {target: {value: ''}});
        nextButton = subject.find(NavigationButtons).find('.next-btn');
        nextButton.simulate('click');
        expect(subject.state().step).to.equal(4);


    });
    it("fourth page forwards you to correct step", () => {
        subject.setState({
            step: 4
        });
        var fourthPage = subject.find(PersonWithNeedInfoForm);

        fourthPage.find(FormControl).first().simulate('change', {target: {value: 'Erlend'}});
        var addressField = fourthPage.find(AddressField);
        addressField.find(FormControl).first().simulate('change', {target: {value: "Testveien 7"}});
        var nextButton = fourthPage.find(NavigationButtons).find('.next-btn');
        nextButton.simulate('click');
        //Button shouldnt be clickable before zipcode and phone number is entered.
        expect(subject.state().step).to.equal(4);
        addressField.find('.zipcode').simulate('change', {target: {value: "0678"}});
        fourthPage.find(FormControl).last().simulate('change', {target: {value: '222 22 222'}});
        nextButton.simulate('click');
        expect(subject.state().step).to.equal(5);
    });
/*
    it("fifth page forwards you to correct step", () => {
    
        subject.setState({
            step: 5
        });
        var fifthPage = subject.find(GeneralPractitioner);
        expect(fifthPage).to.have.length(1);
        var nextButton = fifthPage.find(NavigationButtons).find('.next-btn');
        nextButton.simulate('click');
        //Button shouldnt be clickable before something is entered
        expect(subject.state().step).to.equal(5);
        //Finds the first basic input element - that is the component that has to change and callbacks upwards.
        fifthPage.find(TypeAhead).find('input').first().simulate('change', {target: {value: 'Ola'}});

        nextButton.simulate('click');

        expect(subject.state().step).to.equal(6);


    });
    it("sixth page forwards you to correct step", () => {
        subject.setState({
            step: 6
        });
        var sixthPage = subject.find(AddDependent);
        var nextButton = sixthPage.find(NavigationButtons).find('.next-btn');
        nextButton.simulate('click');
        //Button shouldnt be clickable before something is entered
        expect(subject.state().step).to.equal(6);

        var firstAdd = sixthPage.find(DependentForm).first();
        expect(firstAdd).to.have.length(1);
        firstAdd.find(FormControl).at(0).simulate('change', {target: {value: 'Nordmann'}});
        firstAdd.find(FormControl).at(1).simulate('change', {target: {value: 'Nordmann'}});
        firstAdd.find(FormControl).at(2).simulate('change', {target: {value: '222 22 222'}});
        firstAdd.find(FormControl).at(3).simulate('change', {target: {value: 'ola@nordmann.no'}});
        firstAdd.find(DropdownList).simulate('change', {target: {value: 'sibling'}});

        nextButton.simulate('click');
        //Should now redirect to state 7
        expect(subject.state().step).to.equal(7);

    });


    it("seventh page forwards you to correct step", () => {
        subject.setState({
            step: 7
        });
        var seventhPage = subject.find(NeedsForm);
        var nextButton = seventhPage.find(NavigationButtons).find('.next-btn');
        nextButton.simulate('click');
        //Button shouldnt be clickable before something is entered
        expect(subject.state().step).to.equal(7);
        //Finds the first basic input element - that is the component that has to change and callbacks upwards.
        seventhPage.find('.radio-long').simulate('change', {target: {value: true}});

        nextButton.simulate('click');

        expect(subject.state().step).to.equal(8);

    });

    it("eight page forwards you to correct step", () => {
        subject.setState({
            step: 8
        });
        var eightPage = subject.find(SpecialNeeds);
        var nextButton = eightPage.find(NavigationButtons).find('.next-btn');
        nextButton.simulate('click');
        //Button shouldnt be clickable before something is entered
        expect(subject.state().step).to.equal(8);
        eightPage.find(FormControl).first().simulate('change', {target: {value: 'Fordi jeg er gammel'}});

        nextButton.simulate('click');
        //THIS ONLY WORKS when this.props.next() is called at the start of submit function in Navigation Buttons. Sondre - what to do?

        //expect(subject.state().step).to.equal(9);

    });

    it("Eight page sends you back to step 7", () => {
        subject.setState({
            step: 8
        });
        var eightPage = subject.find(SpecialNeeds);
        var backButton = eightPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');

        expect(subject.state().step).to.equal(7);

    });

    it("Seventh page sends you back to step 6", () => {
        subject.setState({
            step: 7
        });
        var seventhPage = subject.find(NeedsForm);
        var backButton = seventhPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');

        expect(subject.state().step).to.equal(6);

    });

    it("Sixth page sends you back to step 1", () => {
        var store = createStore(combineReducers({form: formReducer}));

        const props = {
            store,
            fieldValues,
            userData
        };
        const subject = mount(<Application {...props}/>);

        subject.setState({
            step: 6
        });
        var sixthPage = subject.find(AddDependent);
        var backButton = sixthPage.find(NavigationButtons).find('.back-btn');

        subject.setState({fieldValues: assign({}, subject.state(fieldValues), {applyingForSelf: true})});
        backButton.simulate('click');
        expect(subject.state().step).to.equal(1);
    });

    it("Sixth page sends you back to step 2", () => {
        var store = createStore(combineReducers({form: formReducer}));

        const props = {
            store,
            fieldValues,
            userData
        };
        const subject = mount(<Application {...props}/>);

        subject.setState({
            step: 6
        });
        var sixthPage = subject.find(AddDependent);
        var backButton = sixthPage.find(NavigationButtons).find('.back-btn');

        subject.setState({fieldValues: assign({}, subject.state(fieldValues), {relation: "guardian"})});
        backButton.simulate('click');
        expect(subject.state().step).to.equal(2);
    });

    it("Sixth page sends you back to step 5", () => {
        var store = createStore(combineReducers({form: formReducer}));

        const props = {
            store,
            fieldValues,
            userData
        };
        const subject = mount(<Application {...props}/>);

        subject.setState({
            step: 6
        });
        var sixthPage = subject.find(AddDependent);
        var backButton = sixthPage.find(NavigationButtons).find('.back-btn');
        subject.setState({
            fieldValues: assign({}, subject.state(fieldValues),
                {
                    person: {
                        address: {
                            streetAddress: "testveien 2"
                        },
                        name: "Erlend"
                    },
                    dontGotPNRnumber: true
                }
            )
        });


        backButton.simulate('click');
        expect(subject.state().step).to.equal(5);
    });

    it("Sixth page sends you back to step 3", () => {
        var store = createStore(combineReducers({form: formReducer}));

        const props = {
            store,
            fieldValues,
            userData
        };
        const subject = mount(<Application {...props}/>);

        subject.setState({
            step: 6
        });
        var sixthPage = subject.find(AddDependent);
        var backButton = sixthPage.find(NavigationButtons).find('.back-btn');

        subject.setState({
            fieldValues: assign({}, subject.state(fieldValues),
                {
                    person: {
                        address: {
                            streetAddress: "testveien 2"
                        },
                        name: "Erlend"
                    },
                    dontGotPNRnumber: false,
                    applyingForSelf: false,
                    relation: "other"
                }
            )
        });
        backButton.simulate('click');
        expect(subject.state().step).to.equal(3);
    });

    it("Fifth page sends you back to step 4", () => {
        subject.setState({
            step: 5
        });
        var fifthPage = subject.find(GeneralPractitioner);
        var backButton = fifthPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');

        expect(subject.state().step).to.equal(4);
    });

    it("Fourth page sends you back to step 3", () => {
        subject.setState({
            step: 4
        });
        var fourthPage = subject.find(PersonWithNeedInfoForm);
        var backButton = fourthPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');

        expect(subject.state().step).to.equal(3);
    });

    it("Third page sends you back to step 2", () => {
        subject.setState({
            step: 3
        });
        var fourthPage = subject.find(PersonWithNeedForm);
        var backButton = fourthPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');

        expect(subject.state().step).to.equal(2);
    });

    it("Second page sends you back to step 1", () => {
        subject.setState({
            step: 2
        });
        var fourthPage = subject.find(RelationForm);
        var backButton = fourthPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');

        expect(subject.state().step).to.equal(1);
    });
<<<<<<< HEAD
<<<<<<< HEAD:src/main/frontend/test/Application-Integration-Test.js
    */
});
=======
>>>>>>> refs/remotes/origin/master:src/main/frontend/test/ApplicationIntegration-test.js
=======
});
>>>>>>> refs/remotes/origin/master
