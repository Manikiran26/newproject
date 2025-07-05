import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../utils/translations';
import { 
  LayoutDashboard, 
  MessageSquareText, 
  Shield, 
  AlertTriangle, 
  Heart, 
  Settings, 
  Bookmark 
} from 'lucide-react';

export default function Navigation() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation(state.preferences.defaultLanguage);

  const navigationItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'generator', label: t('generateExcuse'), icon: MessageSquareText },
    { id: 'proof', label: t('proofGenerator'), icon: Shield },
    { id: 'emergency', label: t('emergencyAlerts'), icon: AlertTriangle },
    { id: 'apology', label: t('apologyGenerator'), icon: Heart },
    { id: 'saved', label: t('savedExcuses'), icon: Bookmark },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  return (
    <nav className={`backdrop-blur-sm border-r w-64 h-full transition-colors duration-300 ${
      state.preferences.theme === 'light' 
        ? 'bg-white/70 border-gray-200' 
        : 'bg-slate-800/50 border-slate-700'
    }`}>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <MessageSquareText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${
              state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              ExcuseAI
            </h1>
            <p className={`text-sm ${
              state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
            }`}>
              Smart Excuse System
            </p>
          </div>
        </div>
        
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = state.currentView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => dispatch({ type: 'SET_VIEW', payload: item.id })}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg'
                      : state.preferences.theme === 'light'
                        ? 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}