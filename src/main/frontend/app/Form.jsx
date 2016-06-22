import TextField from './TextField.jsx';
import React from 'react';
import DropdownList from './DropdownList.jsx';
import dropdownContent from './dropdown-list-content.js';
import Button from 'react-bootstrap/lib/Button';

export class Form extends React.Component {

    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                {this.props.data.map(function (field, i) {
                    if (field.type == "TextField") {
                        return (
                            <div>
                                <label>{field.name}: </label> <br />
                                <TextField key={i} text={field.name}/>
                            </div>
                        );
                    }
                    else if (field.type == "Dropdown") {
                        var options = [], label, value;
                        switch (field.name) {
                            case "Nasjonalitet":
                                options = dropdownContent.NATIONAL;
                                label = 'country';
                                value = 'code';
                                break;
                            case "Familie":
                                options = dropdownContent.RELATIONS;
                                label = 'relation';
                                value = 'value';
                                break;
                        }
                    }
                    return (<div>
                            <label>{field.name}: </label>
                            <DropdownList id='dropdown-list'
                                          options={options}
                                          labelField={label}
                                          value='NO'
                                          valueField={value}/>
                            <Button>Helo</Button>
                        </div>
                    );

                })}
            </div>
        );
    }
}
