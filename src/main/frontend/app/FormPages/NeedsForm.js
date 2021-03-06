import React from 'react';
import NavigationButtons from './Components/NavigationButtons.js';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
import {reduxForm} from 'redux-form';

var alertContent = null;
var clickNextButton = false;
var Alert = require('react-bootstrap/lib/Alert');

export class NeedsFormClass extends React.Component {
    constructor(props) {
        super(props);

        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }
    
    /**
     * Handle the click on the back-button
     */
    handleClickBack() {
        //Sends the  user to state 6 - AddDependent
        console.log("State 6");
        this.props.previousStep(6);
    }
    
    /**
     * Handle the click on the next-button
     */
    handleClickNext() {
        const {fields: {need}} = this.props;
        var valid = need.value;

        if ((valid == undefined || !valid)) {
            clickNextButton = true;
            this.forceUpdate();

        } else {
            console.log("State 8");
            //The next step is step 8 - SpecialNeeds
            this.props.nextStep(8);
        }
    }
    
    /**
     * Handle change in the radiobuttons
     * @need: value of the chosen radiobutton is saved here
     * @returns the view of the NeedsForm
     */
    render() {
        const {fields: {need}} = this.props;
        var valid = need.value;

        if (clickNextButton && (valid == undefined || !valid)) {
            alertContent =
                <componentClass>
                    <p/>
                    <div className="error">
                        <Alert bsStyle="danger">
                            <p>Vennligst velg <b><i>et av alternativene</i></b>.</p>
                        </Alert>
                    </div>
                </componentClass>;
            clickNextButton = false;

        } else {
            if (valid) {
                alertContent = null;
            }
        }

        return (
            <form className="needs">
                <componentClass>
                    <label htmlFor="needsform" className="form-header">Søkes det om kortidsopphold eller langtidsopphold?</label>
                    <div id="needsform" className="form-container">
                        <input type="radio" className="radio-short" name="radio-buttons" {...need} value="short" id="shortStay"
                               checked={need.value == "short"}/> <label htmlFor="shortStay" className="button-label">Kortidsopphold</label>
                        <br/>
                        <input type="radio" className="radio-long" name="radio-buttons" {...need} value="long" id="longStay"
                               checked={need.value == "long"}/> <label htmlFor="longStay" className="button-label">Langtidsopphold</label>
                    </div>
                    {alertContent}
                    <NavigationButtons
                        handleClickBack={this.handleClickBack}
                        handleClickNext={this.handleClickNext}
                        buttonDisabled={!valid}
                    />
                </componentClass>
            </form>
        )
    }
}
NeedsFormClass.propTypes = {
    previousStep: React.PropTypes.func.isRequired,
    nextStep: React.PropTypes.func.isRequired,
};

//Validation for form
/*const validate = values => {
 const errors = {};

 if (fieldIsEmpty(values.name)) {
 errors.name = "Vennligst fyll inn et navn.";
 }

 return errors;
 };*/

/**
 * Sets up reduxForm - needs fields and validation functions
 */
const NeedsForm = reduxForm({
    form: 'application',
    fields: ['need'],
    destroyOnUnmount: false
}, null, null)(NeedsFormClass);

export default NeedsForm