/**
 * Created by camp-hst on 20.06.2016.
 */
/*import React, { Component } from 'react';
import DropdownList from './DropdownList.jsx'

const options = require('./nationalities');

class DropDown extends Component({
    constructor (props) {
        super(props)
        this.state = {
            selected: options[0]
        }
        this._onSelect = this._onSelect.bind(this)
    },

    _onSelect (option) {
        this.setState({selected: option})
    },

    render () {
        const defaultOption = this.state.selected
        return (
            <div>
                <DropdownList options={options} onChange={this._onSelect} value={defaultOption} placeholder="Velg..." ></DropdownList>
            </div>
        )
    },

)};


export default DropDown;/*



