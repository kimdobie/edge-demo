/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { PageSection, Card, CardBody } from '@patternfly/react-core';
//import axios from 'axios';
// import { refreshRate } from './helper';
// import getDevices from '@app/getDevices';
import DeviceList from './DeviceList';
import DeviceDetail from './Detail';

import { DeviceContext, DeviceLoadingContext } from '@app/Contexts.js';

const Dashboard: React.FunctionComponent = () => {
  const devices = React.useContext(DeviceContext);
  const isLoading = React.useContext(DeviceLoadingContext);
  // const [deviceData, setDeviceData] = React.useState<any[]>([]);
  // const [isLoading, setIsLoading] = React.useState(false);
  const [deviceDetail, setDeviceDetail] = React.useState<any | null>(null);

  // function getDevices() {
  //   axios
  //     .get(`${apiHost}/data.json`)
  //     .then((response) => response.data)
  //     .then((data) => {
  //       setDeviceData(data);
  //       setIsLoading(false);
  //       if (deviceDetail !== null) {
  //         const selected = data.find((device) => device.uuid === deviceDetail.uuid);
  //         if (selected) {
  //           setDeviceDetail(selected);
  //         }
  //       }
  //     });
  // }
  // const processGetDevices = (devices) => {
  //   setDeviceData(devices);
  //   setIsLoading(false);
  //   if (deviceDetail !== null) {
  //     const selected = devices.find((device) => device.uuid === deviceDetail.uuid);
  //     if (selected) {
  //       setDeviceDetail(selected);
  //     }
  //   }
  // };

  // React.useEffect(() => {
  //   setIsLoading(true);
  //   getDevices(processGetDevices);
  //   setInterval(() => getDevices(processGetDevices), refreshRate);
  // }, []);

  const onClose = () => setDeviceDetail(null);

  const onDeviceClick = (device) => setDeviceDetail(device);

  return (
    <PageSection>
      <Card>
        <CardBody>
          {deviceDetail === null ? (
            <DeviceList deviceData={devices} isLoading={isLoading} onDeviceClick={onDeviceClick} onReboot={() => {}} />
          ) : null}
          {deviceDetail !== null ? <DeviceDetail device={deviceDetail} onClose={onClose} /> : null}
        </CardBody>
      </Card>
    </PageSection>
  );
};

export { Dashboard };
