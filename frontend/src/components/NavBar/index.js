import React, { PureComponent } from 'react'
import Label from '../Label'
import './styles.css'


class NavBar extends PureComponent {
    render() {
        return(
            <div className='navbar-container'>
                <Label className='navbar-title'>BIDDING</Label>
            </div>
        )
    }
}

export default NavBar