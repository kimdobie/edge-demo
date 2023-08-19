import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
// import { AppRoutes } from '@app/routes';
import { Dashboard } from './Dashboard/Dashboard';
import '@app/app.css';

const App: React.FunctionComponent = () => (
  <Router>
    <AppLayout>
      <Dashboard />
    </AppLayout>
  </Router>
);

export default App;
