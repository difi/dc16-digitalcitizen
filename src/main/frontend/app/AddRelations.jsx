import React from 'react';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');


export default class AddRelation extends React.Component{


    render() {
        return (
            <componentClass>
                <Row>
                    <Col>
                        <Button onClick={this.handleClick} className="button-search" bsStyle="success" bsSize="medium">Jeg
                            ønsker å legge til pårørende</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={this.handleClickOther} className="button-search" bsStyle="success"
                                bsSize="medium">Jeg ønsker ikke å legge til pårørende</Button>
                    </Col>
                </Row>
            </componentClass>
        )
    }
};
