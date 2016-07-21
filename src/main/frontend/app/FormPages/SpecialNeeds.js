import React from 'react';
import NavigationButtons from './Components/NavigationButtons.js';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var HelpBlock = require('react-bootstrap/lib/HelpBlock');
var Overlay = require('react-bootstrap/lib/Overlay');
var Popover = require('react-bootstrap/lib/Popover');
var ReactDOM = require('react-dom');


import {reduxForm} from 'redux-form';
import {fieldIsEmpty} from './Utilities/validation.js'

export class SpecialNeedsClass extends React.Component {

    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.saveFieldValues = this.saveFieldValues.bind(this);
    }

    handleClickBack() {
        this.saveFieldValues();
        console.log("State 6");
        (this.props.previousStep(7));
    }

    handleClickNext() {
        this.saveFieldValues();
        console.log("State 9");
        this.props.nextStep(9);
    }

    saveFieldValues() {
        // Get values via this.refs
        const {fields: {medical, changes, other}} = this.props;

        var data = {
            medicalNeeds: medical.value,
            conditionChanges: changes.value,
            otherNeeds: other.value
        };
        return this.props.saveValues(data);
    }

    render() {

        const {fields: {medical, changes, other}} = this.props;
        var valid = changes.value;
        const invalidChangesTooltip = <Popover id="invalidChangesPopover">{changes.error}</Popover>;
        const invalidChangesProps = {
            show: changes.touched && changes.error != undefined,
            container: this,
            target: () => ReactDOM.findDOMNode(this.refs.conditionChanges)
        };

        return (
            <div>
                <label className="form-header">Utfyllende informasjon  </label>
                <div className="form-container">
                    <Row className="form-row-special">
                        <Col sm={12} md={12}>
                            <label className="from-col-address"> Hva er grunnen til at det søkes om plass på sykehjem? </label>
                        </Col>
                        <Col sm={12} md={12}>
                            <FormGroup validationState={changes.touched && changes.error ? "error" : null}>
                            <FormControl componentClass="textarea" className="special-needs-textarea" id="mandatoryField"
                                         ref="conditionChanges" {...changes}/>
                                <FormControl.Feedback />
                                <Overlay id="invalidChangesOverlay" {...invalidChangesProps} placement="bottom">
                                    { invalidChangesTooltip }
                                </Overlay>
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row className="form-row-special">
                        <Col sm={12} md={12}>
                            <label className="from-col-address"> Er det noen medisinske behov vi burde vite om?</label>
                        </Col>
                        <Col sm={12} md={12}>
                            <FormControl componentClass="textarea" className="special-needs-textarea"
                                         ref="medicalNeeds" {...medical}/>
                        </Col>
                    </Row>
                    <Row className="form-row-special">
                        <Col sm={12} md={12}>
                            <label className="from-col-address">Er det andre behov vi burde vite om? (Behov for tolk,
                                hørselapparat e.l) </label>
                        </Col>
                        <Col sm={12} md={12}>
                            <FormControl componentClass="textarea" className="special-needs-textarea"
                                         ref="otherNeeds" {...other}/>
                        </Col>
                    </Row>
                </div>
                
                <NavigationButtons
                    disabled={!valid}
                    handleClickBack={this.handleClickBack}
                    handleClickNext={this.handleClickNext}
                />

            </div>
        );
    }
}
SpecialNeedsClass.propTypes = {
    previousStep: React.PropTypes.func.isRequired,
    nextStep:  React.PropTypes.func.isRequired,
    saveValues:  React.PropTypes.func.isRequired,
};


//Validation for form
const validate = values => {
    const errors = {};

    if (fieldIsEmpty(values.changes)) {
        errors.changes = "Dette feltet må fylles ut. ";
    }
    return errors;
};

const SpecialNeeds = reduxForm({
    form: 'application',
    fields: ["medical", "changes", "other"],
    destroyOnUnmount: false,
    validate

}, null, null)(SpecialNeedsClass);

export default SpecialNeeds