import React, { PureComponent, lazy, Suspense } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import PageLoading from '../../components/PageLoading'

const AsyncLogin = lazy(() => import('../LoginContainer'))
const AsyncPageNotFound = lazy(() => import('../../components/PageNotFound'))
const AsyncDashboard = lazy(() => import('../DashboardContainer'))

class App extends PureComponent {
  render() {
    return (
      <Suspense fallback={<PageLoading/>}>
        <Switch>
          <Route path='/' exact={true} component={AsyncLogin} />
          <Route path='/dashboard' component={AsyncDashboard} />
          <Route component={AsyncPageNotFound}/>
        </Switch>
      </Suspense>
    )
  }
}

export default App