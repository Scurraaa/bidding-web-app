import React, { PureComponent } from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postLogout } from '../../redux/actions/AuthActions'

const mapStateToProps = state => ({
    authentication: state.authentication
})

const mapDispatchToProps = (dispatch) => ({
    postLogout: (data, props) => { dispatch(postLogout(data, props)) }
})


class Navigation extends PureComponent {
    render() {
        return (
            <>
            <NavBar />
            <SideBar {...this.props}/>
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation))