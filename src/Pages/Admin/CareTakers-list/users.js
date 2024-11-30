/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  Table, Pagination, Popover, Whisper, Button, Modal, Stack, Input,
  InputGroup, FlexboxGrid, Dropdown, IconButton, ButtonToolbar, Tag,
  Drawer
} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { useEffect } from 'react';
import { AddOutline, Edit, Trash } from '@rsuite/icons';
import AddCareGiver from './AddCareGiver';
import AssignCaregiverDrawer from './AssignCaregiverDrawer';
import RemoveAssignedPatientDrawer from './RemoveAssignedPatientDrawer';
import { FaTrash } from 'react-icons/fa6';
import UpdateCareGiver from './UpdateCareGiver';
import RemoveCaregiverDrawer from './RemoveCaregiverDrawer';
import { addSampleCaregivers } from '../../../redux/caregiver';

const { Column, HeaderCell, Cell } = Table;


const UserList = ({ users, addSampleCaregivers }) => {
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
  const [assignDrawerOpen, setAssignDrawerOpen] = useState(false);
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
  const [removeDrawerOpen, setRemoveDrawerOpen] = useState(false);
  const [selectedCareGiver, setSelectedCareGiver] = useState(null)
  const [removeAssignedPatientDrawer,  setRemoveAssignedPatientDrawer] = useState(false);
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);

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
  const onRemove = (caregiver) => {
    setSelectedCareGiver(caregiver);
    setRemoveAssignedPatientDrawer(true);
  }
  const onAssign = (caregiver) => {
    setSelectedCareGiver(caregiver);
    setAssignDrawerOpen(true);
  }
  const handleUpdate = (caregiver) => {
    setSelectedCaregiver(caregiver);
    setUpdateDrawerOpen(true);
};

const handleRemove = (caregiver) => {
     setSelectedCaregiver(caregiver);
    setRemoveDrawerOpen(true);
};
const handleAddSampleCaregivers = () => {
  addSampleCaregivers();
}
  return (  
    <div className='container mt-3'>
      <AddCareGiver open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)} />
        <RemoveAssignedPatientDrawer open={removeAssignedPatientDrawer} onClose={() => setRemoveAssignedPatientDrawer(false)} caregiver={selectedCareGiver}/>
        <UpdateCareGiver open={updateDrawerOpen} onClose={() => setUpdateDrawerOpen(false)} caregiver={selectedCaregiver}/>
      <AssignCaregiverDrawer open={assignDrawerOpen} onClose={() => setAssignDrawerOpen(false)} caregiver={selectedCareGiver} />
      <RemoveCaregiverDrawer open={removeDrawerOpen} onClose={() => setRemoveDrawerOpen(false)} caregiver={selectedCaregiver}/>
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
          <Stack spacing={10} justifyContent="space-between">
            <IconButton onClick={() => setAddDrawerOpen(true)} appearance="primary" icon={<AddOutline />}>Add Care Giver</IconButton>
            {/* <IconButton onClick={handleAddSampleCaregivers} appearance="primary" icon={<AddOutline />}>Add Sample Caregivers</IconButton> */}
           </Stack>
        </FlexboxGrid.Item>
      </FlexboxGrid>

      <>
        <Table wordWrap="break-word" height={420} headerHeight={40} data={getData()}
          sortColumn={sortColumn}
          rowExpandedHeight={100}
          // rowHeight={30}
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
          <Column flexGrow={1}>
            <HeaderCell>Caregiver Name</HeaderCell>
            <Cell dataKey="fullName" />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>Availability</HeaderCell>
            <Cell dataKey="availabilityStatus" />
          </Column>
           
          
          <Column flexGrow={1} align='center'>
            <HeaderCell>Assign / Relieve Patients</HeaderCell>
            <Cell>
  {rowData => {
    const isAssigned = rowData.availabilityStatus === 'available';

    return (
      <>
      <Stack justifyContent='center' wrap spacing={5}>
      {
        isAssigned ? <><IconButton icon={<AddOutline /> }
        appearance="primary"
        onClick={() => {
             
            onAssign(rowData);
        }}
      >
        
      </IconButton></> : <></>
      }
      
      <IconButton icon={<FaTrash className='rs-icon'/>}
        appearance="primary"
        onClick={() => {
            onRemove(rowData);
        }}
      >
        
      </IconButton>
      </Stack>
      </>
    );
  }}
</Cell>

          </Column>
          <Column flexGrow={1}  align="center">
                    <HeaderCell>Account Actions</HeaderCell>
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
      </>
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
const UserManagementComponent = ({ users, addSampleCaregivers }) => {

  return (
    <>
      <UserList users={users} addSampleCaregivers = {addSampleCaregivers}/>
    </>
  )
}
const mapDispatchToProps = dispatch => ({
  addSampleCaregivers: () => dispatch(addSampleCaregivers()),
});
const mapStateToProps = state => ({
  users: state.caregivers?.caregivers
});
export default connect(mapStateToProps, mapDispatchToProps)(UserManagementComponent);
