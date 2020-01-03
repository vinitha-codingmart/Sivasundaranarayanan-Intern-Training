import React from 'react'
import Button from './Button';

import '../style/Question.css'

import axios from 'axios';
import Answers from './Answers';

export class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reputation: this.props.Question.reputation,
            addAnswer: false
        }
    }

    addAnswer = () => {
        this.setState({
            addAnswer: true
        });
    }

    getDate = (mDate) => {
        let date = new Date(mDate);
        let cDate = `${(date.getDate() >= 10) ? '' : '0'}${date.getDate()}/`
        cDate += `${(date.getMonth() >= 9) ? '' : '0'}${date.getMonth() + 1}/`
        cDate += `${date.getFullYear()}`;
        return cDate;
    }

    reputeQuestion = (forUp) => e => {
        let rep = this.state.reputation + forUp;
        let id = this.props.id + 1
        if (rep + 1) {
            console.log(id);
            this.setState({
                reputation: rep
            })
            axios.put('http://localhost:3001/updateRep', {
                reputation: rep,
                id: id
            })
        }
    }

  

    cancelAnswer = () => {
        this.setState({
            addAnswer: false
        })
    }

    render() {
        const { title, description, created_at } = this.props.Question;
        let reputation = this.state.reputation;

        let btnStyle = {
            display: (this.state.addAnswer) ? 'none' : 'block'
        };

        return (
            <div className="question" >

                <span className="header">{title}</span>
                <span className="ask">Asked on</span> <span className="date">{this.getDate(created_at)}</span>

                <div style={{ display: 'flex' }}>

                    <div className="reputation">
                        <svg onClick={this.reputeQuestion(+1)} viewBox="0 0 36 36" width='36'> <path d="M2 26h32L18 10 2 26z"></path>
                        </svg>
                        <span className="reputation-count">{reputation}</span>
                        <svg onClick={this.reputeQuestion(-1)} viewBox="0 0 36 36" width='36'> <path d="M2 10h32L18 26 2 10z"></path>
                        </svg>
                    </div>

                    <span className="description">{description}</span>
                </div>
                <Answers cancelEvent={this.cancelAnswer} id={this.props.id} addArea={this.state.addAnswer} />
                <Button styleName="blue" clickEvent={this.addAnswer} name="Answer!" style={btnStyle} />
            </div>
        );
    }
}