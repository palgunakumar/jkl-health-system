import React, { useState, useEffect } from 'react';
import { Modal, Drawer, Button, Stack , Loader, Form, Message, SelectPicker} from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import Icon from '@rsuite/icons/Icon';
import { GoAlertFill } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { getAssignedPatientsToCaregiver, removeCaregiverFromPatient } from '../../../redux/caregiver';
import { connect } from 'react-redux';
 
const RemoveAssignedPatientDrawer = ({ open, onClose, caregiver, removeCaregiverFromPatient, loading, patients, getAssignedPatientsToCaregiver }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  
    const handleSubmit = () => {      
        removeCaregiverFromPatient(selectedPatient, caregiver?.uid);
         onClose();
    };    
    useEffect(() => {
        if (open) {
            getAssignedPatientsToCaregiver(caregiver?.uid); 
        }
    }, [open, getAssignedPatientsToCaregiver]);
    const patientsOptions = patients?.map(caregiver => ({
      label: caregiver.fullName,
      value: caregiver.uid
  }));  
    return (
        <Drawer open={open} onClose={onClose}>
            <Drawer.Header>
            <Drawer.Title>Remove Patient from caregiver</Drawer.Title></Drawer.Header>
            <Drawer.Body>
                {loading ? (
                    <Loader center content="Loading patients assigned to the caregiver..." />
                ) : (
                    <Form fluid>
                        <Message showIcon type="info">
                            Select a patient to remove from this caregiver.
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
                            Remove
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

const mapDispatchToProps = (dispatch) => ({
    getAssignedPatientsToCaregiver : (id) => dispatch(getAssignedPatientsToCaregiver(id)),
    removeCaregiverFromPatient: (patient, caregiver) => dispatch(removeCaregiverFromPatient(patient, caregiver)),
});
const mapStateToProps = (state) => ({
    patients: state.caregivers.assignedPatients,
    loading: state.caregivers.getAssignedPatientsLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveAssignedPatientDrawer);