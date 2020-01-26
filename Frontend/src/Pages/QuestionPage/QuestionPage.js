import React, { Component } from 'react'
import Axios from 'axios'
import Question from '../../components/Question'

import './QuestionPage.css'

export default class QuestionPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            question: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.setState({
                question: {},
                id: this.props.id,
                Upvote: false
            }, this.initiateCall(this.props.id))
        }
    }

    getQuestion = (id) => {
        Axios.get(`http://localhost:3001/getQuestion?id=${id}`).then(
            (res) => {
                if (res.data[0])
                    this.setState({
                        question: res.data[0]
                    })
            }
        )
    }


    initiateCall = (id) => {
        this.getQuestion(id);
    }

    componentDidMount() {
        this.initiateCall(this.state.id)
    }

    render() {
        let { question } = this.state

        return (
            <div className="QuestionPage">
                {this.state.question.id &&
                    <Question filterFunction={this.props.filterFunction} id={question.id} Question={question} />
                }
            </div>
        )
    }
}
