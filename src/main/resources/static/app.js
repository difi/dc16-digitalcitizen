

ReactDOM.render(
    <h1>Søk sykehjemsplass</h1>,
    document.getElementById('content')

);

var Buttons = React.createClass({
    getInitialState: function() {
        return {isPressed: false};
    },

    _onClick: function () {
       /** this.setState({
            isPressed: true,
        });
        return (<div className="me-Input">
                <h2>Søk sykehjemsplass for meg selv:</h2>
                <input type="text" name="name"/>
            </div>);*/
        console.log("Trykkt");
    },

        render: function() {
        return ( <div className="choose-Who">
            <form action="">
                <input type="radio" name="who" value="Me" onClick={this._onClick}/> Meg selv
                    <input type="radio" name="who" value="Other"/> Noen andre
                </form>
        </div>
            );
    }
});
/**
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

*/var MegSelv = React.createClass({
    render: function () {
        return (<div className="me-Input">
            <h2>Søk sykehjemsplass for meg selv:</h2>
            <input type="text" name="name"/>
        </div>);
    }
}) 

ReactDOM.render(<Buttons/>, document.getElementById('test'))

