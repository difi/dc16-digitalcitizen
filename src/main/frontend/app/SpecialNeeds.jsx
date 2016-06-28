import React from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
import TextArea from './TextArea';
var Button = require('react-bootstrap/lib/Button');
var ReactDOM= require('react-dom');

export default class SpecialNeeds extends React.Component {
    constructor() {
        super()
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }

    handleClickBack() {
        console.log("State 6");
        (this.props.previousStep(6));
    }

    handleClickNext() {

        console.log("State 7");
        this.props.nextStep(7);

    }
    nextStep() {
        // Get values via this.refs
        var data = {
            relation     : ReactDOM.findDOMNode(this.refs.testarea).children[0].value
        };
        this.props.saveValues(data);
        this.props.nextStep();
        console.log(data);
    }

    render() {
        var fields = ["Har du noen medisinke behov vi burde vite om", "Har det skjedd noen endringer i den siste tid for at ditt behov for assistanse har oppstått", "Har du andre behov vi burde vite om? (Behov for tolk, hørselapparat e.l"];
        var fieldsForm = fields.map(function (field, i) {

            return (
                <Row className="form-row-special">
                    <Col sm={4} md={4}>
                        <label className="from-col-address">{field} </label>
                    </Col>
                    <Col sm={8} md={8}>
                        <TextArea ref="testarea" value="hello"/>
                    </Col>
                </Row>
            )
        });
        return (
            <div>
                <label className="form-header">Har du noen spessielle behov?</label>
                <div className="form-container">
                    {fieldsForm}
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
            </div>
        );
    }

}