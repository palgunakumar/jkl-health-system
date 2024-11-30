import React from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import PatientDetailsComponent from './Profile'
const PatientProfilePage = () => {
   
  return (
    <Panel
      header={
        <>
          <h2 className="title">My Profile</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item >User</Breadcrumb.Item>
             <Breadcrumb.Item active>Profile</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
        <PatientDetailsComponent />
      </Panel>
  );
};

export default PatientProfilePage;
