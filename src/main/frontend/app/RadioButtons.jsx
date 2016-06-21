class RadioButtonMe extends React.Component {
    render () {
        return (
            <div>
                <input className="radio-button" type="radio" name="who" value="Me" {...this.props}/> Søk for meg selv
            </div>
        );
    }
}
import React from 'react';
/**
 * Create a radio button component.
 */
class RadioButtonOther extends React.Component {
    render () {
        return (
            <div>
                <input className="radio-button" type="radio" name="who" value="Other" {...this.props}/> Søk på vegne av noen andre
            </div>
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
                <RadioButtonMe onClick={this.handleClick1} />


                <RadioButtonOther onClick={this.handleClick2} />

            </div>
        );
    }
}