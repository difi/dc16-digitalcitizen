import React from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');
var FormControl = require('react-bootstrap/lib/FormControl');
export default class SpecialNeeds extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            medicalNeeds: this.props.fieldValues.medicalNeeds,
            conditionChanges: this.props.fieldValues.conditionChanges,
            otherNeeds: this.props.fieldValues.otherNeeds
        };

        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.handleConditionChange = this.handleConditionChange.bind(this);
        this.handleMedicalChange = this.handleMedicalChange.bind(this);
        this.handleOtherChange = this.handleOtherChange.bind(this);
    }

    handleClickBack() {
        this.saveFieldsValues();
        console.log("State 7");
        (this.props.previousStep(7));
    }

    handleClickNext() {
        this.saveFieldsValues();
        console.log("State 8");
        this.props.nextStep(8);
    }

    saveFieldsValues() {
        // Get values via this.refs
        var data = {
            medicalNeeds: this.state.medicalNeeds,
            conditionChanges: this.state.conditionChanges,
            otherNeeds: this.state.otherNeeds
        };
        this.props.saveValues(data);
        console.log(data);
    }
    handleMedicalChange(event){

        this.setState({
            medicalNeeds: event.target.value
        })
    }
    handleConditionChange(event){
        this.setState({
            conditionChanges: event.target.value
        })
    }
    handleOtherChange(event){
        this.setState({
            otherNeeds: event.target.value
        })
    }

    render() {


        return (
            <div>
                <label className="form-header">Har du noen spessielle behov?</label>
                <div className="form-container">
                    <Row className="form-row-special">
                        <Col sm={4} md={4}>
                            <label className="from-col-address"> Har du noen medisinske behov vi burde vite om </label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl componentClass="textarea" ref="medicalNeeds" value={this.state.medicalNeeds} onChange={this.handleMedicalChange}/>
                        </Col>
                    </Row>
                    <Row className="form-row-special">
                        <Col sm={4} md={4}>
                            <label className="from-col-address"> Har det skjedd noen endringer i den siste tid for at ditt behov for assistanse har oppstått</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl componentClass="textarea" ref="conditionChanges" value={this.state.conditionChanges} onChange={this.handleConditionChange}/>
                        </Col>
                    </Row>
                    <Row className="form-row-special">
                        <Col sm={4} md={4}>
                            <label className="from-col-address">Har du andre behov vi burde vite om? (Behov for tolk, hørselapparat e.l </label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl componentClass="textarea" ref="otherNeeds" value={this.state.otherNeeds} onChange={this.handleOtherChange}/>
                        </Col>
                    </Row>
                </div>

                <Row className="back-forward-buttons">
                    <Col sx={2} sm={2} md={2}>
                        <Button onClick={this.handleClickBack} className="button-next" bsStyle="success">&larr;
                            Tilbake</Button>
                    </Col>
                    <Col sx={7} sm={8} md={8}></Col>
                    <Col sx={2} sm={2} md={2}>
                        <Button onClick={this.handleClickNext} className="button-next"
                                bsStyle="success">Send inn søknad &rarr;</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
