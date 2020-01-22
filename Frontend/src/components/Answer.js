import React, { Component } from 'react'
import Reputation from './Reputation'

import '../style/Answer.css'
import Axios from 'axios'

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
                user: res.data[0].name
            })
        })
    }

    getDate = (data) => {
        return new Date(data).toLocaleDateString();
    }

    componentDidMount() {
        this.getUserName(this.props.answer.UserId);
    }

    render() {
        let { content, createdAt } = this.props.answer;
        return (
            <div className="answer">
                <Reputation function={this.repute} reputation={this.state.reputation} />
                <div style={{width: '90%'}}><pre style={{ whiteSpace: 'pre-wrap' }}>{content}</pre>
                    <div className="userdetails">
                        <span className="title">answered {this.getDate(createdAt)}</span>
                        <div style={{alignItems:'flex-start', display: 'flex'}}>
                            <img alt="account" src="account.png" height="30px"></img>
                            <span className="user">{this.state.user}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
