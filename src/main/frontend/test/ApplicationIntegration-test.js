import {ApplicationClass} from '../app/Application.js';
import Application from'../app/Application.js'
import React from 'react';
// See README for discussion of chai, enzyme, and sinon
import {expect} from 'chai';
import {mount} from 'enzyme';
import WhosSearching from '../app/FormPages/WhosSearchingForm.js';
import RelationForm from '../app/FormPages/RelationForm';
import PersonWithNeedForm from '../app/FormPages/PersonWithNeedForm';
import PersonWithNeedInfoForm from '../app/FormPages/PersonWithNeedInfoForm';
import GeneralPractitioner from '../app/FormPages/GeneralPractitioner';
import AddDependent from '../app/FormPages/AddDependent';
import NeedsForm from'../app/FormPages/NeedsForm';
import SpecialNeeds from '../app/FormPages/SpecialNeeds';
import LocationPage from '../app/FormPages/LocationPage.js';
import SubmitSuccess from '../app/FormPages/SubmitPage';
import NavigationButtons from '../app/FormPages/Components/NavigationButtons.js';
import AddressField from '../app/FormPages/Components/AddressField.js';
import TypeAhead from '../node_modules/react-bootstrap-typeahead/lib/Typeahead.react.js';
import {AddDependentClass} from '../app/FormPages/AddDependent.js';

import DependentForm from '../app/FormPages/Components/DependentForm.js';
import DropdownList from '../app/FormPages/Components/DropdownList.js';
// In this file we're doing an integration test. Thus we need to hook up our
// form component to Redux and Redux-Form. To do that, we need to create the
// simplest redux store possible that will work with Redux-Form.
import {reducer as formReducer} from 'redux-form';
import {createStore, combineReducers} from 'redux';

var FormControl = require('react-bootstrap/lib/FormControl');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

var assign = require('object-assign');
var userData = {
    pnr: "15028047425",
    name: "Elias Eliassen",
    submissionId: null
};


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

var fields = {
    form1: {
        name: {
            onChange: function onChange () {}
        },
        phone: {
            onChange: function onChange () {}
        },
        mail: {
            onChange: function onChange () {}
        },
        relation: {
            onChange: function onChange () {}
        },
        depOtherRelation: {
            onChange: function onChange () {}
        }
    }
};

describe("ApplicationIntegration", () => {
    let store = null;
    let subject = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        store = createStore(combineReducers({form: formReducer}));

        // the fields that are individual for each page
        const props = {
            store,
            fieldValues,
            userData,
            fields
        };
        subject = mount(<ApplicationClass {...props}/>);
    });
    it("First page forwards you to correct step", () => {
        expect(subject).to.have.length(1);

        var firstPage = subject.find(WhosSearching);
        expect(firstPage).to.have.length(1);

        var lastButton = firstPage.find(Button).last();
        expect(lastButton).to.have.length(1);
        lastButton.simulate('click');
        expect(subject.state().step).to.equal(2);


        subject.setState({
            step: 1
        });
        expect(subject.state().step).to.equal(1);
        firstPage = subject.find(WhosSearching);
        expect(firstPage).to.have.length(1);

        var firstButton = firstPage.find(Button).first();
        expect(firstButton).to.have.length(1);

        firstButton.simulate('click');
        //expect(subject.state().step).to.equal(6);

    });
    it("Second page forwards you to correct step", () => {
        subject.setState({
            step: 2
        });
        var secondPage = subject.find(RelationForm);
        var nextButton = secondPage.find('.next-btn');
        //button with classname next-btn shouldnt exist before something is entered
        expect(nextButton).to.have.length(0);
        //button with classname disabledButton-nxt should exist
        expect(secondPage.find(NavigationButtons).find(".disabledButton-nxt")).to.have.length(1);

        expect(subject.state().step).to.equal(2);
        //Finds the first basic input element - that is the component that has to change and callbacks upwards.
        var radioButton = secondPage.find('.radio-other');
        expect(radioButton).to.have.length(1);
        radioButton.simulate('change', {target: {value: "other"}});
        var inputField = secondPage.find(FormControl);
        expect(inputField).to.have.length(1);
        inputField.simulate('change', {target: {value: "elskerinne"}});
        nextButton = secondPage.find('.next-btn');
        expect(nextButton).to.have.length(1);
        nextButton.simulate('click');
        //Other information should forward to step 3 ;
        expect(subject.state().step).to.equal(3);

    });
    /*
     it("Third page forwards you to correct step", () => {
     subject.setState({
     step: 3
     });
     var thirdPage = subject.find(PersonWithNeedForm);
     expect(thirdPage).to.have.length(1);
     //With PNR it should forward you to page 6
     thirdPage.find(FormControl).first().simulate('change', {target: {value: '15028047425'}});
     thirdPage.find(FormControl).last().simulate('change', {target: {value: 'Elias Eliassen'}});
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
     */
    it("fourth page forwards you to correct step", () => {
        subject.setState({
            step: 4
        });
        var fourthPage = subject.find(PersonWithNeedInfoForm);

        fourthPage.find(FormControl).first().simulate('change', {target: {value: 'Erlend'}});
        expect(fourthPage.find(FormControl).first()).to.have.length(1);

        var addressField = fourthPage.find(AddressField);
        expect(addressField).to.have.length(1);
        addressField.find(FormControl).first().simulate('change', {target: {value: "Testveien 7"}});
        var nextButton = fourthPage.find(NavigationButtons).find('.next-btn');
        //Button with classname next-btn shouldnt exists before zipcode and phone number is entered.
        expect (nextButton).to.have.length(0);
        //button with classname disabledButton-nxt should exist
        expect(fourthPage.find(".disabledButton-nxt")).to.have.length(1);

        expect(subject.state().step).to.equal(4);
        addressField.find('.zipcode').simulate('change', {target: {value: "0678"}});
        fourthPage.find(FormControl).last().simulate('change', {target: {value: '222 22 222'}});
        //have to find nextButton again, to check if it exists after we inserted new values
        nextButton = fourthPage.find(NavigationButtons).find('.next-btn');
        expect (nextButton).to.have.length(1);

        nextButton.simulate('click');
        expect(subject.state().step).to.equal(5);
    });

    it("fifth page forwards you to correct step", () => {
        subject.setState({
            step: 5
        });
        var fifthPage = subject.find(GeneralPractitioner);
        expect(fifthPage).to.have.length(1);
        var nextButton = fifthPage.find(NavigationButtons).find('.next-btn');
        //button with classname next-btn shouldnt exist before something is entered
        expect(nextButton).to.have.length(0);
        //button with classname disabledButton-nxt should exist
        expect(fifthPage.find(NavigationButtons).find(".disabledButton-nxt")).to.have.length(1);

        expect(subject.state().step).to.equal(5);
        //Finds the first basic input element - that is the component that has to change and callbacks upwards.
        fifthPage.find(TypeAhead).find('input').first().simulate('change', {target: {value: 'Ola'}});

        nextButton = fifthPage.find(NavigationButtons).find('.next-btn');

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
        firstAdd.find(FormControl).at(0).simulate('change', {target: {value: 'Ola Nordmann'}});
        firstAdd.find(FormControl).at(1).simulate('change', {target: {value: '222 22 222'}});
        firstAdd.find(FormControl).at(2).simulate('change', {target: {value: 'ola@nordmann.no'}});
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
        //button with classname next-btn shouldnt exist before something is entered
        expect(nextButton).to.have.length(0);
        //button with classname disabledButton-nxt should exist
        expect(seventhPage.find(NavigationButtons).find(".disabledButton-nxt")).to.have.length(1);

        expect(subject.state().step).to.equal(7);

        //Finds the first basic input element - that is the component that has to change and callbacks upwards.
        seventhPage.find('.radio-long').simulate('change', {target: {value: true}});

        nextButton = seventhPage.find(NavigationButtons).find('.next-btn');
        expect(nextButton).to.have.length(1);

        nextButton.simulate('click');

        expect(subject.state().step).to.equal(8);
    });

    it("eight page forwards you to correct step", () => {
        subject.setState({
            step: 8
        });
        var eightPage = subject.find(SpecialNeeds);
        var nextButton = eightPage.find(NavigationButtons).find('.next-btn');
        //button with classname next-btn shouldnt exist before something is entered
        expect(nextButton).to.have.length(0);
        //button with classname disabledButton-nxt should exist
        expect(eightPage.find(NavigationButtons).find(".disabledButton-nxt")).to.have.length(1);

        expect(subject.state().step).to.equal(8);
        eightPage.find(FormControl).first().simulate('change', {target: {value: 'Fordi jeg er gammel'}});

        nextButton = eightPage.find(NavigationButtons).find('.next-btn');
        nextButton.simulate('click');

        expect(subject.state().step).to.equal(9);
    });

    it("ninth page forwards you to correct step", () => {
        subject.setState({
            step: 9
        });
        var ninthPage = subject.find(LocationPage);

        var nextButton = ninthPage.find(NavigationButtons).find('.next-btn');
        //button with classname next-btn shouldnt exist before something is entered
        expect(nextButton).to.have.length(0);
        //button with classname disabledButton-submit should exist
        expect(ninthPage.find('.disabledButton-submit')).to.have.length(1);

        var inputField = ninthPage.find(TypeAhead).find('input').first();
        expect(inputField).to.have.length(1);
        inputField.simulate('change', {target: {value: 'Trondheim'}});


        nextButton = ninthPage.find(NavigationButtons).find('.next-btn');
        expect(nextButton).to.have.length(1);

        // to click the next-button is only allowed if applyingForSelf is defined
        //nextButton.simulate('click');
        //THIS ONLY WORKS when this.props.next() is called at the start of submit function in Navigation Buttons. Sondre - what to do?

        //expect(subject.state().step).to.equal(10);*/
    });

    it("ninth page sends you back to step 8", () => {
        subject.setState({
            step: 9
        });
        var ninthPage = subject.find(LocationPage);
        var backButton = ninthPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');

        expect(subject.state().step).to.equal(8);
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

        subject.setState({
            step: 6
        });

        var sixthPage = subject.find(AddDependentClass);
        sixthPage.props().fields.applyingForSelf.onChange(true);
        var backButton = sixthPage.find(NavigationButtons).find('.back-btn');


        backButton.simulate('click');
        expect(subject.state().step).to.equal(1);
    });

    it("Sixth page sends you back to step 2", () => {
        subject.setState({
            step: 6
        });


        var app = subject.find(AddDependentClass)
        app.props().fields.relation.onChange('guardian');




         var backButton = app.find(NavigationButtons).find('.back-btn');
         backButton.simulate('click');
        expect(subject.state().step).to.equal(2);
    });

    it("Sixth page sends you back to step 5", () => {
        var store = createStore(combineReducers({form: formReducer}));

        subject.setState({
            step: 6
        });
        var sixthPage = subject.find(AddDependentClass);
        var backButton = sixthPage.find(NavigationButtons).find('.back-btn');
       sixthPage.props().fields.checked.onChange(true);

        backButton.simulate('click');
        expect(subject.state().step).to.equal(5);
    });

    it("Sixth page sends you back to step 3", () => {


        subject.setState({
            step: 6
        });
        var sixthPage = subject.find(AddDependent);
        var backButton = sixthPage.find(NavigationButtons).find('.back-btn');
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
});
