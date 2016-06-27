import React from 'react';
import $ from 'jquery'
import DropdownList from './DropdownList.jsx';
import dropdownContent from './dropdown-list-content.js';
var FormControl = require('react-bootstrap/lib/FormControl');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');


var AddressField = React.createClass({

    propTypes: {
        includeCountry: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {includeCountry: true};
    },

    getInitialState: function () {
        return {value: '', municipality: '', country: 'NO', street: ''};
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

    handleStreetChange: function (event) {
        this.setState({street: event.target.value});
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
        this.setState({street: ''})
    },

    render: function () {
        if (this.props.includeCountry) {
            return (
                <Col sm={7.5} md={8}>
                    <Row className="form-row-address">
                        <Col sm={12} md={12}>
                            <FormControl
                                type="text"
                                placeholder='Gateadresse'
                                value={this.state.street}
                                onChange={this.handleStreetChange}/>
                        </Col>
                    </Row>
                    <Row className="form-row-address">
                        <Col sm={5} md={5}>
                            <DropdownList
                                id='dropdown-list'
                                options={dropdownContent.NATIONAL}
                                labelField='country'
                                value={this.state.country}
                                valueField='code'
                                onChange={this.handleDropdownChange}/>
                        </Col>
                        <Col sm={3} md={3}>
                            <FormControl
                                type="text"
                                placeholder='Postnummer'
                                value={this.state.value}
                                onChange={this.handleChange}/>
                        </Col>
                        <Col sm={4} md={4}>
                            <FormControl
                                type="text"
                                placeholder='Poststed'
                                value={this.state.municipality}
                                disabled/>
                        </Col>
                    </Row>
                </Col>
            );
        } else {
            return (
            <Col sm={7.5} md={8}>
                <Row className="form-row-address">
                    <Col sm={12} md={12}>
                        <FormControl
                            type="text"
                            placeholder='Gateadresse'
                            value={this.state.street}
                            onChange={this.handleStreetChange}/>
                    </Col>
                </Row>
                <Row className="form-row-address">
                    <Col sm={5} md={5}>
                        <FormControl
                            type="text"
                            placeholder='Postnummer'
                            value={this.state.value}
                            onChange={this.handleChange}/>
                    </Col>
                    <Col sm={7} md={7}>
                        <FormControl
                            type="text"
                            placeholder='Poststed'
                            value={this.state.municipality}
                            disabled/>
                    </Col>
                </Row>
            </Col>
            );
        }
    }
});

export default AddressField;
