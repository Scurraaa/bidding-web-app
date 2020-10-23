import React, { PureComponent } from 'react'
import './styles.css'

const LOADING = require('../../assets/images/loader.svg')

class PageLoading extends PureComponent {
    render() {
        const { className } = this.props
        return (
            <div className={`pageloading-container ${className}`}>
                <img src={LOADING} alt='...loading'/>
            </div>
        )
    }
}

export default PageLoading