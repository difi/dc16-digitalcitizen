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
    {name: "Fødselnr", type: "TextField"},
    {name: "Fornavn", type: "TextField"},
    {name: "Etternavn", type: "TextField"},
    {name: "Sivilstatus", type: "TextField"},
    {name: "Nasjonalitet", type: "TextField"},
    {name: "E-post", type: "TextField"}];

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
   // {formname: "Søker du sykehjemsplass for deg selv eller på vegne av noen andre?", data: dataRadio},
    {formname: "Om den som ønsker plass", data: dataMe, type: "Meg"},
    {formname: "Om deg som søker", data: dataApplicant, type: "Soker"},
    {formname: "Om pårørende", data: dataDep, type: "Paarorende"}];

ReactDOM.render(
    <Application data={data}/>, document.getElementById("content")
);
