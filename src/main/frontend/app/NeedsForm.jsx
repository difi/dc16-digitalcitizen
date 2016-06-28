import React from 'react';
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Radio = require('react-bootstrap/lib/Radio');
var Checkbox = require('react-bootstrap/lib/Checkbox');
var RadioGroup = require('react-radio-group');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

export default class NeedsForm extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: null
        };
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }

    saveFieldValues() {
        var data = {
            lengthOfStay: this.state.value
        };
        this.props.saveValues(data);
        console.log(data);
    }

    handleClickBack() {
        this.saveFieldValues();
        if (this.props.fieldValues.isApplyingForSelf) {
            this.props.previousStep(1);
        }
        else if (this.props.fieldValues.address == null) {
            this.props.previousStep(3);
        }
        else {
            this.props.previousStep(5);
        }
    }

    handleClickNext() {
        this.saveFieldValues();
        console.log("State 7");
        this.props.nextStep(7);
    }

    handleChange(r) {
        this.setState({
            value: r
        });
    }

    render() {
        return (
            <componentClass>
                <label className="form-header">Søker du om kortidsopphold eller langtidsopphold?</label>

                <div className="form-container">
                    <RadioGroup name="needs" selectedValue={this.state.value} onChange={this.handleChange}>
                        {Radio => (
                            <div>
                                <Radio value="short"/> Kortidsopphold
                                <br/>
                                <Radio value="long"/> Langtidsopphold
                            </div>
                        )}
                    </RadioGroup>
                </div>

                <Row className="back-forward-buttons">
                    <Col sx={2} sm={2} md={2}>
                        <Button onClick={this.handleClickBack} className="button-next" bsStyle="success">&larr;
                            Tilbake</Button>
                    </Col>
                    <Col sx={7} sm={8} md={8}></Col>
                    <Col sx={2} sm={2} md={2}>
                        <Button onClick={this.handleClickNext} className="button-next"
                                bsStyle="success">Neste &rarr;</Button>
                    </Col>
                </Row>
            </componentClass>
        )
    }
}