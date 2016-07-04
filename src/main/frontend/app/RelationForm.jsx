import React from 'react';
import DropdownList from './DropdownList.jsx';
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Radio = require('react-bootstrap/lib/Radio');
var Checkbox = require('react-bootstrap/lib/Checkbox');
var RadioGroup = require('react-radio-group');
import dropdownContent from './dropdown-list-content.js';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');
import {reduxForm} from 'redux-form';
import {getValues} from 'redux-form';

export default class RelationForm extends React.Component {
    constructor(props) {
        super(props);
        //this.handleChange = this.handleChange.bind(this);
        switch (this.props.fieldValues.relation) {
            case "guardian":
                this.state = {
                    guardianRelation: this.props.fieldValues.nameOfChild,
                    value: this.props.fieldValues.relation,

                    typeOfRelation: this.props.fieldValues.typeOfRelation,
                    verger: null,
                    isDependent: this.props.fieldValues.dependent,
                    validForm: (this.props.fieldValues.relation && this.props.fieldValues.guardianRelation)
                };
                break;


            case "family":
                this.state = {
                    familyRelation: this.props.fieldValues.typeOfRelation,
                    value: this.props.fieldValues.relation,

                    typeOfRelation: this.props.fieldValues.typeOfRelation,
                    verger: null,
                    isDependent: this.props.fieldValues.dependent,
                    validForm: (this.props.fieldValues.relation && this.props.fieldValues.typeOfRelation)
                };
                break;
            case "other":
                this.state = {
                    otherRelation: this.props.fieldValues.typeOfRelation,
                    value: this.props.fieldValues.relation,

                    typeOfRelation: this.props.fieldValues.typeOfRelation,
                    verger: null,
                    isDependent: this.props.fieldValues.dependent,
                    validForm: (this.props.fieldValues.relation && this.props.fieldValues.typeOfRelation)
                };
                break;
            default:
                this.state = {
                    value: this.props.fieldValues.relation,

                    typeOfRelation: this.props.fieldValues.typeOfRelation,
                    verger: null,
                    isDependent: this.props.fieldValues.dependent,
                    validForm: false
                }
        }


        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }

    handleClickBack() {
        console.log("State 1");
        this.saveFieldValues();
        (this.props.previousStep(1));
    }

    handleClickNext() {
        const {fields: {relation}} = this.props;
        console.log("State 3");
        this.saveFieldValues();
        if (relation.value == "guardian") {
            this.props.nextStep(6);
        }
        else {

            this.props.nextStep(3);
        }
    }

    saveFieldValues() {
        // Get values via this.refs
        const {fields: {relation, typeOfRelation, otherRelation, nameOfChild, isDependent}} = this.props;

        if (relation.value == "guardian") {
            isDependent.onChange(true);

        }
        var data = {
            relation: relation.value,
            typeOfRelation: typeOfRelation.value,
            dependent: isDependent.value,
            nameOfChild: nameOfChild.value,
            otherRelation: otherRelation.value
        };
        this.props.saveValues(data);
        console.log(data);
    }

    render() {
        const {fields: {relation, typeOfRelation, nameOfChild, isDependent, otherRelation}} = this.props;
        var content = <p/>;

        switch (relation.value) {
            case "guardian":
                content =
                    <componentClass>
                        <Row className="form-row">
                            <Col sm={6} md={6}>
                                <label>Hvem ønsker sykehjemsplass?</label>
                            </Col>
                            <Col sm={6} md={6}></Col>
                        </Row>
                        <Row className="form-row">
                            <Col sm={6} md={6}>
                                <DropdownList id="1"
                                              ref="nameOfChild"
                                              options={[{name: "Velg..."},{name: "Ola"}, {name: "Kari"}]}
                                              labelField="name"
                                              valueField="name"
                                              defaultValue=""
                                              {...nameOfChild}
                                              //value={nameOfChild.value}
                                              onChange={change => nameOfChild.change(change.newValue)}
                                />
                            </Col>
                            <Col sm={6} md={6}></Col>
                        </Row>
                    </componentClass >
                break;
            case "family":
                content =
                    <componentClass>
                        <Row className="form-row">
                            <Col sm={6} md={6}>
                                <label>Hva er din relasjon til personen med behov?</label>
                            </Col>
                            <Col sm={6} md={6}></Col>
                        </Row>
                        <Row className="form-row">
                            <Col sm={6} md={6}>
                                <DropdownList id="1"
                                              ref="familyRelation"
                                              options={dropdownContent.RELATIONS}
                                              labelField="relation"
                                              valueField="value"
                                              {...typeOfRelation}
                                              //value={typeOfRelation.value}
                                              onChange={change => typeOfRelation.change(change.newValue)}/>
                            </Col>
                            <Col sm={6} md={6}></Col>
                        </Row>
                        <Row className="form-row">
                            <Col sm={3} md={5}>
                                <Checkbox ref="setDependent" {...isDependent}> Registrer meg som
                                    pårørende</Checkbox>
                            </Col>
                            <Col sm={9} md={7}></Col>
                        </Row>
                    </componentClass>
                break;
            case "other":
                content = <componentClass>
                    <Row className="form-row">
                        <Col sm={6} md={6}>
                            <label>Hva er din relasjon til personen med behov?</label>
                        </Col>
                        <Col sm={6} md={6}></Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={6} md={6}>
                            <FormControl
                                type="text"
                                ref="otherRelation"
                                pattern="[A-Za-zæøåÆØÅ]"
                                placeholder="Relasjon"
                                {...otherRelation}
                                //onChange={this.handleTextChange}
                                //value={this.state.otherRelation}
                            />
                        </Col>
                        <Col sm={6} md={6}></Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={3} md={5}>
                            <Checkbox ref="setDependent" {...isDependent}> Registrer meg som
                                pårørende</Checkbox>
                        </Col>
                        <Col sm={9} md={7}></Col>
                    </Row>
                </componentClass>

        }
        return (
            <div>
                <label className="form-header">Hva er din relasjon til den som søker?</label>
                <div className="form-container">
                    <RadioGroup name="relation" selectedValue={relation.value} {...relation}>
                        {Radio => (
                            <div className="form-radio-group">
                                <Radio className="radio-button" value="guardian"/>Jeg er verge for den jeg søker på
                                vegne av
                                <br/>
                                <Radio className="radio-button" value="family"/>Jeg er i familie med den jeg søker på
                                vegne
                                av
                                <br/>
                                <Radio className="radio-button" value="other"/>Annet
                            </div>
                        )}
                    </RadioGroup>
                    {content}
                </div>

                <Row className="back-forward-buttons">
                    <Col sx={2} sm={2} md={2}>
                        <Button onClick={this.handleClickBack} className="button-next" bsStyle="success">&larr;
                            Tilbake</Button>
                    </Col>
                    <Col sx={7} sm={8} md={8}></Col>
                    <Col sx={2} sm={2} md={2}>
                        <Button onClick={this.handleClickNext} className="button-next"
                                bsStyle="success">Neste &rarr;</Button>
                    </Col>
                </Row>

            </div>
        )
    }
}

//Sets up reduxForm - needs fields and validation functions
RelationForm = reduxForm({
    form: 'RelationForm',
    fields: ["relation", "typeOfRelation", "nameOfChild", "isDependent", "otherRelation"],
    destroyOnUnmount: false,
}, null, null)(RelationForm);

export default RelationForm


























