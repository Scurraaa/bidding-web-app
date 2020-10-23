import React, { PureComponent } from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import { withRouter } from 'react-router-dom'


class Navigation extends PureComponent {
    render() {
        return (
            <>
            <NavBar />
            <SideBar/>
            </>
        )
    }
}

export default withRouter(Navigation)