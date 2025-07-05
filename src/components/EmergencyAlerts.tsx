import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { EmergencyAlert } from '../types';
import { 
  AlertTriangle, 
  Phone, 
  MessageSquare, 
  Mail, 
  Clock, 
  Plus,
  Play,
  Pause,
  Trash2
} from 'lucide-react';

export default function EmergencyAlerts() {
  const { state, dispatch } = useApp();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    type: 'call' as const,
    sender: '',
    content: '',
    scheduledTime: ''
  });

  const handleCreateAlert = () => {
    const alert: EmergencyAlert = {
      id: Date.now().toString(),
      type: newAlert.type,
      sender: newAlert.sender,
      content: newAlert.content,
      scheduledTime: newAlert.scheduledTime ? new Date(newAlert.scheduledTime).getTime() : undefined,
      isActive: true
    };

    dispatch({ type: 'ADD_EMERGENCY_ALERT', payload: alert });
    setNewAlert({ type: 'call', sender: '', content: '', scheduledTime: '' });
    setShowCreateForm(false);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone;
      case 'text': return MessageSquare;
      case 'email': return Mail;
      default: return AlertTriangle;
    }
  };

  const alertTypes = [
    { value: 'call', label: 'Phone Call', icon: Phone, color: 'from-red-500 to-red-600' },
    { value: 'text', label: 'Text Message', icon: MessageSquare, color: 'from-blue-500 to-blue-600' },
    { value: 'email', label: 'Email', icon: Mail, color: 'from-green-500 to-green-600' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Emergency Alerts</h1>
            <p className="text-slate-400">Set up automated emergency calls, texts, and emails to support your excuses</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Create Alert</span>
          </button>
        </div>
      </div>

      {/* Alert Types Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {alertTypes.map((type) => {
          const Icon = type.icon;
          const alertCount = state.emergencyAlerts.filter(a => a.type === type.value).length;
          
          return (
            <div key={type.value} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{type.label}</h3>
                  <p className="text-sm text-slate-400">{alertCount} active alerts</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{alertCount}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Alert Form */}
        {showCreateForm && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Create Emergency Alert</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Alert Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {alertTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => setNewAlert({ ...newAlert, type: type.value as any })}
                        className={`flex flex-col items-center space-y-2 p-3 rounded-lg border transition-all duration-200 ${
                          newAlert.type === type.value
                            ? 'bg-red-600/20 border-red-500 text-red-300'
                            : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{type.label.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Sender/Contact</label>
                <input
                  type="text"
                  value={newAlert.sender}
                  onChange={(e) => setNewAlert({ ...newAlert, sender: e.target.value })}
                  placeholder="e.g., Dr. Smith, Mom, Boss"
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message Content</label>
                <textarea
                  value={newAlert.content}
                  onChange={(e) => setNewAlert({ ...newAlert, content: e.target.value })}
                  placeholder="Emergency message content..."
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Schedule Time (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={newAlert.scheduledTime}
                  onChange={(e) => setNewAlert({ ...newAlert, scheduledTime: e.target.value })}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleCreateAlert}
                  disabled={!newAlert.sender || !newAlert.content}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Alert
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Alerts */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Active Alerts</h2>
          
          {state.emergencyAlerts.length > 0 ? (
            <div className="space-y-4">
              {state.emergencyAlerts.map((alert) => {
                const Icon = getAlertIcon(alert.type);
                return (
                  <div key={alert.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        alert.type === 'call' ? 'bg-red-600/20 text-red-400' :
                        alert.type === 'text' ? 'bg-blue-600/20 text-blue-400' :
                        'bg-green-600/20 text-green-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white">{alert.sender}</h3>
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-slate-400 hover:text-emerald-400 transition-colors">
                              <Play className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-slate-400 hover:text-red-400 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-slate-300 text-sm mb-2">{alert.content}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-slate-400">
                          <span className="capitalize">{alert.type}</span>
                          {alert.scheduledTime && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(alert.scheduledTime).toLocaleString()}</span>
                            </div>
                          )}
                          <div className={`w-2 h-2 rounded-full ${alert.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`}></div>
                          <span>{alert.isActive ? 'Active' : 'Inactive'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">No Active Alerts</h3>
              <p className="text-slate-400 mb-4">Create your first emergency alert to get started</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Create Alert
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Warning */}
      <div className="mt-8 p-4 bg-orange-600/20 border border-orange-500/50 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />
          <div>
            <h3 className="font-medium text-orange-300 mb-1">Important Notice</h3>
            <p className="text-orange-200 text-sm">
              Emergency alerts are simulated for demonstration purposes only. Do not use this feature for actual emergencies 
              or to deceive others in harmful ways. Use responsibly and ethically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}