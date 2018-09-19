import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Home from './pages/home';
import Layout from 'components/layout';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Layout>
          <Route path="/" exact component={Home} />
        </Layout>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
