import React from 'react';
import NavigationButtons from './NavigationButtons.jsx';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
require('!style!css!less!./Application.less');
import TypeAhead from './AutoComplete';
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');
import {reduxForm} from 'redux-form';
class GeneralPractitioner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.fieldValues.doctor.name,
            validForm: this.props.fieldValues.doctor.name
        };
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.saveFieldValues = this.saveFieldValues.bind(this);

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


    render() {
        var fastleger = ["Ola Nordmann", "Kari Nordmann"];
        const {fields: {doctorName}} = this.props;
        var valid = doctorName.value;

        return (
            <componentClass>
                <label className="form-header">Velg søkers fastlege</label>
                <div className="form-container">
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label>Fastlege</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <TypeAhead array={fastleger} ref="doctorSelect" placeholder="Skriv inn søkers fastlege"
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

GeneralPractitioner = reduxForm({
    form: 'application',
    fields: ["doctorName"],
    destroyOnUnmount: false,
}, null, null)(GeneralPractitioner);

export default GeneralPractitioner
