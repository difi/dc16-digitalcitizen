import React from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

export default class NavigationButtons extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Row style={{marginTop: '15px'}}>
                <Col xs={6} sm={6} md={6} lg={6}>
                    <Button className="back-btn" onClick={this.props.handleClickBack}>&larr;
                        Tilbake</Button>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                    <Button className="next-btn" onClick={this.props.handleClickNext}
                            bsStyle="success">Neste &rarr;</Button>
                </Col>
            </Row>
        )
    }
}