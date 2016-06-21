"use strict";
import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
const reducers = {
    // ... your other reducers here ...
    form: formReducer     // <---- Mounted at 'form'. See note below.
}
import { Provider } from 'react-redux';
const reducer = combineReducers(reducers);
const store = createStore(reducer);


import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Application } from './Application.jsx';
import SynchronousValidationForm from './ReduxForm.jsx';
//


var dataMe = [
    { name: "Fødselsnr", type: "TextField"},
    {name: "Fornavn", type: "TextField"},
    {  name: "Etternavn", type: "TextField"},
    {   name: "Sivilstatus", type: "TextField"},
    {   name: "Nasjonalitet", type: "TextField"},
    {name: "E-post"}];

var dataApplicant = [
    {name: "Adresse", type: "TextField"},
    {name: "Fornavn", type: "TextField"},
    {name: "Etternavn", type: "TextField"},
    {name: "E-post", type: "TextField"}];

var dataDep = [
    {name: "Fornavn", type: "TextField"},
    {name: "Etternavn", type: "TextField"},
    {name: "Sivilstatus", type: "TextField"},
    {name: "Telefonnummer", type: "TextField"},
    {name: "E-post", type: "TextField"}];


var data = [
    {formname: "Om den som ønsker plass", data: dataMe},
    {formname: "Om deg som søker", data: dataApplicant},
    {formname: "Om pårørende", data: dataDep}];


ReactDOM.render( <Provider store={store}>
    <SynchronousValidationForm />
</Provider>, document.getElementById('content'));

