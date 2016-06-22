import React from 'react';

import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
import TextField from '../app/TextField.jsx';

describe("A suite", function() {
    it("should have a input field", function() {
        const wrapper = shallow(<TextField/>);
        expect(wrapper.find('input')).to.have.length(1);
    });
});