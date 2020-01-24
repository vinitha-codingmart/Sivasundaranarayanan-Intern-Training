import React, { Component } from 'react'
import DropQuestion from './DroplistQuestion';
import {withRouter} from 'react-router-dom'

 class Droplist extends Component {


    OpenQuestion = (id) => {
        this.props.history.push(`/question/${id}`)
        this.props.clearNav()
    }

    render() {
        let { Questions, keys, tag } = this.props
        let questions = []
        Questions.forEach(Question => {
            if (keys.includes(Question.id))
                questions.push(Question)
        });
        return (
            <div className="Droplist">
                <div className="Questions">
                    <span className="title">{tag}</span>
                    <div className="contents">
                        {questions.map((question, index) => <DropQuestion clickEvent={e=>this.OpenQuestion(question.id)} reputation={question.reputations} key={index}>{question.title}</DropQuestion>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Droplist)