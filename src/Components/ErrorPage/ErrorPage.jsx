import React from 'react';
import './styles.css';
const ErrorPage = ({ code = 404, children }) => (
  <div className="error-page">
    <div className="item">
      <div className="text">
        <h1 className="error-page-code">{code}</h1>
        {children}
      </div>
    </div>
  </div>
);

export default ErrorPage;
