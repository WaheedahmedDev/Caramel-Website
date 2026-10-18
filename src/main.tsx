import React from 'react';
import ReactDOM from 'react-dom/client';
import { PreferencesProvider } from './context/PreferencesContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <PreferencesProvider>
        <App />
      </PreferencesProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

