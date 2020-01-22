import React, { Component } from 'react'
import { Question } from '../../components/Question'

import './Content.css';

export default class Content extends Component {

    constructor() {
        super()
        this.state = {
            upvotes: []
        }
    }


    checkRep = (reps,id) => {
        let rep = reps.some((rep) => rep === id)
        return rep
    }

    render() {
        var reps = []

        this.props.response.Upvotes.forEach(ele => {
            reps = [...reps, ele.QuestionId]
        });

        return (
            <div className="Content-wrapper" >
                {
                    this.props.response.questions.map((question, index) =>
                        <Question Upvote={this.checkRep(reps, question.id)} filterFunction={this.props.filterFunction} id={question.id} key={index} Question={question} />
                    )
                }
            </div>
        );
    }


}
