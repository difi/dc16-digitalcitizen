/**
 * Set the radio buttons into one form together in one form.
 */
var RadioButtons = React.createClass({
   render: function () {
        return (
            <div className="choose-Who">
                <h2>Søker du sykehjemsplass for deg selv eller på vegne av noen andre?</h2>
                <form action="">
                    <RadioButtonClick />
                </form>
            </div>
        );
    }
})

/**
 * Create a radio button component.
 */
class RadioButtonOther extends React.Component {
    render () {
        return (
            <div>
                <input type="radio" name="who" value="Other" {...this.props}/> Søk på vegne av noen andre
            </div>
        );
    }
}
/**
 * Create a radio button component.
 */
class RadioButtonMe extends React.Component {
    render () {
        return (
            <div>
                <input type="radio" name="who" value="Me" {...this.props}/> Sør for meg selv
            </div>
        );
    }
}

/**
 * When radio button me is clicked this appears on screen.
 */
class SearchForMe extends React.Component {
    render () {
        return (
            <div {...this.props}>
                <input type="text" name="name"/>
            </div>
        );
    }
}

/**
 * When radio button other is clicked this appears on screen.
 */
class SearchForOther extends  React.Component {
    render () {
        return (
            <div {...this.props}>
                <input type ="text" name="pnr"/>
                <input type="text" name="name"/>
            </div>
        );
    }
}

/**
 * This handles which radio button is clicked, and what information to show on the screen.
 * @return true and false depending on which radio button is active.
 */
class RadioButtonClick extends React.Component {
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
    }
    handleClick2() {
        this.setState({
            clicked1: false,
            clicked2: true
        });
    }

    render () {
        return (
            <div>
                <RadioButtonMe onClick={this.handleClick1} />
                {this.state.clicked1 ? <SearchForMe /> : null}

                <RadioButtonOther onClick={this.handleClick2} />
                {this.state.clicked2 ? <SearchForOther /> : null}
            </div>
        );
    }
};

/**
 * Render the information in to the HTML.
 */
ReactDOM.render(<RadioButtons />, document.getElementById('choose-person'))

