import React from 'react';
var RadioGroup = require('react-radio-group');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

export default class NeedsForm extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);

        //None of the radio-buttons are chosen
        this.state = {
            value: null
        };

        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }

    //Handle the click on the back-button
    handleClickBack() {
        //If you are applying for yourself, the previous step is step 1 - WhosSearchingForm
        if( this.props.fieldValues.isApplyingForSelf){
            this.props.previousStep(1);
        }
        //If no adress is possible to obtain, the previous step is step 3 - PersonWithNeedInfoForm
        else if( this.props.fieldValues.adress==null){
            this.props.previousStep(3);
        }
        //Else the previous step is step 5 -
        else{
            this.props.previousStep(5);
        }
    }
    saveFieldValues() {
        var data = {
            lengthOfStay: this.state.value
        };
        this.props.saveValues(data);
        console.log(data);
    }

    //Handle the click on the next-button
    handleClickNext() {
        this.saveFieldValues();
        console.log("State 7");
        //The next step is step 7 - SpecialNeeds
        this.props.nextStep(7);
    }

    //Handle change in the radio-buttons
    //@param r - the radio button chosen
    handleChange(r) {
        //Set the state to the pushed radio-button
        this.setState({
            value: r
        });
    }

    //RadioGroup: Showing radio-buttons. Call handleChange when a button is clicked, but
    // do not send an argument, because react already knows which argument to use.
    //@return The view of the NeedsForm.
    render() {
        return (
            <componentClass>
                <label className="form-header">Søker du om kortidsopphold eller langtidsopphold?</label>

                <div className="form-container">
                    <RadioGroup className="needs" selectedValue={this.state.value} onChange={this.handleChange}>
                        {Radio => (
                            <div>
                                <Radio value="short"/> Kortidsopphold
                                <br/>
                                <Radio value="long"/> Langtidsopphold
                            </div>
                        )}
                    </RadioGroup>
                </div>

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
            </componentClass>
        )
    }
}