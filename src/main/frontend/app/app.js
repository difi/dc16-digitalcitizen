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

var fieldValues = {
    // First form
    applyingForSelf: null,    // Boolean
    // Second form
    relation: null,             // String
    guardianName: null,          //String
    typeOfRelation: null,        //String
    dependent: null,          // Boolean
    dontGotPNRnumber: false,        //Boolean
    // Third form
    person: {                   // Person object
        pnr: user.pnr,              // String
        name: null,                 // String
        address: {                  // Address Object
            country: "NO",              // String
            municipality: null,
            streetAddress: null,        // String
            zipcode: null,              // String
            postal: null                // String
        },
        telephone: null,             // String
        doctor: {                   // Doctor Object (add more fields?)
            name: null                  // String
        }
    },
    // Fifth form
    dependents: [],             // List of Dependent objects { name: '', address: '', telephone: ''} (add more fields?)
    // Sixth form
    lengthOfStay: null,         // String
    // Seventh form
    medicalNeeds: null,         // String
    conditionChanges: null,     // String
    otherNeeds: null,            // String
    application: {
        municipality: null,
        home: null
    }
};

if ($('#content').length <= 0) {
    $('body').prepend('<div id="content"></div>');
}

ReactDOM.render(<Provider store={store}>
    <Application fieldValues={fieldValues}
                 userData={user}/>
</Provider>, document.getElementById('content'));
