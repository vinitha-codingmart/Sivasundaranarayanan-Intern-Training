import React, { Component } from 'react'
import Answer from './Answer'

import '../style/Answers.css'
import Axios from 'axios';
import Button from './Button';

export default class Answers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            answers: this.props.Answer
        }
    }

    addAnswer = () => {
        let token = localStorage.getItem('User')
        if (token)
            Axios.post('http://localhost:3001/addAnswer', {
                QuestionId: this.props.id,
                content: this.state.content
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then((res) => {
                if (res.data !== 401) {
                    let data = res.data
                    data.Comments = []
                    this.state.answers.push(data)
                } else {
                    alert('Login to answer this question')
                }
            }).then(() => {
                this.setState({ content: '' })
            })
        else
            alert('Login to answer this question')
    }

    deleteAnswer = (index) => {
        let permission = window.confirm("Do you want to delete the answer")
        let token = localStorage.getItem('User')
        if (permission && token)
            Axios.post('http://localhost:3001/deleteAnswer', {
                id: this.state.answers[index].id
            }, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then((res) => {
                if (res.data !== '401' && res.data.id) {
                    let { answers } = this.state
                    answers.splice(index, 1)
                    this.setState({
                        answers
                    })
                }
            })


    }

    updateText = event => {
        this.setState({
            content: event.target.value
        });
    }

    getCount = (count) => {
        if (count > 1)
            return ([count] + " Answers");
        else if (count.toString() === '1')
            return ([count] + " Answer");
        else
            return;
    }

    render() {


        let { length } = this.state.answers

        return (
            <div className="answerBox" >
                <span className="answerCount">
                    {(length > 0) ? `${length} Answer${(length - 1) ? 's' : ''} ` : ''}
                </span>
                {
                    this.state.answers.map((answer, index) =>
                        <Answer deleteFunction={e => this.deleteAnswer(index)} key={index} id={answer.aid} answer={answer}></Answer>
                    )
                }
                <div className="aBox">
                    <span>Your Answer</span>
                    <textarea placeholder="Enter your answer here..." value={this.state.content} onChange={this.updateText} ></textarea>
                    <Button styleName="blue" name="Post Your Answer" clickEvent={this.addAnswer} />
                </div>
            </div >
        )
    }
}
