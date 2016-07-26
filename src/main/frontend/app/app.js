
/*

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

const reducer = (state = {}, action) => {
    switch(action.type){
        case LOAD:
            return{
            data: action.data
        }
        default: return state
    }
}

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
    nursingHome: {
        municipality: null,
        name: null
    }
};

var fieldValuesTest = {
    // First form
    applyingForSelf: null,    // Boolean
    // Second form
    relation: 'barn',             // String
    guardianName: 'gunnar',          //String
    typeOfRelation: 'venn',        //String
    dependent: true,          // Boolean
    dontGotPNRnumber: false,        //Boolean
    // Third form
    person: {                   // Person object
        pnr: '04119149261',              // String
        name: 'ole',                 // String
        address: {                  // Address Object
            country: "NO",              // String
            municipality: 'trondheim',
            streetAddress: 'testveien 123',        // String
            zipcode: '7030',              // String
            postal: null                // String
        },
        telephone: '81549300',             // String
        doctor: {                   // Doctor Object (add more fields?)
            name: 'dr. love'                  // String
        }
    },
    // Fifth form
    dependents: ['bertil', 'testveien 120', '12345678'],             // List of Dependent objects { name: '', address: '', telephone: ''} (add more fields?)
    // Sixth form
    lengthOfStay: 'long',         // String
    // Seventh form
    medicalNeeds: 'nei',         // String
    conditionChanges: 'nei',     // String
    otherNeeds: 'nei',            // String
    nursingHome: {
        municipality: 'trondheim',
        name: 'trondheim sykehjem'
    }
};

if ($('#content').length <= 0) {
    $('body').prepend('<div id="content"></div>');
}

ReactDOM.render(<Provider store={store}>
    <Application fieldValues={fieldValuesTest}
                 userData={user}/>s
</Provider>, document.getElementById('content'));
*/

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