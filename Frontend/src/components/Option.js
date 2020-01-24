import React from 'react'
import '../style/Option.css'

export default function Option(props) {
    return (
        <div className="Option">
            <span onClick={props.clickEvent} className={props.styleName}>
                {props.children}
            </span>
        </div>
    )
}
