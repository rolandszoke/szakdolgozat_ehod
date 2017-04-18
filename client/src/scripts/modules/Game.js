import React, {Component} from 'react';
import Board from './Board.js';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allGames: require("json-loader!../../json/games.json"),
            selectableGames: [],
            gameMode: props.gameMode,
            modifiers: props.modifiers,
            currentGameData: null,
            flip: "game--noflip",
            front: " ",
            back: "back--wrong",
            backText: null,
            correctAnswers: 0,
            timer: setTimeout(function () {
            }, 900000),
        };

    }

    componentDidUpdate() {
        console.log(this.state);
    }

    componentDidMount() {
        console.log(this.state);
    }

    componentWillMount() {
        this.getGames(this.state.gameMode, this.state.modifiers);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gameMode[0] === "Időre") {
            this.setState({front: "front--time", correctAnswers: 0});
            this.counter();
        } else {
            this.setState({front: " "});
            clearTimeout(this.state.timer);
        }
        this.getGames(nextProps.gameMode, nextProps.modifiers);
    }

    getGames(gm, mod) {
        let games = [];
        this.state.allGames.games.forEach(function (element) {
            let g = (require("../../json/" + element));
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
        });
        this.newGame(games, gm, mod);
    }

    newGame(games, gm, mod) {
        if (games.length === 0) {
            console.log("Reset selectable games!");
            this.getGames(this.state.gameMode, this.state.modifiers);
        } else {
            let game = games[Math.floor(Math.random() * games.length)];
            games.splice(games.indexOf(game), 1);
            this.setState({
                flip: "game--noflip", currentGameData: game, gameMode: gm,
                modifiers: mod, selectableGames: games
            });
        }
    }

    counter() {
        let _this = this;
        clearTimeout(this.state.timer);
        this.setState({
            timer: setTimeout(function () {
                _this.setState({
                    back: "back--info",
                    backText: "Lejárt az időd! Helyes válaszaid száma: " + _this.state.correctAnswers,
                    flip: "game--flip"
                });
            }, 60000)
        })
    }

    checkAnswer(correct, received) {
        console.log("check if good: " + received + " for: " + correct);
        if (arraysEqual(correct, received)) {
            this.setState({
                back: "back--right",
                backText: <img src="src/svg/check.svg"></img>,
                correctAnswers: this.state.correctAnswers + 1
            });
        } else {
            this.setState({back: "back--wrong", backText: "X"});
        }
        this.setState({flip: "game--flip"});
        if (this.state.gameMode[0] === "Időre") {
            let _this = this;
            setTimeout(
                function () {
                    _this.newGame(_this.state.selectableGames, _this.state.gameMode, _this.state.modifiers)
                }, 750);
        }
    }

    handleClick(i) {
        if (this.state.currentGameData.type === "checkbox") {
            this.checkAnswer(this.state.currentGameData.answer.sort(), i.sort());
        } else {
            this.checkAnswer(this.state.currentGameData.answer, i);
        }
    }

    render() {
        let levels = [];
        this.state.currentGameData.level.forEach(function (element) {
            levels.push(element + "; ");
        });

        let paragraphs = [];
        this.state.currentGameData.description.forEach(function (element, index) {
            paragraphs.push(<p key={index}>{element}</p>);
        });

        let backClickEvent = this.state.gameMode[0] === "Időre" ? () => "" : () => this.newGame(this.state.selectableGames,
                this.state.gameMode, this.state.modifiers);


        return (
            <div className={"game " + this.state.flip}>
                <div className={"front " + this.state.front}>
                    <div className="game__info">
                        <div className="game__info__basic">
                            <h2 className="title">{this.state.currentGameData.title}</h2>
                            <h3 className="level">Szintek: {levels}</h3>
                        </div>
                        <div className="game__info__description">{paragraphs}</div>
                        <img src={this.state.currentGameData.mainImage} width="auto" height="auto"></img>
                        <p className="game__info__question">{this.state.currentGameData.question}</p>
                    </div>
                    <div className="game__board">
                        <Board
                            data={this.state.currentGameData}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                </div>
                <div className={"back " + this.state.back}
                     onClick={backClickEvent}>
                    <p className="back__text">{this.state.backText}</p>
                </div>
            </div>
        );
    }
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (let i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}


export default Game;