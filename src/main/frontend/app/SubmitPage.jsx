import React from 'react';
import {reduxForm} from 'redux-form';
var ReactDOM = require('react-dom');
import {getValues} from 'redux-form';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

export const fields = ["name"];

class SubmitSuccess extends React.Component {

    constructor() {
        super();
        this.getValues = this.getValues.bind(this);
    }


    getValues() {
        var data = {
            person: {
                name: this.props.fieldValues.person.name
            }
        };
        console.log(data);
    }


    render() {
        if (!this.props.fieldValues.nameOfChild) {
            return (
                <componentClass>
                    <label className="form-header">Du har nå søkt på sykehjemsplass for</label>
                    <div className="form-container">
                        <Row>
                            <Col className="submit-name">
                                <label>{this.props.fieldValues.person.name}</label>
                            </Col>
                        </Row>
                    </div>
                </componentClass>
            )
        } else {
            return (
                <componentClass>
                    <label className="form-header">Du har nå søkt på sykehjemsplass for:</label>
                    <div className="form-container">
                        <Row>
                            <Col className="submit-name">
                                <label>{this.props.fieldValues.nameOfChild}</label>
                            </Col>
                        </Row>
                    </div>
                </componentClass>
            )
        }
    }
}

SubmitSuccess = reduxForm({
    form: 'application',
    fields,
    destroyOnUnmount: false,
}, null, null)(SubmitSuccess);

export default SubmitSuccess