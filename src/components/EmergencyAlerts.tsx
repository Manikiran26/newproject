import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../utils/translations';
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
  const { t } = useTranslation(state.preferences.defaultLanguage);
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
    { value: 'call', label: t('phoneCall'), icon: Phone, color: 'from-red-500 to-red-600' },
    { value: 'text', label: t('textMessage'), icon: MessageSquare, color: 'from-blue-500 to-blue-600' },
    { value: 'email', label: t('email'), icon: Mail, color: 'from-green-500 to-green-600' }
  ];

  return (
    <div className={`p-8 min-h-screen transition-colors duration-300 ${
      state.preferences.theme === 'light' 
        ? 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50' 
        : 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
    }`}>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${
              state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {t('emergencyAlerts')}
            </h1>
            <p className={`${
              state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
            }`}>
              {t('setupAutomatedEmergencyAlerts')}
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>{t('createAlert')}</span>
          </button>
        </div>
      </div>

      {/* Alert Types Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {alertTypes.map((type) => {
          const Icon = type.icon;
          const alertCount = state.emergencyAlerts.filter(a => a.type === type.value).length;
          
          return (
            <div key={type.value} className={`backdrop-blur-sm rounded-xl border p-6 ${
              state.preferences.theme === 'light' 
                ? 'bg-white/70 border-gray-200' 
                : 'bg-slate-800/50 border-slate-700'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {type.label}
                  </h3>
                  <p className={`text-sm ${
                    state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                  }`}>
                    {alertCount} {t('activeAlerts')}
                  </p>
                </div>
              </div>
              <div className={`text-2xl font-bold ${
                state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {alertCount}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Alert Form */}
        {showCreateForm && (
          <div className={`backdrop-blur-sm rounded-xl border p-6 ${
            state.preferences.theme === 'light' 
              ? 'bg-white/70 border-gray-200' 
              : 'bg-slate-800/50 border-slate-700'
          }`}>
            <h2 className={`text-xl font-semibold mb-6 ${
              state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {t('createEmergencyAlert')}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                }`}>
                  {t('alertType')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {alertTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => setNewAlert({ ...newAlert, type: type.value as any })}
                        className={`flex flex-col items-center space-y-2 p-3 rounded-lg border transition-all duration-200 ${
                          newAlert.type === type.value
                            ? state.preferences.theme === 'light'
                              ? 'bg-red-100 border-red-300 text-red-700'
                              : 'bg-red-600/20 border-red-500 text-red-300'
                            : state.preferences.theme === 'light'
                              ? 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
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
                <label className={`block text-sm font-medium mb-2 ${
                  state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                }`}>
                  {t('senderContact')}
                </label>
                <input
                  type="text"
                  value={newAlert.sender}
                  onChange={(e) => setNewAlert({ ...newAlert, sender: e.target.value })}
                  placeholder={t('senderPlaceholder')}
                  className={`w-full p-3 rounded-lg border focus:ring-1 transition-colors ${
                    state.preferences.theme === 'light'
                      ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:ring-red-500'
                      : 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-red-500 focus:ring-red-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                }`}>
                  {t('messageContent')}
                </label>
                <textarea
                  value={newAlert.content}
                  onChange={(e) => setNewAlert({ ...newAlert, content: e.target.value })}
                  placeholder={t('emergencyMessageContent')}
                  className={`w-full p-3 rounded-lg border focus:ring-1 resize-none transition-colors ${
                    state.preferences.theme === 'light'
                      ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:ring-red-500'
                      : 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-red-500 focus:ring-red-500'
                  }`}
                  rows={3}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                }`}>
                  {t('scheduleTimeOptional')}
                </label>
                <input
                  type="datetime-local"
                  value={newAlert.scheduledTime}
                  onChange={(e) => setNewAlert({ ...newAlert, scheduledTime: e.target.value })}
                  className={`w-full p-3 rounded-lg border focus:ring-1 transition-colors ${
                    state.preferences.theme === 'light'
                      ? 'bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500'
                      : 'bg-slate-700 border-slate-600 text-white focus:border-red-500 focus:ring-red-500'
                  }`}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleCreateAlert}
                  disabled={!newAlert.sender || !newAlert.content}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('createAlert')}
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    state.preferences.theme === 'light'
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  {t('cancel')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Alerts */}
        <div className={`backdrop-blur-sm rounded-xl border p-6 ${
          state.preferences.theme === 'light' 
            ? 'bg-white/70 border-gray-200' 
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <h2 className={`text-xl font-semibold mb-6 ${
            state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            {t('activeAlerts')}
          </h2>
          
          {state.emergencyAlerts.length > 0 ? (
            <div className="space-y-4">
              {state.emergencyAlerts.map((alert) => {
                const Icon = getAlertIcon(alert.type);
                return (
                  <div key={alert.id} className={`rounded-lg p-4 border ${
                    state.preferences.theme === 'light' 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-slate-700/50 border-slate-600'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        alert.type === 'call' ? 
                          state.preferences.theme === 'light' ? 'bg-red-100 text-red-600' : 'bg-red-600/20 text-red-400' :
                        alert.type === 'text' ? 
                          state.preferences.theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-600/20 text-blue-400' :
                          state.preferences.theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-600/20 text-green-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-medium ${
                            state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>
                            {alert.sender}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <button className={`p-1 transition-colors ${
                              state.preferences.theme === 'light' 
                                ? 'text-gray-600 hover:text-emerald-600' 
                                : 'text-slate-400 hover:text-emerald-400'
                            }`}>
                              <Play className="w-4 h-4" />
                            </button>
                            <button className={`p-1 transition-colors ${
                              state.preferences.theme === 'light' 
                                ? 'text-gray-600 hover:text-red-600' 
                                : 'text-slate-400 hover:text-red-400'
                            }`}>
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <p className={`text-sm mb-2 ${
                          state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                        }`}>
                          {alert.content}
                        </p>
                        
                        <div className={`flex items-center space-x-4 text-xs ${
                          state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
                        }`}>
                          <span className="capitalize">{t(alert.type)}</span>
                          {alert.scheduledTime && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(alert.scheduledTime).toLocaleString()}</span>
                            </div>
                          )}
                          <div className={`w-2 h-2 rounded-full ${alert.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`}></div>
                          <span>{alert.isActive ? t('active') : t('inactive')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertTriangle className={`w-16 h-16 mx-auto mb-4 ${
                state.preferences.theme === 'light' ? 'text-gray-400' : 'text-slate-500'
              }`} />
              <h3 className={`text-lg font-medium mb-2 ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                {t('noActiveAlerts')}
              </h3>
              <p className={`mb-4 ${
                state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
              }`}>
                {t('createFirstEmergencyAlert')}
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className={`transition-colors ${
                  state.preferences.theme === 'light' 
                    ? 'text-red-600 hover:text-red-700' 
                    : 'text-red-400 hover:text-red-300'
                }`}
              >
                {t('createAlert')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Warning */}
      <div className={`mt-8 p-4 rounded-lg border ${
        state.preferences.theme === 'light'
          ? 'bg-orange-50 border-orange-200'
          : 'bg-orange-600/20 border-orange-500/50'
      }`}>
        <div className="flex items-start space-x-3">
          <AlertTriangle className={`w-5 h-5 mt-0.5 ${
            state.preferences.theme === 'light' ? 'text-orange-600' : 'text-orange-400'
          }`} />
          <div>
            <h3 className={`font-medium mb-1 ${
              state.preferences.theme === 'light' ? 'text-orange-800' : 'text-orange-300'
            }`}>
              {t('importantNotice')}
            </h3>
            <p className={`text-sm ${
              state.preferences.theme === 'light' ? 'text-orange-700' : 'text-orange-200'
            }`}>
              {t('emergencyAlertsDisclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}