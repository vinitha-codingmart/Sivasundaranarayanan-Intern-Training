import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../style/Account.css'

class Account extends Component {

    OpenAccount = () => {
        this.props.history.push('/users')
    }

    render() {
        return (

            <div onClick={this.OpenAccount} className="account" style={this.props.style}>
                <img alt="Account" src="/account.png" height="32" />
            </div>
        )
    }
}

export default withRouter(Account)