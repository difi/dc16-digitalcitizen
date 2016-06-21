/**
 * Created by camp-hst on 20.06.2016.
 */
import React, { Component } from 'react';
import Dropdown from './Dropdown.js'

const options = require('./nationalities');

class NationalityDropDown extends Component({
    constructor (props) {
        super(props)
        this.state = {
            selected: options[0]
        }
        this._onSelect = this._onSelect.bind(this)
    },

    _onSelect (option) {
        console.log('You selected ', option.label)
        this.setState({selected: option})
    },

    render () {
        const defaultOption = this.state.selected
        return (
            <div>
                <h4>Nasjonaliteter</h4>
                <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Velg..." />
            </div>
        );
    }
});

export default NationalityDropDown;



