/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import {
  Title,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Button,
} from '@patternfly/react-core';
import { dataList } from './helper';

const deviceData = (column, device) => {
  const data = column.formatter ? column.formatter(device[column.key]) : device[column.key];
  return (
    <DescriptionListGroup>
      <DescriptionListTerm>{column.label}</DescriptionListTerm>
      <DescriptionListDescription>{data}</DescriptionListDescription>
    </DescriptionListGroup>
  );
};

const Detail = ({ device, onClose }: { children?: any; device: any; onClose: () => void }): ReactElement => {
  return (
    <>
      <Title headingLevel="h1" size="lg" style={{ marginBottom: '15px' }}>
        Edge node detail
      </Title>
      <DescriptionList
        columnModifier={{
          default: '2Col',
        }}
      >
        {dataList.map((column) => deviceData(column, device))}
      </DescriptionList>
      <Button variant="primary" onClick={onClose} style={{ marginTop: '20px' }}>
        Go back to list
      </Button>
    </>
  );
};

export default Detail;
