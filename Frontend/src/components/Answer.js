import React, { Component } from 'react'
import Reputation from './Reputation'

import '../style/Answer.css'
import Axios from 'axios'
import Comments from './Comments';
import Option from './Option';

export default class Answer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reputation: this.props.answer.reputations,
            user: "",
            validUser: false,
            Upvote: false
        }
    }

    checkCurrentUser = (id) => {
        let token = localStorage.getItem('User')
        let validUser = false;
        if (token)
            Axios.get(`http://localhost:3001/?id=${id}`, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then((res) => {
                if (res.data !== 401 && res.data)
                    validUser = true
                this.setState({
                    validUser
                })
            })
    }

    repute = (forUp) => {
        if ((this.state.Upvote && forUp < 0) || (forUp > 0 && !this.state.Upvote)) {
            let rep = this.state.reputation + forUp;
            let id = this.props.answer.id
            let token = localStorage.getItem("User")
            if (rep + 1) {
                Axios.put('http://localhost:3001/updateAnsRep', {
                    reputations: rep,
                    id: id,
                    flag: (forUp < 0) ? false : true
                }, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }).then((res) => {
                    console.log(res)
                    if (res.data !== 401)
                        if (!res.data.flag) {
                            this.setState({
                                reputation: rep,
                                Upvote: true
                            })
                        } else {
                            this.setState({
                                reputation: rep,
                                Upvote: false
                            })
                        }
                    else
                        alert('Log in to repute the question')
                })
            }
        }
    }

    getUserName = (id) => {
        Axios.get(`http://localhost:3001/getUserName?UserId=${id}`, {
        }).then((res) => {
            if (res.data)
                this.setState({
                    name: res.data.name
                })
        })
    }

    getUserName = (id) => {
        Axios.get(`http://localhost:3001/getUserName?UserId=${id}`).then((res) => {
            this.setState({
                user: res.data.name
            })
        })
    }

    checkUpvote = (AnswerId) => {
        let token = localStorage.getItem('User')
        if (token)
            Axios.get(`http://localhost:3001/checkUpvote?id=${AnswerId}&type=ans`,
                {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }).then((res) => {
                    if (res.data && res.data !== '401') {
                        this.setState({
                            Upvote: true
                        })
                    }
                })
    }

    getDate = (data) => {
        var dateOptions = { year: "numeric", month: "short", day: "2-digit" };
        let date = new Date(data).toLocaleDateString('en-US', dateOptions)
        return date;
    }

    componentDidMount() {
        this.getUserName(this.props.answer.UserId);
        this.checkCurrentUser(this.props.answer.UserId)
        this.checkUpvote(this.props.answer.id, this.props.answer.UserId)
    }

    render() {
        let opStyle = {
            display: this.state.validUser ? 'block' : 'none',
            marginLeft: '.75rem'
        }
        let { content, createdAt, id } = this.props.answer;

        return (
            <div className="answer">
                <Reputation Upvote={this.state.Upvote} function={this.repute} reputation={this.state.reputation} />
                <div style={{ width: '90%', fontSize: "15px", color: "#242729" }}><pre style={{ whiteSpace: 'pre-wrap' }}>{content}</pre>
                    <div style={opStyle}>
                        <Option clickEvent={e => this.props.deleteFunction(id)} styleName="cmtGrey">delete</Option>
                    </div>
                    <div className="userdetails">
                        <span className="title">answered {this.getDate(createdAt)}</span>
                        <div style={{ alignItems: 'flex-start', display: 'flex' }}>
                            <img alt="account" src="/account.png" height="30px"></img>
                            <span className="user">{this.state.user}</span>
                        </div>
                    </div>
                    <div className="comment">
                        <Comments AnswerId={this.props.answer.id} Comments={this.props.answer.Comments} />
                    </div>
                </div>
            </div>
        )
    }
}
