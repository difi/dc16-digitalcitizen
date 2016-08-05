/**
 * Created by camp-vha on 05.07.2016.
 */
import React from 'react';

/**
 * Shallow renders only our component without touching the DOM.
 * Mount gives full DOM rendering.
 * Render renders react components to static HTML and analyze the resulting HTML structure.
 */
import { shallow } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {SpecialNeedsClass} from '../app/FormPages/SpecialNeeds.js';

/**
 * Describe is the start of the test-class. Since we want to test SpecialNeedsClass, we
 * note this in quotation marks (this is the name of the test)
 */
describe("SpecialNeedsClass", function() {
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each page
        const props = {
            fields: {
                medical: {value: null},
                changes: {value: "fsd"},
                other: {value: null}
            }
        };

        //Renders the NeedsForm with props
        wrapper = shallow(<SpecialNeedsClass {...props}/>);
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
        //Expect the rendered SpecialNeedsClass to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('Should have three labels with classname= from-col-address', function () {
        //Expect the rendered SpecialNeedsClass to exist
        expect(wrapper).to.have.length(1);
        expect (wrapper.find('label.from-col-address')).to.have.length(3);
    });

    it('Should have three HTML-elements with classname= from-col-address', function () {
        //Expect the rendered SpecialNeedsClass to exist
        expect(wrapper).to.have.length(1);
        expect (wrapper.find('.special-needs-textarea')).to.have.length(3);
    });
});