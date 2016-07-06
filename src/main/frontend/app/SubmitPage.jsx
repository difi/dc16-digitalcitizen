import React from 'react';
import {reduxForm} from 'redux-form';
var ReactDOM = require('react-dom');
import {getValues} from 'redux-form';
import NavigationButtons from './NavigationButtons.jsx';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

export const fields = ["name"];

class SubmitSuccess extends React.Component {

    constructor() {
        super();
        this.getValues = this.getValues.bind(this);
        this.handleClickOk = this.handleClickOk.bind(this);
    }


    getValues() {
        var data = {
            person: {
                name: this.props.fieldValues.person.name
            }
        };
        console.log(data);
    }

    handleClickOk() {
        window.location.reload();
    }


    render() {
        if (!this.props.fieldValues.nameOfChild) {
            return (
                <div>
                    <label className="form-header">Du har nå søkt på sykehjemsplass for</label>
                    <div className="form-container">
                        <Row>
                            <Col className="submit-name">
                                <label>{this.props.fieldValues.person.name}</label>
                            </Col>
                        </Row>
                    </div>
                    <Row style={{marginTop: '15px'}}>
                        <hr/>
                        <Col xs={6} sm={6} md={6} lg={6}>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <Button bsStyle="success" className="next-btn" onClick={this.handleClickOk}>Ok</Button>
                        </Col>
                    </Row>
                </div>
            )
        } else {
            return (
                <div>
                    <label className="form-header">Du har nå søkt på sykehjemsplass for:</label>
                    <div className="form-container">
                        <Row>
                            <Col className="submit-name">
                                <label>{this.props.fieldValues.nameOfChild}</label>
                            </Col>
                        </Row>
                    </div>
                    <Row style={{marginTop: '15px'}}>
                        <hr/>
                        <Col xs={6} sm={6} md={6} lg={6}>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <Button bsStyle="success" className="next-btn" onClick={this.handleClickOk}>Ok</Button>
                        </Col>
                    </Row>
                </div>
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