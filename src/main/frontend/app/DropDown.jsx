/**
 * Created by camp-hst on 20.06.2016.
 */
import React from 'react';
import Select from 'react-select';

var DropDown= React.createClass({
    displayName: 'Nasjonalitet',
    propTypes: {
        label: React.PropTypes.string
    },
    getInitialState () {
        return {};
    },

    getDefaultProps () {
        return {
            label: 'Nasjonalitet:'
        };
    },
    getInitialState () {
        return {
            national: 'NATIONAL',
            disabled: false,
            selectValue: 'no',
        };
    },
    updateValue (newValue) {
        this.setState({
            selectValue: newValue
        });
    },

    render () {
        var options = DATA.NATIONAL;
        return (
            <div>
                <h3>{this.props.label}</h3>
                <Select options={options} value={this.state.selectValue} onChange={this.updateValue}/>
            </div>
        );
    }
});

export default DropDown;



