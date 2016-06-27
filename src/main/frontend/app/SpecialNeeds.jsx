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
                <Row className="form-row">
                    <Col sm={3} md={3}>
                        <label>{field} </label>
                    </Col>
                    <TextArea ref="testarea" value="hello"/>
                    <Col sm={3} md={3}>
                    </Col>
                </Row>
            )
        });
        return (
            <div>
                {fieldsForm}
                <Row className="back-forward-buttons">
                    <Col sm={1.5} md={2}>
                        <Button onClick={this.handleClickBack} className="button-next" bsStyle="success">&larr;
                            Tilbake</Button>
                    </Col>
                    <Col sm={6} md={6}></Col>
                    <Col sm={1.5} md={2}>
                        <Button onClick={this.handleClickNext} className="button-next"
                                bsStyle="success">Neste &rarr;</Button>
                    </Col>
                    <Col sm={6} md={2}></Col>
                </Row>
            </div>
        );
    }

}