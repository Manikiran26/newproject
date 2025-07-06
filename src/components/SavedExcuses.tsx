import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../utils/translations';
import { rankExcuses } from '../utils/excuseEngine';
import { 
  Bookmark, 
  Search, 
  Filter, 
  Copy, 
  Share2, 
  Trash2, 
  TrendingUp,
  Calendar,
  Tag
} from 'lucide-react';

export default function SavedExcuses() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation(state.preferences.defaultLanguage);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('timestamp');

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'REMOVE_EXCUSE', payload: id });
  };

  // Filter and sort excuses
  const filteredExcuses = state.savedExcuses.filter(excuse => {
    const matchesSearch = excuse.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         excuse.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || excuse.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedExcuses = [...filteredExcuses].sort((a, b) => {
    switch (sortBy) {
      case 'believability':
        return b.believabilityScore - a.believabilityScore;
      case 'category':
        return a.category.localeCompare(b.category);
      case 'timestamp':
      default:
        return b.timestamp - a.timestamp;
    }
  });

  const categories = Array.from(new Set(state.savedExcuses.map(e => e.category)));
  const stats = {
    total: state.savedExcuses.length,
    avgScore: state.savedExcuses.length > 0 
      ? Math.round(state.savedExcuses.reduce((acc, e) => acc + e.believabilityScore, 0) / state.savedExcuses.length)
      : 0,
    categories: categories.length
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
          {t('savedExcuses')}
        </h1>
        <p className={`${
          state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
        }`}>
          {t('manageAndOrganizeCollection')}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`backdrop-blur-sm rounded-xl border p-6 ${
          state.preferences.theme === 'light' 
            ? 'bg-white/70 border-gray-200' 
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${
                state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {stats.total}
              </h3>
              <p className={`${
                state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
              }`}>
                {t('savedExcuses')}
              </p>
            </div>
          </div>
        </div>
        
        <div className={`backdrop-blur-sm rounded-xl border p-6 ${
          state.preferences.theme === 'light' 
            ? 'bg-white/70 border-gray-200' 
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${
                state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {stats.avgScore}%
              </h3>
              <p className={`${
                state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
              }`}>
                {t('avgBelievability')}
              </p>
            </div>
          </div>
        </div>

        <div className={`backdrop-blur-sm rounded-xl border p-6 ${
          state.preferences.theme === 'light' 
            ? 'bg-white/70 border-gray-200' 
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${
                state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {stats.categories}
              </h3>
              <p className={`${
                state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
              }`}>
                {t('categoriesUsed')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={`backdrop-blur-sm rounded-xl border p-6 mb-8 ${
        state.preferences.theme === 'light' 
          ? 'bg-white/70 border-gray-200' 
          : 'bg-slate-800/50 border-slate-700'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              state.preferences.theme === 'light' ? 'text-gray-400' : 'text-slate-400'
            }`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('searchExcuses')}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-1 transition-colors ${
                state.preferences.theme === 'light'
                  ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500'
                  : 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              state.preferences.theme === 'light' ? 'text-gray-400' : 'text-slate-400'
            }`} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-1 appearance-none transition-colors ${
                state.preferences.theme === 'light'
                  ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500'
              }`}
            >
              <option value="all">{t('allCategories')}</option>
              {categories.map(category => (
                <option key={category} value={category} className="capitalize">
                  {t(category)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border focus:ring-1 transition-colors ${
              state.preferences.theme === 'light'
                ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500'
            }`}
          >
            <option value="timestamp">{t('recentFirst')}</option>
            <option value="believability">{t('bestScoreFirst')}</option>
            <option value="category">{t('categoryAZ')}</option>
          </select>
        </div>
      </div>

      {/* Excuses List */}
      {sortedExcuses.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedExcuses.map((excuse) => (
            <div key={excuse.id} className={`backdrop-blur-sm rounded-xl border p-6 transition-all duration-200 ${
              state.preferences.theme === 'light' 
                ? 'bg-white/70 border-gray-200 hover:bg-white/90' 
                : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800/70'
            }`}>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${
                    state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {excuse.title}
                  </h3>
                  <div className={`flex items-center space-x-3 text-sm ${
                    state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                  }`}>
                    <span className={`px-2 py-1 rounded-md capitalize ${
                      state.preferences.theme === 'light' 
                        ? 'bg-gray-200 text-gray-700' 
                        : 'bg-slate-700 text-slate-300'
                    }`}>
                      {t(excuse.category)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(excuse.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    excuse.believabilityScore >= 80 ? 'bg-emerald-400' :
                    excuse.believabilityScore >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}></div>
                  <span className={`font-medium ${
                    state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {excuse.believabilityScore}%
                  </span>
                </div>
              </div>

              {/* Content */}
              <p className={`text-sm line-clamp-3 mb-4 leading-relaxed ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                {excuse.content}
              </p>

              {/* Context Info */}
              <div className={`grid grid-cols-2 gap-4 mb-4 p-3 rounded-lg ${
                state.preferences.theme === 'light' ? 'bg-gray-100' : 'bg-slate-700/30'
              }`}>
                <div>
                  <span className={`text-xs ${
                    state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
                  }`}>
                    {t('urgency')}:
                  </span>
                  <div className={`text-xs font-medium capitalize ${
                    excuse.context.urgency === 'critical' ? 'text-red-400' :
                    excuse.context.urgency === 'high' ? 'text-orange-400' :
                    excuse.context.urgency === 'medium' ? 'text-yellow-400' :
                    'text-emerald-400'
                  }`}>
                    {t(excuse.context.urgency)}
                  </div>
                </div>
                <div>
                  <span className={`text-xs ${
                    state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
                  }`}>
                    {t('audience')}:
                  </span>
                  <div className={`text-xs font-medium capitalize ${
                    state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                  }`}>
                    {t(excuse.context.audience)}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(excuse.content)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors text-sm ${
                    state.preferences.theme === 'light'
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  <Copy className="w-3 h-3" />
                  <span>{t('copy')}</span>
                </button>
                
                <button className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors text-sm ${
                  state.preferences.theme === 'light'
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}>
                  <Share2 className="w-3 h-3" />
                  <span>{t('share')}</span>
                </button>
                
                <button
                  onClick={() => handleDelete(excuse.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors text-sm ml-auto ${
                    state.preferences.theme === 'light'
                      ? 'bg-red-100 hover:bg-red-200 text-red-600'
                      : 'bg-red-600/20 hover:bg-red-600/30 text-red-400'
                  }`}
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{t('delete')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : state.savedExcuses.length === 0 ? (
        <div className="text-center py-16">
          <Bookmark className={`w-16 h-16 mx-auto mb-4 ${
            state.preferences.theme === 'light' ? 'text-gray-400' : 'text-slate-500'
          }`} />
          <h3 className={`text-lg font-medium mb-2 ${
            state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
          }`}>
            {t('noSavedExcuses')}
          </h3>
          <p className={`mb-6 ${
            state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
          }`}>
            {t('startGeneratingAndSaving')}
          </p>
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'generator' })}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            {t('generateFirstExcuse')}
          </button>
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className={`w-16 h-16 mx-auto mb-4 ${
            state.preferences.theme === 'light' ? 'text-gray-400' : 'text-slate-500'
          }`} />
          <h3 className={`text-lg font-medium mb-2 ${
            state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
          }`}>
            {t('noResultsFound')}
          </h3>
          <p className={`${
            state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
          }`}>
            {t('tryAdjustingSearch')}
          </p>
        </div>
      )}
    </div>
  );
}