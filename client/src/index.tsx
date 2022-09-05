import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './hooks/useAuth';
import Routes from './components/Routes';
import './global.css';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>
);

export const serverUrl = "http://localhost:8000";
