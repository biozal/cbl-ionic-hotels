import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import CBLiteProvider from './providers/CBLiteProvider';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <CBLiteProvider>
      <App />
    </CBLiteProvider>
  </React.StrictMode>
);