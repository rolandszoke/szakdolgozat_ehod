import React, { Component } from 'react';
import DnDSquare from './DnDSquare.js';
import Element from './Element.js';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Button from '../Button/Button.js';

class DnD extends Component {
    constructor(props) {
        super(props);
        let l = props.answerImages.length; //mozgatható elemek száma
        let n = props.dropImages.length + props.answerImages.length; //mozgatható elemek száma és a megoldási mezők száma
        let pos = [];
        for (let i = l; i > 0; i--) {
            pos.push(n - i);
        }
        this.state = {
            answerImages: props.answerImages, //mozgatható elemek, képeik
            dropImages: props.dropImages, //üres mezők, melyekbe a választ adjuk meg, képeik
            onClick: props.onClick, //megoldás elküldésének metódusa
            positions: pos, //mozgatható elemek pozíciója (hányadik indexü mezőban szerepelnek sorba az elemek)
            vertical: props.vertical, //megoldási mezők vertikális vagy horizontális állásuak
        };
    }

    componentDidUpdate() {
        console.log(this.state.positions);
    }

    componentWillReceiveProps(nextProps) {
        //új játéknál adatok frissítése
        let l = nextProps.answerImages.length;
        let n = nextProps.dropImages.length + nextProps.answerImages.length;
        let pos = [];
        for (let i = l; i > 0; i--) {
            pos.push(n - i);
        }
        this.setState({
            answerImages: nextProps.answerImages,
            dropImages: nextProps.dropImages,
            onClick: nextProps.onClick,
            positions: pos,
            vertical: nextProps.vertical,
        });
    }

    moveElement(where, which) {
        //mozgatható elem pozíiójának módosítása
        let pos = this.state.positions.slice();
        pos[which] = where;
        this.setState({positions: pos});
    }

    canMoveElement(where, which) {
        //metódus ami figyeli, hogy az adott elemet mozgathatjuk-e az adott mezőbe
        let positionsWithoutCurrent = this.state.positions.slice();
        positionsWithoutCurrent.splice(which, 1);
        if (positionsWithoutCurrent.indexOf(where) > -1) {
            return false;
        } else {
            return true;
        }
    }

    resetBoxes() {
        //újraindítás gomb metódusa
        let l = this.state.answerImages.length;
        let n = this.state.dropImages.length + this.state.answerImages.length;
        let pos = [];
        for (let i = l; i > 0; i--) {
            pos.push(n - i);
        }
        this.setState({positions: pos});
    }

    renderSquare(k, rowNum) {
        //egy mező renderelése
        if (this.state.positions.indexOf(k) > -1) {
            //amennyiben a mezőben szerepel elem, belehelyezzük
            return (
                <DnDSquare key={k} x={k}
                           moveElement={(where, which) => this.moveElement(where, which)}
                           canMoveElement={(where, which) => this.canMoveElement(where, which)}
                           picture="none"
                           rowNum={rowNum}
                           vertical={this.state.vertical}>
                    <Element key={k} id={this.state.positions.indexOf(k)}
                             picture={this.state.answerImages[this.state.positions.indexOf(k)]}
                             vertical={this.state.vertical}/>
                </DnDSquare >
            );
        } else {
            //mező üres
            return (
                <DnDSquare key={k} x={k}
                           moveElement={(where, which) => this.moveElement(where, which)}
                           canMoveElement={(where, which) => this.canMoveElement(where, which)}
                           picture={this.state.dropImages[k]}
                           rowNum={rowNum}
                           vertical={this.state.vertical}
                />
            );
        }
    }

    render() {
        let pos = this.state.positions; //elmek pozíciója
        let squares = []; //mezők
        let targets = []; //megoldási mezők
        let sources = []; //kiindulási mezők
        let targetNumber = this.state.dropImages.length; //megoldási mezők száma
        let elementNumber = this.state.answerImages.length; //mozgatható elemek száma
        let rowNum = Math.max(targetNumber, elementNumber); //egy sorban hány mezőt helyezzünk el, ha horizontális a megoldási mező
        let squareNumber = targetNumber + elementNumber; //összes mező száma

        if (this.state.vertical === "yes") {
            //vertikális megoldási mezők
            for (let i = 0; i < squareNumber; i++) {
                if (i < targetNumber) {
                    targets.push(this.renderSquare(i, 1)); //megoldási mező egy egész sort elfoglal
                } else {
                    sources.push(this.renderSquare(i, 1.5*elementNumber)); //kiindulási mezők
                }
            }
            let verticalSquares = [];
            verticalSquares.push.apply(verticalSquares, targets);
            verticalSquares.push.apply(verticalSquares, sources);
            squares = verticalSquares;
        } else {
            //horizontális megoldási mezők
            for (let i = 0; i < squareNumber; i++) {
                squares.push(this.renderSquare(i, rowNum))
            }
        }

        let targetSquareElements = []; //megoldási mezőkben mely indexű elemek szerepelnek, üres mező = -1
        for (let i = 0; i < targetNumber; i++) {
            targetSquareElements.push(pos.indexOf(i));
        }

        return (
            <div className="ui">
                <div className="dnd">
                    {squares}
                </div>
                <Button value="none" classes="send" onClick={() => this.state.onClick(targetSquareElements)}/>
                <Button value="none" classes="reset" onClick={() => this.resetBoxes()}/>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(DnD);