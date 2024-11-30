import React from 'react';
import { Container, Header, Content, Footer, Button, Panel, FlexboxGrid, Divider, IconButton } from 'rsuite';
import './index.css'
import ContactMap from '../../Components/ContactMap';
 const HomePage = () => {
  

  return (
    <>
      {/* Header Section */}
       <div 
        className='header-image'> 
         <div style={{ 
            position: 'absolute',
            bottom: '50%', // Adjust as needed for spacing
            left: '0',
            right: '0',
            textAlign: 'center',
            color: 'white', 
            zIndex: '1' // Ensure text is on top of the image
          }}>
            <h1 data-aos="fade-down" style={{ color: 'white' }}>JKL Healthcare Services</h1> 
            <p data-aos="fade-up" style={{ color: 'white' }}>Your Partner in Secure, Efficient, and Reliable Healthcare Management</p>
          </div>
      </div> 
       <Content>
        <Container style={{ padding: '20px' }}>
          <FlexboxGrid justify="center" data-aos="fade-right" style={{ marginBottom: '40px' }}>
            <FlexboxGrid.Item colspan={18}>
              <Panel  header={<h2>Welcome to JKL Healthcare Services</h2>}>
                <p>
                  At JKL Healthcare, we understand the importance of efficient, secure healthcare management.
                  Our platform enables healthcare providers, caregivers, and administrators to streamline
                  processes, manage patient data, and assign caregivers all in one place.
                </p>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          {/* Key Features Section */}
          <FlexboxGrid justify="center" data-aos="fade-up" style={{ marginBottom: '40px' }}>
            <FlexboxGrid.Item colspan={18}>
              <Panel  header={<h2>Platform Features</h2>}>
                <ul style={{ lineHeight: '1.8' }}>
                  <li><strong>User Management:</strong> Register, authenticate, and manage users easily.</li>
                  <li><strong>Patient Data Handling:</strong> Securely store and access comprehensive patient records.</li>
                  <li><strong>Caregiver Assignment:</strong> Schedule and track caregiver availability and assignments.</li>
                  <li><strong>Appointment Scheduling:</strong> Set up appointments with real-time notifications.</li>
                  <li><strong>Secure Access:</strong> High-level data encryption and compliance with data protection standards.</li>
                </ul>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          {/* How It Works Section */}
          <FlexboxGrid justify="center" data-aos="fade-left" style={{ marginBottom: '40px' }}>
            <FlexboxGrid.Item colspan={18}>
              <Panel  header={<h2>How It Works</h2>}>
                <p>
                  Our user-friendly interface ensures that healthcare providers can navigate the platform
                  effortlessly. From adding new patients to assigning caregivers and scheduling appointments,
                  JKL Healthcare Services simplifies the process so you can focus on what matters most.
                </p>
                <ul style={{ lineHeight: '1.8' }}>
                  <li><strong>Step 1:</strong> Register on the platform and log in securely.</li>
                  <li><strong>Step 2:</strong> Add and manage patient profiles.</li>
                  <li><strong>Step 3:</strong> Assign caregivers to patients based on their availability.</li>
                  <li><strong>Step 4:</strong> Schedule and manage appointments effortlessly.</li>
                </ul>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          {/* Security & Compliance Section */}
          <FlexboxGrid justify="center" data-aos="zoom-in" style={{ marginBottom: '40px' }}>
            <FlexboxGrid.Item colspan={18}>
              <Panel  header={<h2>Our Commitment to Security</h2>}>
                <p>
                  Security is at the core of JKL Healthcare Services. Our platform uses industry-leading
                  encryption and adheres to healthcare data protection regulations, ensuring that sensitive
                  patient information remains confidential.
                </p>
                <ul style={{ lineHeight: '1.8' }}>
                  <li><strong>Data Encryption:</strong> All patient data is encrypted for secure storage and access.</li>
                  <li><strong>Regulatory Compliance:</strong> We meet the standards for HIPAA and GDPR compliance.</li>
                  <li><strong>Access Control:</strong> Strict access control to safeguard patient and caregiver information.</li>
                </ul>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          {/* Testimonials Section */}
          <FlexboxGrid justify="center" data-aos="fade-up" style={{ marginBottom: '40px' }}>
            <FlexboxGrid.Item colspan={18}>
              <Panel  header={<h2>What Our Users Say</h2>}>
                <p>
                  "JKL Healthcare Services has transformed how we manage our patient data. The security and ease of
                  use have given us peace of mind and saved us valuable time."
                </p>
                <p><em>- Dr. Sarah Thompson, Health Clinic Manager</em></p>
                <Divider />
                <p>
                  "With JKL, scheduling appointments and assigning caregivers has become so efficient. It’s a one-stop
                  solution for healthcare management."
                </p>
                <p><em>- John Carmichael, Hospital Administrator</em></p>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          {/* Call to Action Section */}
          <FlexboxGrid justify="center" data-aos="zoom-in" style={{ marginBottom: '40px' ,textAlign: 'center' }}>
            <FlexboxGrid.Item colspan={18}>
              <Panel  header={<h2  style={{ textAlign: 'center' }}>Get Started Today</h2>}>
                <p  style={{ marginTop: '20px', marginBottom: '20px' }}>Ready to streamline your healthcare management process? Join JKL Healthcare Services today and experience the difference.</p>
                <Button appearance="primary" size="lg" href='/register'>Get Started</Button>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <FlexboxGrid justify="center" data-aos="zoom-in" style={{ marginBottom: '40px' ,textAlign: 'center' }}>
            <FlexboxGrid.Item colspan={24}>
          <ContactMap />
               
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Container>
      </Content>

        
    </>
  );
};

export default HomePage;
