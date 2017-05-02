import React, { Component } from 'react';
import DnDSquare from './DnDSquare.js';
import Element from './Element.js';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
//touch backend
import { default as TouchBackend } from 'react-dnd-touch-backend';

import Button from '../Button/Button.js';

class DnD extends Component {
    constructor(props) {
        super(props);
        let l = props.dragImages.length; //mozgatható elemek száma
        let n = props.dropImages.length + props.dragImages.length; //mozgatható elemek száma és a megoldási mezők száma
        let pos = [];
        for (let i = l; i > 0; i--) {
            pos.push(n - i);
        }
        this.state = {
            dragImages: props.dragImages, //mozgatható elemek, képeik
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
        let l = nextProps.dragImages.length;
        let n = nextProps.dropImages.length + nextProps.dragImages.length;
        let pos = [];
        for (let i = l; i > 0; i--) {
            pos.push(n - i);
        }
        this.setState({
            dragImages: nextProps.dragImages,
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
        let l = this.state.dragImages.length;
        let n = this.state.dropImages.length + this.state.dragImages.length;
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
                             picture={this.state.dragImages[this.state.positions.indexOf(k)]}
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
        let elementNumber = this.state.dragImages.length; //mozgatható elemek száma
        let rowNum = Math.max(targetNumber, elementNumber); //egy sorban hány mezőt helyezzünk el, ha horizontális a megoldási mező
        let squareNumber = targetNumber + elementNumber; //összes mező száma

        if (this.state.vertical === true) {
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
                <Button value="none" classes="btn--send" onClick={() => this.state.onClick(targetSquareElements)}/>
                <Button value="none" classes="btn--reset" onClick={() => this.resetBoxes()}/>
            </div>
        )
    }
}

//mobil detektáló
function detect() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    if(check){
        console.log("mobile");
        return DragDropContext(TouchBackend({ enableMouseEvents: true }))(DnD);
    } else {
        console.log("pc");
        return DragDropContext(HTML5Backend)(DnD);
    }
}

let exp = detect();

export default exp;
