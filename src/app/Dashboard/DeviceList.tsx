/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import { Title, Spinner, Button } from '@patternfly/react-core';
import { TableComposable, ActionsColumn, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import axios from 'axios';
import { apiHost } from './helper';
import { columns } from './helper';

const tableCellData = (column, device, onDeviceClick) => {
  const data = column.formatter ? column.formatter(device[column.key]) : device[column.key];
  if (column.key === 'host') {
    // onDeviceClick
    // <Button variant="link" isInline>
    return (
      <Button variant="link" isInline onClick={() => onDeviceClick(device)}>
        {data}
      </Button>
    );
  }
  return data;
};

const DeviceList = ({
  deviceData,
  isLoading,
  onDeviceClick,
  onReboot,
}: {
  deviceData: any;
  isLoading: boolean;
  onDeviceClick: (device: any) => void;
  onReboot: () => void;
}): ReactElement => {
  const rebootDevice = (uuid) => {
    axios.post(`${apiHost || window.location.origin}:8080/v1/reboot`, { uuid }).then(() => {
      onReboot();
    });
  };

  const upgradeDevice = (uuid) => {
    axios.post(`${apiHost || window.location.origin}:8080/v1/upgrade`, { uuid }).then(() => {
      onReboot();
    });
  };

  const deleteDevice = (uuid) => {
    axios.post(`${apiHost || window.location.origin}:8080/v1/delete`, { uuid }).then(() => {
      onReboot();
    });
  };

  const deviceActions = (device) => [
    {
      title: 'Details',
      onClick: () => onDeviceClick(device),
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
      onClick: () => deleteDevice(device.uuid),
    },
  ];

  return (
    <>
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

        {deviceData.length > 0 && (
          <Tbody>
            {deviceData.map((device) => (
              <Tr key={device.uuid}>
                {columns.map((column) => (
                  <Td dataLabel={column.label} key={`${column.label}${device.uuid}`}>
                    {tableCellData(column, device, onDeviceClick)}
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
    </>
  );
};

export default DeviceList;
