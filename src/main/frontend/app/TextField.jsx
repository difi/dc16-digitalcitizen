import React from 'react';
import $ from 'jquery'

var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormControlFeedback = require('react-bootstrap/lib/FormControlFeedback');
var FormGroup = require('react-bootstrap/lib/FormGroup');

/*import CheckPostCode from 'validation.js';*/

var TextField = React.createClass({
    //Sets initial state of textfields to a given text
    getInitialState: function () {
        return {value: this.props.text};
    },
    //Updates textfields
    handleChange: function (event) {
        this.setState({value: event.target.value});

        $.ajax({
            url: './send',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',

            data: JSON.stringify({ location: "Boston" }),
            dataType: 'json',
            success: function (data) {
                console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },


    render: function () {

        return (

            <Col sm={7.5} md={8}>
                <FormGroup controlId="formValidationError2" validationState="error">
                    <FormControl
                        type="text"
                        placeholder={this.state.value}
                        onChange={this.handleChange}/>
                    <span>{errorMessage}</span>
                    <FormControl.Feedback/>
                </FormGroup>
            </Col>


        );
    }
});

export default TextField;
