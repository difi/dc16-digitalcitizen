"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import { Application } from './Application.jsx';

//
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

var dropDown = [
    {name: "Norsk", type: "DropDown"},
    {name: "Svensk", type: "DropDown"},
    {name: "Dansk", type: "DropDown"},
    {name: "Finsk", type: "DropDown"}
]

var data = [
    {formname: "Om den som ønsker plass", data: dataMe},
    {formname: "Om deg som søker", data: dataApplicant},
    {formname: "Om pårørende", data: dataDep},
    {formname: "Nasjonalitet", data:dropDown}];

ReactDOM.render(
    <Application data={data}/>, document.getElementById("content")
);
