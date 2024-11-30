// components/AssignCaregiverDrawer.js
import React, { useState, useEffect } from 'react';
import { Drawer, Form, Button, SelectPicker, Message, Loader, Stack } from 'rsuite';
import { connect } from 'react-redux';
import { fetchCaregivers, assignCaregiverToPatient } from '../../../redux/caregiver';
 
const AssignCaregiverDrawer = ({ open, onClose, patient, caregivers, fetchCaregivers, assignCaregiverToPatient, loading }) => {
    const [selectedCaregiver, setSelectedCaregiver] = useState(null);    
    useEffect(() => {
        if (open) {
            fetchCaregivers(); // Fetch caregivers when drawer opens
        }
    }, [open, fetchCaregivers]);        
    const handleSubmit = () => {
        if (selectedCaregiver) {
            assignCaregiverToPatient(patient.uid, selectedCaregiver);
             onClose();
        }
    };

    const caregiverOptions = caregivers.map(caregiver => ({
        label: caregiver.fullName,
        value: caregiver.id
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
                            Select a Patient to assign to this Caregiver.
                        </Message>
                        <Form.Group>
                            <Form.ControlLabel>Select Patient</Form.ControlLabel>
                            <SelectPicker 
                                data={caregiverOptions} 
                                style={{ width: '100%' }}
                                placeholder="Choose a caregiver"
                                onChange={setSelectedCaregiver}
                            />
                        </Form.Group>
                    </Form>
                )}<Stack justifyContent='flex-end' spacing={20}>
                                <Stack justifyContent='flex-end' spacing={20} style={{marginTop: '20px'}}>
                <Button onClick={handleSubmit} appearance="primary" disabled={!selectedCaregiver}>
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
    caregivers: state.caregivers.caregivers,
    loading: state.caregivers.fetchLoading,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCaregivers: () => dispatch(fetchCaregivers()),
    assignCaregiverToPatient: (patientId, caregiverId) => dispatch(assignCaregiverToPatient(patientId, caregiverId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignCaregiverDrawer);
