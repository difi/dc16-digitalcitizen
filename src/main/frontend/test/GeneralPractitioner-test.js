import React from 'react';

/**
 * Shallow renders only our component without touching the DOM.
 * Mount gives full DOM rendering.
 * Render renders react components to static HTML and analyze the resulting HTML structure.
 */
import { shallow } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {GeneralPractitionerClass} from '../app/FormPages/GeneralPractitioner.js';
//Import TypeAhead to be able to find the fields where it is used
import TypeAhead from '../node_modules/react-bootstrap-typeahead/lib/Typeahead.react.js';

/**
 * Describe is the start of the test-class. Since we want to test GeneralPractitionerClass, we
 * note this in quotation marks (this is the name of the test)
 */
describe("GeneralPractitionerClass", function() {
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each page inside this program
        const props = {
            fields: {
                doctorName: "sd",
                doctors: {value: [{name: "Berit"}], onChange: function onChange () {}},
                municipality: {
                    value: "Oslo"
                }
            }
        };
        //Renders the GeneralPractitionerClass with props
        wrapper = shallow(<GeneralPractitionerClass {...props}/>);
    });

    /**
     * A test is described with the text in the quotation marks, and this will also be
     * what the test is called when run in Karma. If you want to look at one particular test
     * you just find the description under the name of the test-class.
     */
    it('Should have header and container classnames for HTML-elements', function () {
        //Expect the rendered GeneralPractitionerClass to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('Should have two HTML-elements with className=genPract', function () {
        //Expect the rendered GeneralPractitionerClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('label.genPract')).to.have.length(1);
        expect(wrapper.find(TypeAhead)).to.have.length(1);
    });

});