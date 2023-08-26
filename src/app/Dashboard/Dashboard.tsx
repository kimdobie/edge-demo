/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { PageSection, Card, CardBody } from '@patternfly/react-core';
import axios from 'axios';
import { refreshRate, apiHost } from './helper';
import DeviceList from './DeviceList';
import DeviceDetail from './Detail';

const Dashboard: React.FunctionComponent = () => {
  const [deviceData, setDeviceData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [deviceDetail, setDeviceDetail] = React.useState<any | null>(null);

  function getDevices() {
    axios
      .get(`${apiHost}/data.json`)
      .then((response) => response.data)
      .then((data) => {
        setDeviceData(data);
        setIsLoading(false);
        if (deviceDetail !== null) {
          const selected = data.find((device) => device.uuid === deviceDetail.uuid);
          if (selected) {
            setDeviceDetail(selected);
          }
        }
      });
  }
  React.useEffect(() => {
    setIsLoading(true);
    getDevices();
    setInterval(getDevices, refreshRate);
  }, []);

  const onClose = () => setDeviceDetail(null);

  const onDeviceClick = (device) => setDeviceDetail(device);

  return (
    <PageSection>
      <Card>
        <CardBody>
          {deviceDetail === null ? (
            <DeviceList
              deviceData={deviceData}
              isLoading={isLoading}
              onDeviceClick={onDeviceClick}
              onReboot={getDevices}
            />
          ) : null}
          {deviceDetail !== null ? <DeviceDetail device={deviceDetail} onClose={onClose} /> : null}
        </CardBody>
      </Card>
    </PageSection>
  );
};

export { Dashboard };
