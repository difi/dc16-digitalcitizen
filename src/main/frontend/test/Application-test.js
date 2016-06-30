/**
 * Created by camp-vha on 30.06.2016.
 */

import React from 'react';

//Shallow renders only our component without touching the DOM.
//Mount gives full DOM rendering.
//Render renders react components to static HTML and analyze the resulting HTML structure.

import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
//Import the file we want to test.
import Application from '../app/Application.jsx';

describe("Application", function() {

    //TODO: test functionality of next and back buttons.
   /* it('when next page is pushed, render next page', function () {
        //Render the NeedsForm with fieldValues it is dependent on from Application - so we do not
        // have to also render Application
        //const wrapper = shallow(<NeedsForm fieldValues = {fieldValues} saveValues = {saveValues} nextStep = {nextStep}/>);
        //Look for the button that has id = "next", and assign it to backbutton if it exists
        //const backbutton = wrapper.find('#next');
        //Expect the backbutton to exist
        //expect(backbutton).to.have.length(1);
        //Simulate a click on the backbutton
        //backbutton.simulate('click');

    });


    it('back button should go to the previous page when pushed', function () {
        //const wrapper = shallow(<NeedsForm fieldValues = {fieldValues}/>);
        //const backbutton = wrapper.find('#back');
        //backbutton.simulate('click');
        //expect(backbutton).to.have.length(1);

        //expect
    });
*/

});




