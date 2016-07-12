/**
 * Created by camp-vha on 01.07.2016.
 */

import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {RelationFormClass} from '../app/FormPages/RelationForm.jsx';

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
        relation: {value: "undefined"},
        typeOfRelation: "sibling",
        nameOfChild: "ss",
        isDependent: false,
        otherRelation: "sd",
        guardianFor: {
            value: [{label: "", name: ""}],
            onChange: function onChange () {}
        }
    },
    fieldValues
};

describe("RelationFormClass", function() {
    it('should have header and container classnames for HTML-elements', function () {
        const wrapper = shallow(<RelationFormClass {...defaultProps}/>);
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('A HTML-element, with className = relation, exists', function () {
        const wrapper = shallow(<RelationFormClass {...defaultProps}/>);
        expect(wrapper.find('.relation')).to.have.length(1);
    });

    it('three radio-buttons exists', function () {
        const wrapper = shallow(<RelationFormClass {...defaultProps}/>);
        expect(wrapper.find('input[type="radio"]')).to.have.length(3);
    });

    it('correct radio-button exists', function () {
        const wrapper = shallow(<RelationFormClass {...defaultProps}/>);
        expect(wrapper.find('#guardian-radio')).to.have.length(1);
        expect(wrapper.find('#family-radio')).to.have.length(1);
        expect(wrapper.find('#other-radio')).to.have.length(1);
    });

    it('in case guardian-button is pressed, show label and dropdown-list', function () {
        //Need to redifine defaultProps because we need the relation value to be guardian, for this test only
        var defaultProps = {
            fields: {
                relation: {value: "guardian"},
                typeOfRelation: "sibling",
                nameOfChild: "ss",
                isDependent: false,
                otherRelation: "sd",
                guardianFor: {
                    value: [{label: "", name: ""}],
                    onChange: function onChange () {}
                }

            },
            fieldValues
        };
        const wrapper = shallow(<RelationFormClass {...defaultProps}/>);

        expect(wrapper.find('.guardian-rel')).to.have.length(2);
        expect(wrapper.find('label.guardian-rel')).to.have.length(1);
        expect(wrapper.find('DropdownList.guardian-rel')).to.have.length(1);
    });

    it('in case family-button is pressed, show label and dropdown-list, and checkbox', function () {
        //Need to redifine defaultProps because we need the relation value to be family, for this test only
        var defaultProps = {
            fields: {
                relation: {value: "family"},
                typeOfRelation: "sibling",
                nameOfChild: "ss",
                isDependent: false,
                otherRelation: "sd",
                guardianFor: {
                    value: [{label: "", name: ""}],
                    onChange: function onChange () {}
                }
            },
            fieldValues
        };
        const wrapper = shallow(<RelationFormClass {...defaultProps}/>);

        expect(wrapper.find('.family-rel')).to.have.length(2);
        expect(wrapper.find('label.family-rel')).to.have.length(1);
        expect(wrapper.find('DropdownList.family-rel')).to.have.length(1);
     });

    it('in case other-button is pressed, show label, text-fieds and checkbox', function () {
        var defaultProps = {
            fields: {
                relation: {value: "other"},
                typeOfRelation: "sibling",
                nameOfChild: "ss",
                isDependent: false,
                otherRelation: "sd",
                guardianFor: {
                    value: [{label: "", name: ""}],
                    onChange: function onChange () {}
                }
            },
            fieldValues
        };
        const wrapper = shallow(<RelationFormClass {...defaultProps}/>);
        expect(wrapper.find('.other-rel')).to.have.length(2);
        expect(wrapper.find('label.other-rel')).to.have.length(1);
        expect(wrapper.find('FormControl.other-rel')).to.have.length(1);
     });



    it('If none of the radio buttons are pressed, only the radiobuttons and the header is going to be shown', function () {
        const wrapper = shallow(<RelationFormClass {...defaultProps}/>);
        expect(wrapper.find('label#guardian')).to.have.length(0);
        expect(wrapper.find('label#family')).to.have.length(0);
        expect(wrapper.find('label#other')).to.have.length(0);

        expect(wrapper.find('DropdownList')).to.have.length(0);
        expect(wrapper.find('Checkbox')).to.have.length(0);
        expect(wrapper.find('FormControl')).to.have.length(0);

    });
});
