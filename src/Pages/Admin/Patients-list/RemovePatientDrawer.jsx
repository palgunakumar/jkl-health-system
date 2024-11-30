// components/RemovepatientDrawer.js
import React from 'react';
import { Drawer, Button, Stack } from 'rsuite';
import { connect } from 'react-redux';
import { deletePatient } from '../../../redux/patientActions';
 
const RemovePatientDrawer = ({ open, onClose, patient, deletePatient }) => {
    const handleRemove = () => {
        deletePatient(patient.uid);
         onClose();
    };

    return (
        <Drawer open={open} onClose={onClose}>
            <Drawer.Header>
            <Drawer.Title>Remove Patient</Drawer.Title></Drawer.Header>
            <Drawer.Body>
                <p>Are you sure you want to remove this patient {patient?.fullName}?</p>
            <Stack justifyContent='flex-end' spacing={20}>
                <Button onClick={onClose} appearance="subtle">Cancel</Button>
                <Button onClick={handleRemove} appearance="primary">Remove</Button>
            </Stack>
            </Drawer.Body>
        </Drawer>
    );
};

const mapDispatchToProps = {
    deletePatient
};

export default connect(null, mapDispatchToProps)(RemovePatientDrawer);
