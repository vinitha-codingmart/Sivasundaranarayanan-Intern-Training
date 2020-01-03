import React from 'react';
import '../style/Logo.css'

const Logo = (props) => {
    let { src, width, height, alt } = props;
    return (
        <div className="logo">
            <img src={src} width={width} height={height} alt={alt} />
        </div>
    )
}

export default Logo