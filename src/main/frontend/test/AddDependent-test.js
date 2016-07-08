/**
 * Created by camp-vha on 06.07.2016.
 */
/*
import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {AddDependentClass} from '../app/AddDependent.jsx';

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
var defaultProps = {
    fields: {
        form1: {firstName: 'ds', lastName: 'sdf', mail: 'df@df.no', phone: '12345678', relation: 'Forelder'},
        form2: {show: false, firstName: 'ds', lastName: 'sdf', mail: 'df@df.no', phone: '12345678', relation: 'Forelder'},
        form3: {show: false, firstName: 'ds', lastName: 'sdf', mail: 'df@df.no', phone: '12345678', relation: 'Forelder'}
    },
    fieldValues
};

describe("AddDependentClass", function() {
    it('should have header classnames for HTML-elements', function () {
        const wrapper = shallow(<AddDependentClass {...defaultProps}/> );
        expect (wrapper.find('.form-header')).to.have.length(1);
    });

    it('should have addDependent-button initially', function () {
        const wrapper = shallow(<AddDependentClass {...defaultProps}/> );
        expect(wrapper.find('.addDepButton')).to.have.length(1);
    });

    //TODO: Write a test for when the addDependent-button should not exist


});
*/