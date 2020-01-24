import React, { Component } from 'react'
import Axios from 'axios'

import '../style/Comment.css'

export default class Comment extends Component {
    constructor() {
        super()
        this.state = {
            user: ""
        }
    }

    getUserName = (id) => {
        Axios.get(`http://localhost:3001/getUserName?UserId=${id}`)
            .then((res) => {
                this.setState({
                    user: res.data.name
                })
            })
    }

    

    componentDidMount() {
        this.getUserName(this.props.comment.UserId)
    }

    render() {
        var dateOptions = { year: "numeric", month: "short", day: "2-digit" };
        var timeOptions = {  hour: "numeric", minute: "2-digit"};
        let date = new Date(this.props.comment.createdAt).toLocaleDateString('en-US', dateOptions) + ' at '
        date += new Date(this.props.comment.createdAt).toLocaleTimeString('en-US', timeOptions)
        return (
            <div className="CommentWrapper">
                <div className="CommentContent">{this.props.comment.content}</div>
                - <div className="CommentUser">{this.state.user}</div>
                <div className="CommentTime"> {date}</div>
            </div>
        )
    }
}
