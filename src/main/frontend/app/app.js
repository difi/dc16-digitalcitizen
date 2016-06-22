"use strict";
import { Provider } from 'react-redux';
import {createStore, combineReducers} from 'redux';
import reducers from './reducers.js';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Application } from './Application.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import SynchronousValidationForm from './ReduxForm.jsx';
//
const reducer = combineReducers(reducers);
const store = createStore(reducer);

var fastleger = ["Ola Nordmann", "Kari Nordmann"]

var dataMe = [
    { name: "Fødselsnr", type: "TextField"},
    {name: "Fornavn", type: "TextField"},
    {  name: "Etternavn", type: "TextField"},
    {   name: "Adresse", type: "TextField"},
    {   name: "Nasjonalitet", type: "DropDown"},
    {name: "E-post", type: "TextField"},
    {name: "Fastlege", type: "AutoComplete", data: fastleger}
    ];

var dataApplicant = [
    {name: "Adresse", type: "TextField"},
    {name: "Fornavn", type: "TextField"},
    {name: "Etternavn", type: "TextField"},
    {name: "E-post", type: "TextField"}];

var dataDep = [
    {name: "Fornavn", type: "TextField"},
    {name: "Etternavn", type: "TextField"},
    {name: "Adresse", type: "TextField"},
    {name: "Postnr", type: "TextField"},
    {name: "Postnr", type: "TextField"},
    {name: "Telefon", type: "TextField"}];


var data = [
    {formname: "Om den som ønsker plass", data: dataMe},
    {formname: "Om deg som søker", data: dataApplicant},
    {formname: "Om pårørende", data: dataDep}];


ReactDOM.render( <Provider store={store}>
    <Application data={data} />
</Provider>, document.getElementById('content'));

