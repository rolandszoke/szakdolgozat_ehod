import React, {Component} from 'react';
import Buttons from './Button/Buttons.js';
import Checkboxes from './Checkbox/Checkboxes.js';
import DnD from './DnD/DnD.js';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data, //aktuális játék adatai
            onClick: props.onClick, //válasz adás metódusa
        };
    }

    componentWillReceiveProps(nextProps) {
        //új játéknál frissítjük az adatokat
        this.setState({data: nextProps.data, onClick: nextProps.onClick});
    }

    render() {
        //válaszút a játék interakciójának típusa szerint
        if (this.state.data.type === "button") { //gomb
            return (
                <Buttons multiple={this.state.data.multiple} answerImages={this.state.data.answerImages}
                         onClick={(i) => this.state.onClick(i)}/>
            );
        } else if (this.state.data.type === "dnd") { //drag and drop
            return (
                <DnD vertical={this.state.data.vertical} answerImages={this.state.data.answerImages}
                     dropImages={this.state.data.dropImages}
                     onClick={(i) => this.state.onClick(i)}/>
            );
        } else if (this.state.data.type === "checkbox") { //checkbox
            return (
                <Checkboxes checkImages={this.state.data.checkImages} uncheckImages={this.state.data.uncheckImages}
                            onClick={(i) => this.state.onClick(i)}/>
            );
        } else {
            return (
                <p>Error, nincs ilyen játéktípus reprezentálva a programban</p>
            );
        }
    }
}


export default Board;