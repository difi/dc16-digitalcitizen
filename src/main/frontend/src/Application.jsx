"use strict";

import React from 'react';
import $ from 'jquery';
import { Form } from './Form.jsx';
import RadioButton from './RadioButton.jsx';
require('!style!css!less!./Application.less');




export class Application extends React.Component{
    render() {
        return (
            <div>
                <h1>Søk sykehjemsplass</h1>
                <h2>Søker du sykehjemsplass for deg selv eller på vegne av noen andre?</h2>
                {this.props.data.map(function (field, i) {
                    if (field.type=="RadioButton"){
                        return (<div>
                                <RadioButton key={i} /> {field.name}
                            </div>
                        );
                }})};
                {this.props.data.map(function(forms, i){
                    return (
                        <Form key={i} name={forms.formname} data={forms.data}/>
                    )
                })}
            </div>
        )
    }
};


/**
 * Create a radio button component.
 */
class RadioButtonMe extends React.Component {
    render () {
        return (
            <div>
                <input type="radio" name="who" value="Me" {...this.props}/> Søk for meg selv
            </div>
        );
    }
}

/**
 * Create a radio button component.
 */
class RadioButtonOther extends React.Component {
    render () {
        return (
            <div>
                <input type="radio" name="who" value="Other" {...this.props}/> Søk på vegne av noen andre
            </div>
        );
    }
}

class RadioButtonClick extends React.Component {
    constructor () {
        super();

        this.state = {
            clicked1: false,
            clicked2: false
        };

        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
    }

    handleClick1() {
        this.setState({
            clicked1: true,
            clicked2: false
        });
    }
    handleClick2() {
        this.setState({
            clicked1: false,
            clicked2: true
        });
    }

    render () {
        return (
            <div>
                <RadioButtonMe onClick={this.handleClick1} />
                {this.state.clicked1 ? <SearchForMe /> : null}

                <RadioButtonOther onClick={this.handleClick2} />
                {this.state.clicked2 ? <SearchForOther /> : null}
            </div>
        );
    }
}
