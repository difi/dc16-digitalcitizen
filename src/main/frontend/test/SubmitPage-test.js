/**
 * Created by camp-vha on 14.07.2016.
 */
import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import { shallow } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {SubmitSuccessClass} from '../app/FormPages/SubmitPage.js';

var userData = {
    pnr: "15028047425",
    name: "Elias Eliassen",
    submissionId: 35,

};

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

    it('should have header and container classnames for HTML-elements', function () {
        //expect wrapper to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('should have a column with classname=submit-name, and a label', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.submit-name')).to.have.length(1);
        expect(wrapper.find('label.submittedName')).to.have.length(1);
    });

    it('should have a next-button', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.next-btn')).to.have.length(1);
    });

});
