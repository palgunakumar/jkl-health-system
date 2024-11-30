import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, DatePicker, Message, Input, Stack, SelectPicker, IconButton } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientAppointments,  createAppointment, updateAppointment, deleteAppointment } from '../../../redux/appointments';
import { getPatients } from '../../../redux/patientActions';
import { fetchCaregivers } from '../../../redux/caregiver';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import AddAppointmentDrawer from './AddAppointmentDrawer';
import UpdateAppointmentDrawer from './UpdateAppointmentDrawer';

const AdminAppointmentManagement = () => {
    const dispatch = useDispatch();
    const { appointments, loading, error } = useSelector(state => state.appointments);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [addDrawerOpen, setAddDrawerOpen] = useState(false);
    const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);

    // Fetch data on component load
    useEffect(() => {
        dispatch(fetchPatientAppointments());
     }, [dispatch]);

    const handleOpenModal = (appointment = null) => {
        setEditingAppointment(appointment);
        setUpdateDrawerOpen(true);
    };

    
    const handleDeleteAppointment = (appointmentId) => {
        dispatch(deleteAppointment(appointmentId));
    };

    return (
        <div >
            <AddAppointmentDrawer open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)}/>
            <UpdateAppointmentDrawer open={updateDrawerOpen} appointment={editingAppointment} onClose={() => setUpdateDrawerOpen(false)} />
            {/* Add Appointment Button */}
            <Stack justifyContent='flex-end' style={{ marginBottom: '10px' }}>
                <Button color="green" appearance="primary" style={{ marginTop: '20px' }} onClick={() => setAddDrawerOpen(true)}>
                    <FaPlusCircle style={{ marginRight: '5px' }} /> Add Appointment
                </Button>
            </Stack>

            {/* Appointment Table */}
            {/* {error && <Message showIcon type="error" >{error} </Message>} */}
            <Table
                bordered cellBordered height={400}
                data={appointments}
                loading={loading}
                autoHeight
                rowKey="id"
            >
                <Table.Column width={50} align="center" fixed>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.Cell>
                        {(rowData, rowIndex) => {
                            return <div>{rowIndex + 1}</div>;
                        }}
                    </Table.Cell>
                </Table.Column>
                <Table.Column flexGrow={2} fixed>
                    <Table.HeaderCell>Patient</Table.HeaderCell>
                    <Table.Cell dataKey="patient.fullName" />
                </Table.Column>

                <Table.Column flexGrow={2} fixed>
                    <Table.HeaderCell>Caregiver</Table.HeaderCell>
                    <Table.Cell dataKey="caregiver.fullName" />
                </Table.Column>

                <Table.Column flexGrow={2}>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.Cell dataKey="appointmentDate">
                        {rowData => rowData.appointmentDate?.toDate()?.toDateString() ? rowData.appointmentDate?.toDate()?.toDateString() : rowData.appointmentDate?.toLocalDateString()}
                    </Table.Cell>
                </Table.Column>
                <Table.Column flexGrow={2}>
                    <Table.HeaderCell>Time</Table.HeaderCell>
                    <Table.Cell dataKey="appointmentTime">
                        {rowData => rowData.appointmentTime}
                    </Table.Cell>
                </Table.Column>
                <Table.Column flexGrow={1} align="center">
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                    <Table.Cell>
                        {rowData => (
                            <Stack spacing={10}>
                                <IconButton circle onClick={() => handleOpenModal(rowData)} icon={<FaEdit />} />
                                <IconButton circle onClick={() => handleDeleteAppointment(rowData.id)} icon={<FaTrashAlt />} />
                            </Stack>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </div>
    );
};

export default AdminAppointmentManagement;
