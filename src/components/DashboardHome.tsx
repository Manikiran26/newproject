import React from 'react';
import { useApp } from '../contexts/AppContext';
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

  const stats = [
    {
      label: 'Excuses Generated',
      value: state.excuses.length,
      icon: MessageSquareText,
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      label: 'Saved Excuses',
      value: state.savedExcuses.length,
      icon: Star,
      color: 'from-emerald-500 to-emerald-600',
      change: '+8%'
    },
    {
      label: 'Emergency Alerts',
      value: state.emergencyAlerts.length,
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      change: '+3%'
    },
    {
      label: 'Avg. Believability',
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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-slate-400">Here's what's happening with your excuse system today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 hover:bg-slate-800/70 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-emerald-400 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Excuses */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Excuses</h2>
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'generator' })}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Generate New
            </button>
          </div>
          
          {recentExcuses.length > 0 ? (
            <div className="space-y-4">
              {recentExcuses.map((excuse) => (
                <div key={excuse.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{excuse.title}</h3>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        excuse.believabilityScore >= 80 ? 'bg-emerald-400' :
                        excuse.believabilityScore >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></div>
                      <span className="text-sm text-slate-400">{excuse.believabilityScore}%</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm line-clamp-2">{excuse.content}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded-md">
                      {excuse.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(excuse.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquareText className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400">No excuses generated yet</p>
              <button
                onClick={() => dispatch({ type: 'SET_VIEW', payload: 'generator' })}
                className="mt-3 text-blue-400 hover:text-blue-300 transition-colors"
              >
                Create your first excuse
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
          
          <div className="space-y-3">
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'generator' })}
              className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 border border-blue-500/30 rounded-lg hover:from-blue-600/30 hover:to-emerald-600/30 transition-all duration-200 text-left"
            >
              <MessageSquareText className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="font-medium text-white">Generate Excuse</h3>
                <p className="text-sm text-slate-400">Create a context-aware excuse</p>
              </div>
            </button>
            
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'proof' })}
              className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-lg hover:from-emerald-600/30 hover:to-teal-600/30 transition-all duration-200 text-left"
            >
              <Shield className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-medium text-white">Generate Proof</h3>
                <p className="text-sm text-slate-400">Create supporting evidence</p>
              </div>
            </button>
            
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'emergency' })}
              className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-lg hover:from-orange-600/30 hover:to-red-600/30 transition-all duration-200 text-left"
            >
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <div>
                <h3 className="font-medium text-white">Emergency Alert</h3>
                <p className="text-sm text-slate-400">Set up automated alerts</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}