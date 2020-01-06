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
        Axios.post('http://localhost:3001/addAnswer', {
            qid: this.props.id+1,
            content: this.state.content
        }).then((res) => {
            this.fetchAnswers();
        }).then(() => {
            this.setState({
                content: ''
            })
        }).then( () => {
            this.props.cancelEvent()
        })
    }

    fetchAnswers = () => {
        Axios.get(`http://localhost:3001/getAnswer?id=${this.props.id+1}`)
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

    render() {
        let areaStyle = {
            width: (this.props.addArea) ? '100%' : '0',
            height: (this.props.addArea) ? '50%' : '0',
            display: (this.props.addArea) ? 'block' : 'none'
        };
        return (
            <div className="answerBox" >
                {
                    this.state.answers.map((answer, index) => 
                        <Answer key={index} id={answer.aid} >{answer.content}</Answer>
                    )
                }
                <div style={areaStyle} >
                    <textarea value={this.state.content} onChange={this.updateText} className="aBox" ></textarea>
                    <Button styleName="blue" name="Add" clickEvent={this.addAnswer} />
                    <Button styleName="grey" name="Cancel" clickEvent={this.props.cancelEvent} />
                </div>
            </div >
        )
    }
}
