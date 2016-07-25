/**
 * Created by camp-vha on 06.07.2016.
 */

import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import { shallow } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import DependentForm from '../app/FormPages/Components/DependentForm.js';

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

describe("DependentForm", function() {
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each page
        const props = {
            firstName: 'ds',
            lastName: 'sdf',
            mail: {value: 'df@df.no', error: " ", touched: false},
            phone: {value: '12345678', error: " ", touched: false},
            relation: {value: 'Søsken'},
            fieldValues: {fieldValues},
            showDeleteButton: true
        };

        //Renders the DependentForm with props
        wrapper = shallow(<DependentForm {...props}/>);
    });

    //it('should have two elements with classname=fname', function () {
    //    //expect wrapper to exist
    //    expect(wrapper).to.have.length(1);
    //    //Expect to find two elements with the class name "fName"
    //    expect (wrapper.find('.fName')).to.have.length(2);
    //    //Expect to find one label-element with the class name "fName"
    //    expect(wrapper.find('label.fName')).to.have.length(1);
    //    expect(wrapper.find('FormControl.fName')).to.have.length(1);
    //});

    it('should have two HTML-elements with classname=name', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.name')).to.have.length(1);
        expect(wrapper.find('.nameField')).to.have.length(1);
    });

    //it('should have two elements with classname=eName', function () {
    //    expect(wrapper).to.have.length(1);
    //    expect (wrapper.find('.eName')).to.have.length(2);
    //    expect(wrapper.find('label.eName')).to.have.length(1);
    //    expect(wrapper.find('FormControl.eName')).to.have.length(1);
    //});

    it('should have two elements with classname=tlf', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('label.tlf')).to.have.length(1);
        expect(wrapper.find('FormControl.tlfForm')).to.have.length(1);
    });

    it('should have two elements with classname=mail', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('label.mail')).to.have.length(1);
        expect(wrapper.find('FormControl.mailForm')).to.have.length(1);
    });

    it('should have two elements with classname=depRel', function () {
        expect(wrapper).to.have.length(1);
        expect (wrapper.find('.depRel')).to.have.length(2);
        expect(wrapper.find('label.depRel')).to.have.length(1);
        expect(wrapper.find('DropdownList.depRel')).to.have.length(1);
    });

    it('if showDeleteButton=true, show delete button', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.close')).to.have.length(1);
    });

    it('if showDeleteButton=false, hide delete button', function () {
        // Because we need to redefine the value of showDeleteButton, we need to define all props again
        var defaultProps = {
            firstName: 'ds',
            lastName: 'sdf',
            mail: {value: 'df@df.no', error: " ", touched: false},
            phone: {value: '12345678', error: " ", touched: false},
            relation: {value: 'Søsken'},
            fieldValues: {fieldValues},
            showDeleteButton: false
        };
        const wrapper = shallow(<DependentForm {...defaultProps}/> );
        //Expect to not find one element with the class name "close"
        expect(wrapper.find('.close')).to.have.length(0);
    });

    it('if you choose other, show textfield', function () {
        var defaultProps = {
            firstName: 'ds',
            lastName: 'sdf',
            mail: {value: 'df@df.no', error: " ", touched: false},
            phone: {value: '12345678', error: " ", touched: false},
            relation: {value: 'Annet'},
            fieldValues: {fieldValues}
        };

        const wrapper = shallow(<DependentForm {...defaultProps}/>);
        expect(wrapper.find('.dep-other-rel')).to.have.length(1);
    });

    it('if you choose sibling, do not show textfield', function () {
        expect(wrapper).to.have.length(1);

        expect(wrapper.find('.dep-other-rel')).to.have.length(0);
    });

});
