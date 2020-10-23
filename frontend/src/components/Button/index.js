import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

class Button extends PureComponent {
    onClickButton = () => {
        this.props.onClick();
    };
    
    render() {
        const { className, label } = this.props
        return (
            <button
                onClick={this.onClickButton}
                className={`btn ${className}`}
            >
                {label}
            </button>
        )
    }
}

Button.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
}

export default Button