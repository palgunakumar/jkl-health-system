// components/AddAppointmentDrawer.js
import React, { useState, useRef, useEffect } from 'react';
import { Drawer, Form, Button, Schema, Stack, SelectPicker, DatePicker, TimePicker, Notification, useToaster, Message } from 'rsuite';
import { connect, useDispatch } from 'react-redux';
import { TextField } from '../../../Components/FormFields';
import { getPatients } from '../../../redux/patientActions';
import { fetchCaregivers } from '../../../redux/caregiver';
import { createAppointment } from '../../../redux/appointments';

const { StringType } = Schema.Types;

const appointmentTypeOptions = [
    { label: 'Check-up', value: 'Check-up' },
    { label: 'Follow-up', value: 'Follow-up' },
    { label: 'Consultation', value: 'Consultation' },
    { label: 'Emergency', value: 'Emergency' },
];
const timeOptions = [
    { label: "9:00 AM", value: "09:00 AM" },
    { label: "9:30 AM", value: "09:30 AM" },
    { label: "10:00 AM", value: "10:00 AM" },
    { label: "10:30 AM", value: "10:30 AM" },
    { label: "11:00 AM", value: "11:00 AM" },
    { label: "11:30 AM", value: "11:30 AM" },
    { label: "12:00 PM", value: "12:00 PM" },
    { label: "12:30 PM", value: "12:30 PM" },
    { label: "1:00 PM", value: "01:00 PM" },
    { label: "1:30 PM", value: "01:30 PM" },
    { label: "2:00 PM", value: "02:00 PM" },
    { label: "2:30 PM", value: "02:30 PM" },
    { label: "3:00 PM", value: "03:00 PM" },
    { label: "3:30 PM", value: "03:30 PM" },
    { label: "4:00 PM", value: "04:00 PM" },
    { label: "4:30 PM", value: "04:30 PM" },
   ];
  
// Validation model for form fields
const model = Schema.Model({
    patientId: StringType().isRequired('Patient name is required.'),
    caregiverId: StringType().isRequired('Caregiver name is required.'),
     appointmentDate: Schema.Types.DateType()
    .isRequired('appointment Date is required.')
    .addRule((value, formValue) => {
        // Ensure startDate is today or in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return value >= today;
    }, 'Please select a date from today onward.'),
    appointmentTime: StringType().isRequired('Please select an appointment time.'),
    appointmentType: StringType().isRequired('Please select the type of appointment.'),
    notes: StringType(),
});

const AddAppointmentDrawer = ({ open, onClose, createAppointment, patient }) => {
    const formRef = useRef();
    const [formValue, setFormValue] = useState({});
    const [formError, setFormError] = useState({});
    const handleSubmit = () => {
        if (!formRef.current.check()) return;
        createAppointment(formValue);
        onClose();
        setFormValue({})
    };

    useEffect(() => {
        if(patient){
            setFormValue({
                patientId: patient?.uid,
                caregiverId: patient?.caregiverId,
            })
        }
    }, [patient])
    
    return (
        <Drawer open={open} onClose={onClose} closeButton>
            <Drawer.Header>
                <Drawer.Title>Add Appointment</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                {
                    patient.caregiverId ? <>
                <Form
                    ref={formRef}
                    model={model}
                    onCheck={setFormError}
                    formValue={formValue}
                    onChange={setFormValue}
                    checkTrigger="change"
                    fluid
                >
                    <TextField
                        name="patientId"
                        label="Patient Name"
                        disabled
                        value={patient.fullName ? patient.fullName : patient.displayName}
                        placeholder="Patient Name" style={{width: '100%'}}
                    />
                    <TextField
                        name="caregiverId"
                        label="Care Giver ID"
                        disabled
                        value={patient.caregiverId ? patient.caregiverId : patient.caregiverId}
                        placeholder="Care Giver ID" style={{width: '100%'}}
                    />
                    <TextField
                        name="appointmentDate"
                        label="Appointment Date"
                        accepter={DatePicker}
                        oneTap style={{width: '100%'}}
                    />
                    <TextField
                        name="appointmentTime"
                        label="Appointment Time"
                        accepter={SelectPicker}
                        data={timeOptions}
                        placeholder="Select appointment Time"
                        format="HH:mm" style={{width: '100%'}}
                    />
                    <TextField
                        name="appointmentType"
                        label="Appointment Type"
                        accepter={SelectPicker}
                        data={appointmentTypeOptions}
                        placeholder="Select appointment type" style={{width: '100%'}}
                    />
                    <TextField name="notes" label="Notes" placeholder="Additional information" />

                    <Stack justifyContent="flex-end" spacing={5} style={{ marginTop: 20 }}>
                        <Button onClick={onClose} appearance="subtle">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} appearance="primary">
                             Make an Appointment
                        </Button>
                    </Stack>
                </Form></> : <>
                    <Stack justifyContent='center' alignItems='center'>
                        <Message showIcon type='info' >
                        Caregiver not assigned yet.
                         <br></br>You cannot make an Appointment until  you are assigned  to a caregiver
                        </Message>
                    </Stack>
                </>
                }
            </Drawer.Body>
        </Drawer>
    );
};

const mapStateToProps = (state) => ({
    patient: state.auth.user,
    loading: state.auth.loading,
    caregivers: state.caregivers.caregivers,
    fetchCaregiversLoading: state.patients.fetchLoading,
});
const mapDispatchToProps = {
    createAppointment,
    getPatients,
    fetchCaregivers,

};

export default connect(mapStateToProps, mapDispatchToProps)(AddAppointmentDrawer);
