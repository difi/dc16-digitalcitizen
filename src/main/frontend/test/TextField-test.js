import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import TextField from '../app/unused/TextField.jsx';

describe("Textfield", function() {
    it("should have a FormControl field", function() {
        const wrapper = shallow(<TextField/>);
        expect(wrapper.find('FormControl')).to.have.length(1);
    });
    it("should be a column", function() {
        const wrapper = shallow(<TextField/>);
        expect(wrapper.find('Col')).to.have.length(1);
    });

    it('should update state at change', function(){
        const wrapper = shallow(<TextField/>);
        const input = wrapper.find('FormControl');
        input.simulate('change', { target: { value: 'Hello' } });
        expect(wrapper.state().value).to.equal("Hello");
    });

});