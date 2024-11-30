import React from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import AdminAppointmentManagement from './appointments';
  
const AppointmentsPage = () => {
   
  return (
    <Panel
      header={
        <>
          <h2 className="title">Appointments</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item >Admin</Breadcrumb.Item>
             <Breadcrumb.Item active>Appointments</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
        <AdminAppointmentManagement />
      </Panel>
  );
};

export default AppointmentsPage;
