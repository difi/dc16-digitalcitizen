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
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleDependentChange = this.handleDependentChange.bind(this);
        this.state = {
            value: null,
            verger: null,
            isDependent: false
        }
    }

    saveFieldValues() {
        // Get values via this.refs
        var isDependent = this.state.isDependent;
        var nameOfChild = null;
        var typeOfRelation = null;
        if(this.state.value == "guardian"){
            isDependent = true;
            nameOfChild = this.refs.nameOfChild.getDropdownValue();
            typeOfRelation = "guardian"
        }
        if(this.state.value == "family"){
            typeOfRelation = this.refs.typeOfRelation.getDropdownValue();
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

    nextStep() {
        this.saveFieldValues();
        this.props.nextStep();
    }

    previousStep() {
        this.saveFieldValues();
        this.props.previousStep();
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

    render() {
        var content;
        switch (this.state.value) {
            case "guardian":
                content =
                    <div>
                        <p>Navnet på den du er verge for</p>
                        <DropdownList ref="nameOfChild" id="1" options={[{name: "Ola"}, {name: "Kari"}]}
                                      labelField="name" valueField="name"/>
                    </div>;
                break;
            case "family":
                content =
                    <div>
                        <DropdownList id="1" ref="typeOfRelation" options={[{name: "Søsken"}, {name: "Barn"}]} labelField="name"
                                      valueField="name"/>
                        <Checkbox ref="setDependent" onClick={this.handleDependentChange}>
                            Registrer meg som pårørende
                        </Checkbox>
                    </div>;
                break;
            case "other":
                content =
                    <Checkbox ref="setDependent" onClick={this.handleDependentChange}>
                        Registrer meg som pårørende
                    </Checkbox>;
                break;
        }

        return (
            <div>
                <RadioGroup name="relation" ref="relation" selectedValue={this.state.value} onChange={this.handleChange}>
                    {Radio => (
                        <div>
                            <Radio value="guardian"/>Jeg er verge for den jeg søker
                            <br/>
                            <Radio value="family"/>Jeg er i familie med den jeg søker for
                            <br/>
                            <Radio value="other"/>Annet
                        </div>
                    )}
                </RadioGroup>
                <br></br>
                {content}

                <Row className="back-forward-buttons">
                    <Col sm={1.5} md={2}>
                        <Button onClick={this.previousStep.bind(this)} className="button-next" bsStyle="success">&larr;
                            Tilbake</Button>
                    </Col>
                    <Col sm={6} md={6}></Col>
                    <Col sm={1.5} md={2}>
                        <Button onClick={this.nextStep.bind(this)} className="button-next"
                                bsStyle="success">Neste &rarr;</Button>
                    </Col>
                    <Col sm={6} md={2}></Col>
                </Row>
            </div>




        )
    }
}