import React, { useEffect } from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import  UserList from './users';
import { useDispatch } from 'react-redux';
import {  getPatients } from '../../../redux/patientActions';

const PatientsList = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getPatients())
  },[])
  return (
    <Panel
      header={
        <>
          <h2 className="title">Patients Management</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item >Admin</Breadcrumb.Item>
            <Breadcrumb.Item >Patients</Breadcrumb.Item>
            <Breadcrumb.Item active>Total Patients Management</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
        <UserList/>
    </Panel>
  );
};

export default PatientsList;
