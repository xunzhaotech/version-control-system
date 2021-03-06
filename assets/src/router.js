import React from 'react';
import { Router, Route, Switch, HashRouter, BrowserRouter } from 'react-router-dom';
import AppList from './pages/app-list';
import Deploy from './pages/app-deploy';
import LogServer from './pages/log-server';
import RemoteConnection from './pages/remote-connection';
import View from './pages/view';
import Layout from 'components/layout';

function RouterConfig() {
  return (
    <HashRouter>
      <Switch>
        <Layout>
          <Route path="/" exact component={View} />
          <Route path="/app-list" exact component={AppList} />
          <Route path="/app-deploy" exact component={Deploy} />
          <Route path="/log-server" exact component={LogServer} />
          <Route path="/view" exact component={View} />
          <Route path="/remote-connection" exact component={RemoteConnection} />
        </Layout>
      </Switch>
    </HashRouter >
  );
}
 

export default RouterConfig;

