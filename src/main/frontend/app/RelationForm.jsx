import React from 'react';
import DropdownList from './DropdownList.jsx';
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Radio = require('react-bootstrap/lib/Radio');
var Checkbox = require('react-bootstrap/lib/Checkbox');
var RadioGroup = require('react-radio-group');

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');

export default class RelationForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: this.props.fieldValues.relation,
            typeOfRelation: this.props.fieldValues.typeOfRelation,
            verger: null,
            isDependent: this.props.fieldValues.isDependent
        };
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.handleDependentChange = this.handleDependentChange.bind(this);
    }

    handleClickBack() {
        console.log("State 1");
        this.saveFieldValues();
        (this.props.previousStep(1));
    }

    handleClickNext() {
        console.log("State 3");
        this.saveFieldValues();
        this.props.nextStep(3);
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
            typeOfRelation = this.refs.typeOfRelation.getDropdownValue();
        }
        else{
            typeOfRelation= ReactDOM.findDOMNode(this.refs.otherRelation).value;
        }

        var data = {
            relation: this.state.value,
            typeOfRelation: typeOfRelation,
            isDependent: isDependent,
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
        this.setState({value: event.target.value});
    }

    render() {
        var content = <p/>;


        switch (this.state.value) {
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
                                <label>Hva er din relasjon til personen med behov?</label>
                            </Col>
                            <Col sm={6} md={6}></Col>
                        </Row>
                        <Row className="form-row">
                            <Col sm={6} md={6}>
                                <DropdownList id="1"
                                              ref="typeOfRelation"
                                              options={[{name: "Velg..."},{name: "Søsken"}, {name: "Barn"}]}
                                              labelField="name"
                                              valueField="name"
                                              defaultValue='Velg relasjon'/>
                            </Col>
                            <Col sm={6} md={6}></Col>
                        </Row>
                        <Row className="form-row">
                            <Col sm={3} md={5}>
                                <Checkbox ref="setDependent" onClick={this.handleDependentChange} checked={this.state.isDependent}> Registrer meg som
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
                                placeholder="Relasjon"
                                onChange={this.handleTextChange}/>
                        </Col>
                        <Col sm={6} md={6}></Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={3} md={5}>
                            <Checkbox ref="setDependent" onClick={this.handleDependentChange} checked={this.state.isDependent}> Registrer meg som
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
                    <RadioGroup name="relation" selectedValue={this.state.value} onChange={this.handleChange}>
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


























