import React from 'react';
import $ from 'jquery'
import DropdownList from './DropdownList.jsx';
import dropdownContent from './dropdown-list-content.js';


var AddressField = React.createClass({
    //Sets initial state of textfields to a given text
    getInitialState: function () {
        return {value: '', municipality: '', country: 'NO'};
    },
    /**Makes a call to the Bring API with the postal code given by the user
     * in order to retrieve the corresponding municipality
     *
     * @param event
     */
    handleChange: function (event) {
        this.setState({value: event.target.value});

        //We only make a call to the API if the number of characters in the input field is greater than 3.
        if (event.target.value.length > 3) {
            $.ajax({
                url: 'https://api.bring.com/shippingguide/api/postalCode.json?clientUrl=insertYourClientUrlHere&country='
                + this.state.country + '&pnr=' + event.target.value,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    // Set the municipality state equal to the retrieved data
                    this.setState({municipality: data['result']});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        } else {
            this.setState({municipality: ''});
        }
    },

    /**Updates the country state when the user selects a new option in
     * the {@link DropdownList}. Clears previous retrieved data.
     *
     * @param event
     */
    handleDropdownChange: function (event) {
        this.setState({country: event['newValue']});
        this.setState({municipality: ''});
        this.setState({value: ''});
    },

    render: function () {
        return (
            <div>

                <DropdownList
                    id='dropdown-list'
                    options={dropdownContent.NATIONAL}
                    labelField='country'
                    value={this.state.country}
                    valueField='code'
                    onChange={this.handleDropdownChange}/>

                <input
                    type="text"
                    placeholder='Postnummer'
                    value={this.state.value}
                    onChange={this.handleChange}/>
                <label>{this.state.municipality}</label>
            </div>
        );
    }
});

export default AddressField;