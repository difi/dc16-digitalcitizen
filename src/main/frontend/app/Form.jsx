import TextField from './TextField.jsx';
import React from 'react';
import DropdownList from './DropdownList.jsx';
import countries from './nationalities.js';

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
                    else if (field.type == "DropDown") {
                        return (<div>
                                <label>{field.name}: </label>
                                <DropdownList id='dropdown-list'
                                          options={countries.NATIONAL}
                                          labelField='country'
                                          valueField='country'/>
                            </div>
                        );
                    }

                })}
            </div>
        );
    }
}
