import TextField from './TextField.jsx';
import TypeAhead from './AutoComplete.jsx';
import React from 'react';
import DropdownList from './DropdownList.jsx';
import AddressField from './AddressField.jsx';
import dropdownContent from './dropdown-list-content.js';
<<<<<<< HEAD
//import RadioButtons from './RadioButtonRelations.jsx';
=======
import TextArea from './TextArea.jsx'; 
>>>>>>> refs/remotes/origin/citizen_0.2

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');


export class Form extends React.Component {

    render() {
        return (
            <compontentClass>
                <h3>{this.props.name}</h3>
                {this.props.data.map(function (field, i) {
                    if (field.type == "TextField") {
                        return (
                            <Row className="form-row">
                                <Col sm={1.5} md={1}>
                                    <label>{field.name} </label>
                                </Col>
                                    <TextField key={i} text={field.name}/>
                                <Col sm={3} md={3}>
                                </Col>
                            </Row>
                        );
                    }
                    else if (field.type == "Dropdown") {
                        var options = [], label, value, defaultValue;
                        switch (field.name) {
                            case "Nasjonalitet":
                                options = dropdownContent.NATIONAL;
                                label = 'country';
                                value = 'code';
                                defaultValue = 'NO';
                                break;
                            case "Relasjon":
                                options = dropdownContent.RELATIONS;
                                label = 'relation';
                                value = 'value';
                                break;
                            case "Sivilstatus":
                                options = dropdownContent.CIVILSTATUS;
                                label = 'status';
                                value = 'value';
                                break;
                        }
<<<<<<< HEAD
                        return (
                            <Row><Col sm={2}>
                                    <label>{field.name}: </label>
                                </Col>
                                <Col sm={6}>
                                    <DropdownList id='dropdown-list'
                                              options={options}
                                              labelField={label}
                                              value={defaultValue}
                                              valueField={value}/>
                                </Col>
                            </Row>
                        );
                    }
=======
                    return (
                        <Row className="form-row">
                            <Col sm={1.5} md={1}>
                                <label>{field.name} </label>
                            </Col>
                            <Col sm={7.5} md={8}>
                                <DropdownList id='dropdown-list'
                                          options={options}
                                          labelField={label}
                                          value={defaultValue}
                                          valueField={value}/>
                            </Col>
                        </Row>
                    )}
>>>>>>> refs/remotes/origin/citizen_0.2
                    else if(field.type=="AutoComplete"){

                        return(
                        <Row className="form-row">
                            <Col sm={1.5} md={1}>
                                <label>{field.name} </label>
                            </Col>
                            <TypeAhead key={i} array={field.data} placeholder="Skriv inn søkers fastlege"/>
<<<<<<< HEAD
                            </div>
                        );
                    }
                    else if (field.type == "RadioButton") {
                        return (
                            <div>
                                <label>{field.name}:</label>
                                <RadioButtons/>
                            </div>
=======
                            <Col sm={3} md={3}>
                            </Col>
                        </Row>);
                    }
                    else if (field.type == "AddressField") {
                        return (
                            <Row className="form-row">
                                <Col sm={1.5} md={1}>
                                    <label>{field.name} </label>
                                </Col>
                                <AddressField includeCountry={field.includeCountry}/>
                                <Col sm={3} md={3}>
                                </Col>
                            </Row>
                        )
                    }
                    else if (field.type =="TextArea"){
                        return (
                            <Row className="form-row">
                                <Col sm={2} md={2}>
                                    <label>{field.name} </label>
                                </Col>
                                <TextArea key={i} text={field.name}/>
                                <Col sm={3} md={3}>
                                </Col>
                            </Row>
>>>>>>> refs/remotes/origin/citizen_0.2
                        );
                    }
                })}
            </compontentClass>
        );
    }
}
