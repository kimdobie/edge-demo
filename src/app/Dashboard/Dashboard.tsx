import * as React from 'react';
import { PageSection, Title, Spinner } from '@patternfly/react-core';
import { TableComposable, ActionsColumn, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import axios from 'axios';

type device = {
  release_version: string | null;
  architecture: string | null;
  lastcheck: string | null;
  host: string | null;
  release_commit: string | null;
  ipaddress: string | null;
  appstatus: string | null;
  uuid: string;
};

const dateFormatter = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  let dateObj;
  const epoch = Number(date);
  if (epoch) {
    dateObj = new Date(epoch * 1000);
  } else {
    dateObj = new Date(date);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return `${dateObj.toLocaleDateString('en-US', options)} ${dateObj.toLocaleTimeString('en-US')}`;
};

// SET THE COLUMNS HERE!!!
const columns = [
  { key: 'host', label: 'Host' },
  { key: 'release_version', label: 'Version' },
  { key: 'architecture', label: 'Architecture' },
  { key: 'lastcheck', label: 'Last check', formatter: dateFormatter },
  { key: 'ipaddress', label: 'IP address' },
  { key: 'appstatus', label: 'Status' },
];

const tableCellData = (column, device) => {
  const data = column.formatter ? column.formatter(device[column.key]) : device[column.key];
  if (column.key === 'host') {
    return <a href="#">{data}</a>;
  }
  return data;
};

const Dashboard: React.FunctionComponent = () => {
  const [deviceData, setDeviceData] = React.useState<device[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  function getEvents() {
    axios
      //.get('http://192.168.0.116/data.json')
      .get('/data.json')
      .then((response) => response.data)
      .then((data) => {
        setDeviceData(data);
        setIsLoading(false);
      });
  }
  React.useEffect(() => {
    setIsLoading(true);
    getEvents();
    setInterval(getEvents, 10000);
  }, []);

  return (
    <PageSection>
      <Title headingLevel="h1" size="lg" style={{ marginBottom: '15px' }}>
        Demo page
      </Title>
      <TableComposable aria-label="Simple table">
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.key}>{column.label}</Th>
            ))}
            <Td></Td>
          </Tr>
        </Thead>

        {deviceData.length > 0 && (
          <Tbody>
            {deviceData.map((device) => (
              <Tr key={device.uuid}>
                {columns.map((column) => (
                  <Td dataLabel={column.label} key={`${column.label}${device.uuid}`}>
                    {tableCellData(column, device)}
                  </Td>
                ))}
                <Td isActionCell>
                  <ActionsColumn
                    items={[
                      {
                        title: 'Reboot',
                        onClick: () => alert(`Rebooting`),
                      },
                      {
                        title: 'Delete',
                        onClick: () => alert(`Deleting `),
                      },
                    ]}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        )}
      </TableComposable>
      {isLoading ? <Spinner /> : null}
    </PageSection>
  );
};

export { Dashboard };
