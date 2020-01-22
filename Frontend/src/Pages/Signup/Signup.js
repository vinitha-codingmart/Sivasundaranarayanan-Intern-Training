import React, { Component } from 'react';
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { withRouter } from 'react-router';
import Axios from 'axios';

import '../../style/AuthType.css';

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            uName: "",
            uMail: "",
            uPass: ""
        }
    }

    createUser = () => {
        let { uName, uPass, uMail } = this.state;
        Axios.post('http://localhost:3001/createUser', {
            name: uName,
            password: uPass,
            mail: uMail
        }).then((res) => {
            if (res.data === 409)
                alert('User already present')
            else 
                this.storeState(res.data)
        })
    }

    storeState = (data) => {
        localStorage.setItem('User', data.token)
        this.props.history.push('/')
    }

    handleText = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let btnStyle = {
            width: '100%',
            margin: '2.5rem 0'
        }
        return (

            <div className='authBox' style={this.props.style}>
                <div>
                    <Logo alt="Stack Overflow" height="50px" width="50px" src="favicon.ico" />
                </div>
                <div className="authInputBox">
                    <input placeholder=" " name="uName" onChange={e => this.handleText(e)} type='text'></input>
                    <label>Display Name</label>
                </div>
                <div className="authInputBox">
                    <input placeholder=" " name="uMail" onChange={e => this.handleText(e)} type='text'></input>
                    <label>Email</label>
                </div>
                <div className="authInputBox">
                    <input placeholder=" " name="uPass" onChange={e => this.handleText(e)} type='password'></input>
                    <label>Password</label>
                </div>
                <Button clickEvent={e => this.createUser()} styleName="blue" name="Sign up" style={btnStyle} />
            </div>
        )
    }
}

export default withRouter(Signup)
