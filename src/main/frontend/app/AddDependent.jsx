import React from 'react';
import {reduxForm} from 'redux-form';

import DependentForm from './DependentForm.jsx';
import NavigationButtons from './NavigationButtons.jsx';
import validate from './DependentValidation';

require('!style!css!less!./Application.less');

var ReactDOM = require('react-dom');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var Collapse = require('react-bootstrap/lib/Collapse');

const fields = [

    'form1.firstName',
    'form1.lastName',
    'form1.mail',
    'form1.phone',
    'form1.relation',
    'form2.show',
    'form2.firstName',
    'form2.lastName',
    'form2.mail',
    'form2.phone',
    'form2.relation',
    'form3.show',
    'form3.firstName',
    'form3.lastName',
    'form3.mail',
    'form3.phone',
    'form3.relation',
    'displayButton'
];

var DISPLAY_FORM = 'block';
var HIDE_FORM = 'none';

class AddDependent extends React.Component {
    constructor() {
        super();
        this.state = {
            clicked: false,
            numDep: 1,
            showForm1: true,
            showForm2: false,
            showForm3: false,
            showAddButton: DISPLAY_FORM
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickForm2 = this.handleClickForm2.bind(this);
        this.handleClickForm3 = this.handleClickForm3.bind(this);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.saveFieldValues = this.saveFieldValues.bind(this);
        this.validation = this.validation.bind(this);
    }

    handleClickBack() {
        this.saveFieldValues();
        if (this.props.fieldValues.applyingForSelf) {
            (this.props.previousStep(1));
        }
        else if (this.props.fieldValues.gotPNRnumber) {
            (this.props.previousStep(5));
        }
            else if(this.props.fieldValues.relation == "guardian"){
            this.props.previousStep(2);
        }
        else {
            (this.props.previousStep(3));
        }
    }

    handleClickNext() {
        this.saveFieldValues();
        this.props.nextStep(7);
    }

    handleClick() {

        if (this.state.numDep < 3) {

            if (this.state.numDep == 2) {
                this.props.fields.displayButton.onChange(HIDE_FORM);
            }

            if (!this.props.fields.form2.show.value) {
                this.props.fields.form2.show.onChange(true);
                console.log("vis form 2");
                if(this.props.fields.form3.show.value){
                    this.props.fields.displayButton.onChange(HIDE_FORM);
                }
                this.setState({
                    numDep: this.state.numDep += 1
                });
            } else {
                this.props.fields.form3.show.onChange(true);
                console.log("vis form 3");
                this.props.fields.displayButton.onChange(HIDE_FORM);
                this.setState({
                    numDep: this.state.numDep += 1,
                });
            }
        }
    }

    validation(value) {
        const {
            fields: {form1, form2, form3}
        } = this.props;

        if (value == "3") {
            var valid = (form1.firstName.value && form1.lastName.value && form1.phone.value && form1.mail.value && form1.relation.value &&!form1.phone.error && !form1.mail.error)
                && (form2.firstName.value && form2.lastName.value && form2.phone.value && form2.mail.value && form2.relation.value &&!form2.phone.error && !form2.mail.error)
                && (form3.firstName.value && form3.lastName.value && form3.phone.value && form3.mail.value && form3.relation.value &&!form3.phone.error && !form3.mail.error);
            return valid;
        } else if (value == "2") {
            var valid = (form1.firstName.value && form1.lastName.value && form1.phone.value && form1.mail.value && form1.relation.value &&!form1.phone.error && !form1.mail.error)
                && (form2.firstName.value && form2.lastName.value && form2.phone.value && form2.mail.value && form2.relation.value &&!form2.phone.error && !form2.mail.error);
            return valid;
        } else {
            var valid = (form1.firstName.value && form1.lastName.value && form1.phone.value && form1.mail.value && form1.relation.value &&!form1.phone.error && !form1.mail.error);
            return valid;
        }
    }

    saveFieldValues() {

        const {fields: {form1, form2, form3}} = this.props;

        var form2Data = null;
        var form3Data = null;
        var form1Data = {
            firstName: form1.firstName.value,
            lastName: form1.lastName.value,
            telephone: form1.phone.value,
            email: form1.mail.value,
            relation: form1.relation.value
        };
        if (this.state.showForm2 == true) {
            form2Data = {
                firstName: form2.firstName.value,
                lastName: form2.lastName.value,
                telephone: form2.phone.value,
                email: form2.mail.value,
                relation: form2.relation.value
            }
        }
        if (this.state.showForm3 == true) {
            form3Data = {
                firstName: form3.firstName.value,
                lastName: form3.lastName.value,
                telephone: form3.phone.value,
                email: form3.mail.value,
                relation: form3.relation.value
            }
        }
        var data = {
            dependents: [
                form1Data,
                form2Data,
                form3Data
            ]
        };
        this.props.saveValues(data);
        console.log(data);
    }

    handleClickForm2() {
        this.props.fields.form2.show.onChange(false);
        this.props.fields.displayButton.onChange(DISPLAY_FORM);
        this.setState({
            numDep: this.state.numDep -= 1,

        });
    }

    handleClickForm3() {
        this.props.fields.form3.show.onChange(false);
        this.props.fields.displayButton.onChange(DISPLAY_FORM);
        this.setState({
            numDep: this.state.numDep -= 1,
        });
    }

    render() {
        const {
            fields: {form1, form2, form3, displayButton}
        } = this.props;
        this.validation(1);
        var valid=true;
        for(var i=1; i<=this.state.numDep; i++){
            valid = this.validation(i) && valid
        }
        return (
            <div>
                <div>
                    <label className="form-header"> Informasjon om pårørende </label>
                    <div>
                        <div id="dep1" className="depedent-form-wrapper">
                            <DependentForm ref="form1" showForm={this.state.showForm1} formKey="1"
                                           showDeleteButton={false} {...form1} />
                        </div>
                        <br/>
                        <Collapse in={this.props.fields.form2.show.value}>
                            <div id="dep2" className="depedent-form-wrapper">
                                <DependentForm ref="form2" formKey="2" onClick={this.handleClickForm2}
                                               showDeleteButton={true} {...form2}/>
                            </div>
                        </Collapse>
                        <br/>
                        <Collapse in={this.props.fields.form3.show.value}>
                            <div id="dep3" className="depedent-form-wrapper">
                                <DependentForm ref="form3" formKey="3" onClick={this.handleClickForm3}
                                               showDeleteButton={true} {...form3}/>
                            </div>
                        </Collapse>
                    </div>
                </div>
                <Row className="addDepButton from-row">
                    <Button onClick={this.handleClick} style={{display: displayButton.value}} bsStyle="info">+ Legg
                        til pårørende</Button>
                </Row>
                <NavigationButtons
                    handleClickBack={this.handleClickBack}
                    handleClickNext={this.handleClickNext}
                    disabled={!valid}
                     // TODO: update to !this.state.validform
                />
            </div>
        );
    }
}

AddDependent = reduxForm({
    form: 'application',
    fields: fields,
    initialValues: {"form2.show": false, "form3.show": false},
    destroyOnUnmount: false,
    validate
})(AddDependent);

export default AddDependent












