import React, {Component} from 'react';
import Checkbox from './Checkbox.js';
import Button from '../Button/Button.js';

class Checkboxes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkImages: props.checkImages, //kijelölt checkboxok képei
            uncheckImages: props.uncheckImages, //ki nem jelölt checkboxos képei
            onClick: props.onClick, //beküldés metódusa
            checked: [], //kijelölt checkboxos listája
        };
    }

    componentWillReceiveProps(nextProps) {
        //új játéknál az adatokat frissítjük
        this.setState({
            checkImages: nextProps.checkImages,
            uncheckImages: nextProps.uncheckImages,
            onClick: nextProps.onClick,
            checked: [],
        });
    }

    checkClick(e) {
        //checkbox kijelölése
        console.log(e + ". clicked");
        let checked = this.state.checked.slice();
        let index = checked.indexOf(e);
        if (this.isChecked(e)) {
            checked.splice(index, 1);
        } else {
            checked.push(e);
        }
        this.setState({checked: checked}, function () {
            console.log(this.state.checked)
        });
    }

    isChecked(e) {
        //adott checkbox ki van-e jelölve
        let checked = this.state.checked.slice();
        let index = checked.indexOf(e);
        return (index > -1);
    }

    resetBoxes() {
        //újraindítás gomb metódusa
        this.setState({checked: []});
    }

    renderCheckbox(i, rowNum) {
        //checbox renderelése
        let checked = this.isChecked(i);
        return <Checkbox key={i} rowNum={rowNum} uncheck={this.state.uncheckImages[i]} check={this.state.checkImages[i]}
                         checkClick={() => this.checkClick(i)} checked={checked}/>;
    }

    render() {
        let _this = this;
        let checkboxes = [];
        let rowNum = this.state.checkImages.length; //hány darab checkboxunk van (megjelenítéshez)
        //checkboxok létrehozása
        this.state.checkImages.forEach(function (element, index) {
            checkboxes.push(_this.renderCheckbox(index, rowNum));
        });
        return (
            <div className="ui">
                <div className="checkboxes">
                    {checkboxes}
                </div>
                <Button value="none" classes="btn--send" onClick={() => this.state.onClick(this.state.checked)}/>
                <Button value="none" classes="btn--reset" onClick={() => this.resetBoxes()}/>
            </div>
        )
    }
}

export default Checkboxes;