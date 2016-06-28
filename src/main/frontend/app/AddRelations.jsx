import React from 'react';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');


export default class AddRelation extends React.Component {

    constructor() {
        super();
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.handleClickYes = this.handleClickYes.bind(this);
        //this.handleClickNo = this.handleClickNo.bind(this);
    }

    handleClickBack() {
        console.log("State 5");
        (this.props.previousStep(5));
    }

    handleClickNext() {
        console.log("State 7");
        this.props.nextStep(5);
    }

    handleClickYes() {
        console.log("State 6")
        this.props.nextStep(6);
    }

    render() {
        return (
            <componentClass>
                <Row className="relations-button">
                    <Col sm={1.5} md={2}>
                        <Button onClick={this.handleClickYes} className="button-search" bsStyle="info"
                                bsSize="medium">Jeg ønsker å legge til pårørende
                        </Button>
                    </Col>
                </Row>
                
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
            </componentClass>
        )
    }
};