import React, { PureComponent } from 'react'
import { FiXCircle } from 'react-icons/fi'
import PropTypes from 'prop-types'
import Label from '../../Label'
import './styles.css'

class FailedAlert extends PureComponent {
    render() {
        const { description } = this.props
        return (
            <div className='failed-info'>
                <FiXCircle className='failed-icon'/>
                <Label className='label-failed'>{description}</Label>
            </div>
        )
    }
}

FailedAlert.propTypes = {
    description: PropTypes.string
}

export default FailedAlert