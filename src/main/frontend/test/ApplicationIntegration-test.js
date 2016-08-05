import React from 'react';
// See README for discussion of chai, enzyme, and sinon
import {expect} from 'chai';
//Mount gives full DOM rendering.
import {mount} from 'enzyme';

/**
 * Import all the classes we will need to find, to be able to test the next and back buttons
 * of all the different pages in the program.
 */
import {ApplicationClass} from '../app/Application.js';
import WhosSearching from '../app/FormPages/WhosSearchingForm.js';
import RelationForm from '../app/FormPages/RelationForm';
import PersonWithNeedForm from '../app/FormPages/PersonWithNeedForm';
import PersonWithNeedInfoForm from '../app/FormPages/PersonWithNeedInfoForm';
import GeneralPractitioner from '../app/FormPages/GeneralPractitioner';
import AddDependent from '../app/FormPages/AddDependent';
import NeedsForm from'../app/FormPages/NeedsForm';
import SpecialNeeds from '../app/FormPages/SpecialNeeds';
import LocationPage from '../app/FormPages/LocationPage.js';
import NavigationButtons from '../app/FormPages/Components/NavigationButtons.js';
import AddressField from '../app/FormPages/Components/AddressField.js';
import TypeAhead from '../node_modules/react-bootstrap-typeahead/lib/Typeahead.react.js';
import {AddDependentClass} from '../app/FormPages/AddDependent.js';
import DependentForm from '../app/FormPages/Components/DependentForm.js';
import DropdownList from '../app/FormPages/Components/DropdownList.js';

/**
 * In this file we're doing an integration test. Thus we need to hook up our
 * form component to Redux and Redux-Form. To do that, we need to create the
 * simplest redux store possible that will work with Redux-Form.
 */
import {reducer as formReducer} from 'redux-form';
import {createStore, combineReducers} from 'redux';

/**
 * To be able to find and work with the bootstrap-elements, they need to be implemented here as well.
 * (Not only in the classes we want to test)
 */
var FormControl = require('react-bootstrap/lib/FormControl');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

var assign = require('object-assign');

/**
 * Need the userData to be able to handle the requests from the different classes correctly.
 * This is the userData of the person we are logged in as.
 * @type {{pnr: string, name: string, submissionId: null}}
 */
var userData = {
    pnr: "15028047425",
    name: "Elias Eliassen",
    submissionId: null
};

/**
 * The fields the different classes need to handle requests correctly.
 * @type {{form1: {name: {onChange: fields.form1.name.onChange}, phone: {onChange: fields.form1.phone.onChange}, mail: {onChange: fields.form1.mail.onChange}, relation: {onChange: fields.form1.relation.onChange}, depOtherRelation: {onChange: fields.form1.depOtherRelation.onChange}}, guardianPnr: {value: null, onChange: fields.guardianPnr.onChange}}}
 */
var fields = {
    form1: {
        name: {onChange: function onChange() {}},
        phone: {onChange: function onChange() {}},
        mail: {onChange: function onChange() {}},
        relation: {onChange: function onChange() {}},
        depOtherRelation: {onChange: function onChange() {}}
    },
    guardianPnr: {
        value: null,
        onChange: function onChange(){}
    }
};

/**
 * Describe is the start of the test-class. Since we want to test ApplicationIntegration, we
 * note this in quotation marks (this is the name of the test)
 */
describe("ApplicationIntegration", () => {
    // Need to add a variable named store
    let store = null;
    let subject = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        store = createStore(combineReducers({form: formReducer}));

        // the fields that are individual for each page inside this program
        const props = {
            store,
            userData,
            fields
        };
        //Renders the ApplicationClass with the given props
        subject = mount(<ApplicationClass {...props}/>);
    });

    /**
     * A test is described with the text in the quotation marks, and this will also be
     * what the test is called when run in Karma. If you want to look at one particular test
     * you just find the description under the name of the test-class.
     */
    it("First page forwards you to correct step", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);

        //Find WhosSearchingForm in Application, call it firstPage, and expect it to exists
        var firstPage = subject.find(WhosSearching);
        expect(firstPage).to.have.length(1);

        //Find the last button, expect it to exist, click it, and expect to get to the correct step
        var lastButton = firstPage.find(Button).last();
        expect(lastButton).to.have.length(1);
        lastButton.simulate('click');
        expect(subject.state().step).to.equal(2);


        //Reset the state to step 1, to be able to find the firstPage again
        subject.setState({
            step: 1
        });
        expect(subject.state().step).to.equal(1);
        firstPage = subject.find(WhosSearching);
        expect(firstPage).to.have.length(1);

        //Find the first button, expect it to exist, click it, and expect to get to the correct step
        var firstButton = firstPage.find(Button).first();
        expect(firstButton).to.have.length(1);
        firstButton.simulate('click');
        expect(subject.state().step).to.equal(6);
    });

    it("Second page forwards you to correct step", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 2, to be able to find secondPage.
        subject.setState({
            step: 2
        });
        var secondPage = subject.find(RelationForm);
        var nextButton = secondPage.find('.next-btn');
        //button with classname next-btn should not exist before something is entered
        expect(nextButton).to.have.length(0);
        //button with classname disabledButton-nxt should exist
        expect(secondPage.find(NavigationButtons).find(".disabledButton-nxt")).to.have.length(1);

        expect(subject.state().step).to.equal(2);
        //Find the first basic input element - that is the component that has to change and send callbacks upwards.
        var radioButton = secondPage.find('.radio-other');
        expect(radioButton).to.have.length(1);
        radioButton.simulate('change', {target: {value: "other"}});

        var inputField = secondPage.find(FormControl);
        expect(inputField).to.have.length(1);
        inputField.simulate('change', {target: {value: "elskerinne"}});

        //When the fields now have valid input, the next-button should be visible
        nextButton = secondPage.find('.next-btn');
        expect(nextButton).to.have.length(1);
        nextButton.simulate('click');
        //Other information should forward to step 3 ;
        expect(subject.state().step).to.equal(3);
    });

    /**
     * In Third page we were not able to simulate ajax-call because this would result in a call to validToGoNext or
     * notValidToGoNext, and we are not allowed by the testing-framework to directly call a function.
     * This meant we were not able to test if a click on the next-button, while information of both name and pnr
     * is valid, would result in the state step being set to 6.
     */

    it("Third page forwards you to correct step to step 4 if only name is given, and the checkbox is checked", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 3, to be able to find thirdPage.
        subject.setState({
            step: 3
        });

        var thirdPage = subject.find(PersonWithNeedForm);
        expect(thirdPage.find('.pnrCheck')).to.have.length(1);
        // Set the checkButton to checked
        thirdPage.find('.pnrCheck').simulate('change', {target: {value: true}});
        // Set value of pnr to empty
        thirdPage.find('.formPnr').simulate('change', {target: {value: ''}});
        //Set value of name to a valid name
        thirdPage.find('.formName').simulate('change', {target: {value: 'Elias Eliassen'}});

        //Find and click the next-button, and expect the action to take us to step 4
        var nextButton = subject.find(NavigationButtons).find('.next-btn');
        nextButton.simulate('click');
        expect(subject.state().step).to.equal(4);
    });

    it("Fourth page forwards you to correct step", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 4, to be able to find fourthPage.
        subject.setState({
            step: 4
        });
        var fourthPage = subject.find(PersonWithNeedInfoForm);

        //Fill in some of the information
        fourthPage.find(FormControl).first().simulate('change', {target: {value: 'Erlend'}});
        expect(fourthPage.find(FormControl).first()).to.have.length(1);
        var addressField = fourthPage.find(AddressField);
        expect(addressField).to.have.length(1);
        addressField.find(FormControl).first().simulate('change', {target: {value: "Testveien 7"}});

        var nextButton = fourthPage.find(NavigationButtons).find('.next-btn');
        //Button with classname next-btn should not exists before all information is entered and valid.
        expect(nextButton).to.have.length(0);
        //button with classname disabledButton-nxt should exist
        expect(fourthPage.find(".disabledButton-nxt")).to.have.length(1);

        //Fill in the rest of the information
        expect(subject.state().step).to.equal(4);
        addressField.find('.zipcode').simulate('change', {target: {value: "0678"}});
        fourthPage.find(FormControl).last().simulate('change', {target: {value: '222 22 222'}});
        //Have to find nextButton again, to check if it exists after we inserted new values
        nextButton = fourthPage.find(NavigationButtons).find('.next-btn');
        expect(nextButton).to.have.length(1);
        //Expect the click to take us to step 4
        nextButton.simulate('click');
        expect(subject.state().step).to.equal(5);
    });

    it("Fifth page forwards you to correct step", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 5, to be able to find fifthPage.
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
        //Need to look for the next-btn again, to find that it has rendered after a valid value.
        nextButton = fifthPage.find(NavigationButtons).find('.next-btn');
        nextButton.simulate('click');
        expect(subject.state().step).to.equal(6);
    });

    it("Sixth page forwards you to correct step", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 6, to be able to find AddDependent.
        subject.setState({
            step: 6
        });
        var sixthPage = subject.find(AddDependent);
        var nextButton = sixthPage.find(NavigationButtons).find('.next-btn');
        //button with classname next-btn shouldnt exist before something is entered
        expect(nextButton).to.have.length(0);
        //button with classname disabledButton-nxt should exist
        expect(sixthPage.find(NavigationButtons).find(".disabledButton-nxt")).to.have.length(1);
        expect(subject.state().step).to.equal(6);

        //Find the first dependent form, and fill it with the correct information.
        var firstAdd = sixthPage.find(DependentForm).first();
        expect(firstAdd).to.have.length(1);
        firstAdd.find(FormControl).at(0).simulate('change', {target: {value: 'Ola Nordmann'}});
        firstAdd.find(FormControl).at(1).simulate('change', {target: {value: '222 22 222'}});
        firstAdd.find(FormControl).at(2).simulate('change', {target: {value: 'ola@nordmann.no'}});
        firstAdd.find(DropdownList).simulate('change', {target: {value: 'sibling'}});

        //Find the next-btn, and click it
        nextButton = sixthPage.find(NavigationButtons).find('.next-btn');
        nextButton.simulate('click');
        //Should now redirect to state 7
        expect(subject.state().step).to.equal(7);
    });

    it("Seventh page forwards you to correct step", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 7, to be able to find NeedsForm.
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

        //Finds the first basic input element - that is the component that has to change and send callbacks upwards.
        seventhPage.find('.radio-long').simulate('change', {target: {value: true}});

        //Find the next-btn, click it, and validate that you get to the correct step
        nextButton = seventhPage.find(NavigationButtons).find('.next-btn');
        expect(nextButton).to.have.length(1);
        nextButton.simulate('click');
        expect(subject.state().step).to.equal(8);
    });

    it("eight page forwards you to correct step", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 8, to be able to find SpecialNeeds.
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
        // Fill in the obligatory field with valid information
        eightPage.find(FormControl).first().simulate('change', {target: {value: 'Fordi jeg er gammel'}});
        //Find the next-btn, click it, and validate that you get to the correct step
        nextButton = eightPage.find(NavigationButtons).find('.next-btn');
        nextButton.simulate('click');
        expect(subject.state().step).to.equal(9);
    });

    it("ninth page forwards you to correct step", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 9, to be able to find LocationPage.
        subject.setState({
            step: 9
        });
        var ninthPage = subject.find(LocationPage);
        var nextButton = ninthPage.find(NavigationButtons).find('.next-btn');
        //button with classname next-btn shouldnt exist before something is entered
        expect(nextButton).to.have.length(0);
        //button with classname disabledButton-submit should exist
        expect(ninthPage.find('.disabledButton-submit')).to.have.length(1);

        // Fill in the obligatory field with valid information
        var inputField = ninthPage.find(TypeAhead).find('input').first();
        expect(inputField).to.have.length(1);
        inputField.simulate('change', {target: {value: 'Trondheim'}});

        //Find the next-button
        nextButton = ninthPage.find(NavigationButtons).find('.next-btn');
        expect(nextButton).to.have.length(1);

        // to click the next-button is only allowed if applyingForSelf is defined
        //nextButton.simulate('click');
        //THIS ONLY WORKS when this.props.next() is called at the start of submit function in Navigation Buttons. Sondre - what to do?
        //expect(subject.state().step).to.equal(10);
    });

    it("ninth page sends you back to step 8", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 9, to be able to find LocationPage.
        subject.setState({
            step: 9
        });
        var ninthPage = subject.find(LocationPage);
        //Find the back-button, click it, and validate that you get to the correct step
        var backButton = ninthPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');
        expect(subject.state().step).to.equal(8);
    });

    it("Eight page sends you back to step 7", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 8, to be able to find SpecialNeeds.
        subject.setState({
            step: 8
        });
        var eightPage = subject.find(SpecialNeeds);
        //Find the back-button, click it, and validate that you get to the correct step
        var backButton = eightPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');
        expect(subject.state().step).to.equal(7);
    });

    it("Seventh page sends you back to step 6", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 7, to be able to find NeedsForm.
        subject.setState({
            step: 7
        });
        var seventhPage = subject.find(NeedsForm);
        //Find the back-button, click it, and validate that you get to the correct step
        var backButton = seventhPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');
        expect(subject.state().step).to.equal(6);
    });

    it("Sixth page sends you back to step 1, if you are applying for yourself", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 6, to be able to find AddDependentClass.
        subject.setState({
            step: 6
        });
        var sixthPage = subject.find(AddDependentClass);
        //Set applying for self to true
        sixthPage.props().fields.applyingForSelf.onChange(true);
        //Find the back-button, click it, and validate that you get to the correct step
        var backButton = sixthPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');
        expect(subject.state().step).to.equal(1);
    });

    it("Sixth page sends you back to step 2, if you are guardian of the person you are applying for", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 6, to be able to find AddDependentClass.
        subject.setState({
            step: 6
        });
        var app = subject.find(AddDependentClass);
        //Set yourself as guardian
        app.props().fields.relation.onChange('guardian');
        //Find the back-button, click it, and validate that you get to the correct step
        var backButton = app.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');
        expect(subject.state().step).to.equal(2);
    });

    it("Sixth page sends you back to step 5, if you do not know the pnr", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 6, to be able to find AddDependentClass.
        subject.setState({
            step: 6
        });
        var sixthPage = subject.find(AddDependentClass);
        //Find the back-button, click it, and validate that you get to the correct step
        var backButton = sixthPage.find(NavigationButtons).find('.back-btn');
        //Check the button of not knowing the pnr
        sixthPage.props().fields.checked.onChange(true);
        backButton.simulate('click');
        expect(subject.state().step).to.equal(5);
    });

    it("Sixth page sends you back to step 3, in all other cases", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 6, to be able to find AddDependentClass.
        subject.setState({
            step: 6
        });
        var sixthPage = subject.find(AddDependent);
        //Find the back-button, click it, and validate that you get to the correct step
        var backButton = sixthPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');
        expect(subject.state().step).to.equal(3);
    });

    it("Fifth page sends you back to step 4", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 5, to be able to find GeneralPractitioner.
        subject.setState({
            step: 5
        });
        var fifthPage = subject.find(GeneralPractitioner);
        //Find the back-button, click it, and validate that you get to the correct step
        var backButton = fifthPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');
        expect(subject.state().step).to.equal(4);
    });

    it("Fourth page sends you back to step 3", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 4, to be able to find PersonWithNeedInfoForm.
        subject.setState({
            step: 4
        });
        var fourthPage = subject.find(PersonWithNeedInfoForm);
        //Find the back-button, click it, and validate that you get to the correct step
        var backButton = fourthPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');
        expect(subject.state().step).to.equal(3);
    });

    it("Third page sends you back to step 2", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 3, to be able to find PersonWithNeedForm.
        subject.setState({
            step: 3
        });
        var fourthPage = subject.find(PersonWithNeedForm);
        //Find the back-button, click it, and validate that you get to the correct step
        var backButton = fourthPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');
        expect(subject.state().step).to.equal(2);
    });

    it("Second page sends you back to step 1", () => {
        //Expect the rendered applicationClass to exist
        expect(subject).to.have.length(1);
        //Set state to step 2, to be able to find RelationForm.
        subject.setState({
            step: 2
        });
        var fourthPage = subject.find(RelationForm);
        //Find the back-button, click it, and validate that you get to the correct step
        var backButton = fourthPage.find(NavigationButtons).find('.back-btn');
        backButton.simulate('click');
        expect(subject.state().step).to.equal(1);
    });
});
