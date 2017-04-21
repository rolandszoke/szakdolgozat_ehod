import React, { Component } from 'react';

export default class Square extends Component {
    render() {
        let style = "";
        if(typeof this.props.picture !== 'undefined' && this.props.picture !== 'none'){
            style="url('" +this.props.picture+ "') no-repeat center center";
        }

        return (
            <div className={"dropBox " + this.props.classes}
                 style={{
                     background: style,
                 }}>
                {this.props.children}
            </div>
        );
    }
}