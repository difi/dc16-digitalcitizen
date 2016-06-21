/**
 * Created by camp-hst on 20.06.2016.
 */
import React from 'react';

var DropDown = React.createClass({
    
    getInitialState: function() {
        return {
            listVisible: false
        };
    },

    select: function(item) {
        this.props.selected = item;
    },

    show: function() {
        this.setState({ listVisible: true });
        document.addEventListener("click", this.hide);
    },

    hide: function() {
        this.setState({ listVisible: false });
        document.removeEventListener("click", this.hide);
    },

    render: function() {
        return <div>
                <div onClick={this.show}>
                    <span>{this.props.selected.name}</span>
                </div>
                <div>
                    {this.renderListItems()}
                </div>
        </div>;
    },

    renderListItems: function() {
        var items = [];
        for (var i = 0; i < this.props.list.length; i++) {
            var item = this.props.list[i];
            items.push(<div onClick={this.select.bind(null, item)}>
                <span>{item.name}</span>
            </div>);
        }
        return items;
    }
});



export default DropDown;
