import React from 'react';
import DropdownList from './DropdownList.jsx';
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Radio = require('react-bootstrap/lib/Radio');
var Checkbox = require('react-bootstrap/lib/Checkbox');
var RadioGroup = require('react-radio-group');
var Button = require('react-bootstrap/lib/Button');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

export default class RelationForm extends React.Component{
    constructor() {
        super();
        this.handleChange=this.handleChange.bind(this);
        this.state = {
            value: null,
            verger: null
        };
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }

    handleClickBack() {
        console.log("State 1")
        (this.props.previousStep(1));
    }

    handleClickNext() {

            console.log("State 3")
            this.props.nextStep(3);

    }


    handleChange(r){


        this.setState({
            value: r
        });

    }
    render() {
        var content = <p/>;
        //Decides content based on checked radio button
        if(this.state.value=="guardian"){
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


        }

        return(
            <div>
            <RadioGroup name="relation" selectedValue={this.state.value} onChange={this.handleChange}>
                {Radio => (
                    <div>
                        <Radio value="guardian" />Jeg er verge for den jeg søker
                        <br/>
                        <Radio value="family" />Jeg er i familie med den jeg søker for
                            <br/>
                        <Radio value="other" />Annet
                    </div>
                    )}
            </RadioGroup>
                <br></br>
                {content}
                <Row className="back-forward-buttons">
                    <Col sm={1.5} md={2}>
                        <Button onClick={this.handleClickBack} className="button-next" bsStyle="success">&larr;
                            Tilbake</Button>
                    </Col>
                    <Col sm={6} md={6}></Col>
                    <Col sm={1.5} md={2}>
                        <Button onClick={this.handleClickNext} className="button-next"
                                bsStyle="success">Neste &rarr;</Button>
                    </Col>
                    <Col sm={6} md={2}></Col>
                </Row>

                </div>




        )
    }
}