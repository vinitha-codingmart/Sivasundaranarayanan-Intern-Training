import React, { Component } from 'react'
import Login from '../Login/Login'
import SignUp from '../Signup/Signup'

import './Auth.css'
import Axios from 'axios'

export default class Auth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            logFlag: true
        }
    }

    componentDidMount() {
        if (localStorage.getItem('User'))
            Axios.get('http://localhost:3001/', {
                headers: {
                    Authorization: `bearer ${localStorage.getItem('User')}`
                }
            }).then((res) => {
                console.log(res)
                if (res.data !== 401)
                    this.props.history.push('/')
            })
    }

    toggle = (toLogin) => {
        if (toLogin)
            this.setState({ logFlag: true })
        else
            this.setState({ logFlag: false })
    }

    render() {

        let lClass = (this.state.logFlag) ? "active" : ""
        let sClass = (this.state.logFlag) ? "" : "active"

        let lStyle = {
            display: (this.state.logFlag) ? 'flex' : 'none',
            width: (this.state.logFlag) ? "100%" : "0%"
        }
        let sStyle = {
            display: (this.state.logFlag) ? 'none' : 'flex',
            width: (this.state.logFlag) ? "0%" : "100%"
        }

        return (
            <div className="auth">
                <div className="authBody">
                    <div className="authTypeDef">
                        <div onClick={e => this.toggle(true)} className={`authSwitch ${lClass}`}>Login</div>
                        <div onClick={e => this.toggle(false)} className={`authSwitch ${sClass}`}>SignUp</div>
                    </div>
                    <div className="authTypes">
                        <SignUp style={sStyle}></SignUp>
                        <Login style={lStyle}></Login>
                    </div>
                </div>
            </div>
        )
    }
}
