import React from 'react';
import {reduxForm} from 'redux-form';
import $ from 'jquery'

import RESTpaths from '../static_data/RESTpaths.js';
import NavigationButtons from './Components/NavigationButtons.js';
import TypeAhead from '../../node_modules/react-bootstrap-typeahead/lib/Typeahead.react.js';
import DropdownList from './Components/DropdownList.js';
import dropdownContent from '../static_data/dropdown-list-content.js';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Alert = require('react-bootstrap/lib/Alert');

var inputChangeRun = 0;
var alertContent = null;
var clickNextButton = false;
export var alertMessage = false;
export const fields = [
    "municipalityApp",
    "homeApp",
    "homeOptions",
    "municipality"
];

export class LocationPageClass extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.findMunicipality = this.findMunicipality.bind(this);
        this.municipalityChange = this.municipalityChange.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
  
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.findMunicipality(this.props.fields.municipality.value);
    }

    /**
     * @param mun
     * If user have not yet chosen a value here, the user's municipality is set as default 
     */
    findMunicipality(mun) {
        if (!this.props.fields.municipalityApp.value) {
            this.onInputChangeHandler(mun);
        }
    }
    
    /**
     * Handle the click on the back-button
     * If you are applying for yourself, the previous step is step 8 - Special Needs Page
     */
    handleClickBack() {
        this.props.previousStep(8);
    }
    
    /**
     * Handle the click on the next-button
     */
    handleClickNext() {
        const {fields: {municipalityApp, homeApp, homeOptions}} = this.props;
        var valid = this.validateMun(municipalityApp.value);

        if ((valid == undefined || !valid)) {
            clickNextButton = true;
            this.forceUpdate();

        } else {
            //Submit here?
            console.log("State 10");
            this.props.nextStep(10);
        }
    }

    /**
     * @param value 
     * Adds placeholder at first index in list 
     * When switching municipality, update home values from server. 
     */
    municipalityChange(value) {
        $.ajax({
            url: RESTpaths.PATHS.HOME_BASE + '?mun=' + value,
            dataType: 'json',
            cache: false,
            success: function (data) {
                data = data.map(data => {
                    return {muni: data.num + ":" + data.municipality, name: data.name}
                });
                data.unshift({muni: 0, name: "Har ikke ønske"});
                this.props.fields.municipalityApp.onChange(value);
                this.props.fields.homeOptions.onChange(data);
                this.forceUpdate();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    onInputChangeHandler(event){
        inputChangeRun+=1;
        this.props.fields.municipalityApp.onChange(event);
        if(this.validateMun(event)){
            this.municipalityChange(event);
        }
    }

    onChangeHandler(event){
        if (inputChangeRun == 1){
            this.props.fields.municipalityApp.onChange(event);
        }
    }

    validateMun(val){
        for (var i = 0; i < dropdownContent.MUNICIPALITIES.length; ++i) {
            var mun = dropdownContent.MUNICIPALITIES[i];
            if(mun.name == val){
                return true;
            }
        }
        return false;
    }

    /**
     * Handles change of municipality 
     * @returns the view of LocationPage
     */
    render() {
        const {fields: {municipalityApp, homeApp, homeOptions}} = this.props;
        var valid = this.validateMun(municipalityApp.value);
        var homes = null;

        if (clickNextButton && (valid == undefined || !valid)) {

            var errorMessage = <p>Vennligst informer om <b><i>hvilken kommune plassen  i</i></b>, før du går videre.</p>

            alertContent =
                <componentClass>
                    <div className="alertClass_Fdfs">
                        <Alert bsStyle="danger">
                            {errorMessage}
                        </Alert>
                    </div>
                </componentClass>;
            clickNextButton = false;
            alertMessage = true;
        } else {
            if (valid) {
                alertContent = null;
                alertMessage = false;
            }
        }

        //To prevent error on first render, calls this function to create homeOptions field
        if (valid && homeOptions.value) {
            homes = <Row className="form-row">
                <Col sm={6} md={6}>
                    <label htmlFor="homes" className="home">Hvilket sykehjem ønskes som 1. prioritet?</label>
                </Col>
                <Col sm={6} md={6}>
                    <DropdownList
                        id='homes'
                        options={homeOptions.value}
                        labelField='name'
                        valueField='name'
                        {...homeApp}
                        onChange={change=>homeApp.onChange(change.newValue)}/>
                </Col>
            </Row>;
        }
        return (
            <componentClass>
                <label htmlFor="locForm" className="form-header">Hvor ønskes det plass? </label>
                <div className="form-container">
                    <form id="locForm" className="location">
                        <Row className="form-row">
                            <Col sm={6} md={6}>
                                <label htmlFor="municip" className="municipality" id="mun">I hvilken kommune ønskes plassen?</label>
                            </Col>
                            <Col sm={6} md={6}>
                                <FormGroup id="municip" validationState={(municipalityApp.touched || alertMessage) ? "error" : ""}>
                                <TypeAhead options={dropdownContent.MUNICIPALITIES}
                                           ref="munSelect"
                                           className="municipTypeAhead"
                                           labelKey="name"
                                           selected={municipalityApp.value? [{name: municipalityApp.value}]: []}
                                           aria-labelledby="mun"
                                           onInputChange={this.onInputChangeHandler}
                                           onChange={this.onChangeHandler}/>
                                    </FormGroup>
                            </Col>
                        </Row>
                        {homes}
                    </form>
                    {alertContent}
                </div>
                <NavigationButtons
                    buttonDisabled={!valid}
                    handleClickBack={this.handleClickBack}
                    handleClickNext={this.handleClickNext}
                    isSubmit={true}
                    saveUserData={this.props.saveUserData}
                    newFieldValues = {this.props.newFieldValues}/>
            </componentClass>
        )
    }
}
LocationPageClass.propTypes = {
    previousStep: React.PropTypes.func.isRequired,
    nextStep: React.PropTypes.func.isRequired
};

const LocationPage = reduxForm({
    form: 'application',
    fields: fields,
    destroyOnUnmount: false
})(LocationPageClass);

export default LocationPage

//onChange={value=>this.municipalityChange(value[0].name)}