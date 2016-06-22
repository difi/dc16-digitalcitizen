"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'react-bootstap';

import { Application } from './Application.jsx';

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

const buttonInstance = (
    <div>
        <ButtonToolbar>
            <Button bsStyle="primary" bsSize="large">LargeButton</Button>
        </ButtonToolbar>
    </div>
);

//ReactDOM.render(buttonInstance, mountNode);

ReactDOM.render(
    buttonInstance, document.getElementById("content")
);
