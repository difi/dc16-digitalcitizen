import TextField from './TextField.jsx';
import TypeAhead from './AutoComplete.jsx';
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
                    else if(field.type=="AutoComplete"){

                        return(
                        <div>
                            <p>Fastlege</p>
                            <TypeAhead key={i} array={field.data} placeholder="Skriv inn søkers fastlege"/>
                            </div>);
                    }
                    /*else if (field.type=="RadioButton"){
                    return (<div>
                                <RadioButton key={i} /> {field.name}
                            </div>
                    );
                    }*/

                })}
            </div>
        );
    }
};