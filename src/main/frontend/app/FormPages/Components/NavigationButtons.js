import React from 'react';
import $ from 'jquery';
import RESTpaths from '../../static_data/RESTpaths.js';

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');




export default class NavigationButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isSubmit: this.props.isSubmit
        };
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleClickBack() {
        this.props.handleClickBack();
    }

    handleClickNext() {
        this.props.handleClickNext();
    }

    handleSubmitClick() {
        var field2 = this.props.newFieldValues();
        console.log("Logging new fieldValues");
        console.log(field2);
        this.setState({isLoading: true});
        $.ajax({
            url: RESTpaths.PATHS.SUBMIT,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: JSON.stringify(field2),
            dataType: 'text',
            success: function (data) {
                console.log(data);
                // TODO: Remove setTimeout. (Only used for testing)
                setTimeout(() => {

                    this.setState({isLoading: false});

                    var userData = {
                        submissionId: data
                    };
                    this.props.saveUserData(userData);

                    this.setState({isLoading: false});
                    this.props.handleClickNext();
                }, 1000);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        var isLoading = this.state.isLoading;
        var rightButton;

        if (!this.state.isSubmit) {
            if (this.props.buttonDisabled) {
                rightButton =
                    <Button
                        className="disabledButton"
                        onClick={this.handleClickNext}
                        ref="nextBtn">
                        Neste &rarr;
                    </Button>
            }
            else {
                rightButton =
                    <Button
                        className="next-btn"
                        onClick={this.handleClickNext}
                        bsStyle="success"
                        ref="nextBtn">
                        Neste &rarr;
                    </Button>
            }
        }
        else {
            rightButton =
                <Button
                    className="next-btn"
                    ref="submitButton"
                    bsStyle="primary"
                    disabled={this.props.disabled}
                    onClick={!isLoading ? this.handleSubmitClick : null}>
                    {isLoading ? 'Sender...' : 'Send søknad'}
                </Button>
        }


        return (
            <Row style={{marginTop: '15px'}}>
                <hr/>
                <Col xs={6} sm={6} md={6} lg={6}>
                    <Button className="back-btn" onClick={this.handleClickBack}>&larr;
                        Tilbake</Button>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                    {rightButton}
                </Col>
            </Row>
        )
    }
}

