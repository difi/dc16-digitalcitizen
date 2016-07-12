import React from 'react';
import NavigationButtons from './Components/NavigationButtons.jsx';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
import {reduxForm} from 'redux-form';
import TypeAhead from '../../node_modules/react-bootstrap-typeahead/lib/Typeahead.react.js';
import DropdownList from './Components/DropdownList.jsx';
import dropdownContent from '../static_data/dropdown-list-content.js';
import $ from 'jquery'
import RESTpaths from '../static_data/RESTpaths.js';

export class LocationPageClass extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          homeOptions:  null
        };
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.findMunicipality = this.findMunicipality.bind(this);
        this.municipalityChange = this.municipalityChange.bind(this);
        this.saveFieldValues = this.saveFieldValues.bind(this);
        this.findMunicipality(this.props.fieldValues.person.address.municipality);

    }

    findMunicipality(mun){
        this.props.fields.municipalityApp.onChange(mun);
    }

    //Handle the click on the back-button
    handleClickBack() {
        //If you are applying for yourself, the previous step is step 8 - Special Needs Page
        this.saveFieldValues();
        this.props.previousStep(8);
    }

    saveFieldValues() {
        var data = {
            application: {
                municipality: this.props.fields.municipalityApp.value.name,
                home: this.props.fields.homeApp.value
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
    municipalityChange(value){

        this.props.fields.municipalityApp.onChange(value);
        $.ajax({
            url: RESTpaths.PATHS.HOME_BASE + '?mun=' + value.name,
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({
                    homeOptions: data
                });
                this.forceUpdate();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });



    }

    render() {
        const {fields: {municipalityApp, homeApp}} = this.props;
        var valid=true;
        var homes = null;
        if(this.state.homeOptions){
             homes =   <Row className="form-row">
             <Col sm={6} md={6}>
                 <label className="home">Hvilket sykehjem ønsker du å ha som 1. prioritet?</label>
             </Col>
             <Col sm={6} md={6}>
             <DropdownList
                    id='homes'
                    options={this.state.homeOptions}
                    labelField='name'
                    valueField='name'
                    {...homeApp}
                    onChange={change=>homeApp.onChange(change.newValue)}/>
                 </Col>
                 </Row>;
        }
        return (
            <componentClass>
                <label className="form-header">Hvor  ønsker du å søke deg deg til? </label>

                <div className="form-container">
                    <form className="location">
                        <Row className="form-row">
                            <Col sm={6} md={6}>
                                <label className="municipality">Hvilken kommune ønsker du å søke deg til</label>
                            </Col>
                            <Col sm={6} md={6}>
                        <TypeAhead options={dropdownContent.MUNICIPALITIES}
                                   ref="munSelect"
                                   labelKey="name"
                                   selected={municipalityApp.value? [{name: municipalityApp.value.name}]: []}
                                   onChange={value=>this.municipalityChange(value[0])}/>
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
                    fieldValues={this.props.fieldValues}
                    saveFieldValues={this.saveFieldValues}/>
            </componentClass>
        )
    }
}
LocationPageClass.propTypes = {
    fieldValues: React.PropTypes.object.isRequired,
    previousStep: React.PropTypes.func.isRequired,
    nextStep:  React.PropTypes.func.isRequired,
    saveValues:  React.PropTypes.func.isRequired,
};

const LocationPage = reduxForm({
    form: 'application',
    fields: ["municipalityApp", "homeApp"],
    destroyOnUnmount: false
})(LocationPageClass);


export default LocationPage