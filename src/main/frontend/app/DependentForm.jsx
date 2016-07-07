import React from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Checkbox = require('react-bootstrap/lib/Checkbox');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');
import DropdownList from './DropdownList.jsx';
var FormControl = require('react-bootstrap/lib/FormControl');
import dropdownContent from './static_data/dropdown-list-content.js';
require('!style!css!less!./Application.less');
import {reduxForm} from 'redux-form';
import {getValues} from 'redux-form';

import { Component, PropTypes } from 'react'


export const fields = ["firstName", "lastName", "phone", "mail", "relation"];

class DependentForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickRemove = this.handleClickRemove.bind(this);
    }

    handleClickRemove() {
        this.setState({
            showForm: false
        });
        this.props.onClick();
    }

    render() {
        var deleteButton = this.props.showDeleteButton ?
            <Button className="close" aria-label="Close" onClick={this.handleClickRemove}>
                <span aria-hidden="true">&times;</span>
            </Button> : '';

        const {firstName, lastName, phone, mail, relation}= this.props;
        return (
            <div>
                {deleteButton}
                <div><h4>Pårørende</h4></div>
                <div>
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label className="fName">Fornavn</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl className="fName" ref="firstName" type="text" placeholder="Fornavn" {...firstName}/>
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label className="eName">Etternavn</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl className="eName" ref="lastName" type="text" placeholder="Etternavn" {...lastName}/>
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label className="tlf">Telefon</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl className="tlf" ref="telephone" type="text" placeholder="Telefonnr" {...phone}/>
                            {phone.touched && phone.error && <div>{phone.error}</div>}
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label className="mail">E-post</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl className="mail" ref="mail" type="text" placeholder="E-post" {...mail}/>
                            {mail.touched && mail.error && <div>{mail.error}</div>}
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label className="depRel">Relasjon</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <DropdownList className="depRel" ref='relation' options={dropdownContent.RELATIONS} id="test"
                                          valueField="value" labelField="relation" {...relation}
                                          onChange={change => relation.onChange(change.newValue)}/>
                        </Col>
                    </Row>
                </div>
            </div>
        );

    }
}

export default DependentForm







