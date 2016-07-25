import React from 'react';
import {reduxForm} from 'redux-form';
import {getValues} from 'redux-form';
import $ from 'jquery'

import RESTpaths from '../static_data/RESTpaths.js';
import DropdownList from './Components/DropdownList.js';
import NavigationButtons from './Components/NavigationButtons.js';

import dropdownContent from '../static_data/dropdown-list-content.js';

var ReactDOM = require('react-dom');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Radio = require('react-bootstrap/lib/Radio');
var Checkbox = require('react-bootstrap/lib/Checkbox');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');


export class RelationFormClass extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.handleGuardianRadioButton = this.handleGuardianRadioButton.bind(this);
        this.handleFamilyRadioButton = this.handleFamilyRadioButton.bind(this);
        this.handleOtherRadioButton = this.handleOtherRadioButton.bind(this);
        this.getGuardianFor = this.getGuardianFor.bind(this);
        this.getGuardianFor();
    }


    getGuardianFor() {
        $.ajax({
            url: RESTpaths.PATHS.GUARDIAN_BASE + '?pnr=' + this.props.userData.pnr,
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
                data = data.map(data => {
                    return  {value: data.pnr + ":" + data.name + ":" + data.address + ":" + data.telephone, name: data.name}
                });
                
                data.unshift({value: 0, name: "Velg..."});
                this.props.fields.guardianFor.onChange(data);
                this.forceUpdate();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
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


    handleGuardianRadioButton() {
        this.props.fields.otherRelation.onChange(null);
        this.props.fields.typeOfRelation.onChange(null);
    }

    handleFamilyRadioButton() {
        this.props.fields.nameOfChild.onChange(null);
        this.props.fields.otherRelation.onChange(null);
    }

    handleOtherRadioButton() {
        this.props.fields.nameOfChild.onChange(null);
        this.props.fields.typeOfRelation.onChange(null);
    }


    saveFieldValues() {
        // Get values via this.refs
        const {fields: {relation, typeOfRelation, otherRelation, nameOfChild, dependent}} = this.props;

        if (relation.value == "guardian") {
            var pnr = nameOfChild.value.split(":")[0];
            this.props.fields.dependent.onChange(true);
            var dataDep = {

                relation: relation.value,
                dependent: true,
                applyingForSelf: false,
            };

            this.props.saveValues(dataDep);
            $.ajax({
                url: RESTpaths.PATHS.MUNICIPALITY_BASE + '?pnr=' + pnr,
                dataType: 'text',
                cache: false,
                success: function (data) {
                    var dataVal = {

                        person: {
                            pnr: pnr,
                            address: {
                                municipality: data,
                                country: "NO"
                            }
                        }

                    };
                    this.props.saveValues(dataVal);
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
        if (relation.value == "family") {
            var data = {
                relation: relation.value,
                typeOfRelation: typeOfRelation.value,
                dependent: dependent.value
            };
            this.props.saveValues(data);
        }
        if (relation.value == "other") {
            var data = {
                relation: relation.value,
                otherRelation: otherRelation.value,
                dependent: dependent.value
            };
            this.props.saveValues(data);
        }
        console.log(data);
    }

    render() {
        const {fields: {relation, typeOfRelation, nameOfChild, dependent, otherRelation, guardianFor}} = this.props;
        var content = <p/>;
        var valid = (nameOfChild.value) || (typeOfRelation.value) || (otherRelation.value);
       
        switch (relation.value) {
            case "guardian":
                content =
                    <componentClass>
                        <Row className="form-row">
                            <Col>
                                <label className="guardian-rel">Jeg fyller ut på vegne av</label>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col>
                                <DropdownList id="1"
                                              ref="nameOfChild"
                                              className="guardian-rel"
                                              options={guardianFor.value}
                                              labelField="name"
                                              valueField="value"
                                              defaultValue=""
                                    {...nameOfChild}
                                    //value={nameOfChild.value}
                                              onChange={change => nameOfChild.onChange(change.newValue)}
                                />
                            </Col>
                        </Row>
                    </componentClass>
                break;
            case "family":
                content =
                    <componentClass>
                        <Row className="form-row">
                            <Col>
                                <label className="family-rel">Hva er din relasjon til søker?</label>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col>
                                <DropdownList id="1"
                                              ref="familyRelation"
                                              className="family-rel"
                                              options={dropdownContent.FAMILYRELATIONS}
                                              labelField="relation"
                                              valueField="value"
                                    {...typeOfRelation}
                                    //value={typeOfRelation.value}
                                              onChange={change => typeOfRelation.onChange(change.newValue)}/>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col>
                                <Checkbox ref="setDependent" {...dependent}> Registrer meg som pårørende</Checkbox>
                            </Col>
                        </Row>
                    </componentClass>
                break;
            case "other":
                content = <componentClass>
                    <Row className="form-row">
                        <Col>
                            <label className="other-rel">Hva er din relasjon til søker?</label>
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col>
                            <FormControl
                                type="text"
                                ref="otherRelation"
                                className="other-rel"
                                pattern="[A-Za-zæøåÆØÅ]"
                                placeholder="Relasjon"
                                {...otherRelation}
                                //onChange={this.handleTextChange}
                                //value={this.state.otherRelation}
                            />
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col>
                            <Checkbox ref="setDependent" {...dependent}> Registrer meg som pårørende </Checkbox>
                        </Col>
                    </Row>
                </componentClass>
        }
        return (

            <div>
                <label className="form-header">Hva er din relasjon til søkeren?</label>
                <div className="form-container">
                    <form className="relation">
                        <input type="radio" id="guardian-radio" className="radio-Relation"
                               name="radio-buttons" {...relation} value="guardian"
                               checked={relation.value=="guardian"} onClick={this.handleGuardianRadioButton} />Jeg er verge for søkeren
                        <br/>
                        <input type="radio" id="family-radio" name="radio-buttons" {...relation} value="family"
                               checked={relation.value=="family"} onClick={this.handleFamilyRadioButton}/>Jeg er i familie med søkeren
                        <br/>
                        <input type="radio" id="other-radio" name="radio-buttons" className="radio-other" {...relation}
                               value="other" checked={relation.value=="other"} onClick={this.handleOtherRadioButton}/>Annet
                    </form>

                    {content}
                </div>
                <NavigationButtons
                    handleClickBack={this.handleClickBack}
                    handleClickNext={this.handleClickNext}
                    disabled={!valid}
                    //disabled={!this.state.validForm}
                />
            </div>
        )
    }
}
RelationFormClass.propTypes = {
    previousStep: React.PropTypes.func.isRequired,
    nextStep:  React.PropTypes.func.isRequired,
    saveValues:  React.PropTypes.func.isRequired,
};

//Sets up reduxForm - needs fields and validation functions
const RelationForm = reduxForm({
    form: 'application',
    fields: ["relation", "typeOfRelation", "nameOfChild", "dependent", "otherRelation", "guardianFor"],
    destroyOnUnmount: false
}, null, null)(RelationFormClass);

export default RelationForm