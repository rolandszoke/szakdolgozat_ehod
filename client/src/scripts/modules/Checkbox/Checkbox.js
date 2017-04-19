import React, {Component} from 'react';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uncheck: props.uncheck, //kijelölt állapot képe
            check: props.check, //ki nem jelölt állapot képe
            checkClick: props.checkClick, //checkboxra kattintás metódusa
            checked: props.checked, //ki van-e jelölve
        };
    }

    componentWillReceiveProps(nextProps) {
        //módosult tulajdonságoknál frissítjük az adatokat
        this.setState({
            uncheck: nextProps.uncheck,
            check: nextProps.check,
            checkClick: nextProps.checkClick,
            checked: nextProps.checked,
        });
    }

    render() {
        let backg; //hozzá tartozó kép
        let classes; //css class-ai
        if (this.state.checked) { //ki van jelölve
            backg = this.state.check;
            classes = "checked";
        } else { //nincs kijelölve
            backg = this.state.uncheck;
            classes = "unchecked";
        }
        let flexBasis = 100 / this.props.rowNum; //mennyi helyet foglal el a checkbox a sorba
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
