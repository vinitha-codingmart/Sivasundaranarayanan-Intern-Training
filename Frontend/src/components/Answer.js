import React, { Component } from 'react'

export default class Answer extends Component {



    render() {
        return (
            <div>
                <span>{this.props.children}</span>
            </div>
        )
    }
}
