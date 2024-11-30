/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  Table, Pagination, Popover, Whisper, Modal, Stack, Input,
  InputGroup, FlexboxGrid, Dropdown, IconButton, ButtonToolbar, Tag,
  Button
} from 'rsuite';
import { Icon } from '@rsuite/icons';

import SearchIcon from '@rsuite/icons/Search';
import { useEffect } from 'react';
import MoreIcon from '@rsuite/icons/legacy/More';
import TableIcon from '@rsuite/icons/legacy/Table';
import ListIcon from '@rsuite/icons/legacy/ListAlt';
import UserContentPanel from './UserContentPanel';
import AddPatientDrawer from './AddPatientDrawer';
import { AddOutline, Edit, Trash } from '@rsuite/icons';
import { FaFemale, FaGenderless, FaMale } from 'react-icons/fa';
import UpdatePatientDrawer from './UpdatePatientDrawer';
import RemovePatientDrawer from './RemovePatientDrawer';
import AssignCaregiverDrawer from './AssignCaregiverDrawer';
import { addSamplePatients } from '../../../redux/patientActions';

const { Column, HeaderCell, Cell, ColumnGroup } = Table;
export const ImageCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: '#f5f5f5',
        borderRadius: 6,
        marginTop: 5,
        overflow: 'hidden',
        display: 'inline-block'
      }}
    >
      <img loading="lazy" alt={rowData.email} src={rowData[dataKey]} width="40" />
    </div>
  </Cell>
);
const renderGender = (gender) => {
  switch (gender) {
    case 'Male':
      return <FaMale size={40}   style={{ fontSize: 20, color: 'blue' }} />;
    case 'Female':
      return <FaFemale size={40} style={{ fontSize: 20, color: 'pink' }} />;
    default:
      return <FaGenderless size={40} style={{ fontSize: 20, color: 'gray' }} />;
  }
};
export const GenderCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
        <div
      style={{
         
        borderRadius: 6,
        marginTop: 5,
        overflow: 'hidden',
        display: 'inline-block'
      }}
    >
      {renderGender(rowData?.gender)}
      </div>
  </Cell>
);
export const NameCell = ({ rowData, dataKey, ...props }) => { 
  const speaker = (
    <Popover title="Description">
      <div
        style={{
          width: 40,
          height: 40,
          background: '#f5f5f5',
          borderRadius: 6,
          marginTop: 2,
          overflow: 'hidden',
          display: 'inline-block'
        }}
      >
        <img loading="lazy" src={rowData?.photoURL} width="40" alt={rowData?.fullName} />
      </div>
      <p>
        <b>Name:</b> {rowData?.fullName}
      </p>
      <p>
        <b>Email:</b> {rowData?.email}
      </p>
      <p>
        <b>Blood Group:</b> {rowData?.bloodType}
      </p>
    </Popover>
  ); return (
    <Cell {...props}>
      <Whisper placement="top" speaker={speaker}>
        <a>{rowData?.email}</a>
      </Whisper>
    </Cell>
  );
};
const renderAddress = ({ address, city, state, zipCode }) => (
  <span>
    <Icon icon="map-marker" style={{ color: 'green', marginRight: 8 }} />
    {`${address}, ${city}, ${state} ${zipCode}`}
  </span>
);

const renderEmergencyContact = (contact) => (
  <span>
    <Icon icon="phone" style={{ color: 'darkorange', marginRight: 8 }} />
    {contact}
  </span>
);
const UserList = ({ users, addSamplePatients  }) => {
  const SearchStyle = {
    width: 300,
  };
  const [searchInputValue, setSearchInputValue] = useState('');
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
   const [addDrawerOpen, setAddDrawerOpen] = useState(false);
    const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
    const [removeDrawerOpen, setRemoveDrawerOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [assignDrawerOpen, setAssignDrawerOpen] = useState(false);


   
  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };
  const getData = () => {
    if (sortColumn && sortType) {
      return tableData?.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    else {
      return tableData?.length ? tableData?.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
      }) : []
    }
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setTableLoading(true);
    setTimeout(() => {
      setTableLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };
  const handleInputChange = (e) => {
    if (e?.length > 0) {
      setTableLoading(true);
      const usersList = [...users];
      const filteredData = usersList?.filter((user) =>
        user?.uid?.toLowerCase().includes(e?.toLowerCase()) ||
        user?.firstName?.toLowerCase().includes(e?.toLowerCase()) ||
        user?.lastName?.toLowerCase().includes(e?.toLowerCase()) ||
        user?.email?.toLowerCase().includes(e?.toLowerCase())
      )
      setTableData(filteredData);
      setTimeout(() => {
        setTableLoading(false)
      }, 500);
    }
    else {
      setTableData(users)
    }
    setSearchInputValue(e)
  }
  const handleSearch = () => {
    if (searchInputValue?.length > 0) {
      setTableLoading(true);
      const usersList = [...users];
      const filteredData = usersList?.filter((user) =>
        user?.uid?.toLowerCase().includes(searchInputValue?.toLowerCase()) ||
        user?.firstName?.toLowerCase().includes(searchInputValue?.toLowerCase()) ||
        user?.lastName?.toLowerCase().includes(searchInputValue?.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchInputValue?.toLowerCase())
      )
      setTableData(filteredData);
      setTimeout(() => {
        setTableLoading(false);
      }, 500);
    }
    else {
      setTableData(users)
    }
  }
  useEffect(() => {
    setTableLoading(true);
    setTableData(users || []);
    setTableLoading(false);
  }, [users, limit]);
  const handleUpdate = (patient) => {
    setSelectedPatient(patient);
    setUpdateDrawerOpen(true);
};

const handleRemove = (patientId) => {
    setSelectedPatient(patientId);
    setRemoveDrawerOpen(true);
};
const handleAddCareGiver = (patient) => {
  setSelectedPatient(patient);
  setAssignDrawerOpen(true)
}
const handleAddSamplePatients = () => {
  addSamplePatients();
}
  return (
    <div className='container mt-3'>
            <AddPatientDrawer open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)}/>
            <UpdatePatientDrawer open={updateDrawerOpen} onClose={() => setUpdateDrawerOpen(false)} patient={selectedPatient}/>
            <RemovePatientDrawer open={removeDrawerOpen} onClose={() => setRemoveDrawerOpen(false)} patient={selectedPatient}/>
            <AssignCaregiverDrawer open={assignDrawerOpen} onClose={() => setAssignDrawerOpen(false) } patient={selectedPatient}/>
      <FlexboxGrid justify='space-between' style={{ marginBottom: '20px' }}>
        <FlexboxGrid.Item>
          <Stack spacing={5} justifyContent="space-between">
            <InputGroup inside style={SearchStyle}>
              <Input onChange={handleInputChange} value={searchInputValue} />
              <InputGroup.Button>
                <SearchIcon onClick={handleSearch} />
              </InputGroup.Button>
            </InputGroup>
            
          </Stack></FlexboxGrid.Item>
        <FlexboxGrid.Item>
        <Stack spacing={5} justifyContent="space-between">
          <Stack.Item>
          <IconButton onClick={() => setAddDrawerOpen(true)} appearance="primary" icon={<AddOutline />}>Add Patient</IconButton>
          {/* <IconButton onClick={handleAddSamplePatients} appearance="primary" icon={<AddOutline />}>Add Sample Patients</IconButton> */}

            
          </Stack.Item>
           
            </Stack>
        </FlexboxGrid.Item>
      </FlexboxGrid>
 
            <Table wordWrap="break-word" height={420} headerHeight={60} data={getData()}
              sortColumn={sortColumn}
              rowExpandedHeight={100}
              rowHeight={30}
              bordered cellBordered       
               
              sortType={sortType}
              onSortColumn={handleSortColumn}
              loading={tableLoading}>
              <Column width={50} align="center" fixed>
                <HeaderCell>#</HeaderCell>
                <Cell>
                  {(rowData, rowIndex) => {
                    return <div>{rowIndex + 1}</div>;
                  }}
                </Cell>
              </Column>
              <Column flexGrow={1} align="center" fixed>
                <HeaderCell>Avatar</HeaderCell>
                <ImageCell dataKey="photoURL" />
              </Column>
              <Column width={200} align="center" fixed>
        <Table.HeaderCell>Full Name</Table.HeaderCell>
        <Table.Cell dataKey="fullName" />
              </Column>
              <Column width={150} sortable>
                <HeaderCell>Email</HeaderCell>
                <NameCell dataKey="email">
                  {rowData =>
                    rowData?.email
                  }
                </NameCell>
              </Column>
               
              <Column flexGrow={1}  align='center'>
                <HeaderCell>Gender</HeaderCell>
              <GenderCell dataKey='gender' />  
               </Column>
              <Column width={150}  >
                <HeaderCell>Date of Birth</HeaderCell>
                <Cell dataKey="dateOfBirth" />
              </Column>
              
       

      <Column width={100} align="center">
        <Table.HeaderCell>Blood Type</Table.HeaderCell>
        <Table.Cell dataKey="bloodType" />
      </Column>

      <Column width={300} align="center">
        <Table.HeaderCell>Address</Table.HeaderCell>
        <Table.Cell>{(rowData) => renderAddress(rowData)}</Table.Cell>
      </Column>

      <Column width={150} align="center">
        <Table.HeaderCell>Phone Number</Table.HeaderCell>
        <Table.Cell dataKey="phoneNumber" />
      </Column>

      <Column width={300} align="center">
        <Table.HeaderCell>Emergency Contact</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => renderEmergencyContact(rowData.emergencyContactPhone)}
        </Table.Cell>
      </Column>

      <Column width={150} align="center">
        <Table.HeaderCell>Emergency Contact Name</Table.HeaderCell>
        <Table.Cell dataKey="emergencyContactName" />
      </Column>

      <Column width={150} align="center">
        <Table.HeaderCell>Emergency Relationship</Table.HeaderCell>
        <Table.Cell dataKey="emergencyContactRelationship" />
      </Column>

      <Column width={250} align="center">
        <Table.HeaderCell>Allergies</Table.HeaderCell>
        <Table.Cell dataKey="allergies" />
      </Column>

      <Column width={250} align="center">
        <Table.HeaderCell>Current Medications</Table.HeaderCell>
        <Table.Cell dataKey="currentMedications" />
      </Column>
      <Column width={250} align="center">
        <Table.HeaderCell>Care Giver</Table.HeaderCell>
        <Cell>
        {
                rowData => {
                  const isAssigned = rowData.caregiverId != null;
                  return (
                    <>
                    {
                      isAssigned ? <> {rowData?.caregiver?.name}

                      </> : <>
                      <Button onClick={() => handleAddCareGiver(rowData)}>
                        Assign
                      </Button>
                      </>
                    }
                    </>
                  )
                }
              }
        </Cell>
      </Column>
      <Column width={150}  align="center">
                    <HeaderCell>Actions</HeaderCell>
                    <Cell>
                        {rowData => (
                            <span>
                                <IconButton onClick={() => handleUpdate(rowData)} circle icon={<Edit />} size="sm" />
                                <IconButton circle onClick={() => handleRemove(rowData)} icon={<Trash />} size="sm" />
                            </span>
                        )}
                    </Cell>
                </Column>
            </Table>
       <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={['total', '-', 'limit', '|', 'pager', 'skip']}
          total={tableData?.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>  
    </div>
  );

}
 
const UserManagementComponent = ({ users, addSamplePatients }) => {
  return (
    <>
      <UserList users={users} addSamplePatients={addSamplePatients}   />
    </>
  )
}
const mapDispatchToProps = dispatch => ({
  addSamplePatients: () => dispatch(addSamplePatients()),
});
const mapStateToProps = state => ({
  users: state.patients?.patients
});
export default connect(mapStateToProps, mapDispatchToProps)(UserManagementComponent);
