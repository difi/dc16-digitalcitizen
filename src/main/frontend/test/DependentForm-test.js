import React from 'react';

/**
 * Shallow renders only our component without touching the DOM.
 * Mount gives full DOM rendering.
 * Render renders react components to static HTML and analyze the resulting HTML structure.
 */
import { shallow } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import DependentForm from '../app/FormPages/Components/DependentForm.js';

/**
 * Describe is the start of the test-class. Since we want to test DependentForm, we
 * note this in quotation marks (this is the name of the test)
 */
describe("DependentForm", function() {
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each page in the program
        const props = {
            name: 'ds',
            mail: {value: 'df@df.no', error: " ", touched: false},
            phone: {value: '12345678', error: " ", touched: false},
            relation: {value: 'Søsken'},
            showDeleteButton: true
        };
        //Renders the DependentForm with props
        wrapper = shallow(<DependentForm {...props}/>);
    });

    /**
     * A test is described with the text in the quotation marks, and this will also be
     * what the test is called when run in Karma. If you want to look at one particular test
     * you just find the description under the name of the test-class.
     *
     * In the following tests we look for the elements we expect to exists
     * (there exists one element when lenthg is 1 and two if the length is 2)
     */
    it('should have two HTML-elements that are connected to name', function () {
        //Expect the rendered dependentform to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.name')).to.have.length(1);
        expect(wrapper.find('.nameField')).to.have.length(1);
    });

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
        expect(wrapper.find('.close-button')).to.have.length(1);
    });

    it('if showDeleteButton=false, hide delete button', function () {
        // Because we need to redefine the value of showDeleteButton,
        // we need to define all props again, and render the class with these props
        var defaultProps = {
            name: 'ds',
            mail: {value: 'df@df.no', error: " ", touched: false},
            phone: {value: '12345678', error: " ", touched: false},
            relation: {value: 'Søsken'},
            showDeleteButton: false
        };
        const wrapper = shallow(<DependentForm {...defaultProps}/> );
        //Expect to not find one element with the class name "close"
        expect(wrapper.find('.close-button')).to.have.length(0);
    });

    it('if you choose other, show textfield', function () {
        // Because we need to redefine the value of relation,
        // we need to define all props again, and render the class with these props
        var defaultProps = {
            name: 'ds',
            mail: {value: 'df@df.no', error: " ", touched: false},
            phone: {value: '12345678', error: " ", touched: false},
            relation: {value: 'Annet'}
        };

        const wrapper = shallow(<DependentForm {...defaultProps}/>);
        //Expect to fin the textfield where you can write the specification of your relation.
        expect(wrapper.find('.dep-other-rel')).to.have.length(1);
    });

    it('if you choose sibling, do not show textfield', function () {
        //Expect the rendered dependentform to exist
        expect(wrapper).to.have.length(1);
        // If you choose anything else (for example sibling) as relation, the text
        // field should not exist.
        expect(wrapper.find('.dep-other-rel')).to.have.length(0);
    });

});
