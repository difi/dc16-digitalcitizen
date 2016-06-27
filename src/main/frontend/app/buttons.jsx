const wellStyles = {maxWidth: 600, margin: '0 auto 10px', maxHeight: 400};
var React = require('react');
var Button = require('react-bootstrap/lib/Button');

export default class Buttons extends React.Component {
    render() {
        return (
            <div className="well" style={wellStyles}>
                <Button bsSize="large" block>Jeg fyller ut for meg selv</Button>
                <Button bsSize="large" block>Jeg fyller ut på vegne av noen andre</Button>
            </div>)
    }
}