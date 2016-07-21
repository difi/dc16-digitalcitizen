import React from 'react';
import {reduxForm} from 'redux-form';

import DependentForm from './Components/DependentForm.js';
import NavigationButtons from './Components/NavigationButtons.js';
import validate from './Components/DependentValidation';

require('!style!css!less!../Application.less');
import $ from 'jquery'
var ReactDOM = require('react-dom');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var Collapse = require('react-bootstrap/lib/Collapse');
import RESTpaths from '../static_data/RESTpaths.js';
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
    'displayButton',
    'form1.depOtherRelation',
    'form2.depOtherRelation',
    'form3.depOtherRelation',
    'numDep'
];

var DISPLAY_FORM = 'block';
var HIDE_FORM = 'none';

export class AddDependentClass extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickForm2 = this.handleClickForm2.bind(this);
        this.handleClickForm3 = this.handleClickForm3.bind(this);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.saveFieldValues = this.saveFieldValues.bind(this);
        this.validation = this.validation.bind(this);
        this.getPersonToBeDependent = this.getPersonToBeDependent.bind(this);
        if (props.fieldValues.dependent) {

            this.getPersonToBeDependent();
        }
    }


    getPersonToBeDependent() {

        $.ajax({
            url: RESTpaths.PATHS.DEPENDENT_BASE + '?pnr=' + this.props.userData.pnr,
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
                //TODO: FirstName and LastName may cause trouble. Should be split up at backend?
                var name = data.name.split(' ');
                console.log(name);
                var firstName = name[0];
                var lastName = name[1];
                this.props.fields.form1.firstName.onChange(firstName);
                this.props.fields.form1.lastName.onChange(lastName);
                this.props.fields.form1.phone.onChange(data.telephone);
                this.props.fields.form1.mail.onChange(data.mail);
                console.log("relation: " + this.props.fieldValues.relation);
                switch (this.props.fieldValues.relation) {
                    case "guardian":
                        this.props.fields.form1.relation.onChange("Verge");
                        break;
                    case "family":
                        this.props.fields.form1.relation.onChange(this.props.fieldValues.typeOfRelation);
                        break;
                    case "other":
                        this.props.fields.form1.relation.onChange('Annet');
                        this.props.fields.form1.depOtherRelation.onChange(this.props.fieldValues.otherRelation);
                        break;
                }
                this.forceUpdate();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleClickBack() {
        this.saveFieldValues();
        if (this.props.fieldValues.applyingForSelf) {
            (this.props.previousStep(1));
        }

        else if (this.props.fieldValues.relation == "guardian") {
            this.props.previousStep(2);
        }
        else if (this.props.fieldValues.dontGotPNRnumber) {
            (this.props.previousStep(5));
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
        if (this.props.fields.numDep.value < 3) {

            if (this.props.fields.numDep.value == 2) {
                this.props.fields.displayButton.onChange(HIDE_FORM);
            }

            if (!this.props.fields.form2.show.value) {
                this.props.fields.form2.show.onChange(true);
                console.log("vis form 2");
                if (this.props.fields.form3.show.value) {
                    this.props.fields.displayButton.onChange(HIDE_FORM);
                }
                this.props.fields.numDep.onChange(this.props.fields.numDep.value + 1);
            } else {
                this.props.fields.form3.show.onChange(true);
                console.log("vis form 3");
                this.props.fields.displayButton.onChange(HIDE_FORM);
                this.props.fields.numDep.onChange(this.props.fields.numDep.value + 1);
            }
        }
    }

    validation(value) {
        const {
            fields: {form1, form2, form3}
        } = this.props;

        // value for the combination of validation of each form included in the view
        var valid = true;

        // values to make the form unvalid if "Annet" is chosen, and no description is given
        var other1 = true;
        var other2 = true;
        var other3 = true;

        // values for the validation of each form
        var form1validate = (form1.firstName.value && form1.lastName.value && form1.phone.value && form1.mail.value && form1.relation.value && !form1.phone.error && !form1.mail.error);
        var form2validate = (form2.firstName.value && form2.lastName.value && form2.phone.value && form2.mail.value && form2.relation.value && !form2.phone.error && !form2.mail.error);
        var form3validate = (form3.firstName.value && form3.lastName.value && form3.phone.value && form3.mail.value && form3.relation.value && !form3.phone.error && !form3.mail.error);

        if (value == "3") {
            // All three forms has to be valid if you want to continue
            valid = form1validate && form2validate && form3validate;

            //If "Annet" is chosen in one or more of the forms, the associated textfield would also need to be valid
            if (form1.relation.value == "Annet") {
                other1 = (valid && form1.depOtherRelation.value);
            }
            if (form2.relation.value == "Annet") {
                other2 = (valid && form2.depOtherRelation.value);
            }
            if (form3.relation.value == "Annet") {
                other3 = (valid && form3.depOtherRelation.value);
            }

            //All four values need to be true to show the next button
            return valid && other1 && other2 && other3;

        } else if (value == "2") {
            valid = form1validate && form2validate;

            if (form1.relation.value == "Annet") {
                other1 = (valid && form1.depOtherRelation.value);
            }
            if (form2.relation.value == "Annet") {
                other2 = (valid && form2.depOtherRelation.value);
            }
            return valid && other1 && other2;

        } else {
            valid = form1validate;

            if (form1.relation.value == "Annet") {
                other1 = (valid && form1.depOtherRelation.value);
            }
            return valid && other1;
        }
    }

    saveFieldValues() {
        const {fields: {form1, form2, form3}} = this.props;
        console.log("depRelation:" + form1.depOtherRelation.value);
        var form2Data = null;
        var form3Data = null;
        var form1Data = {
            firstName: form1.firstName.value,
            lastName: form1.lastName.value,
            telephone: form1.phone.value,
            email: form1.mail.value,
            relation: form1.relation.value,
            depOtherRelation: form1.depOtherRelation.value
        };
        if (this.props.fields.form2.show.value) {
            form2Data = {
                firstName: form2.firstName.value,
                lastName: form2.lastName.value,
                telephone: form2.phone.value,
                email: form2.mail.value,
                relation: form2.relation.value,
                depOtherRelation: form2.depOtherRelation.value
            }
        }
        if (this.props.fields.form3.show.value) {
            form3Data = {
                firstName: form3.firstName.value,
                lastName: form3.lastName.value,
                telephone: form3.phone.value,
                email: form3.mail.value,
                relation: form3.relation.value,
                depOtherRelation: form3.depOtherRelation.value
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
        this.props.fields.numDep.onChange(this.props.fields.numDep.value - 1);
    }

    handleClickForm3() {
        this.props.fields.form3.show.onChange(false);
        this.props.fields.displayButton.onChange(DISPLAY_FORM);
        this.props.fields.numDep.onChange(this.props.fields.numDep.value - 1);
    }

    render() {
        
        const {
            fields: {form1, form2, form3, displayButton, numDep}
        } = this.props;
        var valid = this.validation(1);
        for (var i = 1; i <= numDep.value; i++) {
            valid = this.validation(i) && valid
        }
        return (
            <div>
                <div>
                    <label className="form-header"> Informasjon om pårørende </label>
                    <div>
                        <div id="dep1" className="depedent-form-wrapper">
                            <DependentForm ref="form1" formKey="1" showDeleteButton={false} {...form1}
                                           autoFilled={this.props.fieldValues.dependent}/>
                        </div>
                        <br/>
                        <Collapse in={this.props.fields.form2.show.value}>
                            <div>
                                <div id="dep2" className="depedent-form-wrapper">
                                    <DependentForm ref="form2" formKey="2" onClick={this.handleClickForm2}
                                                   showDeleteButton={true} {...form2}/>
                                </div>
                            </div>
                        </Collapse>
                        <br/>
                        <Collapse in={this.props.fields.form3.show.value}>
                            <div>
                                <div id="dep3" className="depedent-form-wrapper">
                                    <DependentForm ref="form3" formKey="3" onClick={this.handleClickForm3}
                                                   showDeleteButton={true} {...form3}/>
                                </div>
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

                />
            </div>
        );
    }
}
;

AddDependentClass.propTypes = {
    fieldValues: React.PropTypes.object.isRequired,
    previousStep: React.PropTypes.func.isRequired,
    nextStep: React.PropTypes.func.isRequired,
    saveValues: React.PropTypes.func.isRequired
}


const AddDependent = reduxForm({
    form: 'application',
    fields: fields,
    initialValues: {"form2.show": false, "form3.show": false, "numDep": 1},
    destroyOnUnmount: false,
    validate
})(AddDependentClass);


export default AddDependent
