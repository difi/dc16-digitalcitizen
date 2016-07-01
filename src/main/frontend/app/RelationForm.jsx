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
import {onlyLettersInString} from "./validation.js";

export default class RelationForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

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
        this.handleDependentChange = this.handleDependentChange.bind(this);
        this.handleGuardianChange = this.handleGuardianChange.bind(this);
        this.handleFamilyRelationChange = this.handleFamilyRelationChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleClickBack() {
        console.log("State 1");
        this.saveFieldValues();
        (this.props.previousStep(1));
    }

    handleClickNext() {
        console.log("State 3");
        this.saveFieldValues();
        if (this.state.value == "guardian") {
            this.props.nextStep(6);
        }
        else {

            this.props.nextStep(3);
        }
    }

    saveFieldValues() {
        // Get values via this.refs
        var isDependent = this.state.isDependent;
        var nameOfChild = null;
        var typeOfRelation = null;
        if (this.state.value == "guardian") {
            isDependent = true;
            nameOfChild = this.refs.nameOfChild.getDropdownValue();
            typeOfRelation = "guardian"
        }
        else if (this.state.value == "family") {
            typeOfRelation = this.refs.familyRelation.getDropdownValue();
        }
        else {
            typeOfRelation = ReactDOM.findDOMNode(this.refs.otherRelation).value;
        }

        var data = {
            relation: this.state.value,
            typeOfRelation: typeOfRelation,
            dependent: isDependent,
            nameOfChild: nameOfChild
        };

        this.props.saveValues(data);
        console.log(data);
    }

    handleChange(r) {
        this.setState({
            value: r
        });
    }

    handleDependentChange(r) {
        this.setState({
            isDependent: !this.state.isDependent
        });
    }

    handleTextChange(event) {
        var text = onlyLettersInString(event.target.value);
        this.setState({otherRelation: text});
    }

    handleFamilyRelationChange(change) {
        this.setState({
            familyRelation: change.newValue
        });
    }

    handleGuardianChange(change) {
        this.setState({
            guardianRelation: change.newValue
        });
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.validForm = (nextState.value && (nextState.otherRelation || nextState.familyRelation || nextState.guardianRelation));
    }

    render() {
        var content = <p/>;


        switch (this.state.value) {
            case "guardian":
                content =
                    <componentClass>
                        <Row className="form-row">
                            <Col sm={6} md={6}>
                                <label id="guardian">Hvem ønsker sykehjemsplass?</label>
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
                                              onChange={this.handleGuardianChange}
                                              value={this.state.guardianRelation}
                                              defaultValue='Velg person'/>
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
                                <label id="family">Hva er din relasjon til personen med behov?</label>
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
                                              value={this.state.familyRelation}
                                              onChange={this.handleFamilyRelationChange}
                                              defaultValue='Velg relasjon'/>
                            </Col>
                            <Col sm={6} md={6}></Col>
                        </Row>
                        <Row className="form-row">
                            <Col sm={3} md={5}>
                                <Checkbox ref="setDependent" onClick={this.handleDependentChange}
                                          checked={this.state.isDependent}> Registrer meg som
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
                            <label id="other">Hva er din relasjon til personen med behov?</label>
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
                                value={this.state.otherRelation}
                                onChange={this.handleTextChange}/>
                        </Col>
                        <Col sm={6} md={6}></Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={3} md={5}>
                            <Checkbox ref="setDependent" onClick={this.handleDependentChange}
                                      checked={this.state.isDependent}> Registrer meg som
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
                    <RadioGroup className="relation" selectedValue={this.state.value} onChange={this.handleChange}>
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
                        <Button onClick={this.handleClickBack} id="back" className="button-next" bsStyle="success">&larr;
                            Tilbake</Button>
                    </Col>
                    <Col sx={7} sm={8} md={8}></Col>
                    <Col sx={2} sm={2} md={2}>
                        <Button onClick={this.handleClickNext} id="next" disabled={!this.state.validForm} className="button-next"
                                bsStyle="success">Neste &rarr;</Button>
                    </Col>
                </Row>

            </div>
        )
    }
}

//Decides content based on checked radio button
/* if(this.state.value=="guardian"){
 content = <div><p>Navnet på den du er verge for</p><DropdownList defaultValue ={this.props.fieldValues.guardianName} id="1" options={[{name: "Ola"}, {name: "Kari"}]} labelField="name" valueField="name"/></div>
 }
 else if(this.state.value=="family"){
 content = <div><DropdownList id="1" defaultValue = {this.props.fieldValues.familyRelation} options={[{name: "Søsken"}, {name: "Barn"}]} labelField="name" valueField="name"/>
 <Checkbox checked={this.props.fieldValues.isDependent}>
 Registrer meg som pårørende
 </Checkbox>
 </div>
 }
 else if(this.state.value=="other"){
 content =  <Checkbox checked={this.props.fieldValues.isDependent}>
 Registrer meg som pårørende
 </Checkbox>
 */


//Updated Radio-buttons, but does not work completely
/*<div className="relation">
 <Radio id="guardian-radio" className="radio-button" value="guardian" checked={this.state.value === 'guardian'} onChange={this.handleChange}/>Jeg er verge for den jeg søker på
 vegne av
 <Radio id="family-radio" className="radio-button" value="family" checked={this.state.value === 'family'} onChange={this.handleChange}/>Jeg er i familie med den jeg søker på
 vegne
 av
 <Radio id="other-radio" className="radio-button" value="other" checked={this.state.value === 'other'} onChange={this.handleChange}/>Annet
 </div>
 */
