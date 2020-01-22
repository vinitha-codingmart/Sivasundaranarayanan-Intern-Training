import React, { Component } from 'react'
import '../style/Dropdown.css'
import Droplist from './Droplist'

export default class Dropdown extends Component {

    populateTags = () => {
        let { Tags } = this.props.result
        let options = []
        if (Object.keys(Tags))
            return options
    }

    render() {
        let style = {
            display: `${this.props.visibility ? 'flex' : 'none'}`
        }

        let { Questions, Tags } = this.props.result


        return (
            <div className='dropDown' style={style}>
                <div className="pointer"></div>
                <div className="Tags">
                    {(Object.keys(Tags) &&
                        Object.keys(Tags).map((key, index) =>
                            <Droplist key={index} tag={key} Questions={Questions} keys={Tags[key]} />
                        )
                    )}
                </div>
            </div>
        )
    }
}
