import React from 'react';
import NavigationButtons from './Components/NavigationButtons.js';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
import {reduxForm} from 'redux-form';

export class NeedsFormClass extends React.Component {
    constructor(props) {
        super(props);

        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }

    //Handle the click on the back-button
    handleClickBack() {
        //If you are applying for yourself, the previous step is step 1 - WhosSearchingForm
        this.props.previousStep(6);
    }

    saveFieldValues() {
        var data = {
            lengthOfStay: this.props.fields.need.value
        };
        this.props.saveValues(data);
        console.log(data);
    }

    //Handle the click on the next-button
    handleClickNext() {
        this.saveFieldValues();
        console.log("State 7");
        //The next step is step 7 - SpecialNeeds
        this.props.nextStep(8);
    }

    //Handle change in the radio-buttons
    //@param r - the radio button chosen

    //RadioGroup: Showing radio-buttons. Call handleChange when a button is clicked, but
    // do not send an argument, because react already knows which argument to use.
    //@return The view of the NeedsForm.
    render() {
        const {fields: {need}} = this.props;
        var valid = need.value;
        return (
            <componentClass>
                <label className="form-header">Søkes det om kortidsopphold eller langtidsopphold?</label>

                <div className="form-container">
                    <form className="needs">
                        <input type="radio" className="radio-short" name="radio-buttons" {...need} value="short" checked={need.value=="short"}/> Kortidsopphold
                        <br/>
                        <input type="radio" className="radio-long" name="radio-buttons" {...need} value="long" checked={need.value=="long"}/> Langtidsopphold
                    </form>
                </div>
                <NavigationButtons
                    handleClickBack={this.handleClickBack}
                    handleClickNext={this.handleClickNext}
                    disabled={!valid}
                />
            </componentClass>
        )
    }
}
NeedsFormClass.propTypes = {
    previousStep: React.PropTypes.func.isRequired,
    nextStep:  React.PropTypes.func.isRequired,
    saveValues:  React.PropTypes.func.isRequired,
};

const NeedsForm = reduxForm({
    form: 'application',
    fields: ["need"],
    destroyOnUnmount: false
}, null, null)(NeedsFormClass);


export default NeedsForm