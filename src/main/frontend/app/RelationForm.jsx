import React from 'react';
import DropdownList from './DropdownList.jsx';
import NavigationButtons from './NavigationButtons.jsx';
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Radio = require('react-bootstrap/lib/Radio');
var Checkbox = require('react-bootstrap/lib/Checkbox');
var RadioGroup = require('react-radio-group');
import dropdownContent from './static_data/dropdown-list-content.js';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');
import {reduxForm} from 'redux-form';
import {getValues} from 'redux-form';

export class RelationFormClass extends React.Component {
    constructor(props) {
        super(props);
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
            var data = {
                relation: relation.value,
                nameOfChild: nameOfChild.value,
                dependent: isDependent.value,

            };

        }
        if (relation.value == "family") {
            var data = {
                relation: relation.value,
                typeOfRelation: typeOfRelation.value,
                dependent: isDependent.value,
            };

        }
        if (relation.value == "other") {
            var data = {
                relation: relation.value,
                otherRelation: otherRelation.value,
                dependent: isDependent.value,
            };

        }

        /*
        if (relation.value == "guardian") {
            isDependent.onChange(true);
        }
        var data = {
            relation: relation.value,
            typeOfRelation: typeOfRelation.value,
            nameOfChild: nameOfChild.value,
            otherRelation: otherRelation.value,
            dependent: isDependent.value,
        }*/

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
                            <Col>
                                <label>Hvem ønsker sykehjemsplass?</label>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col>
                                <DropdownList id="1"
                                              ref="nameOfChild"
                                              options={[{name: "Velg..."},{name: "Ola"}, {name: "Kari"}]}
                                              labelField="name"
                                              valueField="name"
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
                                <label>Hva er din relasjon til personen med behov?</label>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col>
                                <DropdownList id="1"
                                              ref="familyRelation"
                                              options={dropdownContent.RELATIONS}
                                              labelField="relation"
                                              valueField="value"
                                              {...typeOfRelation}
                                              //value={typeOfRelation.value}
                                              onChange={change => typeOfRelation.onChange(change.newValue)}/>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col>
                                <Checkbox ref="setDependent" {...isDependent}> Registrer meg som pårørende</Checkbox>
                            </Col>
                        </Row>
                    </componentClass>
                break;
            case "other":
                content = <componentClass>
                    <Row className="form-row">
                        <Col>
                            <label>Hva er din relasjon til personen med behov?</label>
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col>
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
                    </Row>
                    <Row className="form-row">
                        <Col>
                            <Checkbox ref="setDependent" {...isDependent}> Registrer meg som pårørende </Checkbox>
                        </Col>
                    </Row>
                </componentClass>
        }
        return (
            <div>
                <label className="form-header">Hva er din relasjon til den som søker?</label>
                <div className="form-container">
                    <RadioGroup className="relation" selectedValue={relation.value} {...relation}>
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
                <NavigationButtons
                    handleClickBack={this.handleClickBack}
                    handleClickNext={this.handleClickNext}
                    //disabled={!this.state.validForm}
                />
    </div>
    )
    }
}

//Sets up reduxForm - needs fields and validation functions
const RelationFormDefault = reduxForm({
    form: 'application',
    fields: ["relation", "typeOfRelation", "nameOfChild", "isDependent", "otherRelation"],
    destroyOnUnmount: false
}, null, null)(RelationFormClass);

export default RelationFormDefault


//Updated Radio-buttons, but does not work properly
/*<div className="relation">
 <Radio id="guardian-radio" className="radio-button" value="guardian" checked={this.state.value === 'guardian'} onChange={this.handleChange}/>Jeg er verge for den jeg søker på
 vegne av
 <Radio id="family-radio" className="radio-button" value="family" checked={this.state.value === 'family'} onChange={this.handleChange}/>Jeg er i familie med den jeg søker på
 vegne
 av
 <Radio id="other-radio" className="radio-button" value="other" checked={this.state.value === 'other'} onChange={this.handleChange}/>Annet
 </div>
 */
