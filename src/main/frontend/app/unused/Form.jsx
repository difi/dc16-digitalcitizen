import TextField from '../TextField.jsx';
import TypeAhead from '../AutoComplete.jsx';
import React from 'react';
<<<<<<< HEAD:src/main/frontend/app/Form.jsx
import DropdownList from './DropdownList.jsx';
import AddressField from './AddressField.jsx';
import dropdownContent from './dropdown-list-content.js';
//import RadioButtonList from './RadioButtonRelations.jsx';
import TextArea from './TextArea.jsx';
=======
import DropdownList from '../DropdownList.jsx';
import AddressField from '../AddressField.jsx';
import dropdownContent from '../dropdown-list-content.js';
import TextArea from '../TextArea.jsx'; 
>>>>>>> refs/remotes/origin/citizen_0.2:src/main/frontend/app/unused/Form.jsx

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
<<<<<<< HEAD:src/main/frontend/app/Form.jsx
                        return (
                            <Row className="form-row">
                                <Col sm={1.5} md={1}>
                                    <label>{field.name}: </label>
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
                    else if(field.type=="AutoComplete"){

                        return(
                            <Row className="form-row">
                                <Col sm={1.5} md={1}>
                                    <label>{field.name}: </label>
                                </Col>
                                <TypeAhead key={i} array={field.data} placeholder="Skriv inn søkers fastlege"/>
                                <Col sm={3} md={3}>
                                </Col>
                            </Row>);
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
                    else if(field.type=="AutoComplete"){

                        return(
                        <Row className="form-row">
                            <Col sm={1.5} md={1}>
                                <label>{field.name} </label>
                            </Col>
                            <TypeAhead key={i} array={field.data} placeholder="Skriv inn søkers fastlege"/>
                            <Col sm={3} md={3}>
                            </Col>
                        </Row>);
>>>>>>> refs/remotes/origin/citizen_0.2:src/main/frontend/app/unused/Form.jsx
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
                    else if (field.type=="RadioButton"){
                        return(
                            <Row className="form-group">
                                <Col sm={2} md={1}>
                                    <label>{field.name}: </label>
                                </Col>

                            </Row>
                        );
                    }
                        //Text box
                    else if (field.type =="TextArea"){
                        return (
                            <Row className="form-row">
                                <Col sm={2} md={2}>
                                    <label>{field.name} </label>
                                </Col>
                                <TextArea key={i} text={field.name}/>
<<<<<<< HEAD:src/main/frontend/app/Form.jsx
=======
                                <Col sm={3} md={3}>
                                </Col>
>>>>>>> refs/remotes/origin/citizen_0.2:src/main/frontend/app/unused/Form.jsx
                            </Row>
                        );
                    }

                })}
            </compontentClass>
        );
    }
}