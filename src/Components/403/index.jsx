
import React from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import Error403Component from './Error403';

const Error403 = () => {
  return (
    <Panel 
      header={
        <>
          <h2 className="title">Error 403</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Authentication</Breadcrumb.Item>
            <Breadcrumb.Item active>Error 403</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <Error403Component />
    </Panel>
  );
};
export default Error403;
