/**
 * Created by camp-cha on 24.06.2016.
 */

import React from 'react';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
import $ from 'jquery'
import RESTpaths from '../static_data/RESTpaths.js';


export default class WhosSearching extends React.Component {

    constructor() {
        super();
        this.handleClickMe = this.handleClickMe.bind(this);
        this.handleClickOther = this.handleClickOther.bind(this);
    }

    saveFieldValues(status){
        if(status){
            $.ajax({
                url: RESTpaths.PATHS.MUNICIPALITY_BASE + '?pnr=' + this.props.userData.pnr,
                dataType: 'text',
                cache: false,
                success: function (data) {
                
                    var dataVal = {

                        dependent: false,
                        applyingForSelf: true,
                        person: {
                            address: {
                                municipality: data,
                                country: "NO"

                            }
                        }
                    }
                this.props.saveValues(dataVal);
                }.bind(this),
                error: function (xhr, status, err) {
                console.error("municipality error", status, err.toString());
            }.bind(this)
        })}


        else{
        var data = {
            applyingForSelf: status};
            this.props.saveValues(data);
        }

        console.log(data);
    }

    nextStep(status, step) {
        this.saveFieldValues(status);
        this.props.nextStep(step);
    }
    
    handleClickMe() {
        console.log("State 6");
        this.nextStep(true, 6)
    }

    handleClickOther() {
        console.log("State 2");
        this.nextStep(false, 2);
    }

    render() {
        return (
            <componentClass>
                <label className="form-header">Søker du sykehjemsplass for deg selv?</label>
                <div className="form-container">
                    <Row>
                        <Col md={8} mdOffset={2}>
                            <Button onClick={this.handleClickMe} className="button-search" bsStyle="primary"
                                    bsSize="large" block>Ja, for meg selv</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} mdOffset={2}>
                            <Button onClick={this.handleClickOther} className="button-search" bsStyle="primary"
                                    bsSize="large" block>Nei, for noen andre</Button>
                        </Col>
                    </Row>
                </div>
            </componentClass>
        )
    }
};

WhosSearching.propTypes = {
    nextStep:  React.PropTypes.func.isRequired,
    saveValues:  React.PropTypes.func.isRequired,
};