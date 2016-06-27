import React from 'react';
var RadioGroup = require('react-radio-group');

var RadioButtonList = React.createClass({
    getInitialState: function() {
        return {
            selection: null
        };
    },

    handleChange: function(e) {
        this.setState({
            selection: e.target.value
        });
    },

    render: function() {
        return (
            <form role="form" className="form-horizontal">
                <div className="form-group">
                    <RadioGroup name="furtherRelations" onChange={this.change}>
                        {Radio => (
                            <div>
                                <input type="radio" name="who" value="relatives" {...this.props}/> JA
                            </div>
                    
                        )}
                    </RadioGroup>
                </div>
            </form>
        );
    }
});

export default RadioButtonList;
