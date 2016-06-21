
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
<<<<<<< HEAD
            <input
                //placeholder={this.props.name}
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
            />
=======
            <div>
                <label>{this.state.value}: </label>
                <input
                    type="text"
                    placeholder={this.state.value}
                    onChange={this.handleChange}/>
            </div>
>>>>>>> refs/remotes/origin/master
        );
    }
});

export default TextField;