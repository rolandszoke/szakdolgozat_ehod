import React, { Component, PropTypes } from 'react';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const elementSource = {
    beginDrag(props) {
        console.log(props.id + ". element picked up");
        return { pieceId: props.id };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Element extends Component {

    render() {
        const { connectDragSource, isDragging } = this.props;
        let vertical;
        if(this.props.vertical=== true) {
            vertical=" vertical";
        } else {
            vertical=" ";
        }
        return connectDragSource(
            <div className={"element" + vertical} style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                background:'url(' + this.props.picture + ') no-repeat center center',
            }}>
            </div>
        );
    }
}

Element.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    vertical: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.ELEMENT, elementSource, collect)(Element);