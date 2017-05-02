import React, {Component} from 'react';
import Board from './Board.js';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allGames: require("../../json/games.json"), //összes játékfájl neve jsonbe rendezve
            selectableGames: [], //a kiválasztható játékok listája az adott szűrést alkalmazva
            gameMode: props.gameMode, //kiválasztott játékmód
            modifiers: props.modifiers, //kiválasztott nehézségi szintek
            currentGameData: null, //jelenlegi játék adatai
            flip: "game--noflip", //--noflip: játék felület mutatása; --flip: visszajelzési felület
            front: " ", //játék felület ablakot módosító classok
            back: "game__back--wrong", //visszajelzési felületet módosító classok
            backContent: null, //visszajelzési felület tartalma
            correctAnswers: 0, //helyes válaszok számlálója
            timer: setTimeout(function () { //időzítő a time játékmódhoz
            }, 900000),
            testCode: "", //teszt kódja
            start: true, //első indítás
        };

    }

    componentWillMount() {

        //első indítás
        this.setUp(this.state);
    }

    componentWillReceiveProps(nextProps) {
        //módosult játékmód utáni beállítások
        this.setUp(nextProps);
    }

    setUp(props) {
        if (this.state.start) {
            //első indítás
            let content = this.renderStartPage(); //üdvözlő felület
            this.setState({
                back: "game__back--start", front: " ", backContent: content, correctAnswers: 0,
            });
            clearTimeout(this.state.timer); //időzítő nullázása
            this.getGames(props.gameMode, props.modifiers);
        } else {
            //válaszút játékmódok között
            if (props.gameMode[0] === "Időre") {
                this.setState({front: "game__front--time", correctAnswers: 0});
                this.counter(); //időzítő beállítása
                this.getGames(props.gameMode, props.modifiers); //játékok beállítása
            } else if (props.gameMode[0] === "Teszt") {
                let content = this.renderTestInput(); //kód bemeneti felület biztosítása
                this.setState({
                    flip: "game--flip", back: "game__back--test", front: "game__front--test",
                    backContent: content, gameMode: "Test", correctAnswers: 0
                });
                clearTimeout(this.state.timer); //időzítő nullázása
            } else if (props.gameMode[0] === "Felfedező") {
                this.setState({front: " "});
                clearTimeout(this.state.timer); //időzítő nullázása
                this.getGames(props.gameMode, props.modifiers); //játékok beállítása
            }
        }
    }

    getGames(gm, mod) {
        //kiválasztható játékok beállítása, adott szűrési paraméterekkel
        let games = [];
        let testGamesArray = this.state.testCode.split('.'); //teszt feladatainak idjei
        this.state.allGames.games.forEach(function (element) {
            let g = (require("../../json/" + element)); //játékfájl betöltése
            if (gm[0] === "Teszt") {
                //teszt esetén akkor rakjuk bele a játékot a választhatók közé, ha szerepel az id-ja a kódban
                let index = testGamesArray.indexOf(g.id.toString());
                if (index !== -1) {
                    games.push(g);
                }
            } else {
                //egyéb játékmódnál szűrünk a megfelelö beállításokkal
                if (gm[1] === "Összes") {
                    games.push(g);
                } else {
                    let BreakException = {};
                    try {
                        mod.forEach(function (m) {
                            let text = gm[1] + " - " + m;
                            if (g.level.toString().includes(text)) {
                                games.push(g);
                                throw BreakException;
                            }
                        });
                    } catch (e) {
                        if (e !== BreakException) console.log("error");
                    }
                }
            }
        });
        this.newGame(games, gm, mod); //aktuális játék kiválasztása
    }

    newGame(games, gm, mod) {
        //aktuális játék kiválasztása
        if (games.length === 0) {
            if (gm[0] === "Teszt") {
                //Tesztnél, ha elfogytak a játékok nem indítjuk újra, kiírjuk a végeredményt
                this.setState({
                    back: "game__back--test",
                    backContent: <div className="testUI"><p className="testUI__text">Gratulálok, végeztél!</p><p
                        className="testUI__text">Helyes válaszaid száma: {this.state.correctAnswers}</p></div>,
                    flip: "game--flip"
                });
            } else {
                //ha a kiválasztható játékok száma nulla, reseteljük a listájukat a getGames metódussal
                this.getGames(this.state.gameMode, this.state.modifiers);
            }
        } else {
            //új játék kérése
            let game = games[Math.floor(Math.random() * games.length)]; //random kiválasztunk egy játékot
            games.splice(games.indexOf(game), 1); //kivesszük őt a kiválaszthatók közül
            let flip = this.state.start ? "game--flip" : "game--noflip";
            this.setState({
                flip: flip, currentGameData: game, gameMode: gm,
                modifiers: mod, selectableGames: games, start: false
            });
        }
    }

    counter() {
        //időzítő beállítása
        let _this = this;
        clearTimeout(this.state.timer);
        this.setState({
            timer: setTimeout(function () {
                _this.setState({
                    back: "game__back--info",
                    backContent: "Lejárt az időd! Helyes válaszaid száma: " + _this.state.correctAnswers,
                    flip: "game--flip"
                });
            }, 1200000) //időzítő hossza: 60000 = 1 perc; 1200000= 20 perc
            //az itt átállított időt a menu.scss-ben is át kell állítani a @include timer() funkció 2. paraméterénél
        })
    }

    checkAnswer(correct, received) {
        //adott választ összehasonlítása a helyes válasszal az arraysEqual metódust használva
        console.log("check if good: " + received + " for: " + correct);
        if (arraysEqual(correct, received)) {
            this.setState({
                back: "game__back--right",
                backContent: <img src="src/svg/check.svg"/>,
                correctAnswers: this.state.correctAnswers + 1,
                flip: "game--flip"
            }); //helyes
        } else {
            this.setState({back: "game__back--wrong", backContent: "X", flip: "game--flip"}); //helytelen
        }
        if (this.state.gameMode[0] === "Időre" || this.state.gameMode[0] === "Teszt") {
            //időre játszásnál  vagy tesztnél 0,75 másodperc múlva azonnal kapjuk az új játékot (nem kattintásra történi a játék váltás)
            let _this = this;
            setTimeout(
                function () {
                    _this.newGame(_this.state.selectableGames, _this.state.gameMode, _this.state.modifiers)
                }, 750);
        }
    }

    handleClick(i) {
        //válasz megadása értékelésre
        if (this.state.currentGameData.type === "checkbox") {
            //checkboxos feladatoknál sorbarendezzük az adatokat
            this.checkAnswer(this.state.currentGameData.answer.sort(), i.sort());
        } else {
            this.checkAnswer(this.state.currentGameData.answer, i);
        }
    }

    changeCode(event) {
        //teszthez megadott kód módosítása
        this.setState({testCode: event.target.value});
    }

    renderStartPage() {
        //kezdő felület
        return (
            <div className="startUI">
                <p className="startUI__welcome">Üdvözöllek az e-Hód interaktív alkalmazásában!</p>
                <p className="startUI__info">*A beállításokat a bal és jobb oldali nyitható menükben találod meg.</p>
                <p className="startUI__info">További információkat a E-HOD cím feletti szürke gombra kattintva olvashatsz!</p>
                <div className="startUI__start"
                     onClick={() => this.setState({flip: "game--noflip"})}>Indítás
                </div>
            </div>
        )
    }

    renderTestInput() {
        //teszt bemeneti felülete
        return (
            <div className="testUI">
                <p className="testUI__text">Adja meg a teszt kódját:</p>
                <input type="text" className="testUI__input" onChange={this.changeCode.bind(this)}/>
                <div className="testUI__send"
                     onClick={() => this.getGames(["Teszt", "Összes"], ["Könnyű", "Közepes", "Nehéz"])}>Küldés
                </div>
            </div>
        )
    }

    render() {
        let levels = []; //adott játék szintjei, nehézséggel
        this.state.currentGameData.level.forEach(function (element) {
            levels.push(element + "; ");
        });

        let paragraphs = []; //adott játék leírása
        this.state.currentGameData.description.forEach(function (element, index) {
            paragraphs.push(<p key={index}>{element}</p>);
        });

        //amennyiben nem felfedezőbe játszunk kattintásra nem kapunk új játékot, hasonlóan a kezdő üdvözlésnél
        let backClickEvent = (this.state.gameMode[0] === "Felfedező" && this.state.back !=="game__back--start") ?
            () => this.newGame(this.state.selectableGames, this.state.gameMode, this.state.modifiers)
            : () => "";

        return (
            <div className={"game " + this.state.flip}>
                <div className={"game__front " + this.state.front}>
                    <div className="game__front__info">
                        <div className="game__front__info__header">
                            <h2 className="title">{this.state.currentGameData.title}</h2>
                            <h3 className="level">Szintek: {levels}</h3>
                        </div>
                        <div className="game__front__info__description">{paragraphs}</div>
                        <img className="game__front__info__img" src={this.state.currentGameData.mainImage} width="auto"
                             height="auto"/>
                        <p className="game__front__info__question">{this.state.currentGameData.question}</p>
                    </div>
                    <div className="game__front__board">
                        <Board
                            data={this.state.currentGameData}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                </div>
                <div className={"game__back " + this.state.back}
                     onClick={backClickEvent}>
                    <div className="game__back__content">{this.state.backContent}</div>
                </div>
            </div>
        );
    }
}

function arraysEqual(arr1, arr2) {
    //paraméterben megadott listák egyenlőek-e
    if (arr1.length !== arr2.length)
        return false;
    for (let i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}


export default Game;