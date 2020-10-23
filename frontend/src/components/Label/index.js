import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

class Label extends PureComponent {
    render() {
        const { className, children } = this.props;

        return (
            <label className={`label-text ${className}`}>
                {children}
            </label>
        );
    }
}

Label.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
}

export default Label

