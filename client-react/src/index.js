import React from 'react';
import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';
import App from "App";
import './index.css';

// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<App />);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'));
