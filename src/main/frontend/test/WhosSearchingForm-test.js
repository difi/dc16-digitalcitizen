/**
 * Created by camp-vha on 01.07.2016.
 */
import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import { shallow } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {WhosSearchingClass} from '../app/FormPages/WhosSearchingForm.js';

describe("WhosSearchingForm", function() {
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        //Renders the WhosSearchingForm with props
        wrapper = shallow(<WhosSearchingClass />);
    });

    it('should have header and container classnames for HTML-elements', function () {
        //expect wrapper to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('two buttons exists', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('Button')).to.have.length(2);
    });
});
