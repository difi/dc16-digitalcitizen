/**
 * Created by camp-vha on 05.07.2016.
 */
import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import { shallow } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {PersonWithNeedInfoClass} from '../app/FormPages/PersonWithNeedInfoForm.js';

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

    it('should have header and container classnames for HTML-elements', function () {
        //expect wrapper to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('should have two HTML-elements with classname=name', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.name')).to.have.length(1);
        expect(wrapper.find('.nameField')).to.have.length(1);
    });

    it('should have two HTML-elements with classname=adr', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.adr')).to.have.length(2);
    });

    it('should have one HTML-elements with classname=tlf, and one with classname=tlfFrom',function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.tlf')).to.have.length(1);
        expect(wrapper.find('.tlfFrom')).to.have.length(1);
    });

});