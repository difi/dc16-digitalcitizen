import TextField from './TextField.jsx';
import RadioButton from './RadioButton.jsx';
import React from 'react';

export class Form extends React.Component{
    render() {
        return (
            <form action="">
                {this.props.data.map(function(field, i){
                    if(field.type=="TextField"){
                    return (
                        <div>
                            <h2>{this.props.name}</h2>
                            <TextField key={i} text={field.name}/>
                        </div>
                    );
                    }
                    /*else if (field.type=="RadioButton"){
                    return (<div>
                                <h2>{this.props.name}</h2>
                                <RadioButton key={i} /> {field.name}
                            </div>
                    );
                    }*/

                })}
            </form>
        );
    }
};