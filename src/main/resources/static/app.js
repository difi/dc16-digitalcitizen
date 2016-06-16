var Paragraph = React.createClass({
    render: function(){
        return <div class="paragraph"><h1>Søk sykehjemsplass</h1><button type="button" >Trykk her</button></div>;
    }
});

/**return <h1>Søk om sykehjemsplass, {this.props.name}</h1>;**/
/** <p> Dersom det er deg du</p>**/

ReactDOM.render(
    /**<h1>Søk om sykehjemsplass</h1>,**/
    <Paragraph name = "Olga"/>,
    document.getElementById('content')
);