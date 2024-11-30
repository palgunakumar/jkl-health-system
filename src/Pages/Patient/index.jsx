import React from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import PatientHomePage from './PatientHomePage';

const PatientsPage = () => {
   
  return (
    <Panel
      header={
        <>
          <h2 className="title">Patients</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item >Admin</Breadcrumb.Item>
             <Breadcrumb.Item active>Appointments</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
        <PatientHomePage />
      </Panel>
  );
};

export default PatientsPage;
