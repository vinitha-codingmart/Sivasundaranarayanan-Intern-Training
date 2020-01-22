import React, { Component } from 'react'
import '../style/Reputation.css'

export default class Reputation extends Component {

    render() {
        let { reputation } = this.props

        let upRepButton = (this.props.Upvote) ? 'upVoted' : ''

        return (
            <div className="reputation">
                <svg className={upRepButton} onClick={e => this.props.function(+1)} viewBox="0 0 36 36" width='36'> <path d="M2 26h32L18 10 2 26z"></path>
                </svg>
                <span className={`reputation-count ${upRepButton}`}>{reputation}</span>
                <svg onClick={e => this.props.function(-1)} viewBox="0 0 36 36" width='36'> <path d="M2 10h32L18 26 2 10z"></path>
                </svg>
            </div>
        )
    }
}
