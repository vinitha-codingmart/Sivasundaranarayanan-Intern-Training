import React, { Component } from 'react'

import './Content.css';
import QuestionLink from '../../components/QuestionLink';

export default class Content extends Component {

    constructor(props) {
        super(props);
        props.refresh();
    }

    render() {
        return (
            <div className="Content-wrapper" >
                <div className="Content-header">Questions</div>
                <div className="Content-main">
                    {
                        this.props.response.questions.map((question, index) =>
                            <QuestionLink filterFunction={this.props.filterFunction} Question={question} key={index} />
                        )
                    }
                </div>
            </div>
        );
    }


}
