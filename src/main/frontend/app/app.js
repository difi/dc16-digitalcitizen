"use strict";

import { Provider } from 'react-redux';
import {createStore, combineReducers} from 'redux';
import reducers from './reducers.js';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Application } from './Application.jsx';
import SynchronousValidationForm from './ReduxForm.jsx';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

var fastleger = ["Ola Nordmann", "Kari Nordmann"];



var dataMe = [
    {name: "Fødselsnr.", type: "TextField"},
    {name: "Fornavn", type: "TextField"},
    {name: "Etternavn", type: "TextField"},
    {name: "Telefon", type: "TextField"},
    {name: "Adresse", type: "AddressField"},
    {name: "Postnr", type: "TextField"},
    {name: "Postnr", type: "TextField"},
    {name: "Nasjonalitet", type: "Dropdown"},
    {name: "Sivilstatus", type: "Dropdown"},
    {name: "Fastlege", type: "AutoComplete", data: fastleger}
    ];

var dataApplicant = [
    {name: "Fornavn", type: "TextField"},
    {name: "Etternavn", type: "TextField"},
    {name: "Telefon", type: "TextField"},
    {name: "Adresse", type: "TextField"},
    {name: "Postnr", type: "TextField"},
    {name: "Postnr", type: "TextField"},
    {name: "Relasjon", type: "Dropdown"}];

var dataDep = [
    {name: "Fornavn", type: "TextField"},
    {name: "Etternavn", type: "TextField"},
    {name: "Telefon", type: "TextField"},
    {name: "Adresse", type: "AddressField"},
    {name: "Postnr", type: "TextField"},
    {name: "Postnr", type: "TextField"},
    {name: "Relasjon", type: "Dropdown"}];

var data = [
    {formname: "Om den som ønsker plass", data: dataMe},
    {formname: "Om deg som søker", data: dataApplicant},
    {formname: "Om pårørende", data: dataDep}];


ReactDOM.render( <Provider store={store}>
    <Application data={data} />
</Provider>, document.getElementById('content'));

