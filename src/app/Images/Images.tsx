/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import { Title, PageSection, Card, CardBody } from '@patternfly/react-core';

const Images = (): ReactElement => {
  return (
    <>
      <PageSection>
        <Card>
          <CardBody>
            <Title headingLevel="h1" size="lg" style={{ marginBottom: '15px' }}>
              Images
            </Title>
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
};

export { Images };
