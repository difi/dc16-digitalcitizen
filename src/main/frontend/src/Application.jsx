"use strict";

import React from 'react';
import $ from 'jquery';
import { Form } from './Form.jsx';
require('!style!css!less!./Application.less');




export class Application extends React.Component{
    render() {
        return (
            <div>
                {this.props.data.map(function(forms, i){
                    return (
                        <Form key={i} name={forms.formname} data={forms.data}/>
                    )
                })}
            </div>
        )
    }
};
