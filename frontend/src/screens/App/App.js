import React, { PureComponent, lazy, Suspense } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import PageLoading from '../../components/PageLoading'
import { connect } from 'react-redux'

const AsyncLogin = lazy(() => import('../LoginContainer'))
const AsyncPageNotFound = lazy(() => import('../../components/PageNotFound'))
const AsyncDashboard = lazy(() => import('../DashboardContainer'))

const mapStateToProps = state => ({
  authentication: state.authentication
})


class App extends PureComponent {
  render() {
    return (
      <Suspense fallback={<PageLoading/>}>
        <Switch>
          <Route path='/' exact={true} component={AsyncLogin} />
          {this.props.authentication.isAuthenticated ? (
            <Route path='/dashboard' component={AsyncDashboard} />
          ) : (
            <Redirect to='/'/>
          )}
          <Route component={AsyncPageNotFound}/>
        </Switch>
      </Suspense>
    )
  }
}

export default withRouter(connect(mapStateToProps)(App))