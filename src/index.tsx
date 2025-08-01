import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FormPage from './FormPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FormPage />
  </React.StrictMode>
);

reportWebVitals();
