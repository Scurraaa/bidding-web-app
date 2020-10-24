import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal'
import './styles.css'

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');


class CustomModal extends PureComponent {
    render() {
        const { className, children, modalVisibility } = this.props
        return(
            <ReactModal closeTimeoutMS={350} className={`modal ${className}`} isOpen={modalVisibility} >
                {children}
            </ReactModal>
        )
    }
}

CustomModal.propTypes = {
    modalVisibility: PropTypes.bool.isRequired
}

export default CustomModal