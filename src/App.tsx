import React from 'react';
import { AppProvider } from './contexts/AppContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Dashboard />
      </div>
    </AppProvider>
  );
}

export default App;