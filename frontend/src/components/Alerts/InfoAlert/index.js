import React, { PureComponent } from 'react'
import { FiInfo } from 'react-icons/fi'
import PropTypes from 'prop-types'
import Label from '../../Label'
import './styles.css'


class InfoAlert extends PureComponent {
    render() {
        const { description } = this.props
        return (
            <div className='alert-info'>
                <FiInfo className='info-icon'/>
                <Label className='label-info'>{description}</Label>
            </div>
        )
    }
}

InfoAlert.propTypes = {
    description: PropTypes.string
}

export default InfoAlert