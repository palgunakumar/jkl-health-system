import React from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import Dashboard from './Dashboard';
  
const AdminDashboard = () => {
   
  return (
    <Panel
      header={
        <>
          <h2 className="title">Admin Dashboard</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item >Admin</Breadcrumb.Item>
             <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
        <Dashboard />
     </Panel>
  );
};

export default AdminDashboard;
