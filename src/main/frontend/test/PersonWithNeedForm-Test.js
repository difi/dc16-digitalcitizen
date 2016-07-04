
import {PersonWithNeed} from '../app/PersonWithNeedForm'
import React from 'react'
import chai, { expect } from 'chai'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'

chai.use(chaiEnzyme()); 
var defaultProps = {
    fields: {
        pnr: null,
        checked: null,
        name: null ,
    }
};
describe("PersonWithNeed", function() {
    it('should be rendered', function () {
        const wrapper = shallow(<PersonWithNeed {...defaultProps}/>);
        expect(wrapper.find('form')).to.have.length(1);
    })
});