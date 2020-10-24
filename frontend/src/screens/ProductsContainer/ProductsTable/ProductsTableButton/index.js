import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import './styles.css'



class Button extends PureComponent {
    render() {
        const { onClick, label } = this.props
        return (
            <button
                onClick={onClick}
                className={`btn-table ${this.props.className}`}>
                {label}
            </button>
        );
    }
}


Button.propTypes = {
    history: PropTypes.object,
    label: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default withRouter(Button);
