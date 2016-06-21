import TextField from './TextField.jsx';
import React from 'react';

export class Form extends React.Component{
    render() {
        return (
<<<<<<< HEAD
            <form>
                <h1>{this.props.name}</h1>
=======
            <div>
                <h2>{this.props.name}</h2>
>>>>>>> refs/remotes/origin/master
                {this.props.data.map(function(field, i){
                    if(field.type=="TextField"){
                    return (
                        <div>
                            <TextField key={i} text={field.name}/>
                        </div>
                    );
                    }
                    /*else if (field.type=="RadioButton"){
                    return (<div>
                                <RadioButton key={i} /> {field.name}
                            </div>
                    );
                    }*/

                })}
                <h3>{this.props.name}</h3>

            </form>
        );
    }
};