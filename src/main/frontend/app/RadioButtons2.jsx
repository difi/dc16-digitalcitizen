import React from 'react';
var RadioGroup = require('react-radio-group')


var RadioButtonList = React.createClass({
    getInitialState: function() { return {selection: null}; },

    handleChange: function(e) {
        this.setState({selection: e.target.value});
    },

    render: function() {
        return (
            <div>
                <RadioGroup
                    name="livewith"
                    selectedValue={this.state.selectedValue}
                    onChange={this.handleChange}>
                    {Radio => (
                        <div>
                            <label className="checkbox">
                                <Radio value="alene" />Alene
                            </label>
                            <label className="checkbox">
                                <Radio value="ektefelle" />Ektefelle
                            </label>
                            <label className="checkbox">
                                <Radio value="samboer" />Samboer
                            </label>
                            <label className="checkbox">
                                <Radio value="foreldre" />Foreldre
                            </label>
                            <label className="checkbox">
                                <Radio value="annet" />Annet
                            </label>
                        </div>
                    )}
                </RadioGroup>
            </div>
        );
    }
});

export default RadioButtonList;