/**
 * Created by camp-vha on 06.07.2016.
 */

import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import DependentForm from '../app/FormPages/Components/DependentForm.jsx';

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
    otherNeeds: null,            // String

};

var defaultProps = {

    firstName: 'ds',
    lastName: 'sdf',
    mail: {value: 'df@df.no', error: " ", touched: false},
    phone: {value: '12345678', error: " ", touched: false},
    relation: {value: 'sibling'},
    fieldValues: {fieldValues}
};

describe("DependentForm", function() {
    it('should have two elements with classname=fname', function () {
        const wrapper = shallow(<DependentForm {...defaultProps}/> );
        expect (wrapper.find('.fName')).to.have.length(2);
        expect(wrapper.find('label.fName')).to.have.length(1);
        expect(wrapper.find('FormControl.fName')).to.have.length(1);
    });

    it('should have two elements with classname=eName', function () {
        const wrapper = shallow(<DependentForm {...defaultProps}/> );
        expect (wrapper.find('.eName')).to.have.length(2);
        expect(wrapper.find('label.eName')).to.have.length(1);
        expect(wrapper.find('FormControl.eName')).to.have.length(1);
    });

    it('should have two elements with classname=tlf', function () {
        const wrapper = shallow(<DependentForm {...defaultProps}/> );
        expect (wrapper.find('.tlf')).to.have.length(2);
        expect(wrapper.find('label.tlf')).to.have.length(1);
        expect(wrapper.find('FormControl.tlf')).to.have.length(1);
    });

    it('should have two elements with classname=mail', function () {
        const wrapper = shallow(<DependentForm {...defaultProps}/> );
        expect (wrapper.find('.mail')).to.have.length(2);
        expect(wrapper.find('label.mail')).to.have.length(1);
        expect(wrapper.find('FormControl.mail')).to.have.length(1);
    });

    it('should have two elements with classname=depRel', function () {
        const wrapper = shallow(<DependentForm {...defaultProps}/> );
        expect (wrapper.find('.depRel')).to.have.length(2);
        expect(wrapper.find('label.depRel')).to.have.length(1);
        expect(wrapper.find('DropdownList.depRel')).to.have.length(1);
    });

    it('if showDeleteButton=true, show delete button', function () {
        var defaultProps = {
            firstName: 'ds',
            lastName: 'sdf',
            mail: {value: 'df@df.no', error: " ", touched: false},
            phone: {value: '12345678', error: " ", touched: false},
            relation: {value: 'sibling'},
            fieldValues: {fieldValues},
            showDeleteButton: true
        };
        const wrapper = shallow(<DependentForm {...defaultProps}/> );
        expect(wrapper.find('.close')).to.have.length(1);
    });

});
