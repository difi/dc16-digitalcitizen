

ReactDOM.render(
    <h1>Søk sykehjemsplass</h1>,
    document.getElementById('title')

);

class SearchForMe extends React.Component {
    render () {
        return (
            <div {...this.props}>
                <input type="text" name="name"/>
            </div>
        );
    }
}

/** class SearchForOther extends  React.Component {
    render () {
        return (
            const Others = () => {
                const otherList = ['Personnummer', 'Fornavn', 'Etternavn'];
                const others = otherList.map((other) => {
                    return <label> { other }<input type="text" name={other}/></label>
                });
                return <ul> { others } </ul>
            }
        );
    }
} */

class RadioButtonMe extends React.Component {
    render () {
        return (
            <div className="choose-Who">
                <form action="">
                    <input type="radio" name="who" value="Me" {...this.props}/>Meg selv
                    <input type="radio" name="who" value="Other"/>Noen andre
                </form>
            </div>
        );
    }
}

class App extends React.Component {
    constructor () {
        super();

        this.state = {
             clicked: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            clicked: true
        });
    }

    render () {
        return (
            <div>
                <RadioButtonMe onClick={this.handleClick} />
                {this.state.clicked ? <SearchForMe /> : null}
            </div>
        );
    }
};

/**
var MegSelv = React.createClass({
    render: function () {
        return (<div className="me-Input">
            <h2>Søk sykehjemsplass for meg selv:</h2>
            <input type="text" name="name"/>
        </div>);
    }
})

var Buttons = React.createClass({
    getInitialState: function() {
        return {isPressed: false};
    },



    _onClick: function () {
       this.setState({
            isPressed: true,
        });
        return (<div className="me-Input">
                <h2>Søk sykehjemsplass for meg selv:</h2>
                <input type="text" name="name"/>
            </div>);
        return (
                <div className="Me">
                    <MegSelv />
                </div>
            );

    },

        render: function() {
        return ( <div className="choose-Who">
            <form action="">
                <input type="radio" name="who" value="Me" onClick={this._onClick}/>Meg selv
                <input type="radio" name="who" value="Other"/>Noen andre
            </form>
        </div>
            );
    }
});

var ButtonMe = React.createClass({
    render: function() {
        return (<div className="me-Button">
                    <h2>Søk sykehjemsplass for meg selv:</h2>

                </div>
        );
    }
})

var ButtonOther = React.createClass({
    render: function() {
        return (<div className="other-Button">
                    <h2>Søk sykehjemsplass på vegne av noen andre:</h2>
                    <button type="button">Klikk her</button>
                </div>
        );
    }
})

*/

ReactDOM.render(<App/>, document.getElementById('test'))

