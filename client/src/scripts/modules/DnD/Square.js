import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            picture: props.picture,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({classes: nextProps.classes, picture: nextProps.picture});
    }

    render() {
        let style = "";
        if(typeof this.state.picture !== 'undefined' && this.state.picture !== 'none'){
            style="url('" +this.state.picture+ "') no-repeat center center";
        }

        return (
            <div className={"dropBox " + this.state.classes}
                 style={{
                     background: style,
                 }}>
                {this.props.children}
            </div>
        );
    }
}

Square.propTypes = {
    classes: PropTypes.string.isRequired,
    picture: PropTypes.string,
};