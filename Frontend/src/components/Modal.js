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
            tag: ""
        }
    }

    submitForm = () => {
        axios.post('http://localhost:3001/addQuestion', {
            title: this.state.ques,
            desc: this.state.desc,
        }).then((res) => {
            this.addTag(res.data.insertId);
        }).catch((err) => {
            console.log('Modal:', err);
        })
    }

    addTag = (id) => {
        axios.post('http://localhost:3001/addTag', {
            id: id,
            tag: this.state.tags
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

    handlechange = (input, e) => {
        this.setState({ [input]: e.target.value })
    }

    handleTag = (e) => {
        this.setState({ tag: e.target.value })
        let tag = e.target.value;
        if (tag.slice(-1) === ' ') {
            if (tag.trim() !== '')
                this.setState({
                    tags: [...this.state.tags, tag.trim()],
                })
            this.setState({
                tag: ""
            })
        }
    }

    removeTag = (index) => {
        let arr = [...this.state.tags];
        arr.splice(index, 1);
        this.setState({
            tags: arr
        })
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
                                <img src="delete.svg" width="10" alt="Close" />
                            </div>
                            <h1>{this.props.title}</h1>
                        </div>
                        <div className="inputBox">
                            <label>Title</label>
                            <input type="text" placeholder="e.g. (Can state in React be used without this keyword?)" className="inputText" value={this.state.ques} onChange={e => this.handlechange('ques', e)} />
                        </div>
                        <div className="inputBox">
                            <label>Description</label>
                            <textarea value={this.state.desc} className="inputText" onChange={e => this.handlechange('desc', e)} />
                        </div>
                        <div className="inputBox">
                            <label>Tags</label>
                            <input type="text" placeholder="e.g. (React Express Node)" className="inputText" value={this.state.tag} onChange={e => this.handleTag(e)} />
                        </div>
                        <div className="tags">
                            {
                                this.state.tags.map((tag, index) =>
                                    <Tag needClose={true} closeEvent={this.removeTag} index={index} key={index}>{tag}</Tag>
                                )
                            }
                        </div>
                        <Button name="Add" styleName="blue" clickEvent={this.submitForm} />
                    </form>
                </div>
            </div>
        )
    }
}