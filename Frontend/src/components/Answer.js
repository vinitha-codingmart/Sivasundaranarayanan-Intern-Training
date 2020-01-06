import React, { Component } from 'react'
import Reputation from './Reputation'

import '../style/Answer.css'
import Axios from 'axios'

export default class Answer extends Component {

    constructor() {
        super();
        this.state = {
            reputation: 0
        }
    }

    fetchRep = () => {
        Axios.get(`http://localhost:3001/getRep?id=${this.props.id}`)
        .then( (res) => {
            let temp
            temp = res.data[0] ? res.data[0].reputations : 0
            this.setState( {
                reputation: temp
            })
        })
    }

    componentDidMount() {
        this.fetchRep();
    }

    repute = (rep) => {
        let reputation = this.state.reputation + rep;
        Axios.post('http://localhost:3001/updateAnsRep', {
            reputation: reputation,
            id: this.props.id
        }).then((res) => {
            console.log(res)
            this.setState({
                reputation: reputation
            })
        })
    }

    render() {
        return (
            <div className="answer">
                <Reputation function={this.repute} reputation={this.state.reputation} />
                <pre>{this.props.children}</pre>
            </div>
        )
    }
}
