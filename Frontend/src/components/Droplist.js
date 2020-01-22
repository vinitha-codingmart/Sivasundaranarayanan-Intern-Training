import React, { Component } from 'react'
import DropQuestion from './DroplistQuestion';

export default class Droplist extends Component {
    render() {
        let { Questions, keys, tag } = this.props
        let questions = []
        Questions.forEach(Question => {
            if (keys.includes(Question.id))
                questions.push(Question)
        });
        console.log(tag)
        questions.map((res, index) => console.log(index, res))
        return (
            <div className="Droplist">
                <div className="Questions">
                    <span className="title">{tag}</span>
                    <div className="contents">
                        {questions.map((question, index) => <DropQuestion reputation={question.reputations} key={index}>{question.title}</DropQuestion>)}
                    </div>
                </div>
            </div>
        )
    }
}
