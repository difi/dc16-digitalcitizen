import React from 'react';
import {reduxForm} from 'redux-form';
var ReactDOM = require('react-dom');
import {getValues} from 'redux-form';
import NavigationButtons from './NavigationButtons.jsx';
import RESTpaths from './static_data/RESTpaths.js';

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
                        <Col xs={8} sm={8} md={8} lg={8}>
                            <img src={require('./resources/images/pdfIcon.png')} />
                            <a
                                className="download-link"
                                href={RESTpaths.PATHS.GETPDF_BASE + "?id=" + this.props.userData.submissionId}
                                target="_blank">
                                Last ned søknad som PDF
                            </a>
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4}>
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
                        <Col xs={8} sm={8} md={8} lg={8}>
                            <img src={require('./resources/images/pdfIcon.png')} />
                            <a
                                className="download-link"
                                href={RESTpaths.PATHS.GETPDF_BASE + "?id=" + this.props.userData.submissionId}
                                target="_blank">
                                Last ned søknad som PDF
                            </a>
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4}>
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