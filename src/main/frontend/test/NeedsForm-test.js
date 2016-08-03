/**
 * Created by camp-vha on 28.06.2016.
 */
import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import { shallow } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {NeedsFormClass} from '../app/FormPages/NeedsForm.js';

describe("NeedsFormClass", function() {
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each page
        const props = {
            fields: {
                need: false
            }
        };
        //Renders the NeedsForm with props
        wrapper = shallow(<NeedsFormClass {...props}/>);
    });

    it('should have header and container classnames for HTML-elements', function () {
        //expect wrapper to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('should have a HTML-element with className = needs', function () {
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "needs"
        expect(wrapper.find('.needs')).to.have.length(1);
    });

    it('two radio-buttons exists', function () {
        expect(wrapper).to.have.length(1);
        //Expect to find two elements with the tag input of type radio.
        expect(wrapper.find('input[type="radio"]')).to.have.length(2);
    });
});