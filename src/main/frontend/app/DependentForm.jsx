import React from 'react';
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Checkbox = require('react-bootstrap/lib/Checkbox');
import TextField from './TextField.jsx';
var Button = require('react-bootstrap/lib/Button');
var ReactDOM= require('react-dom');
import DropdownList from './DropdownList.jsx';
var FormControl = require('react-bootstrap/lib/FormControl');
import dropdownContent from './dropdown-list-content.js';


export default class DependentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            showForm: this.props.showForm
        });
        console.log("adfasdf");
        this.handleClickRemove = this.handleClickRemove.bind(this);

    }

    saveFieldsValues() {
        // Get values via this.refs
        var data = {
            firstName: ReactDOM.findDOMNode(this.refs.firstName).children[0].value,
            lastName: ReactDOM.findDOMNode(this.refs.lastName).children[0].value,
            telephone: ReactDOM.findDOMNode(this.refs.telephone).children[0].value,
            email: ReactDOM.findDOMNode(this.refs.email).children[0].value
        };
        this.props.saveValues(data);
        console.log(data);
    }

    handleClickRemove() {
        this.setState({
            showForm: false
        });
        this.props.onClick();
    }
    
    showForm(){
        this.setState({
            showForm: true
        });
    }

    getFieldValues(){
        return {
            firstName: ReactDOM.findDOMNode(this.refs.firstName).value,
            lastName: ReactDOM.findDOMNode(this.refs.lastName).value,
            telephone: ReactDOM.findDOMNode(this.refs.telephone).value,
            email: ReactDOM.findDOMNode(this.refs.email).value,
            relation:this.refs.relation.getDropdownValue()
        };
    }

    render() {

        var deleteButton = this.props.showDeleteButton ? <Button onClick={this.handleClickRemove}>X</Button> : '';

        if (this.state.showForm) {
            var fields = ["Fornavn", "Etternavn", "Telefon", "E-post"];
            var fieldsForm = fields.map(function (field, i) {
                var textFieldRef;
                switch (i) {
                    case 0:
                        textFieldRef = "firstName";
                        break;
                    case 1:
                        textFieldRef = "lastName";
                        break;
                    case 2:
                        textFieldRef = "telephone";
                        break;
                    case 3:
                        textFieldRef = "email";
                        break;
                }

                return (
                    <Row className="form-row-special">
                        <Col sm={4} md={4}>
                            <label className="from-col-address">{field}</label>
                        </Col>
                        <Col sm={8} md={8}>
                            <FormControl ref={textFieldRef} type="text" placeholder={field}/>
                        </Col>
                    </Row>
                )
            });
            return (
                <div>
                    <div className="form-container">
                        {deleteButton}
                        {fieldsForm}

                        <Row className="form-row-special">
                            <Col sm={4} md={4}>
                                <label className="from-col-address">Relasjon</label>
                            </Col>
                            <Col sm={8} md={8}>
                                <DropdownList ref='relation' options={dropdownContent.RELATIONS} id="test" valueField="value" labelField="relation" />
                            </Col>
                        </Row>
                    </div>
                </div>
            );

        } else {
            return(<p/>);
        }
    }
}



















