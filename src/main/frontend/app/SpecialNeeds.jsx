import React from 'react';
import NavigationButtons from './NavigationButtons.jsx';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');
var FormControl = require('react-bootstrap/lib/FormControl');
import {reduxForm} from 'redux-form';

export class SpecialNeedsClass extends React.Component {


    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.saveFieldsValues = this.saveFieldsValues.bind(this);

    }

    handleClickBack() {
        this.saveFieldsValues();
        console.log("State 6");
        (this.props.previousStep(7));
    }

    handleClickNext() {
        this.saveFieldsValues();
        console.log("State 9");
        this.props.nextStep(9);
    }

    saveFieldsValues() {
        // Get values via this.refs
        const {fields: {medical, changes, other}} = this.props;
        var data = {
            medicalNeeds: medical,
            conditionChanges: changes,
            otherNeeds: other
        };
        this.props.saveValues(data);
        console.log(data);
    }

    render() {

        const {fields: {medical, changes, other}} = this.props;
        var valid = medical.value

        return (
            <div>
                <label className="form-header">Har du noen spessielle behov?</label>
                <div className="form-container">
                    <Row className="form-row-special">
                        <Col sm={12} md={12}>
                            <label className="from-col-address"> Hva er grunnen til at du søker plass på sykehjem? </label>
                        </Col>
                        <Col sm={12} md={12}>
                            <FormControl componentClass="textarea" className="special-needs-textarea"
                                         ref="medicalNeeds" {...medical}/>
                        </Col>
                    </Row>
                    <Row className="form-row-special">
                        <Col sm={12} md={12}>
                            <label className="from-col-address"> Har du noen medisinske behov vi burde vite om?</label>
                        </Col>
                        <Col sm={12} md={12}>
                            <FormControl componentClass="textarea" className="special-needs-textarea"
                                         ref="conditionChanges" {...changes}/>
                        </Col>
                    </Row>
                    <Row className="form-row-special">
                        <Col sm={12} md={12}>
                            <label className="from-col-address">Har du andre behov vi burde vite om? (Behov for tolk,
                                hørselapparat e.l </label>
                        </Col>
                        <Col sm={12} md={12}>
                            <FormControl componentClass="textarea" className="special-needs-textarea"
                                         ref="otherNeeds" {...other}/>
                        </Col>
                    </Row>
                </div>
                
                <NavigationButtons
                    disabled={!valid}
                    handleClickBack={this.handleClickBack}
                    handleClickNext={this.handleClickNext}
                    isSubmit={true}
                    fieldValues={this.props.fieldValues}
                    saveFieldValues={this.saveFieldsValues}
                />

            </div>
        );
    }
}

const SpecialNeeds = reduxForm({
    form: 'application',
    fields: ["medical", "changes", "other"],
    destroyOnUnmount: false,

}, null, null)(SpecialNeedsClass);

export default SpecialNeeds
