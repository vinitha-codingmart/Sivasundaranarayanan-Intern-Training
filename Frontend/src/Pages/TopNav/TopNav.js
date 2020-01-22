import React, { Component } from 'react'
import Logo from '../../components/Logo'
import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'
import Links from '../../components/Link'
import { Modal } from '../../components/Modal'
import Account from '../../components/Account'
import { Link } from 'react-router-dom'
import Axios from 'axios'

import './TopNav.css'
import { liveSearch } from '../../utils/livesearch'
import Dropdown from '../../components/Dropdown'

export default class TopNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowing: false,
            authState: false,
            SearchText: '',
            SearchContent: {
                Questions: [],
                Tags: []
            },
            showSearch: false,
        }
    }

    getUser = () => {
        let token = localStorage.getItem('User')
        if (token) {
            Axios.get('http://localhost:3001/', {
                headers: { Authorization: `bearer ${token}` }
            }).then((res) => {
                if (res.data !== 401)
                    this.setState({
                        authState: true
                    })
            })
        }
    }

    removeUser = () => {
        Axios.get('http://localhost:3001/logout', {
            headers: { Authorization: `bearer ${localStorage.getItem('User')}` }
        }).then((res) => {
            localStorage.removeItem('User');
            this.setState({
                authState: false
            })
            this.props.refresh();
        })
    }

    openModal = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModal = () => {
        this.setState({
            isShowing: false
        });
    }

    handleSearch = async (event) => {
        let SearchText = event.target.value.trim(),
            questions = [],
            tags = {}
        this.setState({ SearchText })

        if (SearchText) {
            questions = await liveSearch(`http://localhost:3001/Search?text=${SearchText}`)
            questions.forEach(question => {
                question.Tags.forEach(tag => {
                    if (tag.tag in tags)
                        tags[tag.tag] = [...tags[tag.tag], tag.QuestionId]
                    else
                        tags[tag.tag] = [tag.QuestionId]
                })
            });
        }
        this.setState({
            SearchContent: { Questions: questions, Tags: tags },
            showSearch: `${SearchText ? 'true' : ''}`
        })
    }

    handleItemAdd = () => {
        this.props.refresh();
        this.closeModal();
    }

    render() {
        let bAuth = {
            display: (!this.state.authState) ? 'none' : 'flex',
            width: '15%',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },
            aAuth = {
                display: (this.state.authState) ? 'none' : 'flex',
                width: '10%'
            }
        return (
            <div className="topNav">
                <div style={{ width: '13%' }}>
                    <Logo alt="Stack Overflow" height="40px" width="160px" src="logo.svg" />
                </div>
                <div style={{ width: '7%' }}>
                    <Links text="Products" />
                </div>
                <div style={{ width: '65%' }}>
                    <SearchBar text={this.state.SearchText} typeEvent={this.handleSearch} barWidth="100%" boxWidth="100%" />
                </div>

                <div style={bAuth}>

                    <Button style={{ width: '70%' }} clickEvent={this.openModal} styleName="blue" name="Ask Question" />
                    <Account clickEvent={this.removeUser} />

                </div>
                <div style={aAuth}>
                    <Link style={{ width: '50%', marginLeft: "26%" }} to="/Auth">
                        <Button styleName="blue" name="Login" />
                    </Link>
                </div>

                <Dropdown visibility={this.state.showSearch} result={this.state.SearchContent} />

                <Modal title="Ask a Question" addEvent={this.handleItemAdd} closeEvent={this.closeModal} show={this.state.isShowing} />
            </div >
        )
    }

    componentDidMount() {
        this.getUser()
    }

}