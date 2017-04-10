import React, { Component } from 'react';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uncheck: props.uncheck,
            check : props.check,
            checkClick: props.checkClick,
            checked: props.checked,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            uncheck: nextProps.uncheck,
            check : nextProps.check,
            checkClick:nextProps.checkClick,
            checked: nextProps.checked,
        });
    }

    render() {
        let backg;
        let classes;
        if(this.state.checked) {
            backg = this.state.check;
            classes = "checked";
        } else {
            backg = this.state.uncheck;
            classes = "unchecked";
        }
        let flexBasis = 100/this.props.rowNum;
        return (
            <div className="checkbox" style={{flexBasis: flexBasis + "%"}}>
                <input type="checkbox" onClick={() => this.state.checkClick()}/>
                <label className={classes} style={{background: 'url(' + backg + ') no-repeat center center'}}>
                </label>
            </div>
        );
    }
}

export default Checkbox;
