import PropTypes from 'prop-types'
import React, { PureComponent, lazy } from 'react'
import Navigation from '../NavigationContainer'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import './styles.css'

const AsyncPageNotFound = lazy(() => import('../../components/PageNotFound'))

const AsyncUserInfoPage = lazy(() => import('../UserContainer'))
const AsyncBidPage = lazy(() => import('../BidsContainer'))
const AsyncProductPage = lazy(() => import('../ProductsContainer'))
const AsyncProductBidsPage = lazy(() => import('../ProductsBidsContainer'))

class Dashboard extends PureComponent {
    render() {
        const { match, location } = this.props
        return (
            <div className='dashboard'>
                <Navigation/>
                <div className='dashboard__content'>
                    <Switch>
                        <Route path={`${match.url}/user-info`} component={AsyncUserInfoPage} />
                        <Route path={`${match.url}/my-bids`} component={AsyncBidPage} />
                        <Route path={`${match.url}/my-products`} component={AsyncProductPage} />
                        <Route path={`${match.url}/product-bids`} component={AsyncProductBidsPage} />
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

export default withRouter(Dashboard)