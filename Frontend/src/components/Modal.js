import React from 'react';
import Button from './Button';
import axios from 'axios';
import Tag from './Tag';

import '../style/Modal.css';

export class Modal extends React.Component {

    constructor() {
        super()
        this.state = {
            ques: "",
            desc: "",
            tags: [],
            tag: "",
            id: ''
        }
    }


    createTag = (tag) => {
        this.setState({
            tags: [...this.state.tags, tag.trim()],
        })
        this.setState({
            tag: ""
        })

    };

    handleTag = (e) => {
        this.setState({ tag: e.target.value })
        let tag = e.target.value;
        if (tag.slice(-1) === ' ') {
            if (tag.trim() !== '')
                this.createTag(tag)
        }
    }

    submitForm = () => {
        if (this.state.tag) {
            this.createTag(this.state.tag);
        }
        let id = localStorage.getItem('User')
        axios.post('http://localhost:3001/addQuestion', {
            title: this.state.ques,
            description: this.state.desc
        }, {
            headers: { Authorization: `Bearer ${id}` }

        }).then((res) => {
            this.addTag(res.data.id, id);
        }).catch((err) => {
            console.log('Modal:', err);
        })
    }

    addTag = (QuestionId, id) => {
        axios.post('http://localhost:3001/addTag', {
            QuestionId,
            tags: this.state.tags
        }, {
            headers: { Authorization: `Bearer ${id}` }
        }).then(() => {
            this.setState({
                desc: "",
                ques: "",
                tags: [],
                tag: ""
            }, this.props.addEvent());
        }).catch((err) => {
            console.log('Modal:', err);
        })
    }

    handlechange = (event) => {
        console.log(event.target.value)
        this.setState({ [event.target.name]: event.target.value })
    }


    removeTag = (index) => {
        let arr = [...this.state.tags];
        arr.splice(index, 1);
        this.setState({
            tags: arr
        })
    }

    getUser = () => {
        let id = localStorage.getItem('User')
        this.setState({ id })
    }

    componentDidMount() {
        this.getUser();
    }

    render(props) {
        var styles = {
            display: this.props.show ? 'flex' : 'none',
        };

        return (
            <div className="modal-wrapper" style={styles}>
                <div className="modal">
                    <form>
                        <div className="modal-header">
                            <div className="close" onClick={this.props.closeEvent}>
                                <img src="/delete.svg" width="10" alt="Close" />
                            </div>
                            <h1>{this.props.title}</h1>
                        </div>
                        <div className="inputBox">
                            <label>Title</label>
                            <input type="text" placeholder="e.g. (Can state in React be used without this keyword?)" className="inputText" name='ques' value={this.state.ques} onChange={this.handlechange} />
                        </div>
                        <div className="inputBox">
                            <label>Description</label>
                            <textarea value={this.state.desc} name='desc' className="inputText" onChange={this.handlechange} />
                        </div>
                        <div className="inputBox">
                            <label>Tags</label>
                            <input type="text" placeholder="e.g. (React Express Node)" className="inputText" value={this.state.tag} onChange={this.handleTag} />
                        </div>
                        <div className="tags">
                            {
                                this.state.tags.map((tag, index) => <Tag needClose={true} closeEvent={this.removeTag} index={index} key={index}>{tag}</Tag>)
                            }
                        </div>
                        <Button name="Add" styleName="blue" clickEvent={this.submitForm} />
                    </form>
                </div>
            </div>
        )
    }
}