import React, { PureComponent } from 'react'
import Button from '../Button'
import Modal from '../Modal'
import Label from '../Label'
import Navlink from './NavLink'
import { withRouter } from 'react-router-dom'
import {NAVIGATION_LINKS} from '../../utils/constant'
import './styles.css'

class SideBar extends PureComponent {
    state = {
        logout_model: false
    }

    onNavigate = route => {
        this.props.history.push(`${route}`)
    }

    _renderNavigationItems = (item, index) => {
        return (
            <>
                <Navlink
                    key={index}
                    id={index}
                    route={item.route}
                    label={item.label}
                    icon={item.icon}
                    onNavigate={this.onNavigate}
                    currentRoute={this.props.history.location.pathname}
                />
            </>
        )
    }

    render() {
        return(
        <>
            <div className='sidebar-show'>
                <ul className='sidebar__navigation-items'>
                    {NAVIGATION_LINKS.map(this._renderNavigationItems)}
                </ul>
                <div className='sidebar-show__logout-btn'>
                    <Button onClick={() => this.setState({logout_modal: true})} label="LOGOUT" className="sidebar__logout-btn"/>
                </div>
            </div>
            
            <Modal modalVisibility={this.state.logout_modal} className='logout-confirm-modal'>
                <div className='logout-confirm-modal-container'>
                    <div className='logout-confirm-modal__body'>
                        <Label className='logout-confirm-modal-label'>Are you sure you want to LOGOUT?</Label>
                    </div>
                    <div className='logout-confirm-modal__footer'>
                        <Button
                            className='logout-modal-no-btn'
                            label='No'
                            onClick={() => this.setState({ logout_modal: false })}
                        />
                        <Button
                            className='logout-modal-yes-btn'
                            label='Yes'
                            onClick={() => this.setState({ logout_modal: false})}
                        />
                    </div>
                </div>
            </Modal>
        </>
        )
    }
}

export default withRouter(SideBar)