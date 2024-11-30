import React from 'react';
import './styles.css';
const UserStatusError = ({ children }) => (
  <div className="error-page">
    <div className="item">
      <div className="text">
        {children}
      </div>
    </div>
  </div>
);

export default UserStatusError;
