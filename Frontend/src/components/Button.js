import React, { Component } from 'react';
import '../style/Button.css';

class Button extends Component {

    render() {
        let { clickEvent, styleName, name } = this.props;
        return (
            <input style={this.props.style} className={`button ${styleName}`} onClick={clickEvent} type="button" value={name} />
        )
    }

}
export default Button