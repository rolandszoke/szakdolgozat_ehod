import React, {Component} from 'react';

class CreateTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            allGames: require("json-loader!../../json/games.json"),
            checkCreateTest: props.checkCreateTest,
            checked: [],
        };
    }

    openList() {
        this.setState({open: true});
        this.state.checkCreateTest(true);
    }

    closeList() {
        this.setState({open: false});
        this.state.checkCreateTest(false);
    }

    checkGame(id) {
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
        let checked = this.state.checked.indexOf(game.id) !== -1 ? "--checked" : "--unchecked";
        let icon = this.state.checked.indexOf(game.id) !== -1 ? "L" : "X";
        let levels = "";
        game.level.sort();
        game.level.forEach(function (element) {
            levels += element + "; ";
        });

        return (
            <tr className={"table__item table__item" + checked} key={game.id}
                 onClick={() => this.checkGame(game.id)}>
                <th><div className={"check check"+checked}><span>{icon}</span></div>{game.title}</th>
                <th>{levels}</th>
            </tr>
        )
    }


    render() {
        let open = this.state.open ? "--open" : "--closed";
        let list = [];
        let _this = this;

        this.state.allGames.games.forEach(function (element) {
            let g = (require("../../json/" + element));
            list.push(_this.renderListElement(g));
        });


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
                        <div className="listBox__button listBox__button--send">
                            <span>Kód generálás</span>
                        </div>
                        <div className="listBox__button listBox__button--cancel" onClick={() => this.closeList()}>
                            <span>Mégse</span>
                        </div>
                    </div>
                </div>
                <div className={"shadow shadow" + open}></div>
            </div>
        );
    }
}

export default CreateTest;