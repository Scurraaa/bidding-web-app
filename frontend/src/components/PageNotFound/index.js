import React, { PureComponent } from 'react'
import './styles.css'

class PageNotFound extends PureComponent {
    render() {
        return (
            <div className='notfound-container'>
                <h2>ERROR 404</h2>
                <h3>PAGE NOT FOUND!</h3>
            </div>
        )
    }
}

export default PageNotFound