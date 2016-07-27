"use strict";

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import reducers from './FormPages/Utilities/reducers.js';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import AddDependent from './FormPages/AddDependent.js';
import Application from './Application.js';
import SynchronousValidationForm from './unused/ReduxForm.jsx';
import Buttons from './unused/buttons.jsx';
import GeneralPractitioner from './FormPages/GeneralPractitioner.js';
import PersonWithNeedForm from './FormPages/PersonWithNeedForm.js';


const store = createStore(reducers);

var fastleger = ["Ola Nordmann", "Kari Nordmann"];

var user = {
    pnr: "01108019146",
    name: "TestPerson1",
    submissionId: null
};

if ($('#content').length <= 0) {
    $('body').prepend('<div id="content"></div>');
}

ReactDOM.render(<Provider store={store}>
    <Application userData={user}/>
</Provider>, document.getElementById('content'));