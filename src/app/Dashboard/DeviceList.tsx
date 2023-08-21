/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import { Title, Spinner, Button } from '@patternfly/react-core';
import { TableComposable, ActionsColumn, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
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
}: {
  deviceData: any;
  isLoading: boolean;
  onDeviceClick: (device: any) => void;
}): ReactElement => {
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
    </>
  );
};

export default DeviceList;
