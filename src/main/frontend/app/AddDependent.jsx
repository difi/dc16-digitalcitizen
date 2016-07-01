import React from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');
import DependentForm from './DependentForm.jsx';
require('!style!css!less!./Application.less');

export default class AddDependent extends React.Component {
    constructor() {
        super();
        this.state = {
            clicked: false,
            numDep: 1,
            showForm1: true,
            showForm2: false,
            showForm3: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickForm2 = this.handleClickForm2.bind(this);
        this.handleClickForm3 = this.handleClickForm3.bind(this);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.saveFieldValues = this.saveFieldValues.bind(this);
    }


    handleClickBack() {
        this.saveFieldValues();
        if( this.props.fieldValues.applyingForSelf){
        (this.props.previousStep(1));
    }
        else if( this.props.fieldValues.person.address==null){
            (this.props.previousStep(3));
        }
       else {
            (this.props.previousStep(5));
        }}

    handleClickNext() {
        this.saveFieldValues();
        this.props.nextStep(7);
    }


    handleClick() {

        if (this.state.numDep < 3) {
            if (!this.state.showForm2) {
                console.log("vis form 2");
                this.refs.form2.showForm();
                this.setState({
                    showForm2: true,
                    numDep: this.state.numDep += 1
                });
            } else {
                console.log("vis form 3");
                this.refs.form3.showForm();
                this.setState({
                    showForm3: true,
                    numDep: this.state.numDep += 1
                });
            }
        }
    }

    saveFieldValues() {
        var form2Data = null;
        var form3Data = null;
        if (this.state.showForm2) {
            form2Data = this.refs.form2.getFieldValues()
        }
        if (this.state.showForm3) {
            form3Data = this.refs.form3.getFieldValues()
        }
        var data = {
            dependents: [
                this.refs.form1.getFieldValues(),
                form2Data,
                form3Data
            ]

        };
        this.props.saveValues(data);
        console.log(data);
    }


    handleClickForm2() {
        this.setState({
            showForm2: false,
            numDep: this.state.numDep -= 1
        });
    }

    handleClickForm3() {
        this.setState({
            showForm3: false,
            numDep: this.state.numDep -= 1
        });
    }

    render() {
        return (
            <div>
                <div>
                    <label className="form-header"> Informasjon om pårørende </label>
                    <div className="dependent-wrapper">
                        <div id="dep1">
                            <DependentForm ref="form1" showForm={this.state.showForm1} showDeleteButton={false}/>
                        </div>
                        <br/>
                        <div id="dep2">
                            <DependentForm ref="form2" showForm={this.state.showForm2} onClick={this.handleClickForm2}
                                           showDeleteButton={true}/>
                        </div>
                        <br/>
                        <div id="dep3">
                            <DependentForm ref="form3" showForm={this.state.showForm3} onClick={this.handleClickForm3}
                                           showDeleteButton={true}/>
                        </div>
                    </div>
                </div>
                <Row className="addDepButton">
                    <Col sx={2} sm={2} md={2}>
                        <Button onClick={this.handleClick} bsStyle="info">Legg til pårørende</Button>
                    </Col>
                    <Col sx={7} sm={8} md={4}> </Col>
                </Row>
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
        );
    }
};

















