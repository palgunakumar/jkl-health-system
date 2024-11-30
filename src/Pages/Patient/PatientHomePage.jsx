// PatientHomePage.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Panel, List, Stack, Divider, Loader, Row, Col } from 'rsuite';

const PatientHomePage = ({
  loading,
  upcomingAppointments,
  caregiverNotes,
  error,
}) => {

  return (
    <div style={{ padding: '20px' }}>
       {loading ? (
        <Loader center content="Loading..." />
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <Row>
            <Col md={12} sm={23} xs={23}>
            
            

          {/* Upcoming Appointments Panel */}
          <Panel bordered shaded header="Upcoming Appointments">
            <List>
              {upcomingAppointments?.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <List.Item key={appointment.id}>
                    <Stack justifyContent="space-between">
                      <div>
                        <strong>
                          {appointment.date} at {appointment.time}
                        </strong>
                        <p>with {appointment.caregiver}</p>
                      </div>
                    </Stack>
                  </List.Item>
                ))
              ) : (
                <p style={{padding: '20px'}}>No upcoming appointments</p>
              )}
            </List>
          </Panel>
</Col>
            <Col md={12} sm={23} xs={23}>
          {/* Caregiver Notes Panel */}
          <Panel bordered shaded header="Caregiver Notes">
            <List>
              {caregiverNotes?.length > 0 ? (
                caregiverNotes.map((note) => (
                  <List.Item key={note.id}>
                    <Stack justifyContent="space-between">
                      <span>{note.note}</span>
                      <span style={{ color: '#888' }}>{note.date}</span>
                    </Stack>
                  </List.Item>
                ))
              ) : (
                <p style={{padding: '20px'}}>No notes from caregiver</p>
              )}
            </List>
          </Panel></Col>
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.patient?.loading,
  upcomingAppointments: state.patient?.upcomingAppointments,
  caregiverNotes: state.patient?.caregiverNotes,
  error: state.patient?.error,
});

const mapDispatchToProps = {  };

export default connect(mapStateToProps, mapDispatchToProps)(PatientHomePage);
