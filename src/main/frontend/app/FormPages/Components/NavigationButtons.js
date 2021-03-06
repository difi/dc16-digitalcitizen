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
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
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
        //Right button may be disabled, submit button instead of next and loading while sending to server. 
        if (!this.state.isSubmit) {
            var nextBtnIsLoading = this.props.nextBtnIsLoading;
            if (this.props.buttonDisabled) {
                rightButton =
                    <Button
                        className="disabledButton-nxt"
                        onClick={this.props.handleClickNext}
                        bsStyle="success"
                        ref="nextBtn">
                        Neste &rarr;
                    </Button>
            }
            else {
                rightButton =
                    <Button
                        className="next-btn"
                        onClick={!nextBtnIsLoading ? this.props.handleClickNext : null}
                        bsStyle="success"
                        ref="nextBtn">
                        {nextBtnIsLoading ? 'Venter...' : 'Neste \u2192'}
                    </Button>
            }
        }
        else {
            if (this.props.buttonDisabled) {
                rightButton =
                    <Button
                        className="disabledButton-submit"
                        ref="submitButton"
                        bsStyle="primary"
                        onClick={this.handleSubmitClick}>
                        Send søknad
                    </Button>
            } else {
                rightButton =
                    <Button
                        className="next-btn"
                        ref="submitButton"
                        bsStyle="primary"
                        onClick={!isLoading ? this.handleSubmitClick : null}>
                        {isLoading ? 'Sender...' : 'Send søknad'}
                    </Button>
            }
        }

        return (
            <Row style={{marginTop: '15px'}}>
                <hr/>
                <Col xs={4} sm={4} md={4} lg={4}>
                    <Button
                        className="back-btn"
                        bsStyle="success"
                        onClick={this.props.handleClickBack}>&larr;
                        Tilbake</Button>
                </Col>
                <Col xs={4} sm={4} md={4} lg={4}  xsOffset={4} smOffset={4} mdOffset={4} lgOffset={4} style={{paddingRight: 0}}>
                    {rightButton}
                </Col>
            </Row>
        )
    }
}

