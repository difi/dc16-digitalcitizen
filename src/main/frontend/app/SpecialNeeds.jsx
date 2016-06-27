import React from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
import TextArea from './TextArea';
var Button = require('react-bootstrap/lib/Button');
var ReactDOM= require('react-dom');

export default class SpecialNeeds extends React.Component {

    nextStep() {
        // Get values via this.refs
        var data = {
            relation     : "test"
        };
        console.log(ReactDOM.findDOMNode(this.refs.testarea).children[0]);

        console.log(ReactDOM.findDOMNode(this.refs.yolo));

        this.props.saveValues(data);
        //this.props.nextStep();
        console.log(data)
    }

    render() {
        var fields = ["Har du noen medisinke behov vi burde vite om", "Har det skjedd noen endringer i den siste tid for at ditt behov for assistanse har oppstått", "Har du andre behov vi burde vite om? (Behov for tolk, hørselapparat e.l"];
        var fieldsForm = fields.map(function (field, i) {

            return (
                <Row className="form-row">
                    <Col sm={3} md={3}>
                        <label>{field} </label>
                    </Col>
                    <TextArea value="hello"/>
                    <Col sm={3} md={3}>
                    </Col>
                </Row>
            )
        });
        return (
            <div>
                {fieldsForm}
                <TextArea ref="testarea" />
                <Button ref="button" onClick={this.nextStep.bind(this)}>Next</Button>
            </div>
        );
    }




}