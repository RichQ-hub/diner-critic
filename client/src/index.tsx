import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
 * NOTE: React Strict Mode.
 * 
 * Strict Mode enables the following checks in development:
 *   - Your components will re-render an extra time to find bugs caused by impure rendering.
 *   - Your components will re-run Effects an extra time to find bugs caused by missing Effect cleanup.
 *   - Your components will be checked for usage of deprecated APIs.
 * 
 * All of these checks are development-only and do not impact the production build.
 */
