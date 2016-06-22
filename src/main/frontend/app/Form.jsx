import TextField from './TextField.jsx';
import React from 'react';
import DropdownList from './DropdownList.jsx';
import dropdownContent from './dropdown-list-content.js';

export class Form extends React.Component {

    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                {this.props.data.map(function (field, i) {
                    if (field.type == "TextField") {
                        return (
                            <div>
                                <label>{field.name}: </label>
                                <TextField key={i} text={field.name}/>
                            </div>
                        );
                    }
                    else if (field.type == "Dropdown") {
                        var options = [], label, value;
                        switch (field.name){
                            case "Nasjonalitet":
                                options = dropdownContent.NATIONAL;
                                label = 'country';
                                value = 'code';
                                break;
                            case "Relasjon":
                                options = dropdownContent.RELATIONS;
                                label = 'relation';
                                value = 'value';
                                break;
                        }
                        return (<div>
                                <label>{field.name}: </label>
                                <DropdownList id='dropdown-list'
                                          options={options}
                                          labelField={label}
                                          valueField={value}/>
                            </div>
                        );
                    }
                    
                })}
            </div>
        );
    }
}
