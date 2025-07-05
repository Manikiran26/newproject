import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Saved Excuses</h1>
        <p className="text-slate-400">Manage and organize your collection of generated excuses</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{stats.total}</h3>
              <p className="text-slate-400">Saved Excuses</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{stats.avgScore}%</h3>
              <p className="text-slate-400">Avg. Believability</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{stats.categories}</h3>
              <p className="text-slate-400">Categories Used</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search excuses..."
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category} className="capitalize">
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="timestamp">Recent First</option>
            <option value="believability">Best Score First</option>
            <option value="category">Category A-Z</option>
          </select>
        </div>
      </div>

      {/* Excuses List */}
      {sortedExcuses.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedExcuses.map((excuse) => (
            <div key={excuse.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 hover:bg-slate-800/70 transition-all duration-200">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{excuse.title}</h3>
                  <div className="flex items-center space-x-3 text-sm text-slate-400">
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded-md capitalize">
                      {excuse.category}
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
                  <span className="font-medium text-white">{excuse.believabilityScore}%</span>
                </div>
              </div>

              {/* Content */}
              <p className="text-slate-300 text-sm line-clamp-3 mb-4 leading-relaxed">
                {excuse.content}
              </p>

              {/* Context Info */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <span className="text-xs text-slate-400">Urgency:</span>
                  <div className={`text-xs font-medium capitalize ${
                    excuse.context.urgency === 'critical' ? 'text-red-400' :
                    excuse.context.urgency === 'high' ? 'text-orange-400' :
                    excuse.context.urgency === 'medium' ? 'text-yellow-400' :
                    'text-emerald-400'
                  }`}>
                    {excuse.context.urgency}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Audience:</span>
                  <div className="text-xs font-medium text-slate-300 capitalize">
                    {excuse.context.audience}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(excuse.content)}
                  className="flex items-center space-x-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors text-sm"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
                
                <button className="flex items-center space-x-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors text-sm">
                  <Share2 className="w-3 h-3" />
                  <span>Share</span>
                </button>
                
                <button
                  onClick={() => handleDelete(excuse.id)}
                  className="flex items-center space-x-1 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors text-sm ml-auto"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : state.savedExcuses.length === 0 ? (
        <div className="text-center py-16">
          <Bookmark className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-300 mb-2">No Saved Excuses</h3>
          <p className="text-slate-400 mb-6">Start generating and saving excuses to build your collection</p>
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'generator' })}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Generate Your First Excuse
          </button>
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-300 mb-2">No Results Found</h3>
          <p className="text-slate-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}