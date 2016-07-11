"use strict";


import { Provider } from 'react-redux';
import {createStore, combineReducers} from 'redux';
import reducers from './unused/reducers.js';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import AddDependent from './AddDependent.jsx';
import Application from './Application.jsx';
import SynchronousValidationForm from './ReduxForm.jsx';
import Buttons from './unused/buttons.jsx';
import GeneralPractitioner from './GeneralPractitioner.jsx';
import PersonWithNeedForm from './PersonWithNeedForm.jsx';


const store = createStore(reducers);

var fastleger = ["Ola Nordmann", "Kari Nordmann"];



var dataMe = [
    {name: "Fødselsnr.", type: "TextField"},
    {name: "Fornavn", type: "TextField"},
    {name: "Etternavn", type: "TextField"},
    {name: "Telefon", type: "TextField"},
    {name: "Adresse", type: "AddressField", includeCountry: false},
    {name: "Nasjonalitet", type: "Dropdown"},
    {name: "Sivilstatus", type: "Dropdown"},
    {name: "Fastlege", type: "AutoComplete", data: fastleger},
    {name: "Bor du alene?", type: "RadioButton"}
];

var dataApplicant = [
    {name: "Fornavn", type: "TextField"},
    {name: "Etternavn", type: "TextField"},
    {name: "Telefon", type: "TextField"},
    {name: "Adresse", type: "AddressField", includeCountry: true},
    {name: "Relasjon", type: "Dropdown"}];

var dataDep = [
    {name: "Fornavn", type: "TextField"},
    {name: "Etternavn", type: "TextField"},
    {name: "Telefon", type: "TextField"},
    {name: "Adresse", type: "AddressField", includeCountry: true},
    {name: "Relasjon", type: "Dropdown"},
    {name: "Flere pårørende?", type: "RadioButton"}
];
/*
 //Further relations
 var dataDep2=[
 {name: "Fornavn", type: "TextField"},
 {name: "Etternavn", type: "TextField"},
 {name: "Telefon", type: "TextField"},
 {name: "Adresse", type: "AddressField", includeCountry: true},
 {name: "Relasjon", type: "Dropdown"}];
 */

var dataWhy = [
    {name: "Hvorfor søker du plass?", type:"TextArea"},
    {name: "Hva er det du trenger hjelp med i hverdagen?", type:"TextArea"}];

var data = [
    {formname: "Om den som ønsker plass", data: dataMe},
    {formname: "Om deg som søker", data: dataApplicant},
    {formname: "Om pårørende", data: dataDep},

    //{formname: "Andre pårørende", data: dataDep2},

    {formname: "Hvorfor du søker", data: dataWhy}
];

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
        telephone: null             // String
    },
    // Fourth form
    doctor: {                   // Doctor Object (add more fields?)
        name: null                  // String
    },
    // Fifth form
    dependents: [],             // List of Dependent objects { name: '', address: '', telephone: ''} (add more fields?)
    // Sixth form
    lengthOfStay: null,         // String
    // Seventh form
    medicalNeeds: null,         // String
    conditionChanges: null,     // String
    otherNeeds: null            // String
};


ReactDOM.render( <Provider store={store}>
    <Application fieldValues={fieldValues}
userData={user}/>
    </Provider>, document.getElementById('content'));