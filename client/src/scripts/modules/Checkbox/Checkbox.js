import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uncheckImg: props.uncheckImg, //kijelölt állapot képe
            checkImg: props.checkImg, //ki nem jelölt állapot képe
            checkClick: props.checkClick, //checkboxra kattintás metódusa
            checked: props.checked, //ki van-e jelölve
        };
    }

    componentWillReceiveProps(nextProps) {
        //módosult tulajdonságoknál frissítjük az adatokat
        this.setState({
            uncheckImg: nextProps.uncheckImg,
            checkImg: nextProps.checkImg,
            checkClick: nextProps.checkClick,
            checked: nextProps.checked,
        });
    }

    render() {
        let backg; //hozzá tartozó kép
        let classes; //css class-ai
        if (this.state.checked) { //ki van jelölve
            backg = this.state.checkImg;
            classes = "checkbox__box--checked";
        } else { //nincs kijelölve
            backg = this.state.uncheckImg;
            classes = "checkbox__box--unchecked";
        }
        let flexBasis = 100 / this.props.rowNum; //mennyi helyet foglal el a checkbox a sorba
        return (
            <div className="checkbox" style={{flexBasis: flexBasis + "%"}}>
                <input type="checkbox" onClick={() => this.state.checkClick()}/>
                <label className={"checkbox__box " + classes} style={{background: 'url(' + backg + ') no-repeat center center'}}>
                </label>
            </div>
        );
    }
}

Checkbox.propTypes = {
    uncheckImg: PropTypes.string.isRequired,
    checkImg: PropTypes.string.isRequired,
    checkClick: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
};

export default Checkbox;
