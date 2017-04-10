import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: props.value,
            onClick: props.onClick,
            classes: props.classes,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({background:nextProps.value,
            onClick:nextProps.onClick,classes: nextProps.classes});
    }

    render() {
        let style = "";
        if(typeof this.state.background !== 'undefined' && this.state.background !== 'none'){
            style="url('" +this.state.background+ "') no-repeat center center";
        }

        return (
            <button className={"btn " + this.state.classes} onClick={() => this.state.onClick()}
                    style={{background: style}}>
                {this.state.classes==="send" ? "Küldés" : ""}
                {this.state.classes==="reset" ? "Reset" : ""}
            </button>
        );
    }
}

export default Button;