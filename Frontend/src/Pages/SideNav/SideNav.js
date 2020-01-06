import React, { Component } from 'react'
import './SideNav.css'
import Axios from 'axios';
import Tag from '../../components/Tag';

export default class SideNav extends Component {
    constructor() {
        super();
        this.state = {
            tags: []
        }
    }

    getTag = () => {
        let tags = [];
        Axios.get('http://localhost:3001/getTag')
            .then((res) => {
                res.data.forEach(element => {
                    let data = tags.filter((ele) =>
                        ele.tag === element.tag
                    )
                    if (!data.length)
                        tags = [...tags, element];
                });
            }).then(() => {
                this.setState({
                    tags : tags
                })
            })
    }

    componentDidMount() {
        this.getTag();
    }

    render() {
        return (
            <div className="SideNav-wrapper">
                <div className="SideNav-header">Tag</div>
                <div >
                    {
                        this.state.tags.map((tag, index) =>
                            <Tag needClose={false} index={index} key={index}>{tag.tag}</Tag>
                        )
                    }
                </div>
            </div>
        )
    }
}
