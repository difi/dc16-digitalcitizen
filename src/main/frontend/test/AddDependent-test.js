/**
 * Created by camp-vha on 06.07.2016.
 */

import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import {shallow} from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {AddDependentClass} from '../app/FormPages/AddDependent.js';

var fields = {
    form1: {name: 'sdf', mail: 'df@df.no', phone: '12345678', relation: 'Forelder'},
    form2: {show: false, name: 'sdf', mail: 'df@df.no', phone: '12345678', relation: 'Forelder'},
    form3: {show: false, name: 'sdf', mail: 'df@df.no', phone: '12345678', relation: 'Forelder'},
    dependent: {
        value: false
    },
    numDep: {
        value: 1,
        onChange: function onChange() {
        }
    },
    displayButton: {value: 'block'}
//block: the button is visible, none: the button is hidden
};

describe("AddDependentClass", function () {
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each page
        const props = {
            fields
        };
        //Renders the AddDependentClass with props
        wrapper = shallow(<AddDependentClass {...props}/>);
    });

    it('should have header classnames for HTML-elements', function () {
        //expect wrapper to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect(wrapper.find('.form-header')).to.have.length(1);
    });

    it('should have div with ID=dep1', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('#dep1')).to.have.length(1);
    });

    it('should have addDependent-button', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.addDepButton')).to.have.length(1);
    });

    //Enzyme does not support checking if the button is visible or not, so this will not be tested

});
