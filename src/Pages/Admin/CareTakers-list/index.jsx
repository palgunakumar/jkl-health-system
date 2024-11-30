import React, { useEffect } from 'react';
import { Breadcrumb, Panel } from 'rsuite';
import  UserList from './users';
import { useDispatch } from 'react-redux';
 import { fetchCaregivers } from '../../../redux/caregiver';

const CareTakersList = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchCaregivers())
  },[])
  return (
    <Panel
      header={
        <>
          <h2 className="title">  Care Givers Management</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item >Admin</Breadcrumb.Item>
            <Breadcrumb.Item >Care Givers</Breadcrumb.Item>
            <Breadcrumb.Item active>  Care Givers Management</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
        <UserList/>
    </Panel>
  );
};

export default CareTakersList;
