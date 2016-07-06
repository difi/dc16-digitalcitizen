import React from 'react';
import NavigationButtons from './NavigationButtons.jsx';
import $ from 'jquery'
import TypeAhead from './AutoComplete';
import {reduxForm} from 'redux-form';
import RESTpaths from './static_data/RESTpaths.js';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
require('!style!css!less!./Application.less');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');



export class GeneralPractitionerClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.fieldValues.doctor.name,
            validForm: this.props.fieldValues.doctor.name,
        };
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.saveFieldValues = this.saveFieldValues.bind(this);
        this.getPractitionersByMunicipality = this.getPractitionersByMunicipality.bind(this);
        this.getPractitionersByMunicipality(this.props.fieldValues.person.address.municipality);

    }

    handleClickBack() {
        this.saveFieldValues();
        console.log("State 4");
        this.props.previousStep(4);
    }

    handleClickNext() {
        this.saveFieldValues();
        console.log("State 6");
        this.props.nextStep(6);
    }

    saveFieldValues() {
        this.props.fields.doctorName.onChange(this.refs.doctorSelect.getFieldValue());
        var data = {
            doctor: {name: this.refs.doctorSelect.getFieldValue()}
        };
        this.props.saveValues(data);
        console.log(data);
    }

    getPractitionersByMunicipality(municipality){
        $.ajax({
            url: RESTpaths.PATHS.DOCTORS_BASE + '?loc=' + municipality,
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
                this.props.fields.doctors.onChange(data.map(function(a) {return a.name;}));
                this.forceUpdate();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        const {fields: {doctorName, doctors}} = this.props;
        var valid = doctorName.value;

        return (
            <componentClass>
                <label className="form-header">Velg søkers fastlege</label>
                <div className="form-container">
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label className="genPract">Fastlege</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <TypeAhead className="genPract" array={doctors.value} ref="doctorSelect" placeholder="Skriv inn søkers fastlege"
                                       value={doctorName.value} onChange={value=>doctorName.onChange(value)}/>
                        </Col>
                    </Row>
                </div>
                <NavigationButtons
                    handleClickBack={this.handleClickBack}
                    handleClickNext={this.handleClickNext}
                    disabled={!valid}
                />
            </componentClass>
        );
    }
}

const GeneralPractitioner = reduxForm({
    form: 'application',
    fields: ["doctorName", "doctors"],
    destroyOnUnmount: false,
}, null, null)(GeneralPractitionerClass);

export default GeneralPractitioner
