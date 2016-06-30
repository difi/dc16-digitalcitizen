import React from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var ReactDOM = require('react-dom');
import DependentForm from './DependentForm.jsx';
require('!style!css!less!./Application.less');
import NavigationButtons from './NavigationButtons.jsx';

// TODO: Remove "Add Dependent"-button when 3 forms are displayed

var DISPLAY_FORM = 'block';
var HIDE_FORM = 'none';

export default class AddDependent extends React.Component {
    constructor() {
        super();
        this.state = {
            clicked: false,
            numDep: 1,
            showForm1: true,
            showForm2: HIDE_FORM,
            showForm3: HIDE_FORM
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
        (this.props.previousStep(6));
    }

    handleClickNext() {
        this.saveFieldValues();
        this.props.nextStep(8);
    }

    handleClick() {

        if (this.state.numDep < 3) {
            if (this.state.showForm2 == HIDE_FORM) {
                console.log("vis form 2");
                this.setState({
                    showForm2: DISPLAY_FORM,
                    numDep: this.state.numDep += 1
                });
            } else {
                console.log("vis form 3");
                this.setState({
                    showForm3: DISPLAY_FORM,
                    numDep: this.state.numDep += 1
                });
            }
        }
    }

    saveFieldValues() {
        var form2Data = null;
        var form3Data = null;
        if (this.state.showForm2 == DISPLAY_FORM) {
            form2Data = this.refs.form2.getFieldValues()
        }
        if (this.state.showForm3 == DISPLAY_FORM) {
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
            showForm2: HIDE_FORM,
            numDep: this.state.numDep -= 1
        });
    }

    handleClickForm3() {
        this.setState({
            showForm3: HIDE_FORM,
            numDep: this.state.numDep -= 1
        });
    }

    render() {
        return (
            <div>
                <div>
                    <label className="form-header"> Informasjon om pårørende </label>
                    <div>
                        <div id="dep1" className="depedent-form-wrapper">
                            <DependentForm ref="form1" showForm={this.state.showForm1} showDeleteButton={false}/>
                        </div>
                        <br/>
                        <div id="dep2" style={{display: this.state.showForm2}} className="depedent-form-wrapper">
                            <DependentForm ref="form2" onClick={this.handleClickForm2}
                                           showDeleteButton={true}/>
                        </div>
                        <br/>
                        <div id="dep3" style={{display: this.state.showForm3}} className="depedent-form-wrapper">
                            <DependentForm ref="form3" onClick={this.handleClickForm3}
                                           showDeleteButton={true}/>
                        </div>
                    </div>
                </div>
                <Row className="addDepButton from-row">
                        <Button onClick={this.handleClick} bsStyle="info">+ Legg til pårørende</Button>
                </Row>
                <NavigationButtons
                    handleClickBack={this.handleClickBack}
                    handleClickNext={this.handleClickNext}
                    disabled={false} // TODO update to !this.state.validform
                />
            </div>
        );
    }
};

















