/**
 * Created by camp-cha on 24.06.2016.
 */
import React from 'react';
import {reduxForm} from 'redux-form';
import {getValues} from 'redux-form';
import $ from 'jquery'

import RESTpaths from '../static_data/RESTpaths.js';
import NavigationButtons from './Components/NavigationButtons.js';

var ReactDOM = require('react-dom');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var FormControl = require('react-bootstrap/lib/FormControl');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var HelpBlock = require('react-bootstrap/lib/HelpBlock');
var Button = require('react-bootstrap/lib/Button');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');
var Overlay = require('react-bootstrap/lib/Overlay');
var Popover = require('react-bootstrap/lib/Popover');
var Collapse = require('react-bootstrap/lib/Collapse');
var Alert = require('react-bootstrap/lib/Alert');

var checked = false;


import {checkPersonalnumberNo} from'./Utilities/validation.js';


export class PersonWithNeedClass extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.savePerson = this.savePerson.bind(this);
  
    }


    handleClickBack() {

        console.log("State 2");
        (this.props.previousStep(2));
    }

    handleClickNext() {
        //Saves value from ajax call to person if PNR is known, otherwise saves inputted field values. 
        if (!this.props.fields.checked.value) {
            this.savePerson()
        } 


        if (this.props.fields.checked.value) {
            console.log("State 4");
            (this.props.nextStep(4));
        } else {
            console.log("State 6");
            (this.props.nextStep(6));

        }
    }



    savePerson() {
        var pnr = this.props.fields.pnr.value;
        
        $.ajax({
            url: RESTpaths.PATHS.DEPENDENT_BASE + '?pnr=' + pnr,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.props.fields.municipality.onChange(data.address.municipality);


            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }


    render() {

        //Add fields from redux form to component so they can be connected

        const {asyncValidating, fields: {pnr, checked, name}} = this.props;

        const invalidPnrTooltip = <Popover id="invalidPnrPopover">{pnr.error}</Popover>;
        const invalidPnrProps = {
            show: pnr.touched && pnr.error != undefined,
            container: this,
            target: () => ReactDOM.findDOMNode(this.refs.pno)
        };

        var valid = (name.value && pnr.value && !pnr.error && !name.error && asyncValidating != 'name') || (name.value && checked.value);
        if (checked.value) {
            return (
                <form>
                    <componentClass>
                        <label className="form-header">Informasjon om søker</label>
                        <div className="form-container">
                            <Row className="formgroup-row">
                                <Col sx={4} md={4}>
                                    <label>Navn</label>
                                </Col>
                                <Col sx={8} md={8}>
                                    <FormGroup>
                                        <FormControl
                                            type="text"
                                            placeholder="Navn"
                                            ref="name"
                                            {...name}/>
                                    </FormGroup>
                                </Col>
                                <Col sm={0} md={5}></Col>
                            </Row>
                            <Row className="form-row">
                                <Col sxOffset={4} mdOffset={4} sx={8} md={8}>
                                    <input type="checkbox" name="noPno" className="pnrCheck"
                                           style={{marginBottom: '15px'}}
                                           checked={checked.value} onChange={value=>checked.onChange(value)}/> Jeg kan
                                    ikke
                                    fødselsnummeret
                                </Col>
                            </Row>
                            <Row className="formgroup-row">
                                <Col sx={4} md={4}>
                                    <label>Fødselsnummer</label>
                                </Col>
                                <Col sx={8} md={8}>
                                    <FormGroup>
                                        <FormControl
                                            type="text"
                                            placeholder="Fødselsnummer"
                                            ref="pno"

                                            //value={this.state.pnr}
                                            //onChange={this.handlePNRChange}
                                            //{...pnr} Removing this resets the text field
                                            disabled/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>

                        <NavigationButtons
                            handleClickBack={this.handleClickBack}
                            handleClickNext={this.handleClickNext}
                            disabled={!valid}
                        />

                    </componentClass>
                </form>
            )
        }
        return (
            <form>
                <componentClass>
                    <label className="form-header">Informasjon om søker</label>
                    <div className="form-container">
                        <Row className="formgroup-row">
                            <Col sx={4} md={4}>
                                <label className="name">Navn</label>
                            </Col>
                            <Col sx={8} md={8}>
                                <FormGroup>
                                    <FormControl
                                        type="text"
                                        className="name"
                                        placeholder="Navn"
                                        ref="name"

                                        {...name}
                                        onChange={name.onBlur}
                                    />
                                    {asyncValidating === 'name'}
                                </FormGroup>
                            </Col>
                            <Col sm={0} md={5}></Col>
                        </Row>
                        <Row className="form-row">
                            <Col sxOffset={4} mdOffset={4} sx={8} md={8}>
                                <input type="checkbox" name="noPno" className="pnrCheck" style={{marginBottom: '15px'}}
                                       checked={checked.value} onChange={value=>checked.onChange(value)}/> Jeg kan ikke
                                fødselsnummeret
                            </Col>
                        </Row>

                        <Row className="formgroup-row">
                            <Col sx={4} md={4}>
                                <label className="fnr">Fødselsnummer</label>
                            </Col>
                            <Col sx={8} md={8}>
                                <FormGroup validationState={pnr.touched && pnr.error ? "error" : null}>
                                    <FormControl
                                        type="text"
                                        name="pno"
                                        className="fnr"
                                        placeholder="Fødselsnummer"
                                        ref="pno"
                                        //Connects field to redux form component//
                                        {...pnr}
                                    />
                                    {asyncValidating === 'pnr'}
                                    <FormControl.Feedback />
                                    <Overlay {...invalidPnrProps} placement="top">
                                        { invalidPnrTooltip }
                                    </Overlay>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                    <Collapse
                        in={name.touched && pnr.touched && name.error != undefined || pnr.touched && pnr.error != undefined}>
                        <div>
                            <Alert bsStyle="danger">
                                Fødselsnummer og navn matcher ikke.
                            </Alert>
                        </div>
                    </Collapse>

                    <NavigationButtons
                        handleClickBack={this.handleClickBack}
                        handleClickNext={this.handleClickNext}
                        disabled={!valid}
                    />
                </componentClass>
            </form >
        )
    }
}

PersonWithNeedClass.propTypes = {
    asyncValidating: React.PropTypes.string.isRequired,
    previousStep: React.PropTypes.func.isRequired,
    nextStep: React.PropTypes.func.isRequired,
};

//Validation for form
const validate = values => {
    const errors = {};

    if (!(checkPersonalnumberNo(values.pnr))) {
        errors.pnr = "Dette er ikke et gyldig fødselsnummer";
    }
    return errors;
};

const asyncValidate = (values) => {
    return new Promise((resolve, reject) => {

        // Checks if pnr and name match if a full-length pnr is typed
        if (values.pnr.length > 10) {
            $.ajax({
                url: RESTpaths.PATHS.PERSON_BASE + '?pnr=' + values.pnr + '&name=' + values.name,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    //console.log(data);
                    if (data == true) {
                        resolve()
                    } else {
                        reject({name: "Fødselsnummer og navn matcher ikke."});
                    }
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error("url", status, err.toString());
                }.bind(this)
            });
        } else {
            reject({name: "Fødselsnummer og navn matcher ikke."});
        }
    })
};


//Sets up reduxForm - needs fields and validation functions
const PersonWithNeed = reduxForm({
    form: 'application',
    fields: ["pnr", "name", "checked", "municipality"],
    asyncValidate,
    asyncBlurFields: ['name', 'pnr'],
    destroyOnUnmount: false,
    validate
})(PersonWithNeedClass);

export default PersonWithNeed
