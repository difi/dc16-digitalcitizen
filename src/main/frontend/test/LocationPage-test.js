/**
 * Created by camp-vha on 13.07.2016.
 */

import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import { shallow } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {LocationPageClass} from '../app/FormPages/LocationPage.js';

describe("LocationPageClass", function() {
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each page
        const props = {
            fields: {
                municipalityApp: {
                    value: "sd",
                    onChange: function onChange () {}
                },
                homeApp: {
                    value: "Ryen sykehjem",
                    onChange: function onChange () {}
                },
                homeOptions: {
                    value: [{name: "Ryen sykehjem"}]
                },
                municipality: {
                    value: "Oslo"
                }
            }
        };
        //Renders the NeedsForm with props
        wrapper = shallow(<LocationPageClass {...props}/>);
    });

    it('should have header and container classnames for HTML-elements', function () {
        //expect wrapper to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('should have label with classname municipality', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.municipality')).to.have.length(1);
    });

    it('should have one TypeAhead-field', function () {
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.municipTypeAhead')).to.have.length(1);
    });

    it('if homeOptions are available, show label with classname=home', function () {
        //Need to redefine the props-values, because homeOptions.value now have a new value
        const props = {
            fields: {
                municipalityApp: {
                    value: "Oslo",
                    onChange: function onChange () {}
                },
                homeApp: {
                    value: "Ryen sykehjem",
                    onChange: function onChange () {}
                },
                homeOptions: {
                    value: [{name: "Ryen sykehjem"}]
                },
                municipality: {
                    value: "Oslo"
                }
            }
        };
        //Renders the NeedsForm with props
        wrapper = shallow(<LocationPageClass {...props}/>);

        expect(wrapper).to.have.length(1);

        expect(wrapper.find('label.home')).to.have.length(1);
        //expect(wrapper.find('DropdownList')).to.have.length(1);
    });

    it('if homeOptions are not available, do not show label with classname=home', function () {
        expect(wrapper).to.have.length(1);

        expect(wrapper.find('label.home')).to.have.length(0);
        expect(wrapper.find('DropdownList')).to.have.length(0);
    });

});
