"use strict";

import React from 'react';
import $ from 'jquery';
import { Form } from './Form.jsx';
require('!style!css!less!./Application.less');
import RadioButtonClick from './RadioButtons.jsx';
import RadioButtonClickRelation from './RadioButtons.jsx';
var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');


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
        console.log("Submitting");
    }
    render() {
        var writesOthers = this.state.writesForOthers;
        var firstRender = this.state.firstRender;
        return (
            <form>
                <PageHeader>Søk sykehjemsplass</PageHeader>
                <RadioButtonClick callBackParent={this.onChildChange} />
                <Row>
                    {this.props.data.map(function(forms, i){
                        if(!(writesOthers) && forms.formname=="Om deg som søker" || firstRender){
                    }
                    else{
                        return (
                            <Form key={i} name={forms.formname} data={forms.data}/>
                        )}
                    })}
                </Row>
                    <button type="submit" onClick={this.handleSubmit}> Submit
                    </button>
            </form>
        )
    }
};

