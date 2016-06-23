"use strict";

import React from 'react';
import $ from 'jquery';
import { Form } from './Form.jsx';
require('!style!css!less!./Application.less');
import RadioButtonClick from './RadioButtons.jsx';

var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');


export class Application extends React.Component{
    constructor() {
        super()
        this.state = {
            writesForOthers: false,
            firstRender: true
        }
        this.onChildChange = this.onChildChange.bind(this)
    }
    onChildChange(others){
        this.setState({writesForOthers: others,
        firstRender: false
        })
    }
    handleSubmit(){
        var formdata = {
            name: "Name",
            age: "Old"
        };
        // Send the form data.
        var xmlhttp = new XMLHttpRequest();
        var _this = this;
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                var response = JSON.parse(xmlhttp.responseText);
                if (xmlhttp.status === 200 && response.status === 'OK') {
                    _this.setState({ type: 'success', message: 'We have received your message and will get in touch shortly. Thanks!' });
                }
                else {
                    _this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later or send us an email at info@example.com.' });
                }
            }
        };
        xmlhttp.open('POST', 'send', true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(this.requestBuildQueryString(formData));
    }
    /**
     * Transforms an object into a URL querystring.
     *
     * @param object params
     * @return string the formatted querystring.
     */
    requestBuildQueryString(params) {
    var queryString = [];
    for(var property in params)
        if (params.hasOwnProperty(property)) {
            queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
        }
    return queryString.join('&');
}

    render() {
        var writesOthers = this.state.writesForOthers;
        var firstRender = this.state.firstRender;
        return (
            <form>
                <PageHeader>Søk sykehjemsplass</PageHeader>
                <RadioButtonClick callBackParent={this.onChildChange} />
                    {this.props.data.map(function(forms, i){
                        if(!(writesOthers) && forms.formname=="Om deg som søker" || firstRender){
                    }
                    else{
                        return (
                            <Form key={i} name={forms.formname} data={forms.data}/>
                        )}
                    })}
            </form>

        )
    }
};

