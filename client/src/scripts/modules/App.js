import React, {Component} from 'react';
import Menu from './Menu.js';
import Game from './Game.js';
import CreateTest from './CreateTest.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameMode: ["Felfedező", "Összes"], //kiválasztott játék mód
            modifiers: ["Könnyű", "Közepes", "Nehéz"], //kiválaszott nehézségi szintek
            createTest: false, //ha igaz, akkor a feladat ablak bezárva lesz
        };
    }

    openCreateTest(bool) {
        this.setState({
            createTest: bool,
            gameMode: ["Felfedező", "Összes"],
            modifiers: ["Könnyű", "Közepes", "Nehéz"]
        }); //tesztet készítő ablak megnyitása/bezárása
    }

    changeGameMode(e, g) {
        //játékmód módosítása
        let gameMode = this.state.gameMode.slice();
        gameMode[g - 1] = e;
        if (gameMode[0] !== "Felfedező" && parseInt(g) === 2) {
            gameMode[0] = "Felfedező"; //időre játszás közbe módosítunk játékmódot visszaugrunk felfedezőre
        }
        if (gameMode[0] === "Teszt" || gameMode[1] === "Összes" || gameMode[0] === "Időre") {
            this.setState({modifiers: ["Könnyű", "Közepes", "Nehéz"]}); //adott játékmódoknál tilos nehézségi szintet váltani
        }
        this.setState({gameMode: gameMode});
    }

    changeModifiers(e) {
        //nehézségi szint módosítás
        let modifiers = this.state.modifiers.slice();
        let index = modifiers.indexOf(e);
        if (index > -1) {
            modifiers.splice(index, 1);
        } else {
            modifiers.push(e);
        }
        this.setState({modifiers: modifiers});
    }


    render() {
        return (
            <div className="app">
                <Menu changeGameMode={(e, g) => this.changeGameMode(e, g)}
                      changeModifiers={(e) => this.changeModifiers(e)}
                      gameMode={this.state.gameMode}
                      modifiers={this.state.modifiers}
                />
                <CreateTest openCreateTest={(i) => this.openCreateTest(i)}/>
                <h1>E-hod</h1>
                {this.state.createTest ? "" : <Game gameMode={this.state.gameMode} modifiers={this.state.modifiers}/>}
                <div className="bg" style={{background: 'url(src/img/background.jpg) no-repeat 0 0'}}></div>
            </div>
        );
    }
}

export default App;