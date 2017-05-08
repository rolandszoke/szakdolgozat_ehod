import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
    canDrop(props, monitor) {
        return props.canMoveElement(props.x,monitor.getItem().pieceId);
    },
    drop(props, monitor) {
        console.log(monitor.getItem().pieceId + ". element moved to: " + props.x + " position");
        props.moveElement(props.x,monitor.getItem().pieceId);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class DnDSquare extends Component {
    render() {
        const { connectDropTarget, isOver } = this.props;
        const overlay = isOver ? [' dropBox--overlay'] : [' '];
        let target;
        if(this.props.picture!=="none") {
            target=" dropBox--target";
        } else {
            target=" dropBox--source";
        }
        let vertical;
        if(this.props.vertical=== true) {
            vertical=" dropBox--vertical";
        } else {
            vertical=" ";
        }
        let flexBasis = 100/this.props.rowNum;
        return connectDropTarget(
            <div className="flexBox" style={{flexBasis: flexBasis + "%"}}>
                <Square classes={overlay + target + vertical} picture={this.props.picture}>
                    {this.props.children}
                </Square>
            </div>
        );
    }
}

DnDSquare.propTypes = {
    x: PropTypes.number.isRequired,
    canMoveElement: PropTypes.func.isRequired,
    moveElement: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    rowNum: PropTypes.number.isRequired,
    picture: PropTypes.string,
    vertical: PropTypes.bool.isRequired,
};

export default DropTarget(ItemTypes.ELEMENT, squareTarget, collect)(DnDSquare);