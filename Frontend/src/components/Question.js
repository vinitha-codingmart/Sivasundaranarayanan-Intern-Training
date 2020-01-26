import React from 'react'

import '../style/Question.css'

import Answers from './Answers';
import Reputation from './Reputation';
import Tag from './Tag';
import { Link } from 'react-router-dom';
import Option from './Option';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Upvote: false,
            reputation: props.Question.reputations,
            tags: [],
            name: '',
            validUser: false
        }
    }


    checkUpvote = (id) => {
        let token = localStorage.getItem('User')
        if (token) {
            Axios.get(`http://localhost:3001/checkUpvote?id=${id}&type=ques`,
                {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }).then(res => {
                    if (res.data && res.data !== 401) {
                        this.setState({
                            Upvote: true
                        })
                    }
                })
        }
    }

    getDate = (mDate) => {
        var dateOptions = { year: "numeric", month: "short", day: "2-digit" };
        let date = new Date(mDate).toLocaleDateString('en-US', dateOptions)
        return date;
    }

    reputeQuestion = (forUp) => {
        if ((this.state.Upvote && forUp < 0) || (forUp > 0 && !this.state.Upvote)) {
            let rep = this.state.reputation + forUp;
            let id = this.props.id
            let token = localStorage.getItem("User")
            if (rep + 1) {
                Axios.put('http://localhost:3001/updateQuesRep', {
                    reputations: rep,
                    id: id,
                    flag: (forUp < 0) ? false : true
                }, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }).then((res) => {
                    console.log(res)
                    if (res.data !== 401)
                        if (!res.data.flag) {
                            console.log(true)
                            this.setState({
                                reputation: rep,
                                Upvote: true
                            }, console.log(this.state))
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
        Axios.get(`http://localhost:3001/getUserName?UserId=${id}`, {
        }).then((res) => {
            if (res.data)
                this.setState({
                    name: res.data.name
                })
        })
    }

    getTag = () => {
        let id = this.props.Question.id;
        Axios.get(`http://localhost:3001/getTag?id=${id}`
        ).then((res) => {
            this.setState({
                tags: res.data
            })
        })
    }


    verifyCurrentUser = (id) => {
        let token = localStorage.getItem('User')
        if (token) {
            Axios.get(`http://localhost:3001/?id=${id}`, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then((res) => {
                if (res.data && res.data !== '401')
                    this.setState({
                        validUser: true
                    })
                else
                    this.setState({
                        validUser: false
                    })
            })
        } else {
            this.setState({
                validUser: false
            })
        }
    }

    deleteQuestion = () => {
        let confirm = window.confirm("Do you want to delete the Question")
        let token = localStorage.getItem('User')
        if (confirm && token) {
            Axios.put('http://localhost:3001/deleteQuestion', {
                id: this.props.Question.id
            }, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then(res => {
                if (res.data && res.data !== '401')
                    this.props.history.push('/')
            })
        }
    }

    componentDidMount() {
        this.checkUpvote(this.props.Question.id)
        this.getTag();
        this.getUserName(this.props.Question.UserId)
        this.verifyCurrentUser(this.props.Question.UserId)
    }

    render() {
        let { title, description, createdAt } = this.props.Question;

        let reputations = this.state.reputation;

        let delStyle = {
            marginLeft: '1.25rem',
            marginTop: '1.5rem',
            display: this.state.validUser ? 'block' : "none"
        }

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
                        <div style={delStyle}>
                            <Option clickEvent={this.deleteQuestion} styleName="cmtGrey">delete</Option>
                        </div>
                    </div>
                </div>
                <div className="user-details">
                    <span className="ask">asked on{this.getDate(createdAt)}</span>
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

export default withRouter(Question)