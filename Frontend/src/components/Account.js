import React, { Component } from 'react'
import '../style/Account.css'

export default class Account extends Component {

    render() {
        return (

            <div onClick={this.props.clickEvent} className="account" style={this.props.style}>    
                <img alt="Account" src="account.png" height="32" />
            </div>
        )
    }
}
