import React, { Component } from 'react'
import Axios from 'axios';
import Tag from './Tag';

import {withRouter} from 'react-router-dom'

import '../style/QuestionLink.css'

class QuestionLink extends Component {

    constructor() {
        super()
        this.state = {
            answerCount: 0,
            tags: []
        }
    }

    getTag = () => {
        let id = this.props.Question.id;
        Axios.get(`http://localhost:3001/getTag?id=${id}`
        ).then((res) => {
            this.setState({
                tags: res.data
            })
        })
    }

    openQuestion = (id) => {
        this.props.history.push(`/question/${id}`)
    }

    getAnswerCount = () => {
        let id = this.props.Question.id;
        Axios.get(`http://localhost:3001/getAnswerCount?id=${id}`)
            .then((res) => {
                this.setState({ answerCount: res.data.count })
            })
    }

    componentDidMount() {
        this.getAnswerCount()
        this.getTag()
    }

    render() {

        let { reputations, title, id } = this.props.Question
        let ansClass = this.state.answerCount ? 'answered' : ''

        return (
            <div className="questionLink">
                <div className={`AnswerCount ${ansClass}`}>
                    <span>{this.state.answerCount}</span>
                    answer{(this.state.answerCount - 1) ? 's' : '\u00a0'}
                </div>
                <div className="quesRep">
                    <span>{reputations}</span>
                    vote{(reputations - 1) ? 's' : "\u00a0"}
                </div>
                <div className="questions">
                    <div className="title" onClick={e => this.openQuestion(id)}>
                        {title}
                    </div>
                    <div>
                        {this.state.tags.map((tag, index) =>
                            <Tag clickEvent={this.props.filterFunction} link={true} key={index}>{tag.tag}</Tag>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(QuestionLink)
