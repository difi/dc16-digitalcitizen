import React from 'react';

var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');


var TextArea = React.createClass( {
    //Sets initial state of textfields to a given text
    getInitialState: function() {
        return {value: this.props.text};
    },
    //Updates textfields
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    render: function() {

        return (
            <Col sm={6} md={6}>
                <FormControl
                    required
                    componentClass="textarea"
                    bsSize="lg"
                    type="text"
                    placeholder={this.state.value}
                    onChange={this.handleChange}/>
            </Col>
        );
    }
});

export default TextArea;