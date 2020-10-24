import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { VscDebugDisconnect } from 'react-icons/vsc'
import './styles.css'

class Disconnected extends PureComponent {
    render() {
        const { className } = this.props
        return (
            <div className={`disconnected-container ${className}`}>
                <VscDebugDisconnect className='disconnected-icon' />
                <h2> Can't Connect to Server </h2>
            </div>
        )
    }
}

Disconnected.propTypes = {
    className: PropTypes.string
}

export default Disconnected