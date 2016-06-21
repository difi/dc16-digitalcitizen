"use strict";

import React from 'react';
import $ from 'jquery';
import { Form } from './Form.jsx';
require('!style!css!less!./Application.less');
import RadioButtonClick from './RadioButtons.jsx'; 




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

    render() {
        var writesOthers = this.state.writesForOthers;
        var firstRender = this.state.firstRender;
        return (
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

