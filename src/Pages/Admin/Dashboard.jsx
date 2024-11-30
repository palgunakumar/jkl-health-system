import React, { useEffect } from 'react';
import { Panel, Grid, Row, Col, Table, Button } from 'rsuite';
import { connect } from 'react-redux';
import { fetchCaregivers } from '../../redux/caregiver';
import { getPatients } from '../../redux/patientActions';
import { FaUsers } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const Statistic = ({ title, count }) => {
    return (
        <>
            <Panel className={`trend-box bg-gradient-orange`} style={{ marginTop: '20px' }} data-aos="fade-down" data-aos-offset="50"
                data-aos-easing="ease-in-sine">
                <div className="chart-img"><FaUsers size={64} /></div>
                <div className="title">{title}</div>
                <div className="value">
                    {count}
                </div>
            </Panel>
        </>
    )
}
const Dashboard = ({ caregivers, patients, fetchCaregivers, fetchAvailableCaregivers, getPatients }) => {
    useEffect(() => {
        fetchCaregivers();
        getPatients();
    }, [fetchCaregivers, getPatients]);
    const navigation = useNavigate();
    const totalCaregivers = caregivers?.length || 0;
    const availableCaregivers = caregivers?.filter(caregiver => caregiver.availabilityStatus === 'available').length || 0;
    const totalPatients = patients?.length || 0;

    return (
        <div>
            <Row className="dashboard-header" style={{ marginTop: '20px' }}>
                <Col xs={22} sm={22} md={8} lg={8} xl={8}>
                    <Statistic title="Total Patients" count={totalPatients} />

                </Col>
                <Col xs={22} sm={22} md={8} lg={8} xl={8}>
                    <Statistic title="Total Caregivers" count={totalCaregivers} />
                </Col>
                <Col xs={22} sm={22} md={8} lg={8} xl={8}>
                    <Statistic title="Available Caregivers" count={availableCaregivers} />
                </Col>
            </Row>
            <Row gutter={30}>




            </Row>
            <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col xs={23}>
                    <Panel >
                        <h5 style={{textAlign: 'center'}}>Patient Assignments</h5>
                        <Table autoHeight data={patients} bordered>
                            <Table.Column flexGrow={1} align="center" fixed>
                                <Table.HeaderCell>Patient Name</Table.HeaderCell>
                                <Table.Cell dataKey="fullName" />
                            </Table.Column>
                            <Table.Column flexGrow={1} align="center">
                                <Table.HeaderCell>Assigned Caregiver ID</Table.HeaderCell>
                                <Table.Cell dataKey="caregiverId" />
                            </Table.Column>
                            <Table.Column flexGrow={1} align="center">
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.Cell>
                                    {rowData => (
                                        <Button
                                            appearance="link"
                                            onClick={() => navigation(`/patients/${rowData.uid}`)}
                                        >
                                            View
                                        </Button>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                        </Table>
                    </Panel>
                </Col>

                <Col xs={23}>
                    <Panel>
                        <h5  style={{textAlign: 'center'}}>Caregiver Assignments</h5>
                        <Table autoHeight data={caregivers} bordered>
                            <Table.Column flexGrow={1} align="center" fixed>
                                <Table.HeaderCell>Caregiver Name</Table.HeaderCell>
                                <Table.Cell dataKey="fullName" />
                            </Table.Column>
                            <Table.Column flexGrow={1} align="center">
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.Cell dataKey="availabilityStatus" />
                            </Table.Column>
                            <Table.Column flexGrow={1} align="center">
                                <Table.HeaderCell>Assigned Patient ID</Table.HeaderCell>
                                <Table.Cell dataKey="patientId" />
                            </Table.Column>
                            <Table.Column flexGrow={1} align="center">
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.Cell>
                                    {rowData => (
                                        <Button
                                            appearance="link"
                                            onClick={() => navigation(`/caregivers/${rowData.uid}`)}
                                        >
                                            View
                                        </Button>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                        </Table>
                    </Panel>
                </Col>
            </Row>
        </div>
    );
};

const mapStateToProps = state => ({
    caregivers: state.caregivers.caregivers,
    patients: state.patients.patients,
});

const mapDispatchToProps = {
    fetchCaregivers,
    getPatients,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
