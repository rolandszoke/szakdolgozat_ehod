import React, {Component} from 'react';
import Button from './Button.js';
import PropTypes from 'prop-types';

class Buttons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerImages: props.answerImages, //gombokhoz tartozó képek
            sendAnswer: props.onClick, //válasz küldés metódusa
            multiple: props.multiple, //paraméter, mely megadja, hogy csak egy vagy több gombot lehet megnyomni a válaszadáshoz
            multiplePressed: [], //megnyomott gombok
        };
    }

    componentWillReceiveProps(nextProps) {
        //új játéknél adatok alaphelyzetbe állítása
        this.setState({
            answerImages: nextProps.answerImages,
            sendAnswer: nextProps.onClick,
            multiple: nextProps.multiple,
            multiplePressed: []
        });
    }

    multipleClick(e) {
        //többszörös gomblenyomású játéknál lementjük a megnyomott gombot
        console.log(e + ". clicked");
        let pressed = this.state.multiplePressed.slice();
        pressed.push(e);
        this.setState({multiplePressed: pressed}, function () {
            console.log(this.state.multiplePressed)
        });
    }

    resetButtons() {
        //reset gomb metódusa
        this.setState({multiplePressed: []}, function () {
            console.log(this.state.multiplePressed)
        });
    }

    renderButton(i) {
        //egy gomb elkészítése
        if (this.state.multiple === true) { //többszörös gomb lenyomás
            return <Button key={i} value={this.state.answerImages[i]} classes="btn--multiple"
                           onClick={() => this.multipleClick(i)}/>;
        } else { //egyszeres gomb lenyomás
            return <Button key={i} value={this.state.answerImages[i]} classes=""
                           onClick={() => this.state.sendAnswer([i])}/>;
        }
    }

    render() {
        let _this = this;
        let buttons1 = [];
        let buttons2 = [];
        let pressed = [];
        //gombok renderelése
        this.state.answerImages.forEach(function (element, index) {
            buttons1.push(_this.renderButton(index));
        });
        //lenyomott gombok megjelenítése
        this.state.multiplePressed.forEach(function (element, index) {
            pressed.push(<img key={index} src={_this.state.answerImages[element]} width="24px" height="24px"/>)
        });
        //küldés és nullázás gomb elkészítése
        if (this.state.multiple === true) {
            buttons2.push(<Button key="send" value="none" classes="btn--send"
                                  onClick={() => this.state.sendAnswer(this.state.multiplePressed)}/>,
                <Button key="reset" value="none" classes="btn--reset"
                        onClick={() => this.resetButtons()}/>);
        }

        return (
            <div className="ui">
                <div className="buttons">
                    {buttons1}
                </div>
                {buttons2}
                {this.state.multiple === true ? <p className="info">Megnyomva: {pressed}</p> : ""}
            </div>
        )

    }
}

Buttons.propTypes = {
    answerImages: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    multiple: PropTypes.bool.isRequired,
};

export default Buttons;