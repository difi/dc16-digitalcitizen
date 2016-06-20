"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import { Application } from './Application.jsx';

//
var dataMe = [
    { name: "Fødselnr"},
    {name: "Fornavn"},
    {  name: "Etternavn"},
    {   name: "Sivilstatus"},
    {   name: "Nasjonalitet"},
    {name: "E-post"}];

var dataApplicant = [
    { name: "Adresse"},
    {name: "Fornavn"},
    {  name: "Etternavn"},
    {name: "E-post"}];

var dataDep = [
    {name: "Fornavn"},
    {  name: "Etternavn"},
    {   name: "Sivilstatus"},
    {   name: "Telefonnummer"},
    {name: "E-post"}];


var data = [
    {formname: "Om den som ønsker plass", data: dataMe},
    {formname: "Om deg som søker", data: dataApplicant},
    {formname: "Om pårørende", data: dataDep}];

ReactDOM.render(
    <Application data={data}/>, document.getElementById("content")
);
