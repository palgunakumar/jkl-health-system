import React, { useEffect } from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import  UserList from './users';
import { useDispatch } from 'react-redux';
import {  getUsers } from '../../../redux/auth';

const TotalUsersList = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUsers())
  },[])
  return (
    <Panel
      header={
        <>
          <h2 className="title">Total Users Management</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item >Admin</Breadcrumb.Item>
            <Breadcrumb.Item >Users</Breadcrumb.Item>
            <Breadcrumb.Item active>Total Users Management</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
        <UserList/>
    </Panel>
  );
};

export default TotalUsersList;
