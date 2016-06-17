var Form = React.createClass({

    render: function() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                {this.props.data.map(function(field, i){
            return (<Textfield key={i} text={field.name}/>);
                })}
            </div>
        );
    }
});

var App = React.createClass({
   render: function() {
       return (
           <div>
               {this.props.data.map(function(forms, i){
                   return (
                       <Form key={i} name={forms.formname} data={forms.data}/>
                   )
               })}
           </div>
       )
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
var dataMe = [
    { name: "Fødselnr"},
    {name: "Fornavn"},
    {  name: "Etternavn"},
{   name: "Sivilstatus"},
{   name: "Nasjonalitet"},
{name: "E-post"}];

var dataApplicant = [
    { name: "Adresse"},
    {name: "Fornavn"},
    {  name: "Etternavn"},
    {name: "E-post"}];

var dataDep = [
    {name: "Fornavn"},
    {  name: "Etternavn"},
    {   name: "Sivilstatus"},
    {   name: "Telefonnummer"},
    {name: "E-post"}];


var data = [
    {formname: "Om den som ønsker plass", data: dataMe},
    {formname: "Om deg som søker", data: dataApplicant},
    {formname: "Om pårørende", data: dataDep}];

ReactDOM.render(
    <App data={data}/>, document.getElementById("content")
);