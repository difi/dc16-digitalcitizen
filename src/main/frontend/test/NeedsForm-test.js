/**
 * Created by camp-vha on 28.06.2016.
 */
import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {NeedsFormClass} from '../app/FormPages/NeedsForm.jsx';

//Added these values from Application to simulate that NeedsForm have received these values from Application,
// because NeedsForm is dependent on these Application values
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
var defaultProps = {
    fields: {
        need: false
    },
    fieldValues
};

describe("NeedsFormClass", function() {
    it('should have header and container classnames for HTML-elements', function () {
        const wrapper = shallow(<NeedsFormClass {...defaultProps}/> );
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('should have a HTML-element with className = needs', function () {
        //Render the NeedsForm with fieldValues it is dependent on from Application - so we do not
        // have to also render Application
        const wrapper = shallow(<NeedsFormClass {...defaultProps}/> );

        //Expect to find one element with the class name "needs"
        expect(wrapper.find('.needs')).to.have.length(1);
    });

    it('two radio-buttons exists', function () {
        const wrapper = shallow(<NeedsFormClass {...defaultProps}/>);
        expect(wrapper.find('input[type="radio"]')).to.have.length(2);
    });
});