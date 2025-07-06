import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../utils/translations';
import { 
  TrendingUp, 
  Clock, 
  Star, 
  Activity,
  MessageSquareText,
  Shield,
  AlertTriangle
} from 'lucide-react';

export default function DashboardHome() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation(state.preferences.defaultLanguage);

  const stats = [
    {
      label: t('generatedExcuses'),
      value: state.excuses.length,
      icon: MessageSquareText,
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      label: t('savedExcuses'),
      value: state.savedExcuses.length,
      icon: Star,
      color: 'from-emerald-500 to-emerald-600',
      change: '+8%'
    },
    {
      label: t('emergencyAlerts'),
      value: state.emergencyAlerts.length,
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      change: '+3%'
    },
    {
      label: t('avgBelievability'),
      value: state.excuses.length > 0 
        ? Math.round(state.excuses.reduce((acc, e) => acc + e.believabilityScore, 0) / state.excuses.length)
        : 0,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      change: '+15%'
    }
  ];

  const recentExcuses = state.excuses.slice(0, 3);

  return (
    <div className={`p-8 min-h-screen transition-colors duration-300 ${
      state.preferences.theme === 'light' 
        ? 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50' 
        : 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
    }`}>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${
          state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          {t('welcomeBack')}
        </h1>
        <p className={`${
          state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
        }`}>
          {t('dashboardSubtitle')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`backdrop-blur-sm rounded-xl border p-6 transition-all duration-200 ${
                state.preferences.theme === 'light' 
                  ? 'bg-white/70 border-gray-200 hover:bg-white/90' 
                  : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-emerald-400 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${
                state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {stat.value}
              </h3>
              <p className={`text-sm ${
                state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
              }`}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Excuses */}
        <div className={`backdrop-blur-sm rounded-xl border p-6 ${
          state.preferences.theme === 'light' 
            ? 'bg-white/70 border-gray-200' 
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${
              state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {t('recentExcuses')}
            </h2>
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'generator' })}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              {t('generateNew')}
            </button>
          </div>
          
          {recentExcuses.length > 0 ? (
            <div className="space-y-4">
              {recentExcuses.map((excuse) => (
                <div key={excuse.id} className={`rounded-lg p-4 border ${
                  state.preferences.theme === 'light' 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-slate-700/50 border-slate-600'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-medium ${
                      state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {excuse.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        excuse.believabilityScore >= 80 ? 'bg-emerald-400' :
                        excuse.believabilityScore >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></div>
                      <span className={`text-sm ${
                        state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                      }`}>
                        {excuse.believabilityScore}%
                      </span>
                    </div>
                  </div>
                  <p className={`text-sm line-clamp-2 ${
                    state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                  }`}>
                    {excuse.content}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`px-2 py-1 text-xs rounded-md ${
                      state.preferences.theme === 'light' 
                        ? 'bg-gray-200 text-gray-700' 
                        : 'bg-slate-600 text-slate-300'
                    }`}>
                      {t(excuse.category)}
                    </span>
                    <span className={`text-xs ${
                      state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
                    }`}>
                      {new Date(excuse.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquareText className={`w-12 h-12 mx-auto mb-3 ${
                state.preferences.theme === 'light' ? 'text-gray-400' : 'text-slate-500'
              }`} />
              <p className={`${
                state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
              }`}>
                {t('noExcusesYet')}
              </p>
              <button
                onClick={() => dispatch({ type: 'SET_VIEW', payload: 'generator' })}
                className={`mt-3 transition-colors ${
                  state.preferences.theme === 'light' 
                    ? 'text-blue-600 hover:text-blue-700' 
                    : 'text-blue-400 hover:text-blue-300'
                }`}
              >
                {t('createFirstExcuse')}
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`backdrop-blur-sm rounded-xl border p-6 ${
          state.preferences.theme === 'light' 
            ? 'bg-white/70 border-gray-200' 
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <h2 className={`text-xl font-semibold mb-6 ${
            state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            {t('quickActions')}
          </h2>
          
          <div className="space-y-3">
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'generator' })}
              className={`w-full flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 text-left ${
                state.preferences.theme === 'light'
                  ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                  : 'bg-gradient-to-r from-blue-600/20 to-emerald-600/20 border-blue-500/30 hover:from-blue-600/30 hover:to-emerald-600/30'
              }`}
            >
              <MessageSquareText className={`w-5 h-5 ${
                state.preferences.theme === 'light' ? 'text-blue-600' : 'text-blue-400'
              }`} />
              <div>
                <h3 className={`font-medium ${
                  state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {t('generateExcuse')}
                </h3>
                <p className={`text-sm ${
                  state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                }`}>
                  {t('createContextAware')}
                </p>
              </div>
            </button>
            
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'proof' })}
              className={`w-full flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 text-left ${
                state.preferences.theme === 'light'
                  ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border-emerald-500/30 hover:from-emerald-600/30 hover:to-teal-600/30'
              }`}
            >
              <Shield className={`w-5 h-5 ${
                state.preferences.theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'
              }`} />
              <div>
                <h3 className={`font-medium ${
                  state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {t('proofGenerator')}
                </h3>
                <p className={`text-sm ${
                  state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                }`}>
                  {t('createSupportingEvidence')}
                </p>
              </div>
            </button>
            
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'emergency' })}
              className={`w-full flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 text-left ${
                state.preferences.theme === 'light'
                  ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                  : 'bg-gradient-to-r from-orange-600/20 to-red-600/20 border-orange-500/30 hover:from-orange-600/30 hover:to-red-600/30'
              }`}
            >
              <AlertTriangle className={`w-5 h-5 ${
                state.preferences.theme === 'light' ? 'text-orange-600' : 'text-orange-400'
              }`} />
              <div>
                <h3 className={`font-medium ${
                  state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {t('emergencyAlerts')}
                </h3>
                <p className={`text-sm ${
                  state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                }`}>
                  {t('setupAutomatedAlerts')}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}