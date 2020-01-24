import React from 'react'

import '../style/Question.css'

import axios from 'axios';
import Answers from './Answers';
import Reputation from './Reputation';
import Tag from './Tag';
import { Link } from 'react-router-dom';
import Option from './Option';

export default class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Upvote: props.Upvote,
            reputation: props.Question.reputations,
            tags: [],
            name: '',
        }
    }

    componentDidUpdate() {
        if (this.state.Upvote !== this.props.Upvote)
            this.setState({
                Upvote: this.props.Upvote
            })
    }

    getDate = (mDate) => {
        return new Date(mDate).toLocaleDateString();
    }

    reputeQuestion = (forUp) => {
        if ((this.state.Upvote && forUp < 0) || (forUp > 0 && !this.state.Upvote)) {
            let rep = this.state.reputation + forUp;
            let id = this.props.id
            let token = localStorage.getItem("User")
            if (rep + 1) {
                axios.put('http://localhost:3001/updateQuesRep', {
                    reputations: rep,
                    id: id,
                    flag: (forUp < 0) ? false : true
                }, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }).then((res) => {
                    if (res.data !== 401)
                        if (!res.data.flag) {
                            this.setState({
                                reputation: rep,
                                Upvote: true
                            })
                        } else {
                            this.setState({
                                reputation: rep,
                                Upvote: false
                            })
                        }
                    else
                        alert('Log in to repute the question')
                })
            }
        }
    }

    getUserName = (id) => {
        axios.get(`http://localhost:3001/getUserName?UserId=${id}`, {
        }).then((res) => {
            if (res.data)
                this.setState({
                    name: res.data.name
                })
        })
    }

    getTag = () => {
        let id = this.props.Question.id;
        axios.get(`http://localhost:3001/getTag?id=${id}`
        ).then((res) => {
            this.setState({
                tags: res.data
            })
        })
    }

    componentDidMount() {
        this.getTag();
        this.getUserName(this.props.Question.UserId)
    }

    UNSAFE_componentWillReceiveProps() {
        this.setState({
            Upvote: this.props.Upvote
        })
    }

    render() {
        let { title, description, createdAt } = this.props.Question;

        let reputations = this.state.reputation;

        return (
            <div className="question" >
                <span className="header">{title}</span>
                <div>
                    <span className="ask">Asked on</span>
                    <span className="date">{this.getDate(createdAt)}</span>
                </div>

                <div className='content'>
                    <Reputation Upvote={this.state.Upvote} function={this.reputeQuestion} reputation={reputations} />
                    <div className='content-text'>
                        <pre className="description">{description}</pre>
                        <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                            {
                                this.state.tags.map((tag, index) => <Link to="/" key={index}> <Tag clickEvent={this.props.filterFunction}>{tag.tag}</Tag></Link>)
                            }
                        </div>
                        <div style={{marginLeft: '1.25rem', marginTop: '1.5rem'}}>
                            <Option styleName="cmtGrey">delete</Option>
                        </div>
                    </div>
                </div>
                <div className="user-details">
                    <span className="ask">asked {this.getDate(createdAt)}</span>
                    <div style={{ display: 'flex', alignItems: 'flex-start', color: "#0077CC" }}>
                        <img style={{ marginBottom: "10px", marginRight: '10px' }} alt="display pic" src='/1.jpg' height="40" width="40" />
                        <span style={{ fontSize: ".9rem" }}>{this.state.name}</span>
                    </div>
                </div>
                <Answers cancelEvent={this.cancelAnswer} Answer={this.props.Question.Answers} id={this.props.id} />
            </div>
        );
    }
}