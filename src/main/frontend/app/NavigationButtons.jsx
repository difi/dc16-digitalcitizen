import React from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

export default class NavigationButtons extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }

    handleClickBack(){
        console.log("askdj");
        this.props.handleClickBack();
    }

    handleClickNext(){
        console.log("hello")
        this.props.handleClickNext();
    }

    render() {
        return (
            <Row style={{marginTop: '15px'}}>
                <hr/>
                <Col xs={6} sm={6} md={6} lg={6}>
                    <Button className="back-btn" onClick={this.handleClickBack}>&larr;
                        Tilbake</Button>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                    <Button disabled={this.props.disabled} className="next-btn" onClick={this.handleClickNext}
                            bsStyle="success">Neste &rarr;</Button>
                </Col>
            </Row>
        )
    }
}