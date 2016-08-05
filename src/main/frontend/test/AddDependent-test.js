import React from 'react';

/**
 * Shallow renders only our component without touching the DOM.
 * Mount gives full DOM rendering.
 * Render renders react components to static HTML and analyze the resulting HTML structure.
 */
import {shallow} from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {AddDependentClass} from '../app/FormPages/AddDependent.js';

//Have to set the fields that are expected by the class we want to test.
var fields = {
    //The first implementation of DependentForm - called form1 in this class
    form1: {name: 'sdf', mail: 'df@df.no', phone: '12345678', relation: 'Forelder'},
    //The second implementation of DependentForm - called form2 in this class
    form2: {show: false, name: 'sdf', mail: 'df@df.no', phone: '12345678', relation: 'Forelder'},
    //The third implementation of DependentForm - called form3 in this class
    form3: {show: false, name: 'sdf', mail: 'df@df.no', phone: '12345678', relation: 'Forelder'},

    dependent: {
        value: false
    },
    //The numDep controls which implementation of DependentForm is shown in this class
    numDep: {
        value: 1, //Shows only form1.
        onChange: function onChange() {     //Needs to fill in an onChange-function so enzyme will render the class, but it do not need to do anything.
        }
    },
    /**
     * displaybutton tells if the add-dependent-button is visible.
     * block: the button is visible, none: the button is hidden
     */
    displayButton: {value: 'block'}
};

/**
 * Describe is the start of the test-class. Since we want to test AddDependentClass, we
 * note this in quotation marks (this is the name of the test)
 */
describe("AddDependentClass", function () {
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each class inside the program
        const props = {
            fields
        };
        //Renders the AddDependentClass with the given props
        wrapper = shallow(<AddDependentClass {...props}/>);
    });

    /**
     * A test is described with the text in the quotation marks, and this will also be
     * what the test is called when run in Karma. If you want to look at one particular test
     * you just find the description under the name of the test-class.
     */
    it('Should have header classnames for HTML-elements', function () {
        //Expect the rendered AddDependentClass to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect(wrapper.find('.form-header')).to.have.length(1);
    });

    it('Should have a HTML-element with ID=dep1', function () {
        //Expect the rendered AddDependentClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('#dep1')).to.have.length(1);
    });

    it('Should have the addDependent-button', function () {
        //Expect the rendered AddDependentClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.addDepButton')).to.have.length(1);
    });

    /**
     * Enzyme does not support checking if the button is visible or not,
     * so this will not be tested
     */
});
