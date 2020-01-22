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
            answers: []
        }
    }

    addAnswer = () => {
        let token = localStorage.getItem('User')
        Axios.post('http://localhost:3001/addAnswer', {
            QuestionId: this.props.id,
            content: this.state.content
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => this.fetchAnswers())
            .then(() => this.setState({ content: '' }, () => this.props.cancelEvent()))

    }

    fetchAnswers = () => {
        Axios.get(`http://localhost:3001/getAnswer?id=${this.props.id}`)
            .then((res) => {
                this.setState({
                    answers: res.data
                });
            })
    }

    componentDidMount() {
        this.fetchAnswers();
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
        let areaStyle = {
            width: (this.props.addArea) ? '100%' : '0',
            height: (this.props.addArea) ? '50%' : '0',
            display: (this.props.addArea) ? 'block' : 'none'
        };
        return (
            <div className="answerBox" >
                <span className="answerCount">{this.getCount([this.state.answers.length])}</span>
                {
                    this.state.answers.map((answer, index) =>
                        <Answer key={index} id={answer.aid} answer={answer}></Answer>
                    )
                }
                < div style={areaStyle} >
                    <textarea value={this.state.content} onChange={this.updateText} className="aBox" ></textarea>
                    <Button styleName="blue" name="Add" clickEvent={this.addAnswer} />
                    <Button styleName="grey" name="Cancel" clickEvent={this.props.cancelEvent} />
                </div >
            </div >
        )
    }
}
