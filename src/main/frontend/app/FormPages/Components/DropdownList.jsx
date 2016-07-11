import React from 'react';
var ReactDOM = require('react-dom');
require('!style!css!less!../../Application.less');

var DropdownList = React.createClass({

    propTypes: {
        id: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        value: React.PropTypes.oneOfType(
            [
                React.PropTypes.number,
                React.PropTypes.string
            ]
        ),
        valueField: React.PropTypes.string,
        labelField: React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            valueField: 'value',
            labelField: 'label',
            onChange: null
        };
    },

    getInitialState: function () {
        var selected = this.getSelectedFromProps(this.props);
        return {
            selected: selected
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var selected = this.getSelectedFromProps(nextProps);
        this.setState({
            selected: selected
        });
    },

    getSelectedFromProps(props) {
        var selected;
        if (props.value === null && props.options.length !== 0) {
            selected = props.options[0][props.valueField];
        } else {
            selected = props.value;
        }
        return selected;
    },

    getDropdownValue(){
        return ReactDOM.findDOMNode(this.refs.selectlist).value;
    },

    render: function () {
        var self = this;

        var options = self.props.options.map(function (option) {
            if(option[self.props.valueField]==0){
                return (
                    <option key={option[self.props.valueField]} selected disabled value={option[self.props.valueField]}>
                        {option[self.props.labelField]}
                    </option>
                )

            } else {
                return (
                    <option key={option[self.props.valueField]} value={option[self.props.valueField]}>
                        {option[self.props.labelField]}
                    </option>
                )

            }
        });

        return (
            <select id={this.props.id}
                    className='form-control'
                    ref="selectlist"
                    value={this.state.selected}
                    onChange={this.handleChange}>
                {options}
            </select>
        )
    },

    handleChange: function (e) {
        if (this.props.onChange) {
            var change = {
                oldValue: this.state.selected,
                newValue: e.target.value
            };
            this.props.onChange(change);
        }
        this.setState({selected: e.target.value});
    }

});

export default DropdownList