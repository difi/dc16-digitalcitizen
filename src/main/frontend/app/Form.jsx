import TextField from './TextField.jsx';
import React from 'react';

export class Form extends React.Component{

    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                {this.props.data.map(function(field, i){
                    return (<TextField key={i} text={field.name}/>);
                })}
            </div>
        );
    }
};