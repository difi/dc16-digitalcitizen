import TextField from './TextField.jsx';
import React from 'react';

export class Form extends React.Component{
    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                {this.props.data.map(function(field, i){
                    if(field.type=="TextField"){
                    return (
                        <div>
                            <TextField key={i} text={field.name}/>
                        </div>
                    );
                    }
                })}
            </div>
        );
    }
};