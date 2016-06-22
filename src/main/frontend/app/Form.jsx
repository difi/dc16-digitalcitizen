import TextField from './TextField.jsx';
import TypeAhead from './AutoComplete.jsx';
import React from 'react';
import DropdownList from './DropdownList.jsx';
import dropdownContent from './dropdown-list-content.js';
import RadioButtons from './RadioButtons2.jsx';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');


export class Form extends React.Component {

    render() {
        return (
            <div>
                <h3>{this.props.name}</h3>
                {this.props.data.map(function (field, i) {
                    if (field.type == "TextField") {
                        return (
                            <Row>
                                <Col sm={2}>
                                    <label>{field.name}: </label>
                                </Col>
                                    <TextField key={i} text={field.name}/>
                                
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
                    else if(field.type=="AutoComplete"){

                        return(
                        <div>
                            <p>Fastlege</p>
                            <TypeAhead key={i} array={field.data} placeholder="Skriv inn søkers fastlege"/>
                            </div>
                        );
                    }
                    else if (field.type == "RadioButton") {
                        return (
                            <div>
                                <label>{field.name}: </label>
                                <RadioButtons/>
                            </div>
                        );
                    }

                })}
            </div>
        );
    }
}
