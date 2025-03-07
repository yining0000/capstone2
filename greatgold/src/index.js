import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This hooks into the "root" div in your public HTML
);
