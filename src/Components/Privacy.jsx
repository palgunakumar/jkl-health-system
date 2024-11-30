import React, { useEffect } from 'react';
import { FaUser, FaInfoCircle, FaCookie, FaLock, FaEnvelope, FaLink } from 'react-icons/fa';
import { MdOutlinePrivacyTip } from "react-icons/md";
const PrivacyPolicy = () => {
 
    return (
        <div className="privacy-policy-container" style={{ maxWidth: '800px', margin: 'auto', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <header data-aos="fade-down" className="privacy-policy-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1 style={{ color: '#333' }}>Privacy Policy</h1>
                <p><strong>Last Updated:</strong> {new Date().toLocaleString()}</p>
            </header>

            <section data-aos="fade-right" style={{ marginBottom: '20px' }}>
                <h3><FaUser size={24}/> Information We Collect</h3>
                <p style={{marginLeft: '5%'}}>We gather various types of information to provide and improve our services:</p>
                <ul style={{marginLeft: '5%'}}>
                    <li><strong>Personal Information</strong>: Includes your name, username, email address, and profile image.</li>
                    <li><strong>Technical Data</strong>: IP address, device details, cookies, and browsing activity.</li>
                </ul>
            </section>

            <section data-aos="fade-left" style={{ marginBottom: '20px' }}>
                <h3><FaInfoCircle size={24}/> How We Use Your Information</h3>
                <p style={{marginLeft: '5%'}}>We use this data to improve our services. Specifically, your information helps us to:</p>
                <ul style={{marginLeft: '5%'}}>
                <li>Providing and maintaining our services.</li>
                    <li>Improving our services based on usage patterns.</li>
                    <li>Communicating with you regarding updates and support.</li>
                    <li>Ensuring security and preventing fraudulent activity.</li>
                    <li>Deliver a personalized experience and service improvements.</li>
                    <li>Send relevant updates, support information, and security alerts.</li>
                    <li>Ensure data security and detect potential fraud or misuse.</li>
                </ul>
            </section>

            <section data-aos="fade-right" style={{ marginBottom: '20px' }}>
                <h3 ><FaCookie size={24}/> Cookies and Tracking Technologies</h3>
                <p style={{marginLeft: '5%'}}>Cookies and tracking technologies help us personalize your experience. You can manage cookies in your browser settings, though some features may be impacted if disabled.</p>
            </section>

            <section data-aos="fade-left" style={{ marginBottom: '20px' }}>
                <h3><FaLock size={24}/> Sharing Your Information</h3>
                <p style={{marginLeft: '5%'}}>We respect your privacy and don’t sell your information. However, in some instances, data may be shared:</p>
                <ul style={{marginLeft: '5%'}}>
                    <li><strong>With service providers</strong>: To assist with essential functions like hosting, analytics, and support.</li>
                    <li><strong>Legal requirements</strong>: To comply with legal obligations or requests.</li>
                </ul>
            </section>

            <section data-aos="fade-right" style={{ marginBottom: '20px' }}>
                <h3><FaLock size={24} /> Data Security</h3>
                <p style={{marginLeft: '5%'}}>We prioritize data security with appropriate measures to protect your information. However, no system is completely secure, so we cannot guarantee absolute safety.</p>
            </section>
            <section data-aos="fade-left" style={{ marginBottom: '20px' }}>
                <h3><FaLink size={24} /> Third-Party Links</h3>
                <p style={{marginLeft: '5%'}}>Our service may link to third-party websites. We are not responsible for the privacy practices of these external sites. Please review their privacy policies.</p>
            </section>

            <section data-aos="fade-right" style={{ marginBottom: '20px' }}>
                <h3> <MdOutlinePrivacyTip size={24}/> Changes to This Privacy Policy</h3>
                <p style={{marginLeft: '5%'}}>We may update this Privacy Policy occasionally. Check this page periodically to stay informed of any changes.</p>
            </section>
            <section data-aos="fade-left" style={{ marginBottom: '20px' }}>
                <h3><FaInfoCircle size={24}/> Your Privacy Rights</h3>
                <p style={{marginLeft: '5%'}}>Depending on your location, you may have rights to access, modify, or delete your data. Contact us for any specific requests regarding your personal information.</p>
            </section>

            
        </div>
    );
};

export default PrivacyPolicy;
