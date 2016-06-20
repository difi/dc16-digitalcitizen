"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import { Application } from './Application.jsx';

//
var dataRadio = [
    {name: "Meg", type: "RadioButton"},
    {name: "Andre", type: "RadioButton"}
]

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
    {formname: "Radio", data: dataRadio, type: "radio"},
    {formname: "Om den som ønsker plass", data: dataMe, type: "radio"},
    {formname: "Om deg som søker", data: dataApplicant, type: "test"},
    {formname: "Om pårørende", data: dataDep, type: "radio"}];

ReactDOM.render(
    <Application data={data} />, document.getElementById("content")
);
