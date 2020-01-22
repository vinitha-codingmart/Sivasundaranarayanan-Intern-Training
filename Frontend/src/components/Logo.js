import React from 'react';
import '../style/Logo.css'
import { Link } from 'react-router-dom'

const Logo =    (props) => {
    let { src, width, height, alt } = props;
    return (
        <div className="logo">
            <Link to="/">
                <img src={src} width={width} height={height} alt={alt} />
            </Link>
        </div>
    )
}

export default Logo