// components/RemovepatientDrawer.js
import React from 'react';
import { Drawer, Button, Stack } from 'rsuite';
import { connect } from 'react-redux';
import { deleteCaregiver } from '../../../redux/caregiver';
 
const RemoveCaregiverDrawer = ({ open, onClose, caregiver, deleteCaregiver }) => {
    const handleRemove = () => {
        deleteCaregiver(caregiver.uid);
         onClose();
    };

    return (
        <Drawer open={open} onClose={onClose}>
            <Drawer.Header>
            <Drawer.Title>Remove Caregiver</Drawer.Title></Drawer.Header>
            <Drawer.Body>
                <p>Are you sure you want to remove this caregiver {caregiver?.name}?</p>
            <Stack justifyContent='flex-end' spacing={20}>
                <Button onClick={onClose} appearance="subtle">Cancel</Button>
                <Button onClick={handleRemove} appearance="primary">Remove</Button>
            </Stack>
            </Drawer.Body>
        </Drawer>
    );
};

const mapDispatchToProps = {
    deleteCaregiver
};

export default connect(null, mapDispatchToProps)(RemoveCaregiverDrawer);
