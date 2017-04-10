import React, {Component} from 'react';
import Buttons from './Button/Buttons.js';
import Checkboxes from './Checkbox/Checkboxes.js';
import DnD from './DnD/DnD.js';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            onClick: props.onClick,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data, onClick: nextProps.onClick});
    }

    render() {
        if (this.state.data.type === "button") {
            return (
                <Buttons multiple={this.state.data.multiple} answerImages={this.state.data.answerImages} onClick={(i) => this.state.onClick(i)}/>
            );
        } else if (this.state.data.type === "dnd") {
            return (
                <DnD vertical={this.state.data.vertical} answerImages={this.state.data.answerImages} dropImages={this.state.data.dropImages}
                     onClick={(i) => this.state.onClick(i)} watching={this.state.data.watching}/>
            );
        } else if (this.state.data.type === "checkbox") {
            return (
                <Checkboxes checkImages={this.state.data.checkImages} uncheckImages={this.state.data.uncheckImages} onClick={(i) => this.state.onClick(i)}/>
            );
        }

        return (
            <p>what</p>
        );
    }
}


export default Board;