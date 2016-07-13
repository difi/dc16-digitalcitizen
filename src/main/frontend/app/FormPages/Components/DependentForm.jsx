import React from 'react';
import {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form';
import {getValues} from 'redux-form';

import DropdownList from './DropdownList.jsx';
import dropdownContent from '../../static_data/dropdown-list-content.js';

require('!style!css!less!../../Application.less');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Checkbox = require('react-bootstrap/lib/Checkbox');
var Button = require('react-bootstrap/lib/Button');
var FormControl = require('react-bootstrap/lib/FormControl');

export const fields = ["firstName", "lastName", "phone", "mail", "relation", "depOtherRelation"];

class DependentForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickRemove = this.handleClickRemove.bind(this);
    }

    handleClickRemove() {
        this.props.onClick();
    }

    render() {
        var deleteButton = this.props.showDeleteButton ?
            <Button className="close" aria-label="Close" onClick={this.handleClickRemove}>
                <span aria-hidden="true">&times;</span>
            </Button> : '';


        const {firstName, lastName, phone, mail, relation, depOtherRelation}= this.props;
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
                            <FormControl className="fName" ref="firstName" type="text" placeholder="Fornavn"
                                         disabled={this.props.autoFilled} {...firstName}/>
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label className="eName">Etternavn</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl className="eName" ref="lastName" type="text" placeholder="Etternavn"
                                         disabled={this.props.autoFilled} {...lastName}/>
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label className="tlf">Telefon</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl className="tlfForm" ref="phone" type="text" placeholder="Telefonnr"
                                         disabled={this.props.autoFilled} {...phone}/>
                            {phone.touched && phone.error && <div className="error">{phone.error}</div>}
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label className="mail">E-post</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl className="mailForm" ref="mail" type="text" placeholder="E-post"
                                         disabled={this.props.autoFilled} {...mail}/>
                            {mail.touched && mail.error && <div className="error">{mail.error}</div>}
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label className="depRel">Relasjon</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <DropdownList className="depRel" ref='relation' options={dropdownContent.DEPENDENTRELATIONS}
                                          id="test"
                                          valueField="value" labelField="relation" disabled={this.props.autoFilled} {...relation}
                                          onChange={change => relation.onChange(change.newValue)}/>
                        </Col>
                    </Row>
                    {this.props.relation.value == 'Annet' ?
                        <Row className="form-row">
                            <Col sm={4} md={4}>
                            </Col>
                            <Col sm={8} md={8}>
                                <FormControl
                                    type="text"
                                    ref="depOtherRel"
                                    className="dep-other-rel"
                                    pattern="[A-Za-zæøåÆØÅ]"
                                    placeholder="Skriv inn deres relasjon"
                                    disabled={this.props.autoFilled}
                                    {...depOtherRelation}
                                />
                            </Col>
                        </Row> : ''}
                </div>
            </div>
        );
    }
}

export default DependentForm
