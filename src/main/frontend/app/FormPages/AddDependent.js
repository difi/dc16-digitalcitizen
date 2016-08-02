import React from 'react';
import {reduxForm} from 'redux-form';
import $ from 'jquery'

import RESTpaths from '../static_data/RESTpaths.js';
import DependentForm from './Components/DependentForm.js';
import NavigationButtons from './Components/NavigationButtons.js';
import validate from './Components/DependentValidation';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var Collapse = require('react-bootstrap/lib/Collapse');

const fields = [
    'form1.name',
    'form1.mail',
    'form1.phone',
    'form1.relation',
    'form2.show',
    'form2.name',
    'form2.mail',
    'form2.phone',
    'form2.relation',
    'form3.show',
    'form3.name',
    'form3.mail',
    'form3.phone',
    'form3.relation',
    'displayButton',
    'form1.depOtherRelation',
    'form2.depOtherRelation',
    'form3.depOtherRelation',
    'numDep',
    'relation',
    'dependent',
    'applyingForSelf',
    'checked',
    'otherRelation',
    'typeOfRelation'
];

/**
 * Variables used to either show or hide the button to add a new dependent. The reason for this is because the user shall not add more than three dependents.
 * The values of the variables is set in the style attribute to addDepButton.
 */
var DISPLAY_FORM = 'block';
var HIDE_FORM = 'none';
var clickNextButton = false;

export class AddDependentClass extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickForm2 = this.handleClickForm2.bind(this);
        this.handleClickForm3 = this.handleClickForm3.bind(this);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.validation = this.validation.bind(this);
        this.getPersonToBeDependent = this.getPersonToBeDependent.bind(this);
        if (!props.fields.numDep.value) {
            props.fields.numDep.onChange(1);
        }
        if (props.fields.dependent.value) {
            this.getPersonToBeDependent();
        }
    }

    /**
     * If checked for dependent or guardian, this load the person logged in from the server to fill out the values.
     */
    getPersonToBeDependent() {
        const {fields: {form1}} = this.props;
        $.ajax({
            url: RESTpaths.PATHS.DEPENDENT_BASE + '?pnr=' + this.props.userData.pnr,
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
                console.log(name);
                form1.name.onChange(data.name);
                form1.phone.onChange(data.telephone);
                form1.mail.onChange(data.mail);
                switch (this.props.fields.relation.value) {
                    case "guardian":
                        form1.relation.onChange("Verge");
                        break;
                    case "family":
                        form1.relation.onChange(this.props.fields.typeOfRelation.value);
                        break;
                    case "other":
                        form1.relation.onChange('Annet');
                        form1.depOtherRelation.onChange(this.props.fields.otherRelation.value);
                        break;
                }
                //this.forceUpdate();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    /**
     * Sends you to different forms based on different earlier inputs.
     */
    handleClickBack() {
        console.log(this.props.fields);
        if (this.props.fields.applyingForSelf.value) {
            (this.props.previousStep(1));
        }

        else if (this.props.fields.relation.value == "guardian") {
            this.props.previousStep(2);
        }
        else if (this.props.fields.checked.value) {
            (this.props.previousStep(5));
        }
        else {
            (this.props.previousStep(3));
        }
    }

    /**
     * Handles the click on the next-button
     */
    handleClickNext() {
        const {fields: {numDep}} = this.props;
        var valid = this.validation(1);
        for (var i = 1; i <= numDep.value; i++) {
            valid = this.validation(i) && valid
        }
        if ((valid == undefined || !valid)) {

                clickNextButton = true;
                this.forceUpdate();
        } else {
            console.log("State 7");
            this.props.nextStep(7);
        }
    }

    /**
     * The value of numDep controls which dependent-form to show in application.
     * First time button is clicked, numDep is set to 2, and second dependent-form is displayed.
     * If all three dependent-forms is displayed, the button to add new dependent is hidden.
     */
    handleClick() {
        //Handles click on add another dependent. Should show 2 and 3, then disable itself until form 3 is removed.
        const {
            fields: {numDep, form2, form3, displayButton}
        } = this.props;
        if (!numDep.value) {
            numDep.onChange(2);
            form2.show.onChange(true);
        }
        else if (numDep.value < 3) {

            if (numDep.value == 2) {
                displayButton.onChange(HIDE_FORM);
            }

            if (!form2.show.value) {
                form2.show.onChange(true);
                console.log("vis form 2");
                if (form3.show.value) {
                    displayButton.onChange(HIDE_FORM);
                }
                numDep.onChange(numDep.value + 1);
            } else {
                form3.show.onChange(true);
                console.log("vis form 3");
                displayButton.onChange(HIDE_FORM);
                numDep.onChange(numDep.value + 1);
            }
        }
    }

    /**
     * @param value
     * Validates the displayed DependentForm's in the view 
     */
    validation(value) {
        const {fields: {form1, form2, form3}} = this.props;

        // value for the combination of validation of each form included in the view
        var valid = true;

        // values to make the form unvalid if "Annet" is chosen, and no description is given
        var other1 = true;
        var other2 = true;
        var other3 = true;

        // values for the validation of each form
        var form1validate = (form1.name.value && form1.phone.value && form1.mail.value && form1.relation.value && !form1.phone.error && !form1.mail.error);
        var form2validate = (form2.name.value && form2.phone.value && form2.mail.value && form2.relation.value && !form2.phone.error && !form2.mail.error);
        var form3validate = (form3.name.value && form3.phone.value && form3.mail.value && form3.relation.value && !form3.phone.error && !form3.mail.error);

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

    /**
     * Hides second dependent-form
     * Decreases numDep-value
     */
    handleClickForm2() {
        this.props.fields.form2.show.onChange(false);
        this.props.fields.displayButton.onChange(DISPLAY_FORM);
        this.props.fields.numDep.onChange(this.props.fields.numDep.value - 1);
    }

    /**
     * Hides third dependent-form
     * Decreases the numDep-value
     * Displays button to add new dependent
     */
    handleClickForm3() {
        this.props.fields.form3.show.onChange(false);
        this.props.fields.displayButton.onChange(DISPLAY_FORM);
        this.props.fields.numDep.onChange(this.props.fields.numDep.value - 1);
    }

    /**
     * @returns the view of AddDependent, containing a number of DependentForm's
     */
    render() {
        const {fields: {form1, form2, form3, displayButton, numDep}} = this.props;
        var valid = this.validation(1);
        for (var i = 1; i <= numDep.value; i++) {
            valid = this.validation(i) && valid
        }

        return (
            <div className="dependent-start">
                <div>
                    <label className="form-header"> Informasjon om pårørende </label>
                    <div>
                        <div id="dep1" className="depedent-form-wrapper">
                            <DependentForm ref="form1" formKey="1" showDeleteButton={false} {...form1}
                                           autoFilled={this.props.fields.dependent.value}
                                           clickButtonNext={clickNextButton}/>
                        </div>
                        <br/>
                        <Collapse in={this.props.fields.form2.show.value}>
                            <div>
                                <div id="dep2" className="depedent-form-wrapper">
                                    <DependentForm ref="form2" formKey="2" onClick={this.handleClickForm2}
                                                   showDeleteButton={true} {...form2}
                                                   clickButtonNext={clickNextButton}/>
                                </div>
                            </div>
                        </Collapse>
                        <br/>
                        <Collapse in={this.props.fields.form3.show.value}>
                            <div>
                                <div id="dep3" className="depedent-form-wrapper">
                                    <DependentForm ref="form3" formKey="3" onClick={this.handleClickForm3}
                                                   showDeleteButton={true} {...form3}
                                                   clickButtonNext={clickNextButton}/>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>
                <Row className="addDepButton from-row">
                    <Button onClick={this.handleClick}
                            className="add-button"
                            style={{display: displayButton.value}}
                            bsStyle="info">
                        + Legg til pårørende
                    </Button>
                </Row>
                <NavigationButtons
                    handleClickBack={this.handleClickBack}
                    handleClickNext={this.handleClickNext}
                    buttonDisabled={!valid}
                />
            </div>
        );
    }
}

AddDependentClass.propTypes = {
    previousStep: React.PropTypes.func.isRequired,
    nextStep: React.PropTypes.func.isRequired
};

const AddDependent = reduxForm({
    form: 'application',
    fields: fields,
    destroyOnUnmount: false,
    validate
})(AddDependentClass);

export default AddDependent

