import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: props.value, //gomb képe
            onClick: props.onClick, //gomb lenyomásának metódusa
            classes: props.classes, //gomb css class-ai
        };
    }

    componentWillReceiveProps(nextProps) {
        //új tulajdonságokat kapott gomb adatainak frissítése
        this.setState({
            background: nextProps.value,
            onClick: nextProps.onClick, classes: nextProps.classes
        });
    }

    render() {
        let style = "";
        //kép beállítása, amennyiben van
        if (typeof this.state.background !== 'undefined' && this.state.background !== 'none') {
            style = "url('" + this.state.background + "') no-repeat center center";
        }

        return (
            <button className={"btn " + this.state.classes} onClick={() => this.state.onClick()}
                    style={{background: style}}>
                {this.state.classes === "btn--send" ? "Küldés" : ""}
                {this.state.classes === "btn--reset" ? "Újraindítás" : ""}
            </button>
        );
    }
}

Button.propTypes = {
    background: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.string.isRequired,
};

export default Button;