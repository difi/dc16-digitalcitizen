/**
 * Created by camp-vha on 30.06.2016.
 */

import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
var ReactTestUtils = require('react-addons-test-utils');
//Import the file we want to test.
import NeedsForm from '../app/NeedsForm.jsx';

var fieldValues = {
    // First form
    applyingForSelf: null,    // Boolean
    // Second form
    relation: null,             // String
    guardianName: null,          //String
    typeOfRelation: null,        //String
    dependent: null,          // Boolean
    gotPNRnumber: false,        //Boolean
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

describe("Application", function() {

    //TODO: test functionality of next and back buttons.
   it('when next page is pushed, render next page', function () {
        //Render the NeedsForm with fieldValues it is dependent on from Application - so we do not
         //have to also render Application
        const wrapper = shallow(<NeedsForm fieldValues = {fieldValues}/>);
       // Look for the button that has id = "next", and assign it to backbutton if it exists
        const backbutton = wrapper.find('#back');
        //Expect the backbutton to exist
        expect(backbutton).to.have.length(1);
       // Simulate a click on the backbutton
        ReactTestUtils.Simulate.click(backbutton);

    });


    //it('back button should go to the previous page when pushed', function () {
        //const wrapper = shallow(<NeedsForm fieldValues = {fieldValues}/>);
        //const backbutton = wrapper.find('#back');
        //backbutton.simulate('click');
        //expect(backbutton).to.have.length(1);

        //expect
    });




