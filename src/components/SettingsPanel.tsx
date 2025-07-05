import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../utils/translations';
import { 
  Settings, 
  Globe, 
  Volume2, 
  Shield, 
  Palette, 
  Bell,
  User,
  Database
} from 'lucide-react';

export default function SettingsPanel() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation(state.preferences.defaultLanguage);

  const handlePreferenceUpdate = (key: string, value: any) => {
    dispatch({ 
      type: 'UPDATE_PREFERENCES', 
      payload: { [key]: value } 
    });
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' }
  ];

  const categories = [
    { value: 'work', label: 'Work', icon: '💼' },
    { value: 'medical', label: 'Medical', icon: '🏥' },
    { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { value: 'transport', label: 'Transport', icon: '🚗' },
    { value: 'technology', label: 'Technology', icon: '💻' },
    { value: 'weather', label: 'Weather', icon: '🌧️' },
    { value: 'emergency', label: 'Emergency', icon: '🚨' },
    { value: 'personal', label: 'Personal', icon: '👤' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Customize your excuse generator preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Settings className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">General Settings</h2>
          </div>

          <div className="space-y-6">
            {/* Language */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-300 mb-3">
                <Globe className="w-4 h-4" />
                <span>Default Language</span>
              </label>
              <select
                value={state.preferences.defaultLanguage}
                onChange={(e) => handlePreferenceUpdate('defaultLanguage', e.target.value)}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-300 mb-3">
                <Palette className="w-4 h-4" />
                <span>Theme</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['dark', 'light'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => handlePreferenceUpdate('theme', theme)}
                    className={`p-3 rounded-lg border transition-all duration-200 capitalize ${
                      state.preferences.theme === theme
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
                <Volume2 className="w-4 h-4" />
                <span>Voice Playback</span>
              </label>
              <button
                onClick={() => handlePreferenceUpdate('voiceEnabled', !state.preferences.voiceEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.preferences.voiceEnabled ? 'bg-blue-600' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    state.preferences.voiceEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Auto Proof Generation */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
                <Shield className="w-4 h-4" />
                <span>Auto-generate Proof</span>
              </label>
              <button
                onClick={() => handlePreferenceUpdate('autoProofGeneration', !state.preferences.autoProofGeneration)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.preferences.autoProofGeneration ? 'bg-emerald-600' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    state.preferences.autoProofGeneration ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Emergency Contacts */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
                <Bell className="w-4 h-4" />
                <span>Emergency Contacts</span>
              </label>
              <button
                onClick={() => handlePreferenceUpdate('emergencyContactsEnabled', !state.preferences.emergencyContactsEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.preferences.emergencyContactsEnabled ? 'bg-red-600' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    state.preferences.emergencyContactsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Category Preferences */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <User className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-semibold text-white">Preferred Categories</h2>
          </div>

          <p className="text-slate-400 text-sm mb-4">
            Select your most commonly used excuse categories for faster generation
          </p>

          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => {
              const isSelected = state.preferences.preferredCategories.includes(category.value as any);
              return (
                <button
                  key={category.value}
                  onClick={() => {
                    const current = state.preferences.preferredCategories;
                    const updated = isSelected
                      ? current.filter(c => c !== category.value)
                      : [...current, category.value as any];
                    handlePreferenceUpdate('preferredCategories', updated);
                  }}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                    isSelected
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Database className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Data Management</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-600">
              <div>
                <h3 className="font-medium text-white">Generated Excuses</h3>
                <p className="text-sm text-slate-400">{state.excuses.length} items</p>
              </div>
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors text-sm">
                Export
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-600">
              <div>
                <h3 className="font-medium text-white">Saved Excuses</h3>
                <p className="text-sm text-slate-400">{state.savedExcuses.length} items</p>
              </div>
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors text-sm">
                Export
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-600">
              <div>
                <h3 className="font-medium text-white">Emergency Alerts</h3>
                <p className="text-sm text-slate-400">{state.emergencyAlerts.length} items</p>
              </div>
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors text-sm">
                Clear All
              </button>
            </div>

            <div className="pt-4">
              <button className="w-full px-4 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/50 rounded-lg transition-colors">
                Clear All Data
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">About ExcuseAI</h2>
          
          <div className="space-y-4 text-sm text-slate-300">
            <p>
              ExcuseAI is an advanced excuse generation system powered by artificial intelligence. 
              It creates context-aware, believable excuses tailored to your specific situation.
            </p>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Version:</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Build:</span>
                <span>2024.01.15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Language:</span>
                <span className="capitalize">{state.preferences.defaultLanguage}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-600">
              <p className="text-xs text-slate-400">
                ⚠️ This tool is for entertainment purposes only. Use responsibly and ethically. 
                Do not use generated content for deceptive or harmful purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}