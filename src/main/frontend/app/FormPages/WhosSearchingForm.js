/*Created by camp-cha on 24.06.2016.*/

import React from 'react';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');
import $ from 'jquery'
import RESTpaths from '../static_data/RESTpaths.js';

import {reduxForm} from 'redux-form';

export const fields = [
    'municipality',
    'applyingForSelf',
    'pnr',
    'dependent'
];

export class WhosSearchingClass extends React.Component {

    constructor() {
        super();
        this.handleClickMe = this.handleClickMe.bind(this);
        this.handleClickOther = this.handleClickOther.bind(this);
    }

    saveFieldValues(){

            //First sends dependent to fieldValues as it is needed in dependent Form. NB: Should be refactored.
            this.props.fields.pnr.onChange(this.props.userData.pnr);
            $.ajax({
                url: RESTpaths.PATHS.MUNICIPALITY_BASE + '?pnr=' + this.props.userData.pnr,
                dataType: 'text',
                cache: false,
                success: function (data) {

                    this.props.fields.municipality.onChange(data);

                }.bind(this),
                error: function (xhr, status, err) {
                    console.error("municipality error", status, err.toString());
                }.bind(this)
            })
    }

    handleClickMe() {
        console.log("State 6");
        this.props.fields.applyingForSelf.onChange(true);
        if(this.props.fields.dependent.value){
        this.props.resetDep();
        this.props.fields.dependent.onChange(false);}
        this.saveFieldValues();
        this.props.nextStep(6)
    }

    handleClickOther() {
        console.log("State 2");
        this.props.fields.applyingForSelf.onChange(false);
        this.props.nextStep(2);
    }

    render() {
        return (
            <componentClass>
                <label htmlFor="container" className="form-header">Søker du sykehjemsplass for deg selv?</label>
                <div className="form-container" id="container">
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
}

WhosSearchingClass.propTypes = {
    nextStep:  React.PropTypes.func.isRequired,
};

const WhosSearching = reduxForm({
    form: 'application',
    fields: fields,
        destroyOnUnmount: false,
})(WhosSearchingClass);

export default WhosSearching
