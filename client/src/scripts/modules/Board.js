import React, {Component} from 'react';
import Buttons from './Button/Buttons.js';
import Checkboxes from './Checkbox/Checkboxes.js';
import DnD from './DnD/DnD.js';
import PropTypes from 'prop-types';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data, //aktuális játék adatai
            sendAnswer: props.onClick, //válasz adás metódusa
        };
    }

    componentWillReceiveProps(nextProps) {
        //új játéknál frissítjük az adatokat
        this.setState({data: nextProps.data, sendAnswer: nextProps.onClick});
    }

    render() {
        //válaszút a játék interakciójának típusa szerint
        if (this.state.data.type === "button") { //gomb
            return (
                <Buttons multiple={this.state.data.multiple} answerImages={this.state.data.answerImages}
                         onClick={(i) => this.state.sendAnswer(i)}/>
            );
        } else if (this.state.data.type === "dnd") { //drag and drop
            return (
                <DnD vertical={this.state.data.vertical} dragImages={this.state.data.dragImages}
                     dropImages={this.state.data.dropImages}
                     onClick={(i) => this.state.sendAnswer(i)}/>
            );
        } else if (this.state.data.type === "checkbox") { //checkbox
            return (
                <Checkboxes checkImages={this.state.data.checkImages} uncheckImages={this.state.data.uncheckImages}
                            onClick={(i) => this.state.sendAnswer(i)}/>
            );
        } else {
            return (
                <p>Hiba, nincs ilyen játéktípus reprezentálva a programban</p>
            );
        }
    }
}

Board.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};


export default Board;