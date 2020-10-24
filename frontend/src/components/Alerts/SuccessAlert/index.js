import React, { PureComponent } from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import PropTypes from 'prop-types'
import Label from '../../Label'
import './styles.css'

class SuccessAlert extends PureComponent {
    render() {
        const { description } = this.props
        return (
            <div className='success-info'>
                <FiCheckCircle className='success-icon'/>
                <Label className='label-success'>{description}</Label>
            </div>
        )
    }
}

SuccessAlert.propTypes = {
    description: PropTypes.string
}

export default SuccessAlert