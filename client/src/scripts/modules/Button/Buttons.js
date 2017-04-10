import React, {Component} from 'react';
import Button from './Button.js';

class Buttons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerImages: props.answerImages,
            onClick: props.onClick,
            multiple: props.multiple,
            multiplePressed: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            answerImages: nextProps.answerImages,
            onClick: nextProps.onClick,
            multiple: nextProps.multiple,
            multiplePressed: []
        });
    }

    multipleClick(e) {
        console.log(e + ". clicked");
        let pressed = this.state.multiplePressed.slice();
        pressed.push(e);
        this.setState({multiplePressed: pressed}, function () {
            console.log(this.state.multiplePressed)
        });
    }

    resetButtons() {
        this.setState({multiplePressed: []}, function () {
            console.log(this.state.multiplePressed)
        });
    }

    renderButton(i) {
        if (this.state.multiple === "yes") {
            return <Button key={i} value={this.state.answerImages[i]} classes="btn--multiple"
                           onClick={() => this.multipleClick(i)}/>;
        }
        return <Button key={i} value={this.state.answerImages[i]} classes="" onClick={() => this.state.onClick([i])}/>;
    }

    render() {
        let _this = this;
        let buttons1 = [];
        let buttons2 = [];
        let pressed = [];

        this.state.answerImages.forEach(function (element, index) {
            buttons1.push(_this.renderButton(index));
        });
        this.state.multiplePressed.forEach(function (element, index) {
            pressed.push(<img key={index} src={_this.state.answerImages[element]} width="20px" height="20px"></img>)
        });
        if (this.state.multiple === "yes") {
            buttons2.push(<Button key="send" value="none" classes="send"
                                 onClick={() => this.state.onClick(this.state.multiplePressed)}/>,
                <Button key="reset" value="none" classes="reset"
                        onClick={() => this.resetButtons()}/>);

        }

        return (
            <div className="ui">
                <div className="buttons">
                    {buttons1}
                </div>
                {buttons2}
                {this.state.multiple === "yes" ? <p className="info">Megnyomva: {pressed}</p> : ""}
            </div>
        )

    }
}

export default Buttons;