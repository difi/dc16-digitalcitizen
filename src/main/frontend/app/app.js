"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import { Application } from './Application.jsx';

var dataMe = [
    {name: "Fødselsnr", type: "TextField"},
    {name: "Fornavn", type: "TextField"},
    {name: "Etternavn", type: "TextField"},
    {name: "Sivilstatus", type: "TextField"},
    {name: "Nasjonalitet", type: "TextField"},
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

//RadioButtonRelations
var dataFam=[
    {fam:"Barn", type: "RadioButton"}];

var data = [
    {formname: "Om den som ønsker plass", data: dataMe},
    {formname: "Om deg som søker", data: dataApplicant},
    {formname: "Om pårørende", data: dataDep},
    
    //{formname: "Relasjon", data:dataFam}];


ReactDOM.render(
<Application data={data} />, document.getElementById("content")
);