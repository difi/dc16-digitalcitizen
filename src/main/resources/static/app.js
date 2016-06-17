var Form = React.createClass({

    render: function() {
        return (
            <div>

                {this.props.data.map(function(field, i){
            return (<Textfield key={i} text={field.name}/>);
                })}
            </div>
        );
    }
});



var Textfield = React.createClass( {
    getInitialState: function() {
        return {value: this.props.text};
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    render: function() {

        return (
            <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
            />
        );
    }
});
var data = [
    { name: "Fødselnr"},
    {name: "Fornavn"},
    {  name: "Etternavn"},
{   name: "Sivilstatus"},
{   name: "Nasjonalitet"},
{name: "E-post"}];
ReactDOM.render(
    <Form data={data}/>, document.getElementById("content")
);