// components/AssignCaregiverDrawer.js
import React, { useState, useEffect } from 'react';
import { Drawer, Form, Button, SelectPicker, Message, Loader, Stack } from 'rsuite';
import { connect } from 'react-redux';
import { fetchCaregivers, assignCaregiverToPatient } from '../../../redux/caregiver';
import {  getUnAssignedPatients } from '../../../redux/patientActions';

const AssignCaregiverDrawer = ({ open, onClose, caregiver, patients, getPatients, assignCaregiverToPatient, loading }) => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    useEffect(() => {
        if (open) {
            getPatients(); 
        }
    }, [open, getPatients]);
    const handleSubmit = () => {            
            assignCaregiverToPatient(selectedPatient, caregiver.uid);
            onClose();
    };

    const patientsOptions = patients?.map(caregiver => ({
        label: caregiver?.fullName,
        value: caregiver.uid
    }));    

    return (
        <Drawer open={open} onClose={onClose}>
            <Drawer.Header>
                <Drawer.Title>Assign Caregiver</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                {loading ? (
                    <Loader center content="Loading caregivers..." />
                ) : (
                    <Form fluid>
                        <Message showIcon type="info">
                            Select a caregiver to assign to this patient.
                        </Message>
                        <Form.Group>
                            <Form.ControlLabel>Select Patient</Form.ControlLabel>
                            <SelectPicker
                                data={patientsOptions}
                                style={{ width: '100%' }}
                                placeholder="Choose a patient"
                                onChange={setSelectedPatient}
                            />
                        </Form.Group>
                    </Form>
                )}<Stack justifyContent='flex-end' spacing={20}>
                    <Stack justifyContent='flex-end' spacing={20} style={{ marginTop: '20px' }}>
                        <Button onClick={handleSubmit} appearance="primary" disabled={!selectedPatient}>
                            Assign
                        </Button>
                        <Button onClick={onClose} appearance="subtle">
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </Drawer.Body>

        </Drawer>
    );
};

const mapStateToProps = (state) => ({
    patients: state.patients.getUnassignedPatients,
    loading: state.patients.getUnassignedPatientsLoading,
});

const mapDispatchToProps = (dispatch) => ({
    getPatients: () => dispatch(getUnAssignedPatients()),
    assignCaregiverToPatient: (patientId, caregiverId) => dispatch(assignCaregiverToPatient(patientId, caregiverId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignCaregiverDrawer);
