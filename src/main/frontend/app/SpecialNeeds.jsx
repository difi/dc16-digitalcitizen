import React from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');
var FormControl = require('react-bootstrap/lib/FormControl');
import {reduxForm} from 'redux-form';

class SpecialNeeds extends React.Component {

    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);

    }

    handleClickBack(medical, changes, other) {
        this.saveFieldsValues(medical, changes, other);
        console.log("State 6");
        (this.props.previousStep(6));
    }

    handleClickNext(medical, changes, other) {
        this.saveFieldsValues(medical, changes, other);
        console.log("State 7");
        this.props.nextStep(7);
    }

    saveFieldsValues(medical, changes, other) {
        // Get values via this.refs
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

        return (
            <div>
                <label className="form-header">Har du noen spessielle behov?</label>
                <div className="form-container">
                    <Row className="form-row-special">
                        <Col sm={4} md={4}>
                            <label className="from-col-address"> Har du noen medisinske behov vi burde vite om </label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl componentClass="textarea" ref="medicalNeeds" {...medical}/>
                        </Col>
                    </Row>
                    <Row className="form-row-special">
                        <Col sm={4} md={4}>
                            <label className="from-col-address"> Har det skjedd noen endringer i den siste tid for at ditt behov for assistanse har oppstått</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl componentClass="textarea" ref="conditionChanges" {...changes}/>
                        </Col>
                    </Row>
                    <Row className="form-row-special">
                        <Col sm={4} md={4}>
                            <label className="from-col-address">Har du andre behov vi burde vite om? (Behov for tolk, hørselapparat e.l </label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl componentClass="textarea" ref="otherNeeds" {...other}/>
                        </Col>
                    </Row>
                </div>

                <Row className="back-forward-buttons">
                    <Col sx={2} sm={2} md={2}>
                        <Button onClick={this.handleClickBack.bind(this, medical.value, changes.value, other.value)} className="button-next" bsStyle="success">&larr;
                            Tilbake</Button>
                    </Col>
                    <Col sx={7} sm={8} md={8}></Col>
                    <Col sx={2} sm={2} md={2}>
                        <Button onClick={this.handleClickNext.bind(this, medical.value, changes.value, other.value)} className="button-next"
                                bsStyle="success">Send inn søknad &rarr;</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}



SpecialNeeds = reduxForm({
    form: 'application',
    fields: ["medical", "changes", "other"],
    destroyOnUnmount: false,

}, null, null)(SpecialNeeds);

export default SpecialNeeds
