import React, { useEffect } from 'react';
import { Panel, Grid, Row, Col, IconButton, Loader, Message, Divider, Stack, Avatar } from 'rsuite';
import { connect } from 'react-redux';
import { fetchPatientDetails } from '../../../redux/patientActions';
import { useNavigate, useParams } from 'react-router-dom';
import {
    FaUserCircle, FaBirthdayCake, FaVenusMars, FaHome, FaEnvelope, FaPhone,
    FaHeartbeat, FaPills, FaExclamationTriangle, FaUserMd, FaCalendarCheck, FaClock, FaLink,
    FaArrowRight,
    FaArrowLeft
} from 'react-icons/fa';

export const PatientInfoDisplay = ({ patient }) => (
    <Grid fluid>
        <Row gutter={16} >
            {/* Patient Personal Information Section */}
            <Col xs={24} sm={12} style={{ marginTop: '10px' }}>
                <Panel bordered>

                    <Row gutter={16}>
                        {/* Image Section */}
                        <Col md={24} sm={24} xs={24}  >
                        <Stack justifyContent='center' alignItems='center' >

                            {
                                patient?.imageUrl ? (
                                    <Avatar size="xl" circle src={patient.imageUrl} alt={patient.fullName} />
                                ) : (
                                    <FaUserCircle className="panel-icon" style={{ fontSize: '50px', color: '#4caf50' }} />
                                )
                            }
                            </Stack>
                        </Col>
                    </Row>


                    <Divider />
                    <p><FaBirthdayCake className="panel-icon" /> <strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
                    <p><FaVenusMars className="panel-icon" /> <strong>Gender:</strong> {patient.gender}</p>
                    <p><FaHome className="panel-icon" /> <strong>Address:</strong> {patient.address}, {patient.city}, {patient.state}, {patient.zipCode}</p>
                    <p><FaEnvelope className="panel-icon" /> <strong>Email:</strong> {patient.email}</p>
                    <p><FaPhone className="panel-icon" /> <strong>Phone:</strong> {patient.phoneNumber}</p>
                    <p><FaHeartbeat className="panel-icon" /> <strong>Blood Type:</strong> {patient.bloodType}</p>
                    <p><FaPills className="panel-icon" /> <strong>Current Medications:</strong> {patient.currentMedications}</p>
                    <p><FaExclamationTriangle className="panel-icon" /> <strong>Allergies:</strong> {patient.allergies}</p>
                </Panel>
            </Col>

            {/* Emergency Contact Section */}
            <Col xs={24} sm={12} style={{ marginTop: '10px' }}>
                <Panel bordered>
                    <h4>Emergency Contact</h4>
                    <Divider />
                    <p><FaUserCircle className="panel-icon" /> <strong>Name:</strong> {patient.emergencyContactName}</p>
                    <p><FaPhone className="panel-icon" /> <strong>Phone:</strong> {patient.emergencyContactPhone}</p>
                    <p><FaLink className="panel-icon" /> <strong>Relationship:</strong> {patient.emergencyContactRelationship}</p>
                </Panel>
            </Col>

        </Row>
        <div style={{ marginTop: '10px' }}>


            {/* Caregiver Section (only if caregiver exists) */}
            {patient?.caregiver && (
                <Row gutter={16}>
                    <Col xs={24} sm={24}>
                        <Panel bordered>
                            <h4>Assigned Caregiver</h4>
                            <Divider />
                            <Row gutter={16}>
                                {/* Image Section */}
                                <Col md={3} sm={23} xs={23}  >
                                <Stack justifyContent='center' alignItems='center'>

                                    {
                                        patient?.caregiver?.imageUrl ? (
                                            <Avatar size="xl" circle src={patient.caregiver.imageUrl} alt={patient.fullName} />
                                        ) : (
                                            <FaUserCircle className="panel-icon" style={{ fontSize: '50px', color: '#4caf50' }} />
                                        )
                                    }
                                    </Stack>
                                </Col>

                                {/* Name Section */}
                                <Col> <p><FaUserMd className="panel-icon" /> <strong>Name:</strong> {patient.caregiver.fullName}</p>
                            <p><FaEnvelope className="panel-icon" /> <strong>Email:</strong> {patient.caregiver.email}</p>
                            <p><FaPhone className="panel-icon" /> <strong>Phone:</strong> {patient.caregiver.phoneNumber}</p>
                            <p><FaHeartbeat className="panel-icon" /> <strong>Blood Type:</strong> {patient.caregiver.bloodType}</p>
                            <p><FaExclamationTriangle className="panel-icon" /> <strong>Availability Status:</strong> {patient.caregiver.availabilityStatus}</p>

                                </Col>
                            </Row>
                                                   </Panel>
                    </Col>
                </Row>
            )}
            {
                patient?.caregiverId !== null ? <></> : <>
                    <Message showIcon type="error" >Caregiver not assigned yet.</Message>

                </>
            }
        </div>
        {/* Date Information Section */}
        <Row gutter={16} style={{ marginTop: '10px' }}>
            <Col xs={24} sm={12}>
                <p><FaCalendarCheck /> <strong>Assigned At:</strong> {new Date(patient.assignedAt).toLocaleString()}</p>
            </Col>
            <Col xs={24} sm={12}>
                <p><FaClock /> <strong>Last Updated:</strong> {new Date(patient.lastUpdatedAt).toLocaleString()}</p>
            </Col>
        </Row>
    </Grid>
);

const PatientDetails = ({ patient, loading, fetchPatientDetails }) => {
    const { id } = useParams();
    useEffect(() => {
        fetchPatientDetails(id);
    }, [id, fetchPatientDetails]);

    const navigate = useNavigate();
    if (loading) {
        return (
            <Stack justifyContent='center' alignItems='center' style={{ height: '70vh' }}>
                <Loader center content="Loading patient details..." />
            </Stack>)
            ;
    }

    if (patient?.length < 1) {
        return (
            <Stack justifyContent='center' alignItems='center' style={{ height: '70vh' }}>
                <Message showIcon type="error" >Patient details could not be found.</Message>
            </Stack>
        );
    }

    return (
        <div style={{ margin: '2% 12% 2% 12%' }}>
            <Stack justifyContent='flex-end'>

                <IconButton icon={<FaArrowLeft className='rs-icon' />} appearance="primary" onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
                    Back to Dashboard
                </IconButton>
            </Stack>

            <PatientInfoDisplay patient={patient} />

        </div>
    );
};

const mapStateToProps = state => ({
    patient: state.patients.patient,
    loading: state.patients.getPatientLoading,
});

const mapDispatchToProps = (dispatch) => ({
    fetchPatientDetails: (id) => dispatch(fetchPatientDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
