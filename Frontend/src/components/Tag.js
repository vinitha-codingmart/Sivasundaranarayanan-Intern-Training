import React from 'react'
import '../style/Tag.css'

export default function Tag(props) {
    let { children, index, needClose, closeEvent } = props;

    let style = {
        display: needClose ? "block" : "none"
    }

    let styleName = needClose ? "" : "click"

    return (
        <div className={`tag ${styleName}`} >
            <span>{children}</span>
            <svg style={style} onClick={e => closeEvent(index)} viewBox="0 0 24 24" width="15">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
        </div>
    )
}
