import React, { Component } from 'react'
import Content from '../Content/Content';
import SideNav from '../SideNav/SideNav';
import Axios from 'axios';

import './MainPage.css'
import TopNav from '../TopNav/TopNav';
import { Switch, Route, useParams } from 'react-router';
import QuestionPage from '../QuestionPage/QuestionPage';
import UserPage from '../UserPage/UserPage';

export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Apiresponse: {
                questions: [],
            },
            isMounted: true
        }
    }

    componentWillUnmount() {
        this.setState({
            isMounted: false
        })
    }

    callApi = () => {
        if (this.state.isMounted) {
            Axios.get('http://localhost:3001/getAllQuestion')
                .then((res) => {
                    if (res.data[0]) {
                        this.setState({
                            Apiresponse: {
                                questions: res.data,
                                Upvotes: []
                            }
                        })
                    }
                })
        }
    }

    filterFunction = (index) => {
        this.props.history.push('/')
        this.setState({
            Apiresponse: {
                questions: [],
                Upvotes: []
            },
            flag: false
        }, this.filterQuestion(index))
    }

    filterQuestion = (tag) => {
        Axios.get(`http://localhost:3001/getAllQuestion?Tag=${tag}`
        ).then((res) => {
            this.setState({
                Apiresponse: {
                    questions: res.data,
                    Upvotes: []
                }
            })
        })
    }

    componentDidMount() {
        
        this.setState({ isMounted: true }, this.callApi())
    }

    render() {
        return (
            <div>
                <div className="main">
                    <Switch>
                        <Route exact path="/">
                            <TopNav refresh={this.callApi} id={1} />
                            <Content refresh={this.callApi} filterFunction={this.filterFunction} response={this.state.Apiresponse} />
                            <SideNav filterFunction={this.filterFunction} />
                        </Route>

                        <Route path="/question/:id" children={<Child callApi={this.callApi} filterFunction={this.filterFunction} />} />

                        <Route exact path="/users">
                            <TopNav refresh={this.callApi} id={3} />
                            <UserPage filterFunction={this.filterFunction} />
                        </Route>

                    </Switch>
                </div>
            </div>

        )
    }
}

function Child(props) {
    let { id } = useParams()
    return (
        <div style={{ width: '100%' }}>
            <TopNav refresh={props.callApi} id={2} />
            <QuestionPage id={id} filterFunction={props.filterFunction} />
        </div>
    )
}
