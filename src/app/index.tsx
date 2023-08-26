import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
// import { Dashboard } from './Dashboard/Dashboard';
import { DeviceContext, DeviceLoadingContext } from './Contexts.js';
import getDevices from './getDevices';
import '@app/app.css';
import { refreshRate } from './Dashboard/helper';

const App: React.FunctionComponent = () => {
  const [devices, setDevices] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const processGetDevices = (devices) => {
    setDevices(devices);
    setLoading(false);
  };
  React.useEffect(() => {
    setLoading(true);
    getDevices(processGetDevices);
    setInterval(() => getDevices(processGetDevices), refreshRate);
  }, []);

  return (
    <Router>
      <AppLayout>
        <DeviceContext.Provider value={devices}>
          <DeviceLoadingContext.Provider value={isLoading}>
            <AppRoutes />
          </DeviceLoadingContext.Provider>
        </DeviceContext.Provider>
      </AppLayout>
    </Router>
  );
};

export default App;
