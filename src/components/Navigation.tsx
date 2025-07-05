import React from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  LayoutDashboard, 
  MessageSquareText, 
  Shield, 
  AlertTriangle, 
  Heart, 
  Settings, 
  Bookmark 
} from 'lucide-react';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'generator', label: 'Generate', icon: MessageSquareText },
  { id: 'proof', label: 'Proof', icon: Shield },
  { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
  { id: 'apology', label: 'Apology', icon: Heart },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Navigation() {
  const { state, dispatch } = useApp();

  return (
    <nav className="bg-slate-800/50 backdrop-blur-sm border-r border-slate-700 w-64 h-full">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <MessageSquareText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">ExcuseAI</h1>
            <p className="text-sm text-slate-400">Smart Excuse System</p>
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