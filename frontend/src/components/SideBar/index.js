import React, { PureComponent } from 'react'
import Button from '../Button'
import Modal from '../Modal'
import Label from '../Label'
import Navlink from './NavLink'
import { withRouter } from 'react-router-dom'
import {NAVIGATION_LINKS_SELLER, NAVIGATION_LINKS_BUYER} from '../../utils/constant'
import { connect } from 'react-redux'
import './styles.css'

const mapStateToProps = state => {
    return {
        credentials: state.authentication.credentials
    }
}

class SideBar extends PureComponent {
    state = {
        logout_model: false
    }

    onNavigate = route => {
        this.props.history.push(`${route}`)
    }

    _onLogout = () => {
        this.props.postLogout(
            {
                username: this.props.credentials.username,
                password: this.props.credentials.password
            },
            this.props.history
        )
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
                    {this.props.authentication.credentials.user_type === 'seller' ? (
                         NAVIGATION_LINKS_SELLER.map(this._renderNavigationItems)
                    ) : (
                        NAVIGATION_LINKS_BUYER.map(this._renderNavigationItems)
                    )}
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
                            onClick={this._onLogout}
                        />
                    </div>
                </div>
            </Modal>
        </>
        )
    }
}

export default withRouter(connect(mapStateToProps)(SideBar))