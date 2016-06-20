import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Email from 'src/main/frontend/src/TextField.jsx';

describe('<Email>', function () {
    it('should have an input for the email', function () {
        const wrapper = shallow(<Email/>);
        expect(wrapper.find('input')).to.have.length(1);
    });

});