import React, { Component } from 'react'
import '../style/DroplistQuestion.css'

export default class DropQuestion extends Component {
    render() {
        return (
            <div className="droplist">
                <div className="drop-rep">{this.props.reputation}</div>
                <span onClick={this.props.clickEvent}>{this.props.children}</span>
            </div>
        )
    }
}
