import React, { useEffect } from 'react';
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

  // Apply theme changes to document
  useEffect(() => {
    const root = document.documentElement;
    if (state.preferences.theme === 'light') {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    } else {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    }
  }, [state.preferences.theme]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const categories = [
    { value: 'work', label: t('work'), icon: '💼' },
    { value: 'medical', label: t('medical'), icon: '🏥' },
    { value: 'family', label: t('family'), icon: '👨‍👩‍👧‍👦' },
    { value: 'transport', label: t('transport'), icon: '🚗' },
    { value: 'technology', label: t('technology'), icon: '💻' },
    { value: 'weather', label: t('weather'), icon: '🌧️' },
    { value: 'emergency', label: t('emergency'), icon: '🚨' },
    { value: 'personal', label: t('personal'), icon: '👤' }
  ];

  const getCurrentLanguageName = () => {
    const currentLang = languages.find(lang => lang.code === state.preferences.defaultLanguage);
    return currentLang ? `${currentLang.flag} ${currentLang.name}` : 'English';
  };

  const handleClearAllData = () => {
    if (window.confirm(t('confirmClearAllData'))) {
      // Clear all data by dispatching multiple actions
      dispatch({ type: 'CLEAR_ALL_DATA' });
      alert(t('allDataCleared'));
    }
  };

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
          {t('settings')}
        </h1>
        <p className={`${
          state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
        }`}>
          {t('customizeExcuseGenerator')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className={`backdrop-blur-sm rounded-xl border p-6 ${
          state.preferences.theme === 'light' 
            ? 'bg-white/70 border-gray-200' 
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <Settings className={`w-6 h-6 ${
              state.preferences.theme === 'light' ? 'text-blue-600' : 'text-blue-400'
            }`} />
            <h2 className={`text-xl font-semibold ${
              state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {t('generalSettings')}
            </h2>
          </div>

          <div className="space-y-6">
            {/* Language */}
            <div>
              <label className={`flex items-center space-x-2 text-sm font-medium mb-3 ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                <Globe className="w-4 h-4" />
                <span>{t('defaultLanguage')}</span>
              </label>
              <div className="relative">
                <select
                  value={state.preferences.defaultLanguage}
                  onChange={(e) => handlePreferenceUpdate('defaultLanguage', e.target.value)}
                  className={`w-full p-3 rounded-lg border focus:ring-1 transition-colors ${
                    state.preferences.theme === 'light'
                      ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                      : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500'
                  }`}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className={`text-xs mt-2 ${
                state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
              }`}>
                {t('current')}: {getCurrentLanguageName()}
              </p>
            </div>

            {/* Theme */}
            <div>
              <label className={`flex items-center space-x-2 text-sm font-medium mb-3 ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                <Palette className="w-4 h-4" />
                <span>{t('theme')}</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'dark', label: t('darkMode'), icon: '🌙' },
                  { value: 'light', label: t('lightMode'), icon: '☀️' }
                ].map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => handlePreferenceUpdate('theme', theme.value)}
                    className={`flex items-center justify-center space-x-2 p-4 rounded-lg border transition-all duration-200 ${
                      state.preferences.theme === theme.value
                        ? state.preferences.theme === 'light'
                          ? 'bg-blue-100 border-blue-300 text-blue-700'
                          : 'bg-blue-600/20 border-blue-500 text-blue-300'
                        : state.preferences.theme === 'light'
                          ? 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-lg">{theme.icon}</span>
                    <span className="font-medium">{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Voice */}
            <div className="flex items-center justify-between">
              <label className={`flex items-center space-x-2 text-sm font-medium ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                <Volume2 className="w-4 h-4" />
                <span>{t('voicePlayback')}</span>
              </label>
              <button
                onClick={() => handlePreferenceUpdate('voiceEnabled', !state.preferences.voiceEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.preferences.voiceEnabled 
                    ? 'bg-blue-600' 
                    : state.preferences.theme === 'light' ? 'bg-gray-300' : 'bg-slate-600'
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
              <label className={`flex items-center space-x-2 text-sm font-medium ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                <Shield className="w-4 h-4" />
                <span>{t('autoGenerateProof')}</span>
              </label>
              <button
                onClick={() => handlePreferenceUpdate('autoProofGeneration', !state.preferences.autoProofGeneration)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.preferences.autoProofGeneration 
                    ? 'bg-emerald-600' 
                    : state.preferences.theme === 'light' ? 'bg-gray-300' : 'bg-slate-600'
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
              <label className={`flex items-center space-x-2 text-sm font-medium ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                <Bell className="w-4 h-4" />
                <span>{t('emergencyContacts')}</span>
              </label>
              <button
                onClick={() => handlePreferenceUpdate('emergencyContactsEnabled', !state.preferences.emergencyContactsEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.preferences.emergencyContactsEnabled 
                    ? 'bg-red-600' 
                    : state.preferences.theme === 'light' ? 'bg-gray-300' : 'bg-slate-600'
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
        <div className={`backdrop-blur-sm rounded-xl border p-6 ${
          state.preferences.theme === 'light' 
            ? 'bg-white/70 border-gray-200' 
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <User className={`w-6 h-6 ${
              state.preferences.theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'
            }`} />
            <h2 className={`text-xl font-semibold ${
              state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {t('preferredCategories')}
            </h2>
          </div>

          <p className={`text-sm mb-4 ${
            state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
          }`}>
            {t('selectMostCommonlyUsed')}
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
                      ? state.preferences.theme === 'light'
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                        : 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                      : state.preferences.theme === 'light'
                        ? 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
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
        <div className={`backdrop-blur-sm rounded-xl border p-6 ${
          state.preferences.theme === 'light' 
            ? 'bg-white/70 border-gray-200' 
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <Database className={`w-6 h-6 ${
              state.preferences.theme === 'light' ? 'text-purple-600' : 'text-purple-400'
            }`} />
            <h2 className={`text-xl font-semibold ${
              state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {t('dataManagement')}
            </h2>
          </div>

          <div className="space-y-4">
            <div className={`flex items-center justify-between py-3 border-b ${
              state.preferences.theme === 'light' ? 'border-gray-200' : 'border-slate-600'
            }`}>
              <div>
                <h3 className={`font-medium ${
                  state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {t('generatedExcuses')}
                </h3>
                <p className={`text-sm ${
                  state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
                }`}>
                  {state.excuses.length} {t('items')}
                </p>
              </div>
              <button className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                state.preferences.theme === 'light'
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}>
                {t('export')}
              </button>
            </div>

            <div className={`flex items-center justify-between py-3 border-b ${
              state.preferences.theme === 'light' ? 'border-gray-200' : 'border-slate-600'
            }`}>
              <div>
                <h3 className={`font-medium ${
                  state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {t('savedExcuses')}
                </h3>
                <p className={`text-sm ${
                  state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
                }`}>
                  {state.savedExcuses.length} {t('items')}
                </p>
              </div>
              <button className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                state.preferences.theme === 'light'
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}>
                {t('export')}
              </button>
            </div>

            <div className={`flex items-center justify-between py-3 border-b ${
              state.preferences.theme === 'light' ? 'border-gray-200' : 'border-slate-600'
            }`}>
              <div>
                <h3 className={`font-medium ${
                  state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {t('emergencyAlerts')}
                </h3>
                <p className={`text-sm ${
                  state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
                }`}>
                  {state.emergencyAlerts.length} {t('items')}
                </p>
              </div>
              <button className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                state.preferences.theme === 'light'
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}>
                {t('clearAll')}
              </button>
            </div>

            <div className="pt-4">
              <button 
                onClick={handleClearAllData}
                className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                  state.preferences.theme === 'light'
                    ? 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200'
                    : 'bg-red-600/20 hover:bg-red-600/30 text-red-400 border-red-500/50'
                }`}
              >
                {t('clearAllData')}
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className={`backdrop-blur-sm rounded-xl border p-6 ${
          state.preferences.theme === 'light' 
            ? 'bg-white/70 border-gray-200' 
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <h2 className={`text-xl font-semibold mb-6 ${
            state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            {t('aboutExcuseAI')}
          </h2>
          
          <div className={`space-y-4 text-sm ${
            state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
          }`}>
            <p>
              {t('excuseAIDescription')}
            </p>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'}>
                  {t('version')}:
                </span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className={state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'}>
                  {t('build')}:
                </span>
                <span>2024.01.15</span>
              </div>
              <div className="flex justify-between">
                <span className={state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'}>
                  {t('language')}:
                </span>
                <span className="capitalize">{getCurrentLanguageName()}</span>
              </div>
              <div className="flex justify-between">
                <span className={state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'}>
                  {t('theme')}:
                </span>
                <span className="capitalize">{t(state.preferences.theme + 'Mode')}</span>
              </div>
            </div>

            <div className={`pt-4 border-t ${
              state.preferences.theme === 'light' ? 'border-gray-200' : 'border-slate-600'
            }`}>
              <p className={`text-xs ${
                state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
              }`}>
                ⚠️ {t('toolDisclaimer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}