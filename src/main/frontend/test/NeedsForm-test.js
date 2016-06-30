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
    it('should have two radiobuttons', function () {
        const app = mount(<Application/>);


    });

    //Sjekk at radio-knappene eksisterer
    //Kan kun velge 1 knapp av gangen
    //Sjekk at knappene gjør det de skal

    //Sjekk at forover og bakoverknappen eksisterer
    //Sjekk at de gjør det de skal

});
