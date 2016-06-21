
import React from 'react';

 var TextField = React.createClass( {
    //Sets initial state of textfields to a given text
     getInitialState: function() {
         return {value: this.props.text};
     },
    //Updates textfields
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    render: function() {

        return (
            <div className="form-row">
                <label className="form-orw-label">{this.state.value}:</label>
                <input className="form-row-container-input"
                       type="text"
                       placeholder={this.state.value}
                       onChange={this.handleChange}/>
            </div>
        );
    }
});

export default TextField;