/**
 * Created by camp-vha on 13.07.2016.
 */

import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import { shallow } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {LocationPageClass} from '../app/FormPages/LocationPage.jsx';

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

describe("LocationPageClass", function() {
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each page
        const props = {
            fields: {
                municipalityApp: {
                    value: {
                        name: "Oslo"
                    },
                    onChange: function onChange () {}
                },
                homeApp: {
                    value: "Ryen sykehjem",
                    onChange: function onChange () {}
                },
                homeOptions: {
                    value: null
                }
            },
            fieldValues
        };
        //Renders the NeedsForm with props
        wrapper = shallow(<LocationPageClass {...props}/>);
    });

    it('should have header and container classnames for HTML-elements', function () {
        //expect wrapper to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('should have label with classname municipality', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.municipality')).to.have.length(1);
    });

    it('should have one TypeAhead-field', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.municipTypeAhead')).to.have.length(1);
    });

    it('if homeOptions are available, show label with classname=home', function () {
        //Need to redefine the props-values, because homeOptions.value now have a new value
        const props = {
            fields: {
                municipalityApp: {
                    value: {
                        name: "Oslo"
                    },
                    onChange: function onChange () {}
                },
                homeApp: {
                    value: "Ryen sykehjem",
                    onChange: function onChange () {}
                },
                homeOptions: {
                    value: "Frogner"
                }
            },
            fieldValues
        };
        //Renders the NeedsForm with props
        wrapper = shallow(<LocationPageClass {...props}/>);

        expect(wrapper).to.have.length(1);

        expect(wrapper.find('label.home')).to.have.length(1);
        expect(wrapper.find('DropdownList')).to.have.length(1);
    });

    it('if homeOptions are not available, do not show label with classname=home', function () {
        expect(wrapper).to.have.length(1);

        expect(wrapper.find('label.home')).to.have.length(0);
        expect(wrapper.find('DropdownList')).to.have.length(0);
    });

});
