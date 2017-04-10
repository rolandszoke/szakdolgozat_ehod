import React, {Component} from 'react';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameMode: props.gameMode,
            modifiers: props.modifiers,
            changeGameMode: props.changeGameMode,
            changeModifiers: props.changeModifiers,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({gameMode: nextProps.gameMode, modifiers: nextProps.modifiers});
    }

    renderCheckbox(name, group) {
        return (
            <li key={name} className="menu__item">
                <input type="checkbox" name={group} id={name} value={name}
                       checked={this.state.modifiers.indexOf(name) > -1}
                       onChange={() => {
                           this.state.changeModifiers(name)
                       }}/>
                <label htmlFor={name}>{name}</label>
            </li>
        )
    }

    renderRadio(name, group) {
        return (
            <li key={name} className={"menu__item menu__item--" + name}>
                <input type="radio" name={group} id={name} value={name}
                       checked={this.state.gameMode.indexOf(name) > -1}
                       onChange={() => {
                           this.state.changeGameMode(name, group)
                       }}/>
                <label htmlFor={name}>
                    <div>{name}</div>
                </label>
            </li>
        )
    }

    renderNav(elements, classes) {
        return (
            <nav className={"menu " + classes} key={classes}>
                <input type="checkbox" className="menu__open" id="menu__open"/>
                <label className="menu__open__button">
                    <span className="line line--1"></span>
                    <span className="line line--2"></span>
                    <span className="line line--3"></span>
                </label>
                {elements}
                <div className="menu__bg">
                    <div className="menu__bg__separator"></div>
                </div>
            </nav>
        )
    }


    render() {
        let checkboxes_1 = ["Könnyű", "Közepes", "Nehéz"];
        //let checkboxes_2 = ["DnD", "Check", "Button"];
        let radios_1 = ["Arcade", "Time", "Test"];
        let radios_2 = ["Kishód", "Benjamin", "Kadét", "Junior", "Senior", "Összes"];
        let checkboxes = [];
        let radios = [];
        let _this = this;
        checkboxes_1.forEach(function (element) {
            checkboxes.push(_this.renderCheckbox(element, "1"));
        });
        /*checkboxes_2.forEach(function (element) {
         checkboxes.push(_this.renderCheckbox(element, "2"));
         });*/
        radios_1.forEach(function (element) {
            radios.push(_this.renderRadio(element, "1"));
        });
        radios_2.forEach(function (element) {
            radios.push(_this.renderRadio(element, "2"));
        });
        let nav = [];
        nav.push(_this.renderNav(radios, "menu--left"));
        if (this.state.gameMode[0] !== "Time" && this.state.gameMode[1] !== "Összes" && this.state.gameMode[0] !== "Test") {
            nav.push(_this.renderNav(checkboxes, "menu--right"));
        } else {
            nav.push(_this.renderNav([], "menu--right menu--hidden"));
        }

        return (
            <div className="nav">
                <div className="nav__info">
                    <input type="checkbox"/>
                    <label>INFO</label>
                    <div className="nav__info__text">
                        <p>A kérdések három nehézségi szinten csak strukturált és logikus gondolkodást igényelnek,
                            semmilyen
                            különleges informatikai tudás nem szükséges a megválaszolásukhoz. A feladatok érdekes
                            problémákat
                            mutatnak be. Nem tesztek, inkább szórakoztató gondolkodtató feladványok.
                        </p>
                        <p>
                            Magyarországon 2016-ban hatodik alkalommal, öt korcsoportban vehettek részt a diákok 4-től
                            12. osztályig. A részvétel mindenki számára ingyenes.
                        </p>
                        <p>
                            Szabályok:
                            <li> A verseny lebonyolítása iskolai helyszíneken történik.</li>
                            <li> A résztvevők online kapják meg és válaszoljak meg a kérdéseket;</li>
                            <li> A versenyre fordítandó idő 45 perc, 18 feladat három nehézségi szinten: könnyű, közepes es
                                nehéz;</li>
                            <li> A verseny alatt semmilyen más számítógépes program, alkalmazás nem használható;</li>
                            <li> A verseny során nyugalmas környezetet kell biztosítani;</li>
                            <li> A terem a verseny során nem hagyható el;</li>
                            <li> Az esetleges számítógéppel, internettel kapcsolatos észrevételeket a kontakt személynek kell
                                összegyűjtenie és továbbítania a szervezők felé;</li>
                            <li> A verseny célja: minél több pont összegyűjtése helyes válaszok megjelölésével, helytelen válaszok
                                eseten pontlevonás történik;</li>
                            <li> A kérdések tetszőleges sorrendben megválaszolhatóak;</li>
                            <li> A kérdések, problémák megértése a feladat részét képezi. Ezért a feladatok megbeszélése és
                                értelmezéssel kapcsolatos kérdések nem megengedettek;</li>
                            <li> A megoldások a verseny befejezése után, a hod hetet követően kerülnek nyilvánosságra.</li>
                        </p>
                    </div>
                    <div className="blur"></div>
                </div>
                {nav}
            </div>
        );
    }
}

export default Menu;