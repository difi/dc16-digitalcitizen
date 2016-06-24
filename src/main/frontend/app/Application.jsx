"use strict";

import React from 'react';
import $ from 'jquery';
import { Form } from './Form.jsx';
require('!style!css!less!./Application.less');
import RadioButtonClick from './RadioButtons.jsx';
import WhosSearching from './WhosSearchingForm.jsx';
import PersonWithNeed from './PersonWithNeedForm';

var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');


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
        var button = !firstRender ? <Button className="button-search" bsStyle="primary" type="submit" onClick={this.handleSubmit}>Søk sykehjemsplass</Button> : null;
        return (
            <form>
                <PageHeader>Søk sykehjemsplass</PageHeader>
                <PersonWithNeed />



            </form>

        )
    }
};

/*<RadioButtonClick callBackParent={this.onChildChange} />
 {this.props.data.map(function(forms, i){
 if(!(writesOthers) && forms.formname=="Om deg som søker" || firstRender){
 }
 else{
 return (
 <compontentClass>
 <Form key={i} name={forms.formname} data={forms.data}/>
 </compontentClass>
 )}
 })}
 <Row className="form-row">
 <Col sm={7} md={7}>
 </Col>
 <Col sm={2} md={2}>
 {button}
 </Col>
 <Col sm={3} md={3}>
 </Col>
 </Row>*/