import React from 'react';
import NavigationButtons from './Components/NavigationButtons.js';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
import {reduxForm} from 'redux-form';
import TypeAhead from '../../node_modules/react-bootstrap-typeahead/lib/Typeahead.react.js';
import DropdownList from './Components/DropdownList.js';
import dropdownContent from '../static_data/dropdown-list-content.js';
import $ from 'jquery'
import RESTpaths from '../static_data/RESTpaths.js';

var inputChangeRun = 0;

export class LocationPageClass extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.findMunicipality = this.findMunicipality.bind(this);
        this.municipalityChange = this.municipalityChange.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
        this.saveFieldValues = this.saveFieldValues.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.findMunicipality(this.props.fields.municipality.value);

    }

    findMunicipality(mun) {
        //If you have not yet chosen a value here - have your own municipality as default
        if (!this.props.fields.municipalityApp.value) {
            this.onInputChangeHandler(mun);
        }
    }

    //Handle the click on the back-button
    handleClickBack() {
        //If you are applying for yourself, the previous step is step 8 - Special Needs Page
        this.saveFieldValues();
        this.props.previousStep(8);
    }

    saveFieldValues() {
        //Checks if value exists - otherwise null to avoid null error
        var mun = this.props.fields.municipalityApp.value ? this.props.fields.municipalityApp.value : null;
        var data = {
            nursingHome: {
                municipality: mun,
                name: this.props.fields.homeApp.value
            }
        };
        return this.props.saveValues(data);
    }

    //Handle the click on the next-button
    handleClickNext() {
        //Submit here?
        this.saveFieldValues();
        console.log("State 10");
        //The next step is step 7 - SpecialNeeds
        this.props.nextStep(10);
    }

    municipalityChange(value) {
        $.ajax({
            url: RESTpaths.PATHS.HOME_BASE + '?mun=' + value,
            dataType: 'json',
            cache: false,
            success: function (data) {
                data = data.map(data => {
                    return {muni: data.num + ":" + data.municipality, name: data.name}
                });
                data.unshift({muni: 0, name: "Velg..."});
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
        this.props.fields.municipalityApp.onChange("" + event);
        if(this.validateMun(event)){
            this.municipalityChange(event);
        }
    }

    onChangeHandler(event){
        if (inputChangeRun == 1){
            this.props.fields.municipalityApp.onChange("" + event);
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

    render() {
        const {fields: {municipalityApp, homeApp, homeOptions}} = this.props;
        var valid = this.validateMun(municipalityApp.value);
        var homes = null;
        if (valid && homeOptions.value) {
            homes = <Row className="form-row">
                <Col sm={6} md={6}>
                    <label className="home">Hvilket sykehjem ønskes som 1. prioritet?</label>
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
                <label className="form-header">Hvor ønskes det plass? </label>
                <div className="form-container">
                    <form className="location">
                        <Row className="form-row">
                            <Col sm={6} md={6}>
                                <label className="municipality">I hvilken kommune ønskes plassen? </label>
                            </Col>
                            <Col sm={6} md={6}>
                                <TypeAhead options={dropdownContent.MUNICIPALITIES}
                                           ref="munSelect"
                                           className="municipTypeAhead"
                                           labelKey="name"
                                           selected={municipalityApp.value? [{name: municipalityApp.value}]: []}
                                           onInputChange={this.onInputChangeHandler}
                                           onChange={this.onChangeHandler}/>
                            </Col>
                        </Row>
                        {homes}
                    </form>
                </div>
                <NavigationButtons
                    disabled={!valid}
                    handleClickBack={this.handleClickBack}
                    handleClickNext={this.handleClickNext}
                    isSubmit={true}
                    saveUserData={this.props.saveUserData}
                    
                    saveFieldValues={this.saveFieldValues}/>
            </componentClass>
        )
    }
}
LocationPageClass.propTypes = {

    previousStep: React.PropTypes.func.isRequired,
    nextStep: React.PropTypes.func.isRequired,
    saveValues: React.PropTypes.func.isRequired
};

const LocationPage = reduxForm({
    form: 'application',
    fields: ["municipalityApp", "homeApp", "homeOptions", "municipality"],
    destroyOnUnmount: false
})(LocationPageClass);


export default LocationPage

//onChange={value=>this.municipalityChange(value[0].name)}