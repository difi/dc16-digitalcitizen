/**
 * Created by camp-vha on 28.06.2016.
 */
import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import NeedsForm from '../app/NeedsForm.jsx';

describe("NeedsForm", function() {
    //Radio-buttons
    it('should have RadioGroup', function () {
        const  wrapper = shallow(<NeedsForm/>);
        expect(wrapper.find('.needs')).to.have.length(1);
    });

    it('value for the radio-buttons should have null as initial state', function () {
        const wrapper = mount(<NeedsForm/>);
        expect(wrapper.state().value).to.equal(null);
    });

    //TODO: Check that the radio-buttons are doing what they are supposed to, when this functionality is added
    //Look at Simulations on http://brewhouse.io/2016/03/18/accelerate-your-react-testing-with-enzyme.html
    //for example of how to do this.

    //Next and previous buttons
    it('should have two "normal" buttons - next and previous', function () {
        const wrapper = shallow(<NeedsForm/>);
        expect(wrapper.find('Button')).to.have.length(2);
    });

    //TODO: Sjekk at de gjør det de skal
    /*it('back button should go to the previous page when pushed', function () {
        const wrapper = shallow(<NeedsForm/>);
        const backbutton = wrapper.find('.button-next');
        wrapper.setState({adress: null});
        backbutton.simulate('click');
        expect(this.props.previousStep).to.equal('1');
    });
*/

    //Cannot test if there exists two radio-buttons, nor what happens when one of them are pushed, because
    //they are "react-radio-group" elements.

});