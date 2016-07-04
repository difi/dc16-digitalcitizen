import React from 'react';
import $ from 'jquery'
import DropdownList from './DropdownList.jsx';
import dropdownContent from './static_data/dropdown-list-content.js';
var FormControl = require('react-bootstrap/lib/FormControl');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var ReactDOM = require('react-dom');
import RESTpaths from './static_data/RESTpaths.js';

import {onlyDigitsInString} from './validation.js'
import {alphaNumericInString} from './validation.js'
import {reduxForm} from 'redux-form';
var AddressField = React.createClass({

    propTypes: {
        includeCountry: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {includeCountry: true};
    },

    getInitialState: function () {
        return { country: this.props.address.country};
    },

    /**Makes a call to the Bring API with the postal code given by the user
     * in order to retrieve the corresponding municipality
     *
     * @param event
     */

    changeHandler: function (zip) {
        return (event) => {
            zip.onChange(event);
            this.handleChange(event);
        }
    },
    handleChange: function (event) {
        var zipcode = event.target.value;

        if(!zipcode){
            return;
        }
        console.log(zipcode);

        //We only make a call to the API if the number of characters in the input field is greater than 3.
        if (zipcode.length > 3) {
            $.ajax({
                url: RESTpaths.PATHS.BRING_BASE + 'country=' + this.state.country + '&pnr=' + zipcode,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    // Set the municipality state equal to the retrieved data
                    this.props.fields.postal.onChange(data['result']);
                    console.log(data['result]'])
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        } else {
            this.props.fields.postal.onChange('');
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
        this.setState({street: ''})
    },


    getFieldValues(){

        var country;
        if (this.props.includeCountry) {
            country = ReactDOM.findDOMNode(this.refs.country).getDropdownValue();
        }
        else {
            country = "NO";
        }
        return {
            country: country,
            streetAddress: ReactDOM.findDOMNode(this.refs.streetAddress).value,
            zipcode: ReactDOM.findDOMNode(this.refs.zipcode).value,
            postal: ReactDOM.findDOMNode(this.refs.postal).value
        }
    },

    render: function () {
        const {fields: {street, zipcode, postal}} = this.props;

        if (this.props.includeCountry) {
            return (
                <Col sm={7.5} md={8}>
                    <Row className="form-row-address">
                        <Col sm={12} md={12}>
                            <FormControl
                                type="text"
                                placeholder='Gateadresse'
                                ref="streetAddress"
                                {...street}/>
                        </Col>
                    </Row>
                    <Row className="form-row-address">
                        <Col sm={5} md={5}>
                            <DropdownList
                                id='dropdown-list'
                                options={dropdownContent.NATIONAL}
                                labelField='country'
                                ref="country"
                                value={this.state.country}
                                defaultValue = {this.props.address.country}
                                valueField='code'
                                onChange={this.handleDropdownChange}/>
                        </Col>
                        <Col sm={2} md={2}>
                            <FormControl
                                type="text"
                                placeholder='Postnr.'
                                ref="zipcode"
                                {...zipcode}
                                onChange={this.changeHandler(zipcode)}/>
                        </Col>
                        <Col sm={4} md={4}>
                            <FormControl
                                type="text"
                                ref="postal"
                                placeholder='Poststed'
                                defaultValue={this.props.address.postal}
                                disabled/>
                        </Col>
                    </Row>
                </Col>
            );
        } else {
            return (
                <div>
                    <Row className="form-row-address">
                        <Col sm={12} md={12} className="from-col-address">
                            <FormControl
                                type="text"
                                placeholder='Adresse'
                                ref="streetAddress"
                                {...street}/>
                        </Col>
                    </Row>
                    <Row className="form-row-address">
                        <Col sm={5} md={5} className="from-col-address">
                            <FormControl
                                type="text"
                                placeholder='Postnummer'
                                ref="zipcode"
                                {...zipcode}
                                onChange={this.changeHandler(zipcode)}
                                />
                        </Col>
                        <Col sm={7} md={7} className="from-col-address">
                            <FormControl
                                type="text"
                                placeholder='Sted'
                                ref="postal"
                                {...postal}
                                disabled


                                />
                        </Col>
                    </Row>
                </div>
            );
        }
    }
});

AddressField = reduxForm({
    form: 'application',
    fields: ["street", "zipcode", "postal"],
    destroyOnUnmount: false,
}, null, null)(AddressField);


export default AddressField;