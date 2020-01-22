import React, { Component } from 'react';
import Button from '../../components/Button'
import Logo from '../../components/Logo'

import '../../style/AuthType.css';
import Axios from 'axios';
import { withRouter } from 'react-router';

 class Login extends Component {

    constructor() {
        super()
        this.state = {
            uMail: "",
            uPass: ""
        }
    }

    loginUser = () => {
        Axios.post('http://localhost:3001/verifyUser', {
            mail: this.state.uMail,
            password: this.state.uPass
        }).then((res) => {
            if (!res.data)
                alert('Invalid User or Password')
            else
                this.storeState(res.data)
        })
    }

    storeState = (data) => {
        localStorage.setItem('User',data.token)
        this.props.history.push('/');
    }

    handleText = e => {
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
                    <input placeholder=" " name="uMail" type='text' onChange={e => this.handleText(e)}></input>
                    <label>Email</label>
                </div>
                <div className="authInputBox">
                    <input placeholder=" " name="uPass" type='password' onChange={e => this.handleText(e)}></input>
                    <label>Password</label>
                </div>
                <Button clickEvent={e => this.loginUser()} styleName="blue" name="Login" style={btnStyle} />

            </div>
        )
    }
}


export default withRouter(Login)