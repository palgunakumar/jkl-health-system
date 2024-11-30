import React, {useState, useRef, useMemo, useCallback} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Panel, Stack } from 'rsuite';
import 'leaflet/dist/leaflet.css';

 
const SimpleMap = () => {
    const mapRef = useRef(null);
    const latitude = 52.40845;
    const longitude = -1.50137;
  
    return ( 
      // Make sure you set the height and width of the map container otherwise the map won't show
        <MapContainer center={[latitude, longitude]} zoom={16} scrollWheelZoom={false} ref={mapRef} style={{height: "70vh"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]} >
              <Popup >
              <Stack alignItems="center" justifyContent="center" spacing={20} style={{ textAlign: 'center' }}>
                    <Stack.Item style={{padding: '2px' }}>
          <strong>Our Location</strong>
          <p>Address: Priory St, Coventry CV1 5FB, United Kingdom</p>
          <p>Contact: +442476887688</p>
          <p>Email: contact@coventry.ac.uk</p>
        </Stack.Item>
        
      </Stack>
              </Popup>
          </Marker>
          {/* Additional map layers or components can be added here */}
        </MapContainer>
    );
  };
const ContactMap = () => {

    return (
        <>
                    <h3 style={{  padding: '20px',  }}>Contact Us</h3>
          <SimpleMap />
            <Panel   style={{ width: '100%', padding: '20px',  }}>
                    <Stack alignItems="center" justifyContent="center" spacing={20} style={{ textAlign: 'center' }}>
                    <Stack.Item style={{ width: '50%', padding: '20px' }}>
          <h4>Our Location</h4>
          <p>Address: Priory St, Coventry CV1 5FB, United Kingdom</p>
          <p>Contact: +442476887688</p>
          <p>Email: contact@coventry.ac.uk</p>
        </Stack.Item>
        
      </Stack>
            </Panel>
            
        </>
    );
};

export default ContactMap;
