import React from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
import TextArea from './TextArea';
var Button = require('react-bootstrap/lib/Button');

export default class SpecialNeeds extends React.Component {

    render() {
        var fields = ["Har du noen medisinke behov vi burde vite om", "Har det skjedd noen endringer i den siste tid for at ditt behov for assistanse har oppstått", "Har du andre behov vi burde vite om? (Behov for tolk, hørselapparat e.l"];
        var fieldsForm = fields.map(function (field, i) {

            return (
                <Row className="form-row">
                    <Col sm={3} md={3}>
                        <label>{field} </label>
                    </Col>
                    <TextArea />
                    <Col sm={3} md={3}>
                    </Col>
                </Row>
            )
        });
        return (
            <div>
                {fieldsForm}
                <Button onClick={this.props.nextStep}>Next</Button>
            </div>
        );
    }
}