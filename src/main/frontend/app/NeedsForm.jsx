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
        //Else the previous step is step 5 - PersonWithNeedForm
        else{
            this.props.previousStep(5);
        }
    }

    //Handle the click on the next-button
    handleClickNext() {
        console.log("State 6");
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

    //@return The view of the NeedsForm.
    render() {
        return (
            <componentClass>
                <label className="form-header">Søker du om kortidsopphold eller langtidsopphold?</label>
                <!-- Showing radio-buttons. Call handleChange when a button is clicked, but
                do not send an argument, because react already knows which argument to use.-->
                <RadioGroup className="needs" selectedValue={this.state.value} onChange={this.handleChange}>
                    {Radio => (
                        <div>
                            <Radio value="shortStay"/> Kortidsopphold
                            <br/>
                            <Radio value="longStay"/> Langtidsopphold
                        </div>
                    )}
                </RadioGroup>
                <!-- Showing the next and previous buttons. -->
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
            </componentClass>
        )
    }
}