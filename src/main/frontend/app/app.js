"use strict";

import { Provider } from 'react-redux';
import {createStore, combineReducers} from 'redux';
import reducers from './reducers.js';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Application from './Application.jsx';//
import SynchronousValidationForm from './ReduxForm.jsx';
import Buttons from './buttons.jsx';
<<<<<<< HEAD
import SpecialNeeds from './SpecialNeeds.jsx';
import PersonWithNeed from './PersonWithNeedForm.jsx';
import RelationForm from './RelationForm.jsx';
import AddRelation from './AddRelations.jsx';
import WhosSearching from './WhosSearchingForm.jsx';
import Forms from './Form.jsx';
import AddRelationsToForm from './AddRelationsForm.jsx';
=======
import GeneralPractitioner from './GeneralPractitioner.jsx';
>>>>>>> refs/remotes/origin/citizen_0.2


const reducer = combineReducers(reducers);
const store = createStore(reducer);

var fastleger = ["Ola Nordmann", "Kari Nordmann"];


/*
var dataMe = [
    {name: "Fødselsnr.", type: "TextField"},
    {name: "Fornavn", type: "TextField"},
    {name: "Etternavn", type: "TextField"},
    {name: "Telefon", type: "TextField"},
    {name: "Adresse", type: "AddressField", includeCountry: false},
    {name: "Nasjonalitet", type: "Dropdown"},
    {name: "Sivilstatus", type: "Dropdown"},
    {name: "Fastlege", type: "AutoComplete", data: fastleger}
];

var dataApplicant = [
    {name: "Fornavn", type: "TextField"},
    {name: "Etternavn", type: "TextField"},
    {name: "Telefon", type: "TextField"},
    {name: "Adresse", type: "AddressField", includeCountry: true},
    {name: "Relasjon", type: "Dropdown"}];

*/
var dataDep = [
    {name: "Fornavn", type: "TextField"},
    {name: "Etternavn", type: "TextField"},
    {name: "Telefon", type: "TextField"},
    {name: "Adresse", type: "AddressField", includeCountry: true},
    {name: "Relasjon", type: "Dropdown"}];

/*
var dataWhy = [
    {name: "Hvorfor søker du plass?", type:"TextArea"},
    {name: "Hva er det du trenger hjelp med i hverdagen?", type:"TextArea"}];
*/
var data = [
    {formname: "Om den som ønsker plass", data: dataMe},
    {formname: "Om deg som søker", data: dataApplicant},
    {formname: "Om pårørende", data: dataDep},
    {formname: "Hvorfor du søker", data: dataWhy}
];


ReactDOM.render( <Provider store={store}>
<<<<<<< HEAD
    <Forms />
    </Provider>, document.getElementById('content'));
=======
    <Application />
</Provider>, document.getElementById('content'));

>>>>>>> refs/remotes/origin/citizen_0.2
