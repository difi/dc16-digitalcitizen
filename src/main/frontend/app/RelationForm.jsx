import React from 'react';
import DropdownList from './DropdownList.jsx';
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Radio = require('react-bootstrap/lib/Radio');
var Checkbox = require('react-bootstrap/lib/Checkbox');
var RadioGroup = require('react-radio-group');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');


export default class RelationForm extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: null,
            verger: null
        }
    }

    handleChange(r) {
        this.setState({
            value: r
        });
    }

    handleTextChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        var content = <p/>;
        if (this.state.value == "guardian") {
            content =
                <componentClass>
                    <Row className="form-row">
                        <Col sm={5} md={6}>
                            <label>Hvem ønsker sykehjemsplass?</label>
                        </Col>
                        <Col sm={7} md={6}></Col>
                    </Row>
                    <Row className="form-row">
                        <Col sm={4.5} md={5}>
                            <DropdownList id="1"
                                          options={[{name: "Ola"}, {name: "Kari"}]}
                                          labelField="name"
                                          valueField="name"
                                          defaultValue = 'Velg person'/>
                        </Col>
                        <Col sm={7.5} md={7}></Col>
                    </Row>
                </componentClass >
        }
        else if (this.state.value == "family") {
            content = <componentClass>
                <Row className="form-row">
                    <Col sm={5} md={6}>
                        <label>Hva er din relasjon til personen med behov?</label>
                    </Col>
                    <Col sm={7} md={6}></Col>
                </Row>
                <Row className="form-row">
                    <Col sm={4.5} md={5}>
                        <DropdownList id="1"
                                      options={[{name: "Søsken"}, {name: "Barn"}]}
                                      labelField="name"
                                      valueField="name"
                                      defaultValue = 'Velg relasjon'/>
                    </Col>
                    <Col sm={7.5} md={7}></Col>
                </Row>
                <Row className="form-row">
                    <Col sm={3} md={5}>
                        <Checkbox> Registrer meg som pårørende</Checkbox>
                    </Col>
                    <Col sm={9} md={7}></Col>
                </Row>
            </componentClass>
        }
        else if (this.state.value == "other") {
            content = <componentClass>
                <Row className="form-row">
                    <Col sm={5} md={6}>
                        <label>Hva er din relasjon til personen med behov?</label>
                    </Col>
                    <Col sm={7} md={6}></Col>
                </Row>
                <Row className="form-row">
                    <Col sm={4.5} md={5}>
                        <FormControl
                            type="text"
                            placeholder="Relasjon"
                            onChange={this.handleTextChange}/>
                    </Col>
                    <Col sm={7.5} md={7}></Col>
                </Row>
                <Row className="form-row">
                    <Col sm={3} md={5}>
                        <Checkbox> Registrer meg som pårørende</Checkbox>
                    </Col>
                    <Col sm={9} md={7}></Col>
                </Row>
            </componentClass>

        }

        return (
            <componentClass>
                <label className="form-header">Hva er din relasjon til den som søker?</label>
                <RadioGroup name="relation" selectedValue={this.state.value} onChange={this.handleChange}>
                    {Radio => (
                        <div className="form-radio-group">
                            <Radio className="radio-button" value="guardian"/>Jeg er verge for den jeg søker på vegne av
                            <br/>
                            <Radio className="radio-button" value="family"/>Jeg er i familie med den jeg søker på vegne
                            av
                            <br/>
                            <Radio className="radio-button" value="other"/>Annet
                        </div>
                    )}
                </RadioGroup>
                {content}

            </componentClass>




        )
    }
}