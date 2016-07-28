import React from 'react';
import {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form';
import {getValues} from 'redux-form';

import DropdownList from './DropdownList.js';
import dropdownContent from '../../static_data/dropdown-list-content.js';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Checkbox = require('react-bootstrap/lib/Checkbox');
var Button = require('react-bootstrap/lib/Button');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');

export const fields = ["name", "phone", "mail", "relation", "depOtherRelation"];

/**
 * DependentForm is part of AddDependent and may render up to three times.
 */
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

        const {name, phone, mail, relation, depOtherRelation}= this.props;

        console.log("Phone: " + name.error);

        return (
            <div>
                {deleteButton}
                <h4>Pårørende</h4>
                <Row className="form-row">
                    <Col sm={4} md={4}>
                        <label className="name">Navn</label>
                    </Col>
                    <Col sm={8} md={8}>
                        <FormGroup validationState={name.touched && name.error ? "error" : null}>
                            <FormControl className="nameField" ref="name" type="text" placeholder="Navn"
                                         disabled={this.props.autoFilled} {...name}/>
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="formgroup-row">
                    <Col sm={4} md={4}>
                        <label className="tlf">Telefon</label>
                    </Col>
                    <Col sm={8} md={8}>
                        <FormGroup validationState={phone.touched && phone.error ? "error" : null}>
                            <FormControl className="tlfForm" ref="phone" type="text" placeholder="Telefonnr"
                                         disabled={this.props.autoFilled} {...phone}/>
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="formgroup-row">
                    <Col sm={4} md={4}>
                        <label className="mail">E-post</label>
                    </Col>
                    <Col sm={8} md={8}>
                        <FormGroup validationState={mail.touched && mail.error ? "error" : null}>
                            <FormControl className="mailForm" ref="mail" type="text" placeholder="E-post"
                                         disabled={this.props.autoFilled} {...mail}/>
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="form-row">
                    <Col sm={4} md={4}>
                        <label className="depRel">Relasjon</label>
                    </Col>
                    <Col sm={8} md={8}>
                        <FormGroup validationState={relation.touched ? "error" : null}>
                        <DropdownList className="depRel" ref='relation' options={dropdownContent.DEPENDENTRELATIONS}
                                      id="test"
                                      valueField="value" labelField="relation"
                                      disabled={this.props.autoFilled} {...relation}
                                      onChange={change => relation.onChange(change.newValue)}/>
                    </FormGroup>
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
        );
    }
}

DependentForm.propTypes = {
    showDeleteButton: React.PropTypes.bool.isRequired,
    autoFilled: React.PropTypes.bool,
    name: React.PropTypes.object.isRequired,
    phone: React.PropTypes.object.isRequired,
    mail: React.PropTypes.object.isRequired,
    relation: React.PropTypes.object.isRequired,
    depOtherRelation: React.PropTypes.object.isRequired

};

export default DependentForm
