import React, { Component } from 'react'
import Content from '../Content/Content';
import SideNav from '../SideNav/SideNav';
import Axios from 'axios';

import './MainPage.css'
import TopNav from '../TopNav/TopNav';

export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Apiresponse: {
                questions: [],
                Upvotes: []
            },
            flag: false
        }
    }

    callApi = () => {
        Axios.get('http://localhost:3001/getQuestion')
            .then((res) => {
                if (res.data[0]) {
                    this.setState({
                        Apiresponse: {
                            questions: res.data,
                            Upvotes: []
                        }
                    })
                }
            }).then(() => {
                let token = localStorage.getItem('User')
                Axios.get('http://localhost:3001/reputation', {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }).then((res) => {
                    if (res.data !== 401) {
                        this.setState({
                            Apiresponse: {
                                ...this.state.Apiresponse,
                                Upvotes: res.data,
                            },
                            flag: true
                        })
                    } else {
                        this.setState({
                            flag: true
                        })
                    }
                })
            });
    }

    filterFunction = (index) => {
        this.setState({
            Apiresponse: {
                questions: [],
                Upvotes: []
            },
            flag: false
        }, this.filterQuestion(index))
    }

    filterQuestion = (tag) => {
        Axios.get(`http://localhost:3001/getQuestion?Tag=${tag}`
        ).then((res) => {
            this.setState({
                Apiresponse: {
                    questions: res.data,
                    Upvotes: []
                }
            })
        }).then(() => {
            let token = localStorage.getItem('User')
            Axios.get('http://localhost:3001/reputation', {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }).then((res) => {
                if (res.data !== 401) {
                    this.setState({
                        Apiresponse: {
                            ...this.state.Apiresponse,
                            Upvotes: res.data,
                        },
                        flag: true
                    })
                } else {
                    this.setState({
                        flag: true
                    })
                }
            })
        });
    }

    componentDidMount() {
        this.callApi()
    }

    render() {
        return (
            <div>
                <TopNav refresh={this.callApi} />
                {(this.state.flag) &&
                    <div className="main">
                        <Content filterFunction={this.filterFunction} response={this.state.Apiresponse} />
                        <SideNav filterFunction={this.filterFunction} />
                    </div>
                }
            </div>

        )
    }
}
