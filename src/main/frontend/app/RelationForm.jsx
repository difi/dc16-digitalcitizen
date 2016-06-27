import React from 'react';
import DropdownList from './DropdownList.jsx';
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Radio = require('react-bootstrap/lib/Radio');
var Checkbox = require('react-bootstrap/lib/Checkbox');
var RadioGroup = require('react-radio-group');



export default class RelationForm extends React.Component{
    constructor() {
        super();
        this.handleChange=this.handleChange.bind(this);
        this.state = {
            value: null,
            verger: null
        }
    }


    handleChange(r){


        this.setState({
            value: r
        });

    }
    render() {
        var content = <p/>;
        if(this.state.value=="guardian"){
            content = <div><p>Navnet på den du er verge for</p><DropdownList id="1" options={[{name: "Ola"}, {name: "Kari"}]} labelField="name" valueField="name"/></div>
        }
        else if(this.state.value=="family"){
                content = <div><DropdownList id="1" options={[{name: "Søsken"}, {name: "Barn"}]} labelField="name" valueField="name"/>
                    <Checkbox>
                    Registrer meg som pårørende
                </Checkbox>
                </div>
            }
        else if(this.state.value=="other"){
            content =  <Checkbox>
                Registrer meg som pårørende
            </Checkbox>


        }

        return(
            <div>
            <RadioGroup name="relation" selectedValue={this.state.value} onChange={this.handleChange}>
                {Radio => (
                    <div>
                        <Radio value="guardian" />Jeg er verge for den jeg søker
                        <br/>
                        <Radio value="family" />Jeg er i familie med den jeg søker for
                            <br/>
                        <Radio value="other" />Annet
                    </div>
                    )}
            </RadioGroup>
                <br></br>
                {content}

                </div>




        )
    }
}