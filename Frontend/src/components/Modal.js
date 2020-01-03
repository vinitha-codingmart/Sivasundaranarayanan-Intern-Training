import React from 'react';
import Button from './Button';
import '../style/Modal.css';
import axios from 'axios';

export class Modal extends React.Component {


    submitForm = () => {
        console.log(this.state.ques, this.state.desc);
        axios.post('http://localhost:3001/addQuestion', {
            title: this.state.ques,
            desc: this.state.desc
        }).then(() => {
            this.setState(null, this.props.addEvent());
        }).catch((err) => {
            console.log('Modal:' + err);
        })
    }

    handlechange = (input) => e => {
        this.setState({ [input]: e.target.value })
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
                            <input type="text" placeholder="Title" value={this.ques} onChange={this.handlechange('ques')} />
                            <textarea placeholder="Description..." value={this.desc} onChange={this.handlechange('desc')} />
                        </div>
                        <Button name="Add" styleName="blue" clickEvent={this.submitForm} />
                    </form>
                </div>
            </div>
        )
    }
}