/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { PageSection, Card, CardBody, Title, Spinner, Button } from '@patternfly/react-core';
import { TableComposable, ActionsColumn, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { DeviceContext, DeviceLoadingContext } from '@app/Contexts.js';
import { apiHost, columns } from '../helper';

const tableCellData = (column, device) => {
  const data = column.formatter ? column.formatter(device[column.key]) : device[column.key];
  if (column.key === 'host') {
    return (
      <Button variant="link" isInline component={(props: any) => <Link {...props} to={`/detail/${device.uuid}`} />}>
        {data}
      </Button>
    );
  }
  return data;
};
// @ts-ignore
const Dashboard: React.FunctionComponent = ({ reloadDevices }: { reloadDevices: () => void }) => {
  const devices = React.useContext(DeviceContext);
  const isLoading = React.useContext(DeviceLoadingContext);

  const rebootDevice = (uuid) => {
    axios
      .post(`${apiHost}/v1/reboot`, { uuid })
      .then(() => {
        // process request
      })
      .finally(() => {
        reloadDevices();
      });
  };

  const upgradeDevice = (uuid) => {
    axios
      .post(`${apiHost}/v1/upgrade`, { uuid })
      .then(() => {
        // process request
      })
      .finally(() => {
        reloadDevices();
      });
  };

  const deviceActions = (device) => [
    {
      title: (
        <Link
          to={`/detail/${device.uuid}`}
          style={{ color: 'var(--pf-c-dropdown__menu-item--Color)', textDecoration: 'none !important' }}
        >
          Details
        </Link>
      ),
    },
    {
      title: 'Reboot',
      onClick: () => {
        rebootDevice(device.uuid);
      },
    },
    {
      title: 'Upgrade',
      onClick: () => {
        upgradeDevice(device.uuid);
      },
    },
    {
      title: 'Delete',
      onClick: () => alert(`Deleting `),
    },
  ];

  return (
    <>
      <PageSection>
        <Card>
          <CardBody>
            <Title headingLevel="h1" size="lg" style={{ marginBottom: '15px' }}>
              Edge node list view
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

              {devices.length > 0 && (
                <Tbody>
                  {devices.map((device) => (
                    // @ts-ignore
                    <Tr key={device.uuid}>
                      {columns.map((column) => (
                        // @ts-ignore
                        <Td dataLabel={column.label} key={`${column.label}${device.uuid}`}>
                          {tableCellData(column, device)}
                        </Td>
                      ))}
                      <Td isActionCell>
                        <ActionsColumn items={deviceActions(device)} />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              )}
            </TableComposable>
            {isLoading ? <Spinner /> : null}
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
};

export { Dashboard };
