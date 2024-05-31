import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import DatabaseServiceProvider from './providers/DatabaseServiceProvider';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <DatabaseServiceProvider>
      <App />
    </DatabaseServiceProvider>
  </React.StrictMode>
);