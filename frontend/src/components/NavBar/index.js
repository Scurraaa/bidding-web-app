import React, { PureComponent } from 'react'
import Label from '../Label'
import './styles.css'

class NavBar extends PureComponent {
    render() {
        return(
            <div className='navbar-container'>
                <div className='navbar-container-title'>
                    <Label className='navbar-title'>BIDDING</Label>
                </div>
            </div>
        )
    }
}
export default NavBar