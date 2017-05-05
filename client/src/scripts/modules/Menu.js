import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameMode: props.gameMode, //használatba lévő játékmód
            modifiers: props.modifiers, //használatba lévő nehézségi szintek
            changeGameMode: props.changeGameMode, //játékmódot módosító metódus
            changeModifiers: props.changeModifiers, //nehézségi szintet módosító metódus
        };
    }

    componentWillReceiveProps(nextProps) {
        //módosult játékmódnál/nehézségi szintnél frissíteni kell a state-et, ezzel megjelenítést
        this.setState({gameMode: nextProps.gameMode, modifiers: nextProps.modifiers});
    }

    renderCheckbox(name, group) {
        //checbox típusu módosító gomb létrehozása
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
        //radio button típusu módosító gomb létrehozása
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
        //navigációs felületek létrehozása
        return (
            <nav className={"menu " + classes} key={classes}>
                <input type="checkbox" className="menu__open" id="menu__open"/>
                <label className="menu__open__button">
                    <span className="line line--1"/>
                    <span className="line line--2"/>
                    <span className="line line--3"/>
                </label>
                {elements}
                <div className="menu__bg">
                    <div className="menu__bg__separator"></div>
                </div>
            </nav>
        )
    }

    renderInfo() {
        //információs felületek létrehozása
        return (
            <div className="nav__info" key="info">
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
                        <li> A versenyre fordítandó idő 45 perc, 18 feladat három nehézségi szinten: könnyű, közepes
                            es
                            nehéz;
                        </li>
                        <li> A verseny alatt semmilyen más számítógépes program, alkalmazás nem használható;</li>
                        <li> A verseny során nyugalmas környezetet kell biztosítani;</li>
                        <li> A terem a verseny során nem hagyható el;</li>
                        <li> Az esetleges számítógéppel, internettel kapcsolatos észrevételeket a kontakt személynek
                            kell
                            összegyűjtenie és továbbítania a szervezők felé;
                        </li>
                        <li> A verseny célja: minél több pont összegyűjtése helyes válaszok megjelölésével,
                            helytelen válaszok
                            eseten pontlevonás történik;
                        </li>
                        <li> A kérdések tetszőleges sorrendben megválaszolhatóak;</li>
                        <li> A kérdések, problémák megértése a feladat részét képezi. Ezért a feladatok megbeszélése
                            és
                            értelmezéssel kapcsolatos kérdések nem megengedettek;
                        </li>
                        <li> A megoldások a verseny befejezése után, a hod hetet követően kerülnek nyilvánosságra.
                        </li>
                    </p>
                </div>
                <div className="shadow"></div>
            </div>
        )
    }


    render() {
        let checkboxes_1 = ["Könnyű", "Közepes", "Nehéz"]; //lehetséges nehézségi szintek
        let radios_1 = ["Felfedező", "Időre", "Teszt"]; //lehetséges játékmódok
        let radios_2 = ["Kishód", "Benjamin", "Kadét", "Junior", "Senior", "Összes"]; //lehetséges korosztályok a játékmódhoz
        let checkboxes = [];
        let radios = [];
        let _this = this;
        //gombok renderelése
        checkboxes_1.forEach(function (element) {
            checkboxes.push(_this.renderCheckbox(element, "1"));
        });
        radios_1.forEach(function (element) {
            radios.push(_this.renderRadio(element, "1"));
        });
        radios_2.forEach(function (element) {
            radios.push(_this.renderRadio(element, "2"));
        });
        //navigációs felületek renderelése
        let nav = [];
        nav.push(_this.renderInfo());
        nav.push(_this.renderNav(radios, "menu--left"));
        if (this.state.gameMode[0] !== "Időre" && this.state.gameMode[1] !== "Összes" && this.state.gameMode[0] !== "Teszt") {
            nav.push(_this.renderNav(checkboxes, "menu--right"));
        } else {
            nav.push(_this.renderNav([], "menu--right menu--hidden"));
        }

        return (
            <div className="nav">
                {nav}
            </div>
        );
    }
}

Menu.propTypes = {
    gameMode: PropTypes.array.isRequired,
    modifiers: PropTypes.array.isRequired,
    changeGameMode: PropTypes.func.isRequired,
    changeModifiers: PropTypes.func.isRequired,
};

export default Menu;