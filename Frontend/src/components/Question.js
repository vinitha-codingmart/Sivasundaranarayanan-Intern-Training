import React from 'react'
import Button from './Button';

import '../style/Question.css'

import axios from 'axios';
import Answers from './Answers';
import Reputation from './Reputation';
import Tag from './Tag';

export class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reputation: this.props.Question.reputation,
            addAnswer: false,
            tags: []
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

    reputeQuestion = (forUp) => {
        let rep = this.state.reputation + forUp;
        let id = this.props.id + 1
        if (rep + 1) {
            axios.put('http://localhost:3001/updateQuesRep', {
                reputation: rep,
                id: id
            }).then(() => {
                this.setState({
                    reputation: rep
                })
            })
        }
    }

    getTag = () => {
        let id = this.props.Question.qid;
        axios.get(`http://localhost:3001/getTag?id=${id}`
        ).then((res) => {
            this.setState({
                tags: res.data
            })
        })
    }

    cancelAnswer = () => {
        this.setState({
            addAnswer: false
        })
    }

    componentDidMount() {
        this.getTag();
    }

    render() {
        let { title, description, created_at } = this.props.Question;
        let reputation = this.state.reputation;

        let btnStyle = {
            display: (this.state.addAnswer) ? 'none' : 'block'
        };

        return (
            <div className="question" >
                <span className="header">{title}</span>
                <div><span className="ask">Asked on</span> <span className="date">{this.getDate(created_at)}</span></div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Reputation function={this.reputeQuestion} reputation={reputation} />
                    <div style={{ display: 'flex', 'flexDirection': 'column' }}>
                        <pre className="description">{description}</pre>
                        <div style={{ display: 'inline-block', marginLeft: '10px'}}>
                            {
                                this.state.tags.map((tag, index) =>
                                    <Tag key={index}>{tag.tag}</Tag>
                                    )
                            }
                        </div>

                    </div>
                </div>
                <Answers cancelEvent={this.cancelAnswer} id={this.props.id} addArea={this.state.addAnswer} />
                <Button styleName="blue" clickEvent={this.addAnswer} name="Answer!" style={btnStyle} />
            </div>
        );
    }
}