import React from 'react';

/**
 * Shallow renders only our component without touching the DOM.
 * Mount gives full DOM rendering.
 * Render renders react components to static HTML and analyze the resulting HTML structure.
 */
import { shallow } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {PersonWithNeedInfoClass} from '../app/FormPages/PersonWithNeedInfoForm.js';

/**
 * Describe is the start of the test-class. Since we want to test PersonWithNeedInfoClass, we
 * note this in quotation marks (this is the name of the test)
 */
describe("PersonWithNeedInfoClass", function() {
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each page
        const props = {
            fields: {
                name: "skjhakl",
                number: 12345678,
                street: "gyt",
                zipcode: 7020,
                postal: "Trondheim"
            }
        };
        //Renders the PersonWithNeedInfoClass with props
        wrapper = shallow(<PersonWithNeedInfoClass {...props}/>);
    });

    /**
     * A test is described with the text in the quotation marks, and this will also be
     * what the test is called when run in Karma. If you want to look at one particular test
     * you just find the description under the name of the test-class.
     *
     * In the following tests we look for the elements we expect to exists
     * (there exists one element when lenthg is 1 and two if the length is 2)
     */
    it('Should have header and container classnames for HTML-elements', function () {
        //Expect the rendered PersonWithNeedInfoClass to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('Should have two HTML-elements with classname=name', function () {
        //Expect the rendered PersonWithNeedInfoClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.name')).to.have.length(1);
        expect(wrapper.find('.nameField')).to.have.length(1);
    });

    it('Should have two HTML-elements with classname=adr', function () {
        //Expect the rendered PersonWithNeedInfoClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.adr')).to.have.length(2);
    });

    it('Should have one HTML-elements with classname=tlf, and one with classname=tlfFrom',function () {
        //Expect the rendered PersonWithNeedInfoClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.tlf')).to.have.length(1);
        expect(wrapper.find('.tlfFrom')).to.have.length(1);
    });
});