import React from 'react';
import Navigation from './Navigation';
import DashboardHome from './DashboardHome';
import ExcuseGenerator from './ExcuseGenerator';
import ProofGenerator from './ProofGenerator';
import EmergencyAlerts from './EmergencyAlerts';
import ApologyGenerator from './ApologyGenerator';
import SavedExcuses from './SavedExcuses';
import SettingsPanel from './SettingsPanel';
import { useApp } from '../contexts/AppContext';

export default function Dashboard() {
  const { state } = useApp();

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'dashboard':
        return <DashboardHome />;
      case 'generator':
        return <ExcuseGenerator />;
      case 'proof':
        return <ProofGenerator />;
      case 'emergency':
        return <EmergencyAlerts />;
      case 'apology':
        return <ApologyGenerator />;
      case 'saved':
        return <SavedExcuses />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className={`flex h-screen transition-colors duration-300 ${
      state.preferences.theme === 'light' 
        ? 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50' 
        : 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
    }`}>
      <Navigation />
      <main className="flex-1 overflow-auto">
        {renderCurrentView()}
      </main>
    </div>
  );
}