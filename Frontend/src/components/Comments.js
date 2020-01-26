import React, { Component } from 'react'
import Button from './Button'
import '../style/Comments.css'
import Option from './Option'
import Comment from './Comment'
import Axios from 'axios'

export default class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addComment: false,
            comment: "",
            Comments: props.Comments
        }
    }

    toggleComment = (flag) => {
        this.setState({
            addComment: flag
        })
    }



    addComment = () => {
        let token = localStorage.getItem('User')
        if (token)
            Axios.post('http://localhost:3001/addComment', {
                content: this.state.comment,
                AnswerId: this.props.AnswerId
            }, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then((res) => {
                if (res.data && res.data !== 401)
                    this.setState({
                        Comments: [...this.state.Comments, res.data],
                        addComment: false,
                        comment: ""
                    })
                else
                    alert('Login to add comment')

            })
        else {
            alert('Login to add comment')
        }
    }

    handleText = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let cmtStyle = {
            display: this.state.addComment ? 'block' : 'none'
        }, optStyle = {
            display: !this.state.addComment ? 'block' : 'none'
        }
        return (
            <div className="Comments">
                <div>
                    {this.state.Comments.map((comment, index) =>
                        <Comment comment={comment} key={index} />
                    )}
                </div>
                <div style={optStyle}>
                    <Option styleName="cmtBlue" clickEvent={e => this.toggleComment(true)}> Add a comment</Option>
                </div>
                <div style={cmtStyle}>
                    <textarea value={this.state.comment} name='comment' onChange={e => this.handleText(e)} placeholder='Use comments to reply others' className='commentBox'></textarea>
                    <div className='commentBoxOption'>
                        <Button clickEvent={this.addComment} styleName="blue" name="Add comment"></Button>
                        <Option styleName="cmtGrey" clickEvent={e => this.toggleComment(false)}>cancel</Option>
                    </div>
                </div>
            </div>
        )
    }
}
