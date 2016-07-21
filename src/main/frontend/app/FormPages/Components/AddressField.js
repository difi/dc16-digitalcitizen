import React from 'react';
import $ from 'jquery'
import DropdownList from './DropdownList.js';
import dropdownContent from '../../static_data/dropdown-list-content.js';
var FormControl = require('react-bootstrap/lib/FormControl');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var ReactDOM = require('react-dom');
import RESTpaths from '../../static_data/RESTpaths.js';
import {checkPostCode} from '../Utilities/validation.js';
import {onlyDigitsInString} from '../Utilities/validation.js'
import {alphaNumericInString} from '../Utilities/validation.js'
import {reduxForm} from 'redux-form';

var zipcodeError;
var AddressField = React.createClass({

    propTypes: {
        includeCountry: React.PropTypes.bool,
        address: React.PropTypes.object
    },

    getDefaultProps: function () {
        return {includeCountry: true};
    },

    getInitialState: function () {
        return {country: this.props.address.country};
    },

    /**Makes a call to the GeoNames API with the postal code given by the user
     * in order to retrieve the corresponding postal
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
        console.log(event.target.value);

        var zipcode = checkPostCode(event.target.value);

        if (!zipcode) {
            return;
        }
        console.log(zipcode);

        //We only make a call to the API if the number of characters in the input field is greater than 3.
        if (zipcode.length > 3) {
            $.ajax({
                url: RESTpaths.PATHS.GEONAMES_BASE + 'postalcode=' + zipcode + '&country=' + this.state.country + '&username=Sondrehj',
                dataType: 'json',
                cache: false,
                success: function (data) {
                    // Set the postal state equal to the retrieved data
                    if (data['postalcodes'][0] != null) {
                        zipcodeError = undefined;
                        this.props.fields.postal.onChange(data['postalcodes'][0]['placeName']);
                        this.props.fields.municipality.onChange(data['postalcodes'][0]['adminName2']);
                    } else {
                        zipcodeError = "Postnummeret er ikke gyldig";
                        this.props.fields.postal.onChange('Ugyldig postnr.');
                    }
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        } else {
            zipcodeError = "Postnummeret er ikke gyldig";
            this.props.fields.postal.onChange('Ugyldig postnr.');
        }
    },


    /**Updates the country state when the user selects a new option in
     * the {@link DropdownList}. Clears previous retrieved data.
     *
     * @param event
     */
    handleDropdownChange: function (event) {
        this.setState({country: event['newValue']});
        this.setState({postal: ''});
        this.setState({value: ''});
        this.setState({municipality: ''});
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
            municipality: this.state.municipality,
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
                                defaultValue={this.props.address.country}
                                valueField='code'
                                onChange={this.handleDropdownChange}/>
                        </Col>
                        <Col sm={2} md={2}>
                            <FormControl
                                type="text"
                                className='zipcode'
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
                            <FormGroup validationState={(!street.value) ? "error" : ""}>
                                <FormControl
                                    type="text"
                                    placeholder='Adresse'
                                    className='adressField'
                                    ref="streetAddress"
                                    {...street}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="form-row-address">
                        <Col sm={6} md={6} className="from-col-address">
                            <FormGroup validationState={(zipcodeError || (!zipcode.value)) ? "error" : ""}>
                                <FormControl
                                    type="text"
                                    placeholder="Postnr."
                                    className='zipcode'
                                    ref="zipcode"
                                    {...zipcode}
                                    onChange={this.changeHandler(zipcode)}
                                />
                            </FormGroup>

                        </Col>
                        <Col sm={6} md={6} className="from-col-address">
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
    fields: ["street", "zipcode", "postal", "municipality"],
    destroyOnUnmount: false,
}, null, null)(AddressField);


export default AddressField;