/**
 * Created by camp-vha on 14.07.2016.
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
import {SubmitSuccessClass} from '../app/FormPages/SubmitPage.js';

/**
 * Need the userData to be able to handle the requests from the different classes correctly.
 * This is the userData of the person we are logged in as.
 * @type {{pnr: string, name: string, submissionId: number}}
 */
var userData = {
    pnr: "15028047425",
    name: "Elias Eliassen",
    submissionId: 35,
};

/**
 * Describe is the start of the test-class. Since we want to test SubmitSuccessClass, we
 * note this in quotation marks (this is the name of the test)
 */
describe("SubmitPageClass", function() {
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each page
        const props = {
            fields: {
                name: {value: null},
                applyingForSelf: {value: null}
            },
            userData: userData
        };
        //Renders the NeedsForm with props
        wrapper = shallow(<SubmitSuccessClass {...props}/>);
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
        //Expect the rendered SubmitSuccessClass to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('Should have a column with classname=submit-name, and a label', function () {
        //Expect the rendered SubmitSuccessClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.submit-name')).to.have.length(1);
        expect(wrapper.find('label.submittedName')).to.have.length(1);
    });

    it('Should have a next-button', function () {
        //Expect the rendered SubmitSuccessClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.next-btn')).to.have.length(1);
    });
});
