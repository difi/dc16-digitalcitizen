import TextField from './TextField.jsx';
import React from 'react';
import Dropdown from './Dropdown.jsx';
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
                                <TextField key={i} text={field.name}/>
                            </div>
                        );
                    }
                    else if (field.type == "DropDown") {
                        return (<div>
                                <Dropdown id='dropdown-menu'
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
