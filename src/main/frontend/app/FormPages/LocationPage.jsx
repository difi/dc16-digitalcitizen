import React from 'react';
import NavigationButtons from './Components/NavigationButtons.jsx';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
import {reduxForm} from 'redux-form';
import TypeAhead from '../../node_modules/react-bootstrap-typeahead/lib/Typeahead.react.js';
import DropdownList from './Components/DropdownList.jsx';
import dropdownContent from '../static_data/dropdown-list-content.js';


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

        };
        this.props.saveValues(data);
        console.log(data);
    }

    //Handle the click on the next-button
    handleClickNext() {
        //Submit here?
        this.saveFieldValues();
        console.log("State 10");
        //The next step is step 7 - SpecialNeeds
        this.props.nextStep(10);
    }
    municipalityChange(event){
        this.props.fields.municipalityApp.onChange(event.target.value);
        $.ajax({
            url: RESTpaths.PATHS.DOCTORS_BASE + '?mun=' + event.target.value,
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
        var homes = null;
        if(municipalityApp.value){
             homes =   <DropdownList
                    id='homes'
                    options={this.state.homeOptions}
                    labelField='name'
                    valueField='name'
                    {...homeApp}/>;
        }
        var valid ;
        return (
            <componentClass>
                <label className="form-header">Hvilken kommune ønsker du å søke deg deg til? </label>

                <div className="form-container">
                    <form className="location">
                        <TypeAhead options={dropdownContent.MUNICIPALITIES}
                                   ref="munSelect"
                                   labelKey="name"
                                   selected={municipalityApp.value? [{name: municipalityApp.value}]: []}
                                   onInputChange={this.municipalityChange}/>
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


const LocationPage = reduxForm({
    form: 'application',
    fields: ["municipalityApp", "homeApp"],
    destroyOnUnmount: false
})(LocationPageClass);


export default LocationPage