// components/AddCaregiverDrawer.js
import React, { useState, useRef, useEffect } from 'react';
import { Drawer, Form, Button, Schema, Stack, Input, SelectPicker, Divider, Uploader, Progress } from 'rsuite';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addCaregiver } from '../../../redux/caregiver'; // Update the import path to match your project structure
import { TextField } from '../../../Components/FormFields';
import { removePatientFiles, uploadPatientFiles } from '../../../redux/patientActions';
 
const { StringType , DateType, NumberType} = Schema.Types;

// Availability options
const availabilityOptions = [
    { label: 'Available', value: 'available' },
    { label: 'Occupied', value: 'occupied' }
];
const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Non-Binary', value: 'Non-Binary' },
    { label: 'Prefer Not to Say', value: 'Prefer Not to Say' },
];

const bloodTypeOptions = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
];
const isURL = (value) => {
    const urlRegex = /^(http|https):\/\/[^ "]+\.(jpeg|jpg|gif|png|bmp|svg)(\?.*)?$/i;

    return urlRegex.test(value);
};
const AddCaregiverDrawer = ({ open, onClose, addCaregiver }) => {
    const formRef = useRef();

    // Initial values for caregiver form fields
    const initialValues = {
        email: '',
        availabilityStatus: 'available',
        imageUrl: '',
        fullName: '',
        email: '',
        dateOfBirth: null,
        gender: '', 
        bloodType: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
        emergencyEmailAddress: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelationship: '',
    };

    // Validation model for form fields
    const model = Schema.Model({
         email: StringType().isEmail('Please enter a valid email address.').isRequired(),
        phoneNumber: StringType().isRequired('Please enter a phone number.'),
        availabilityStatus: StringType().isRequired('Please select availability status.'),
         fullName: StringType().isRequired('Please provide the caregiver’s full name.'),
        dateOfBirth: DateType().isRequired('Please provide a date of birth.'),
        gender: StringType().isRequired('Please select a gender.'),
        bloodType: StringType().isRequired('Please select a blood type.'),
        address: StringType().isRequired('Please provide an address.'),
        city: StringType().isRequired('Please provide a city.'),
        state: StringType().isRequired('Please provide a state.'),
        zipCode: NumberType().isRequired('Please provide a zip code.'),
        phoneNumber: StringType().isRequired('Please provide a phone number.'),
        emergencyEmailAddress: StringType().isEmail('Please provide a valid email address.'),
        emergencyContactName: StringType().isRequired('Please provide an emergency contact name.'),
        emergencyContactPhone: StringType().isRequired('Please provide an emergency contact phone number.'),
        emergencyContactRelationship: StringType().isRequired('Please specify the relationship with the emergency contact.'),
        allergies: StringType(),
        currentMedications: StringType(),
        imageUrl: StringType().isURL('Please enter a valid image URL')
    });
    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState(initialValues);
    const [formError, setFormError] = useState({});
    const fileUrl = useSelector((state) => state.patients.imageUrl);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileUploadProgress = useSelector((state) => state.patients.progress);
    const status = fileUploadProgress === 100 ? 'success' : null;
    const color = fileUploadProgress === 100 ? '#52c41a' : '#3385ff';
    const [disabled, setDisabled] = useState(false);
    const [fileList, setFileList] = React.useState([]);
    const uploader = React.useRef();
    const [fileInfo, setFileInfo] = React.useState();
    const [fileUploaded, setFileUploaded] = useState(false);
    const handleSubmit = () => {
        if (!formRef.current.check()) {
            return;
        }
        
        addCaregiver(formValue); // Dispatch addCaregiver action
        onClose(); // Close the drawer
        setFormValue(initialValues)
    };
    useEffect(() => {
        setFileInfo();
        setFileList([]);
        setProgress(0);
        setDisabled(false);
        setFormValue({ ...formValue, imageUrl: '' })
        dispatch({ type: 'PATIENTS_FILE_UPLOAD_PROGRESS', payload: 0 });
        dispatch({ type: 'HANDLE_PATIENTS_FILE_REMOVE' });
    },[])
    useEffect(() => {
        setProgress(fileUploadProgress);
    }, [fileUploadProgress])
    function previewFile(file, callback) {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const handleImageUpload = () => {
        setUploading(true);
        const file = fileList[0];
        previewFile(file.blobFile, value => {
            setFileInfo(value);
        })
        dispatch(uploadPatientFiles(file.blobFile))
    }
    const handleFileRemove = (file) => {
        setFileInfo();
        setFileList([]);
        setProgress(0);
        setDisabled(false);
        setFormValue({ ...formValue, imageUrl: '' })
        dispatch({ type: 'PATIENTS_FILE_UPLOAD_PROGRESS', payload: 0 });
        dispatch({ type: 'HANDLE_PATIENTS_FILE_REMOVE' });
        if (fileUploaded) {
            dispatch(removePatientFiles(file));
        }
    }
    const handleClear = () => {
        setFileInfo();
        setFileList([]);
        setProgress(0);
        setDisabled(false);
        setFormValue({ ...formValue, imageUrl: '' })
        dispatch({ type: 'PATIENTS_FILE_UPLOAD_PROGRESS', payload: 0 })
        dispatch({ type: 'HANDLE_PATIENTS_FILE_REMOVE' });

    }
    useEffect(() => {
        if (isURL(fileUrl)) {
            setDisabled(true);
            setFileUploaded(true)
            setFormValue({ ...formValue, imageUrl: fileUrl });
            setUploading(false)
        }
    }, [fileUrl]);
    return (
        <Drawer open={open} onClose={onClose} closeButton>
            <Drawer.Header>
                <Drawer.Title>Add New Caregiver</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <Form
                    checkTrigger="change"
                    fluid
                    ref={formRef}
                    onChange={setFormValue}
                    onCheck={setFormError}
                    formValue={formValue}
                    model={model}
                >
                    <TextField name="fullName" label="Full Name" />
                    <TextField name="email" label="Email" />
                    <Stack alignItems="center" justifyContent="flex-start" wrap spacing={20} style={{ marginTop: "20px" }}>

                        <Stack.Item grow={1}>
                            <TextField disabled={disabled} value={formValue.imageUrl} name="imageUrl" checkAsync type="text" label="Caregiver Image URL" />
                        </Stack.Item>
                    </Stack>
                    <Stack alignItems="center" justifyContent="flex-start" wrap spacing={20}>
                        <Stack.Item grow={1}>
                            <Divider>Or</Divider>
                        </Stack.Item>
                    </Stack>
                    <Stack alignItems="center" justifyContent="flex-start" wrap spacing={20}>

                        <Stack.Item grow={1}>
                            <Uploader
                                disabled={progress == 100}
                                multiple={false}
                                listType="picture-text"
                                onChange={setFileList}
                                fileList={fileList}
                                onRemove={(file) => handleFileRemove(file)}
                                autoUpload={false}
                                accept=".jpg, .jpeg, .png"
                                renderFileInfo={(file, fileElement) => {
                                    return (
                                        <>
                                            <span>File Name: {file.name}</span>

                                        </>
                                    );
                                }}
                                ref={uploader}
                                draggable>
                                <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span>Click or Drag files to this area to upload</span>
                                </div>
                            </Uploader>
                            {
                                progress > 1 ? <>
                                    <Progress.Line percent={progress} strokeColor={color} status={status} />
                                </> : ''
                            }
                        </Stack.Item>
                    </Stack>
                    <Stack style={{ margin: "15px 0" }} justifyContent='center' spacing={20}>
                        <Button disabled={!fileList.length}
                            onClick={
                                handleImageUpload
                            }
                            loading={uploading}
                        >Upload</Button>
                        <Button onClick={handleClear}>Clear</Button>
                    </Stack>
                    <TextField name="dateOfBirth" label="Date of Birth" type="date" />
                    <TextField name="gender" label="Gender" accepter={SelectPicker} style={{ width: '100%' }} data={genderOptions} />
                    <TextField name="bloodType" label="Blood Type" accepter={SelectPicker} style={{ width: '100%' }} data={bloodTypeOptions} />
                    <TextField name="address" label="Address" />
                    <TextField name="city" label="City" />
                    <TextField name="state" label="State" />
                    <TextField name="zipCode" label="Zip Code" type="number" />
                    <TextField name="phoneNumber" label="Phone Number" />
                    <TextField name="emergencyContactName" label="Emergency Contact Name" />
                    <TextField name="emergencyEmailAddress" label="Emergency Email Address" />
                    <TextField name="emergencyContactPhone" label="Emergency Contact Phone" />
                    <TextField name="emergencyContactRelationship" label="Relationship with Emergency Contact" />
                    <TextField
                        name="availabilityStatus"
                        label="Availability Status"
                        accepter={SelectPicker}
                        data={availabilityOptions}
                        style={{ width: '100%' }}
                    />

                    <Stack justifyContent="flex-end" spacing={5} style={{ marginTop: 20 }}>
                        <Button onClick={onClose} appearance="subtle">Cancel</Button>
                        <Button onClick={handleSubmit} appearance="primary">Add Caregiver</Button>
                    </Stack>
                </Form>
            </Drawer.Body>
        </Drawer>
    );
};

// Mapping the addCaregiver action to props
const mapDispatchToProps = {
    addCaregiver, // Uncomment to map the dispatch action
};

export default connect(null, mapDispatchToProps)(AddCaregiverDrawer);
