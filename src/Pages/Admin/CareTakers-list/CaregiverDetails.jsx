import React, { useState, useEffect } from 'react';
import { Grid, Row, Col, Panel, Divider, Button, Loader, Message, Stack, IconButton, Avatar } from 'rsuite';
import { FaUserCircle, FaPhone, FaEnvelope, FaCalendarAlt, FaArrowLeft, FaHeartbeat, FaExclamationTriangle, FaUserMd } from 'react-icons/fa';
import { fetchCaregiverDetails } from '../../../redux/caregiver';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { PatientInfoDisplay } from '../Patients-list/ViewPatient';
import AssignCaregiverDrawer from './AssignCaregiverDrawer';
import RemoveAssignedPatientDrawer from './RemoveAssignedPatientDrawer';
import { AddOutline, Edit, Trash } from '@rsuite/icons';
 
const CaregiverDetailsPage = ({ fetchCaregiverDetails, caregiver, getCaregiverLoading }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assignDrawerOpen, setAssignDrawerOpen] = useState(false);
    const [removeAssignedPatientDrawer,  setRemoveAssignedPatientDrawer] = useState(false);
    const isAssigned = caregiver?.availabilityStatus === 'available';

    useEffect(() => {
        fetchCaregiverDetails(id);
    }, [id, ]);

    if (getCaregiverLoading) {
        return <Loader center content="Loading caregiver details..." />;
    }

    if (!caregiver) {
        return (
            <Stack justifyContent="center" alignItems="center" style={{ height: '70vh' }}>
                <Message showIcon type="error">Caregiver details could not be found.</Message>
            </Stack>
        );
    }

    return (
        <div className="caregiver-details-page" style={{ margin: '2% 12% 2% 12%' }}>
            <AssignCaregiverDrawer open={assignDrawerOpen} onClose={() => setAssignDrawerOpen(false)} caregiver={caregiver} />
            <RemoveAssignedPatientDrawer open={removeAssignedPatientDrawer} onClose={() => setRemoveAssignedPatientDrawer(false)} caregiver={caregiver}/>
 
            <Stack justifyContent="flex-end" alignItems="flex-start" style={{ marginBottom: '20px' }}>
                <IconButton
                    icon={<FaArrowLeft className="rs-icon" />}
                    appearance="primary"
                    onClick={() => navigate(-1)}
                    style={{ marginBottom: '20px' }}
                >
                    Back to Dashboard
                </IconButton>
            </Stack>

            
                {/* Caregiver Details Panel */}
                <Row gutter={16} style={{marginTop: '2%'}}>
                    <Col xs={24} sm={24}>
                        <Panel bordered>
                            <Stack justifyContent='space-between' wrap spacing={20}>
                            <h4>Assigned Caregiver</h4>
                            <Stack.Item>
                            <Stack justifyContent='center' wrap spacing={5}>
      {
        isAssigned ? <><IconButton icon={<AddOutline /> }
        appearance="primary"
        onClick={() => setAssignDrawerOpen(true)}
      >
        
      </IconButton></> : <></>
      }
      
      <IconButton icon={<Trash className='rs-icon'/>}
        appearance="primary"
        onClick={() => setRemoveAssignedPatientDrawer(true)}>
        
      </IconButton>
      </Stack>
                            </Stack.Item>
                            </Stack>
                            <Divider />
                            <Row gutter={16}>
                                {/* Image Section */}
                                <Col md={3} sm={23} xs={23}  >
                                <Stack justifyContent='center' alignItems='center'>

                                    {
                                        caregiver?.imageUrl ? (
                                            <Avatar size="xl" circle src={caregiver.imageUrl} alt={caregiver?.fullName} />
                                        ) : (
                                            <FaUserCircle className="panel-icon" style={{ fontSize: '50px', color: '#4caf50' }} />
                                        )
                                    }
                                    </Stack>
                                </Col>

                                {/* Name Section */}
                                <Col> <p><FaUserMd className="panel-icon" /> <strong>Name:</strong> {caregiver.fullName}</p>
                            <p><FaEnvelope className="panel-icon" /> <strong>Email:</strong> {caregiver.email}</p>
                            <p><FaPhone className="panel-icon" /> <strong>Phone:</strong> {caregiver.phoneNumber}</p>
                            <p><FaHeartbeat className="panel-icon" /> <strong>Blood Type:</strong> {caregiver.bloodType}</p>
                            <p><FaExclamationTriangle className="panel-icon" /> <strong>Availability Status:</strong> {caregiver.availabilityStatus}</p>

                                </Col>
                            </Row>
                                                   </Panel>
                    </Col>
                </Row>

                <Row gutter={16} style={{marginTop: '2%'}}>
                {caregiver?.assignedPatientsData ? <>
            <Col xs={24} sm={24} md={24}>
            <Panel bordered header={<h3 style={{textAlign: 'center'}}>Assigned Patient Details</h3>}>
                {
                caregiver?.assignedPatientsData?.map((patient, index) => {
                    return (<Panel shaded>
                        { index === 0 ? <> </> : <Divider />}
                        <PatientInfoDisplay patient={patient}/>
                                                    </Panel>
                        )
                    })
                }
                </Panel>
            </Col>
                
                </> : (
                    <Col xs={24} sm={24} md={24}>
                        <Panel bordered className="no-patient-panel">
                            <p>This caregiver is not assigned to any patient.</p>
                        </Panel>
                    </Col>
                )}
            </Row>

             
        </div>
    );
};

const mapStateToProps = state => ({
    caregiver: state.caregivers.caregiver,
    getCaregiverLoading: state.caregivers.getCaregiverLoading,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCaregiverDetails: (id) => dispatch(fetchCaregiverDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CaregiverDetailsPage);
