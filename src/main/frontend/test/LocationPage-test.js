import React from 'react';

/**
 * Shallow renders only our component without touching the DOM.
 * Mount gives full DOM rendering.
 * Render renders react components to static HTML and analyze the resulting HTML structure.
 */
import { shallow } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import {LocationPageClass} from '../app/FormPages/LocationPage.js';

/**
 * Describe is the start of the test-class. Since we want to test LocationPageClass, we
 * note this in quotation marks (this is the name of the test)
 */
describe("LocationPageClass", function() {
    let wrapper = null;

    // this is run before each test (it ('...', function (){}))
    beforeEach(() => {
        // the fields that are individual for each page inside the program
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

    /**
     * A test is described with the text in the quotation marks, and this will also be
     * what the test is called when run in Karma. If you want to look at one particular test
     * you just find the description under the name of the test-class.
     *
     * In the following tests we look for the elements we expect to exists
     * (there exists one element when lenthg is 1 and two if the length is 2)
     */
    it('Should have header and container classnames for HTML-elements', function () {
        //Expect the rendered LocationPageClass to exist
        expect(wrapper).to.have.length(1);
        //Expect to find one element with the class name "form-header"
        expect (wrapper.find('.form-header')).to.have.length(1);
        expect(wrapper.find('.form-container')).to.have.length(1);
    });

    it('Should have label with classname municipality', function () {
        //Expect the rendered LocationPageClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.municipality')).to.have.length(1);
    });

    it('Should have one TypeAhead-field', function () {
        //Expect the rendered LocationPageClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('.municipTypeAhead')).to.have.length(1);
    });

    it('If homeOptions are available, show label with classname=home', function () {
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
        //Expect the rendered LocationPageClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('label.home')).to.have.length(1);
    });

    it('If homeOptions are not available, do not show label with classname=home', function () {
        //Expect the rendered LocationPageClass to exist
        expect(wrapper).to.have.length(1);
        expect(wrapper.find('label.home')).to.have.length(0);
        expect(wrapper.find('DropdownList')).to.have.length(0);
    });
});
