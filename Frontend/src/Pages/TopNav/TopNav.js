import React, { Component } from 'react'
import Logo from '../../components/Logo'
import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'
import Link from '../../components/Link'
import { Modal } from '../../components/Modal'
import './TopNav.css'

export class TopNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowing: false
        }
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

    handleItemAdd = () => {
        this.props.refresh();
        this.closeModal();
    }

    render() {
        return (
            <div className="topNav">
                <Logo alt="Stack Overflow" height="40px" width="160px" src="logo.svg" />
                <Link text="Products" />
                <SearchBar barWidth="70%" boxWidth="95%" />
                <Button clickEvent={this.openModal} styleName="blue" name="Ask Question" />
                <Modal title="Ask a Question" addEvent={this.handleItemAdd} closeEvent={this.closeModal} show={this.state.isShowing} />
            </div>
        )
    }
}