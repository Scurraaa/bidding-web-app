import PropTypes from 'prop-types'
import React, { PureComponent, lazy } from 'react'
import Navigation from '../NavigationContainer'
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import './styles.css'

const mapStateToProps = state => ({
    authentication: state.authentication
  })
  

const AsyncPageNotFound = lazy(() => import('../../components/PageNotFound'))

const AsyncUserInfoPage = lazy(() => import('../UserContainer'))
const AsyncBidPage = lazy(() => import('../BidsContainer'))
const AsyncProductPage = lazy(() => import('../ProductsContainer'))
const AsyncProductBidsPage = lazy(() => import('../ProductsBidsContainer'))
const AsyncProductBidsDetailPage = lazy(() => import('../ProductsBidsDetailContainer'))

class Dashboard extends PureComponent {
    render() {
        const { match } = this.props
        return (
            <div className='dashboard'>
                <Navigation/>
                <div className='dashboard__content'>
                    <Switch>
                        <Route path={`${match.url}/user-info`} component={AsyncUserInfoPage} />
                        <Route path={`${match.url}/my-bids`} component={AsyncBidPage} />
                        <Route path={`${match.url}/my-products`} component={AsyncProductPage} />
                        <Route path={`${match.url}/products`} component={AsyncProductBidsPage} />
                        <Route path={`${match.url}/product-details`} component={AsyncProductBidsDetailPage} />
                        <Route component={AsyncPageNotFound} />
                    </Switch>
                </div>

            </div>
        )
    }
}

Dashboard.propTypes = {
    math: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
}

export default withRouter(connect(mapStateToProps)(Dashboard))