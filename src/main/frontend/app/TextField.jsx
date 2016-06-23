import React from 'react';
import $ from 'jquery'

var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');


 var TextField = React.createClass( {
    //Sets initial state of textfields to a given text
     getInitialState: function() {
         return {value: this.props.text};
     },
    //Updates textfields
    handleChange: function(event) {
        this.setState({value: event.target.value});

        $.ajax({
            url: './send',
            method: 'POST',
            data: { name: "John", location: "Boston" },
            success: function (data) {
                console.log("data sent")
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });


    },
    render: function() {

        return (
            <Col sm={7.5} md={8}>
                <FormControl
                    type="text"
                    placeholder={this.state.value}
                    onChange={this.handleChange}/>
            </Col>
        );
    }
});

export default TextField;

