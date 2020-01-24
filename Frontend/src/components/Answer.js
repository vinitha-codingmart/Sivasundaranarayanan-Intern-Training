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
            user: ""
        }
    }


    repute = (rep) => {
        let reputation = this.state.reputation + rep;
        Axios.put('http://localhost:3001/updateAnsRep', {
            reputations: reputation,
            aid: this.props.id
        }).then((res) => {
            this.setState({
                reputation: reputation
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

    getDate = (data) => {
        var dateOptions = { year: "numeric", month: "short", day: "2-digit" };
        let date = new Date(data).toLocaleDateString('en-US', dateOptions) 
        return date;
    }

    componentDidMount() {
        this.getUserName(this.props.answer.UserId);
    }

    render() {
        let opStyle = {
            display: true ? 'block' : 'none',
            marginLeft: '.75rem'
        }
        let { content, createdAt } = this.props.answer;

        return (
            <div className="answer">
                <Reputation function={this.repute} reputation={this.state.reputation} />
                <div style={{ width: '90%', fontSize: "15px", color: "#242729" }}><pre style={{ whiteSpace: 'pre-wrap' }}>{content}</pre>
                    <div style={opStyle}>
                        <Option styleName="cmtGrey">delete</Option>
                    </div>
                    <div className="userdetails">
                        <span className="title">answered {this.getDate(createdAt)}</span>
                        <div style={{ alignItems: 'flex-start', display: 'flex' }}>
                            <img alt="account" src="/account.png" height="30px"></img>
                            <span className="user">{this.state.user}</span>
                        </div>
                    </div>
                    <div className="comment">
                        <Comments AnswerId={this.props.answer.id} Comments={this.props.answer.Comments}/>
                    </div>
                </div>
            </div>
        )
    }
}
