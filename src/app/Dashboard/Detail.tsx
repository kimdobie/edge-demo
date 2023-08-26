/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import {
  Title,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Button,
  PageSection,
  Card,
  CardBody,
} from '@patternfly/react-core';
import { useParams, Link } from 'react-router-dom';
import { DeviceContext, DeviceLoadingContext } from '@app/Contexts.js';
import { dataList } from './helper';

const deviceData = (column, device) => {
  const data = column.formatter ? column.formatter(device[column.key]) : device[column.key];
  return (
    <DescriptionListGroup key={column.label}>
      <DescriptionListTerm>{column.label}</DescriptionListTerm>
      <DescriptionListDescription>{data}</DescriptionListDescription>
    </DescriptionListGroup>
  );
};

const Detail = (): ReactElement => {
  // @ts-ignore
  const { uuid } = useParams();
  const devices = React.useContext(DeviceContext);
  const isLoading = React.useContext(DeviceLoadingContext);
  const [device, setDevice] = React.useState(undefined);

  React.useEffect(() => {
    // @ts-ignore
    setDevice(devices.find((d) => d.uuid === uuid));
  }, [devices, isLoading, uuid]);

  return (
    <>
      <PageSection>
        <Card>
          <CardBody>
            <Title headingLevel="h1" size="lg" style={{ marginBottom: '15px' }}>
              Edge node detail
            </Title>

            {isLoading ? <p>Loading data ...</p> : null}
            {!isLoading && !device ? <p>Device not found</p> : null}
            {!isLoading && device ? (
              <DescriptionList
                columnModifier={{
                  default: '2Col',
                }}
              >
                {dataList.map((column) => deviceData(column, device))}
              </DescriptionList>
            ) : null}

            <Button
              variant="primary"
              component={(props: any) => <Link {...props} to="/" style={{ marginTop: '20px' }} />}
            >
              Go back to list
            </Button>
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
};

export { Detail };
