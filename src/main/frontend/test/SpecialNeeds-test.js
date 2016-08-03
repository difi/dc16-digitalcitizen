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
import {SpecialNeedsClass} from '../app/FormPages/SpecialNeeds.js';

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

    it('should have header and container classnames for HTML-elements', function () {
        //expect wrapper to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('should have three labels with classname= from-col-address', function () {
        expect(wrapper).to.have.length(1);
        expect (wrapper.find('label.from-col-address')).to.have.length(3);
    });

    it('should have three HTML-elements with classname= from-col-address', function () {
        expect(wrapper).to.have.length(1);
        expect (wrapper.find('.special-needs-textarea')).to.have.length(3);
    });

});