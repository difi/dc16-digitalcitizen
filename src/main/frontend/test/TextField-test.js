import React from 'react';

import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
import TextField from '../app/TextField.jsx';

describe("Textfield", function() {
    it("should have a FormControl field", function() {
        const wrapper = shallow(<TextField/>);
        expect(wrapper.find('FormControl')).to.have.length(1);
    });
    it("should be a column", function() {
        const wrapper = shallow(<TextField/>);
        expect(wrapper.find('Col')).to.have.length(1);
    });
    it("should handle change", function() {
        const wrapper = shallow(<TextField/>);
        expect(wrapper.props().handleChange).to.be.defined;
    });

    it('should update state at change', function(){
        const wrapper = shallow(<TextField/>);
        const input = wrapper.find('FormControl');
        input.simulate('change', { target: { value: 'Hello' } });
        expect(wrapper.state().value).to.equal("Hello");
    });

});