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
import {GeneralPractitionerClass} from '../app/FormPages/GeneralPractitioner.js';
//Import TypeAhead to be able to find the fields where it is used
import TypeAhead from '../node_modules/react-bootstrap-typeahead/lib/Typeahead.react.js';

describe("GeneralPractitionerClass", function() {
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each page
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

    it('should have header and container classnames for HTML-elements', function () {
        //expect wrapper to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('should have two HTML-elements with className=genPract', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('label.genPract')).to.have.length(1);
        expect(wrapper.find(TypeAhead)).to.have.length(1);
    });

});