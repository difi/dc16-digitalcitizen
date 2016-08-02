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
var Alert = require('react-bootstrap/lib/Alert');
var alertContent = null;
var alertMessage = false;
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
            <Button
                className="close-button"
                onClick={this.handleClickRemove}
                bsStyle="danger">
                &minus;
            </Button>
             : '';

        const {name, phone, mail, relation, depOtherRelation}= this.props;
        var valid = !name.error && !phone.error && !mail.error && !relation.error;
        //console.log("Phone: " + name.error);

        if (!valid && this.props.clickButtonNext) {
            var errorMessage = <p>Vennligst fyll inn <b><i>{name.error}</i></b><b><i>{phone.error}</i></b><b><i>{mail.error}</i></b><b><i>{relation.error}</i></b>før du kan gå videre.</p>;

            alertContent =
                <componentClass>
                    <div className="error">
                        <Alert bsStyle="danger">
                            {errorMessage}
                        </Alert>
                    </div>
                </componentClass>;
            alertMessage = true;
        } else {
            if (valid) {
                alertContent = null;
                alertMessage = false;
            }
        }

        return (
            <div>
                {deleteButton}
                <h4>Pårørende</h4>
                <Row className="form-row">
                    <Col sm={4} md={4}>
                        <label htmlFor="deptName" className="name">Navn</label>
                    </Col>
                    <Col sm={8} md={8}>
                        <FormGroup validationState={name.error && (name.touched || alertMessage) ? "error" : null}>
                            <FormControl className="nameField" ref="name" type="text" placeholder="Navn" id="deptName"
                                         disabled={this.props.autoFilled} {...name}/>
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="formgroup-row">
                    <Col sm={4} md={4}>
                        <label htmlFor="depttlf" className="tlf">Telefon</label>
                    </Col>
                    <Col sm={8} md={8}>
                        <FormGroup validationState={phone.error && (phone.touched || alertMessage) ? "error" : null}>
                            <FormControl className="tlfForm" ref="phone" type="text" placeholder="Telefonnr" id="depttlf"
                                         disabled={this.props.autoFilled} {...phone}/>
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="formgroup-row">
                    <Col sm={4} md={4}>
                        <label htmlFor="deptMail" className="mail">E-post</label>
                    </Col>
                    <Col sm={8} md={8}>
                        <FormGroup validationState={mail.error && (mail.touched || alertMessage) ? "error" : null}>
                            <FormControl className="mailForm" ref="mail" type="text" placeholder="E-post" id="deptMail"
                                         disabled={this.props.autoFilled} {...mail}/>
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="form-row">
                    <Col sm={4} md={4}>
                        <label htmlFor="test" className="depRel">Relasjon</label>
                    </Col>
                    <Col sm={8} md={8}>
                        <FormGroup validationState={relation.error && alertMessage ? "error" : null}>
                        <DropdownList className="depRel" ref='relation' options={dropdownContent.DEPENDENTRELATIONS}
                                      id="test"
                                      valueField="value" labelField="relation"
                                      disabled={this.props.autoFilled} {...relation}
                                      onChange={change => relation.onChange(change.newValue)}/>
                    </FormGroup>
                    </Col>
                </Row>
                {alertContent}
                {this.props.relation.value == 'Annet' ?
                    <Row className="form-row">
                        <Col sm={4} md={4}>
                            <label htmlFor="deptSpesRel">Spesifisert relasjon</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl
                                id="deptSpesRel"
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
