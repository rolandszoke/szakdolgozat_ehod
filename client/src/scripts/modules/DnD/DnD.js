import React, {Component, PropTypes} from 'react';
import DnDSquare from './DnDSquare.js';
import Element from './Element.js';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Button from '../Button/Button.js';

class DnD extends Component {
    constructor(props) {
        super(props);
        let l = props.answerImages.length;
        let n = props.dropImages.length + props.answerImages.length;
        let pos = [];
        for (let i = l; i > 0; i--) {
            pos.push(n - i);
        }
        this.state = {
            answerImages: props.answerImages,
            dropImages: props.dropImages,
            onClick: props.onClick,
            positions: pos,
            vertical: props.vertical,
            watching: props.watching,
        };
    }

    componentDidUpdate() {
        console.log(this.state.positions);
    }

    componentWillReceiveProps(nextProps) {
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
            watching: nextProps.watching,
        });
    }

    moveElement(where, which) {
        let pos = this.state.positions.slice();
        pos[which] = where;
        this.setState({positions: pos});
    }

    canMoveElement(where, which) {
        let positionsWithoutCurrent = this.state.positions.slice();
        positionsWithoutCurrent.splice(which, 1);
        if (positionsWithoutCurrent.indexOf(where) > -1) {
            return false;
        } else {
            return true;
        }
    }

    resetBoxes() {
        let l = this.state.answerImages.length;
        let n = this.state.dropImages.length + this.state.answerImages.length;
        let pos = [];
        for (let i = l; i > 0; i--) {
            pos.push(n - i);
        }
        this.setState({positions: pos});
    }

    renderSquare(k, rowNum) {
        if (this.state.positions.indexOf(k) > -1) {
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
        let pos = this.state.positions;
        let squares = [];
        let targets = [];
        let elements = [];
        let targetNumber = this.state.dropImages.length;
        let elementNumber = this.state.answerImages.length;
        let rowNum = Math.max(targetNumber, elementNumber);
        let squareNumber = targetNumber + elementNumber;

        if (this.state.vertical === "yes") {
            for (let i = 0; i < squareNumber; i++) {
                if (i < targetNumber) {
                    targets.push(this.renderSquare(i, 1))
                } else {
                    elements.push(this.renderSquare(i, 100))
                }
            }
            let verticalSquares = [];
            verticalSquares.push.apply(verticalSquares, targets);
            verticalSquares.push.apply(verticalSquares, elements);
            squares = verticalSquares;
        } else {
            for (let i = 0; i < squareNumber; i++) {
                squares.push(this.renderSquare(i, rowNum))
            }
        }

        let p = [];
        for (let i = 0; i < targetNumber; i++) {
            p.push(pos.indexOf(i));
        }
        pos = p;

        return (
            <div className="ui">
                <div className="dnd">
                    {squares}
                </div>
                <Button value="none" classes="send" onClick={() => this.state.onClick(pos)}/>
                <Button value="none" classes="reset" onClick={() => this.resetBoxes()}/>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(DnD);