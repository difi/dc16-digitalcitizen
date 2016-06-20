import TextField from './TextField.jsx';
import DropDown from './DropDown.jsx';
import React from 'react';

export class Form extends React.Component{
    render() {
        return (
            <form action="">
                <h2>{this.props.name}</h2>
                {this.props.data.map(function(field, i){
                    if(field.type=="TextField"){
                        return (
                            <div>
                                <h2>{this.props.name}</h2>
                                <TextField key={i} text={field.name}/>
                            </div>
                        );
                    }
                    else if (field.type=="DropDown") {
                        return (<div>
                                <h2>{this.props.name}</h2>
                                <DropDown key={i}/> {field.name}
                            </div>
                        );
                    }

                })}
            </form>
        );
    }
};