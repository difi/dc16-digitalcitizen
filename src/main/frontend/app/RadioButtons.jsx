import React from 'react';

<<<<<<< HEAD
=======
var Row = require('react-bootstrap/lib/Row');

>>>>>>> refs/remotes/origin/master
class RadioButtonMe extends React.Component {
    render () {
        return (
            <Row className="form-row">
                <input type="radio" name="who" value="Me" {...this.props}/> Jeg søker sykehjemsplass for meg selv
            </Row>
        );
    }
}

/**
 * Create a radio button component.
 */
class RadioButtonOther extends React.Component {
    render () {
        return (
            <Row className="form-row">
                <input type="radio" name="who" value="Other" {...this.props}/> Jeg søker sykehjemsplass på vegne av noen andre
            </Row>
        );
    }
}

export default class RadioButtonClick extends React.Component {
    constructor () {
        super();

        this.state = {
            clicked1: false,
            clicked2: false
        };

        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
    }

    handleClick1() {

        this.setState({
            clicked1: true,
            clicked2: false
        });

        this.props.callBackParent(false);

    }
    handleClick2() {

        this.setState({

            clicked1: false,
            clicked2: true
        });

        this.props.callBackParent(true);
    }

    render () {
        return (
            <div>
                <h3>Hvem ønsker du å søke for?</h3>
                <RadioButtonMe onClick={this.handleClick1} />
                <RadioButtonOther onClick={this.handleClick2} />
            </div>
        );
    }
}