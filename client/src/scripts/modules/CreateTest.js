import React, {Component} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

class CreateTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false, //true: ablak nyitva van, false: zárva
            allGames: require("json-loader!../../json/games.json"), //a kiválasztható játékok listája az adott szűrést alkalmazva
            openCreateTest: props.openCreateTest, //paraméterbe megadott metódus a megnyitásra/bezárásra
            checked: [], //kijelölt feladatok id-jének listája
            code: "", //elkészített kód a kijelölt játékok listájából
            copied: false, //másoló gomb megnyomásának visszajelzése
        };
    }

    openList() {
        //lista megnyitása
        this.setState({open: true});
        this.state.openCreateTest(true);
    }

    closeList() {
        //lista bezárása
        this.setState({open: false, checked: [], code: "", copy: false});
        this.state.openCreateTest(false);
    }

    getCode() {
        //kód elkészítése
        let code = "";
        this.state.checked.forEach(function (e) {
            code += e + ".";
        });
        this.setState({code: code});
    }

    copy() {
        //kód másolásának visszajelzése
        this.setState({copied: true});
    }

    checkGame(id) {
        //játék kiválasztása a listába vagy törlése a listából
        let checked = this.state.checked.slice();
        let index = checked.indexOf(id);
        if (index !== -1) {
            checked.splice(index, 1);
        } else {
            checked.push(id);
        }
        this.setState({checked: checked});
    }

    renderListElement(game) {
        //lista elemek ekészítése
        let checked = this.state.checked.indexOf(game.id) !== -1 ? "--checked" : "--unchecked"; //kivan-e választva
        let icon = this.state.checked.indexOf(game.id) !== -1 ? "L" : "X"; //icon tartalma
        let levels = ""; //játék szintje, nehézséggel
        game.level.sort();
        game.level.forEach(function (element) {
            levels += element + "; ";
        });

        return (
            <tr className={"table__item table__item" + checked} key={game.id}
                onClick={() => this.checkGame(game.id)}>
                <th>
                    <div className={"check check" + checked}><span>{icon}</span></div>
                    {game.title}</th>
                <th>{levels}</th>
            </tr>
        )
    }


    render() {
        let open = this.state.open ? "--open" : "--closed"; //ablak megjelenítése/bezárása
        let list = []; //lista elemei
        let _this = this;

        this.state.allGames.games.sort(); //abc sorrend név szerint
        this.state.allGames.games.forEach(function (element) {
            let g = (require("../../json/" + element));
            list.push(_this.renderListElement(g));
        });

        let popupMod = this.state.code === "" ? "--closed" : "--open"; //popup ablak nyitás/zárás
        let codeMod = this.state.copied === false ? "--notCopied" : "--copied"; //másolás visszajelzése

        return (
            <div className="createTest">
                <div className="createTest__opener">
                    <div className="createTest__button" onClick={() => this.openList()}>
                        <span>Teszt készítése</span>
                    </div>
                </div>
                <div className={"listBox listBox" + open}>
                    <div className="listBox__header">
                        <span>Válasszon feladatokat a testreszabott teszt elkészítéséhez.</span>
                    </div>
                    <div className="table">
                        <table >
                            <thead>
                            <tr className="table__header">
                                <th>Cím</th>
                                <th>Szintek</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list}
                            </tbody>
                        </table>
                    </div>
                    <div className="listBox__footer">
                        <div className="listBox__button listBox__button--send" onClick={() => this.getCode()}>
                            <span>Kód készítése</span>
                        </div>
                        <div className="listBox__button listBox__button--close" onClick={() => this.closeList()}>
                            <span>Bezár</span>
                        </div>
                    </div>
                </div>
                <div className={"popup popup" + popupMod}>
                    <div className="popup__close" onClick={() => this.setState({code: "", copied: false})}>X</div>
                    <div className={"code code" + codeMod}>{this.state.code}</div>
                    <CopyToClipboard text={this.state.code} onCopy={() => this.copy()}>
                        <div className="popup__copy">Másol</div>
                    </CopyToClipboard>
                </div>
                <div className={"shadow shadow" + open} onClick={() => this.closeList()}></div>
            </div>
        );
    }
}

export default CreateTest;