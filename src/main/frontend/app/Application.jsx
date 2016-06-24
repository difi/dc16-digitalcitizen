"use strict";

import React from 'react';
import $ from 'jquery';
import {Form} from './Form.jsx';
require('!style!css!less!./Application.less');
import RadioButtonClick from './RadioButtons.jsx';

var PageHeader = require('react-bootstrap/lib/PageHeader');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
import RelationForm from './RelationForm';
import SpecialNeeds from './SpecialNeeds';

export default class Application extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1
        };
        this.nextStep = this.nextStep.bind(this);
        this.saveValues=this.saveValues.bind(this);
        this.previousStep=this.saveValues.bind(this);
    }


    nextStep() {
        console.log("test");
        this.setState({
            step: this.state.step + 1
        })
    }

    saveValues(data) {


    }

    previousStep() {
        this.setState({
            step: this.state.step - 1
        })
    }

    handleSubmit() {

        $.ajax({
            url: './send',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',

            data: JSON.stringify({location: "Boston"}),
            dataType: 'json',
            success: function (data) {
                console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    }

    render() {

        var header = <PageHeader>Søk sykehjemsplass</PageHeader>;
        var content;
        switch (this.state.step) {
            case 1: content =
                <AccountFields fieldValues={fieldValues}
                               nextStep={this.nextStep}
                               previousStep={this.previousStep}
                               saveValues={this.saveValues} />;
                break;
            case 2:
                content = <p> TEST VIEW 2 </p>;
                break;
            /*case 3:
                
                content = <
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 4:
                content = <
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 5:
                content = <
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 6:
                content = <
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}/>;
                break;
            case 7:
                content = <
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    submitRegistration={this.handleSubmit}/>;
                break; */
        }

        return (
            <div>
                {header}
                {content}
                <Button onClick={this.handleSubmit}> Submit form </Button>
            </div>

        )
    }
}


