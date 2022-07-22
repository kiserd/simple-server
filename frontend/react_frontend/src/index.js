// library
import React from 'react';
import ReactDOM from 'react-dom/client';

// component
import App from './App';
import Layout from './components/Layout';

// styles
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>
);
