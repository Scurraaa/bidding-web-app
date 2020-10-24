import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

class NavLink extends PureComponent {
    onNavigate = () => {
        this.props.onNavigate(this.props.route)
    }

    render() {
        const { currentRoute, route, label} = this.props
        const onClickItem = this.onNavigate
        const isActive = route ? currentRoute.includes(route) : false;
        return (
            <>
                <li onClick={onClickItem} className={`${isActive ? 'active' : ''}`}>
                    <p>{label}</p>
                </li>
            </>
        )
    }
}

NavLink.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onNavigate: PropTypes.func,
    route: PropTypes.string,
    currentRoute: PropTypes.string.isRequired
};

export default NavLink