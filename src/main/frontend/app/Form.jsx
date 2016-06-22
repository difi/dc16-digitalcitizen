import TextField from './TextField.jsx';
import TypeAhead from './AutoComplete.jsx';
import React from 'react';
import DropdownList from './DropdownList.jsx';
import dropdownContent from './dropdown-list-content.js';

var Row = require('react-bootstrap/lib/Row')


export class Form extends React.Component {

    render() {
        return (
            <div>
                <h3>{this.props.name}</h3>
                {this.props.data.map(function (field, i) {
                    if (field.type == "TextField") {
                        return (
                            <Row>
                                <label>{field.name}: </label>
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
                        <Row>
                            <label>{field.name}: </label>
                            <DropdownList id='dropdown-list'
                                          options={options}
                                          labelField={label}
                                          value={defaultValue}
                                          valueField={value}/>
                        </Row>
                    )}
                    else if(field.type=="AutoComplete"){

                        return(
                        <div>
                            <p>Fastlege</p>
                            <TypeAhead key={i} array={field.data} placeholder="Skriv inn søkers fastlege"/>
                            </div>);
                    }

                })}
            </div>
        );
    }
}
