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
                    <p>
                        Az e-Hód interaktív gyakorló felülete vájra lelkes, tudásra éhes diákjait!
                    </p>
                    <p>A kérdések minden korosztályra külön kategorizálva, három nehézségi szinten csak strukturált és logikus gondolkodást igényelnek,
                        semmilyen különleges informatikai tudás nem szükséges a megválaszolásukhoz. A feladatok érdekes problémákat
                        mutatnak be. Nem tesztek, inkább szórakoztató gondolkodtató feladványok.
                    </p>
                    <p>
                        Az életkor-kategóriákból ötöt különböztetünk meg:
                        <li>Kishód (4. osztály)</li>
                        <li>Benjamin (5. és 6. osztály)</li>
                        <li>Kadét (7. és 8. osztály)</li>
                        <li>Junior (9. és 10. osztály)</li>
                        <li>Senior (11. és 12. osztály)</li>
                    </p>
                    <p>
                        Három játékmódot próbálhatnak ki a diákok: Felfedező, Időre, Teszt.
                        <li><strong>Felfedező</strong>: véletlen sorrendbe jelennek meg a játékok végtelen mennyiségben.</li>
                        <li><strong>Időre</strong>: időre kell megoldani a lehető legtöbb feladatot helyesen.</li>
                        <li><strong>Teszt</strong>: megadott tesztkóddal kaphatunk egy feladatsort, amiből lehető legtöbb feladatot kell megoldanunk helyesen.</li>
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