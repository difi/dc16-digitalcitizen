import React from 'react';
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Radio = require('react-bootstrap/lib/Radio');
var Checkbox = require('react-bootstrap/lib/Checkbox');
var RadioGroup = require('react-radio-group');


export default class NeedsForm extends React.Component {
    constructor() {
        super();
        this.handleChange=this.handleChange.bind(this);
        this.state = {
            value: null
        }
    }

    handleChange(r){
        this.setState({
            value: r
        });
    }

    render() {
        return(
            <div>
                <p> Skøker du om kortidsopphold eller langtidsopphold? </p>
                <RadioGroup name="needs" selectedValue={this.state.value} onChange={this.handleChange}>
                    {Radio => (
                        <div>
                            <Radio value="shortStay" /> Kortidsopphold
                            <br/>
                            <Radio value="longStay" /> Langtidsopphold
                        </div>
                    )}
                </RadioGroup>
            </div>
            )
    }
}