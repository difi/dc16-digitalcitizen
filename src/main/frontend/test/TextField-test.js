import React from 'react';

/**
 * Shallow renders only our component without touching the DOM.
 * Mount gives full DOM rendering.
 * Render renders react components to static HTML and analyze the resulting HTML structure.
 */
import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import TextField from '../app/unused/TextField.jsx';

/**
 * Describe is the start of the test-class. Since we want to test WhosSearchingClass, we
 * note this in quotation marks (this is the name of the test)
 */
describe("Textfield", function() {
    it("Should have a FormControl field", function() {
        const wrapper = shallow(<TextField/>);
        expect(wrapper.find('FormControl')).to.have.length(1);
    });
    it("Should be a column", function() {
        const wrapper = shallow(<TextField/>);
        expect(wrapper.find('Col')).to.have.length(1);
    });
    it('Should update state at change', function(){
        const wrapper = shallow(<TextField/>);
        const input = wrapper.find('FormControl');
        input.simulate('change', { target: { value: 'Hello' } });
        expect(wrapper.state().value).to.equal("Hello");
    });
});