import React, { Component } from 'react'
import Axios from 'axios'
import {withRouter} from 'react-router-dom'
import QuestionLink from '../../components/QuestionLink'

import './UserPage.css'

class UserPage extends Component {

    constructor() {
        super()
        this.state = {
            userName: '',
            response: []
        }
    }

    getUserDetails = () => {
        let token = localStorage.getItem('User')
        if (token)
            Axios.get('http://localhost:3001/User', {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then((res) => {
                if (res.data)
                    this.setState({
                        userName: res.data.name
                    })
            })
    }

    getUserQuestions = () => {
        let token = localStorage.getItem('User')
        if (token)
            Axios.get('http://localhost:3001/getUserQuestion', {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then((res) => {
                if (res.data !== 401)
                    this.setState({
                        response: res.data
                    })
                else
                    this.props.history.push('/')

            })
        else
            this.props.history.push('/')
    }

    removeUser = () => {
        Axios.get('http://localhost:3001/logout', {
            headers: { Authorization: `bearer ${localStorage.getItem('User')}` }
        }).then((res) => {
            localStorage.removeItem('User');
            this.props.history.push('/')
        })
    }

    componentDidMount() {
        this.getUserDetails()
        this.getUserQuestions()
    }

    render() {
        let { response } = this.state;

        return (
            <div className='UserPage-wrapper'>
                <div className="UserPage-header">
                    <span className="userName">{this.state.userName}</span>
                    <span className="logout" onClick={e => this.removeUser()}>[logout]</span>
                </div>
                <div className="UserPageContent">
                    <div className="UserQuestions">
                        <div className="Contentheader">
                            {response.length}
                            <span>
                                Question{(response.length - 1) ? 's' : ' '}
                            </span>
                        </div>
                        <div className="ContentItems">
                            {response.map((question, index) =>
                                <QuestionLink filterFunction={this.props.filterFunction} Question={question} key={index} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserPage)
