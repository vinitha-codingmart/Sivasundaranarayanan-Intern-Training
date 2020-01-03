import React, { Component } from 'react'
import { Question } from '../../components/Question'

import './Content.css';

export default class Content extends Component {

    render() {
        return (
            <div className="Content-wrapper" >
                {
                    this.props.response.map((question, index) =>
                        <Question id={index} key={index} Question={question} />
                    )
                }
            </div>
        );
    }
}
