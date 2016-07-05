import React from 'react';
import NavigationButtons from './NavigationButtons.jsx';
var RadioGroup = require('react-radio-group');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
import {reduxForm} from 'redux-form';

export class NeedsFormClass extends React.Component {
    constructor(props) {
        super(props);


        //None of the radio-buttons are chosen
        this.state = {
            value: this.props.fieldValues.lengthOfStay,
            validForm: this.props.fieldValues.lengthOfStay
        };

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
                <label className="form-header">Søker du om kortidsopphold eller langtidsopphold?</label>

                <div className="form-container">
                    <RadioGroup className="needs" selectedValue={need.value} {...need}>
                        {Radio => (
                            <div>
                                <Radio value="short"/> Kortidsopphold
                                <br/>
                                <Radio value="long"/> Langtidsopphold
                            </div>
                        )}
                    </RadioGroup>
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


const NeedsForm = reduxForm({
    form: 'application',
    fields: ["need"],
    destroyOnUnmount: false
}, null, null)(NeedsFormClass);


export default NeedsForm