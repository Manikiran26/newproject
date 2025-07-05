import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { generateExcuse } from '../utils/excuseEngine';
import { ExcuseContext, ExcuseCategory } from '../types';
import { 
  Sparkles, 
  Copy, 
  Save, 
  Share2, 
  Volume2, 
  RefreshCw,
  TrendingUp,
  Clock
} from 'lucide-react';

export default function ExcuseGenerator() {
  const { state, dispatch } = useApp();
  const [context, setContext] = useState<ExcuseContext>({
    situation: 'work',
    urgency: 'medium',
    audience: 'work',
    timeframe: 'immediate',
    relationship: 'professional'
  });
  const [currentExcuse, setCurrentExcuse] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const excuse = generateExcuse(context);
    setCurrentExcuse(excuse);
    dispatch({ type: 'ADD_EXCUSE', payload: excuse });
    setIsGenerating(false);
  };

  const handleSave = () => {
    if (currentExcuse) {
      dispatch({ type: 'SAVE_EXCUSE', payload: currentExcuse });
    }
  };

  const handleCopy = async () => {
    if (currentExcuse) {
      await navigator.clipboard.writeText(currentExcuse.content);
    }
  };

  const categories: { value: ExcuseCategory; label: string; icon: string }[] = [
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
        <h1 className="text-3xl font-bold text-white mb-2">Excuse Generator</h1>
        <p className="text-slate-400">Create context-aware, believable excuses with AI assistance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Configure Context</h2>
          
          <div className="space-y-6">
            {/* Situation */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Situation</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setContext({ ...context, situation: cat.value })}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                      context.situation === cat.value
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="text-sm font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Urgency Level</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'low', label: 'Low', color: 'emerald' },
                  { value: 'medium', label: 'Medium', color: 'yellow' },
                  { value: 'high', label: 'High', color: 'orange' },
                  { value: 'critical', label: 'Critical', color: 'red' }
                ].map((urgency) => (
                  <button
                    key={urgency.value}
                    onClick={() => setContext({ ...context, urgency: urgency.value as any })}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      context.urgency === urgency.value
                        ? `bg-${urgency.color}-600/20 border-${urgency.color}-500 text-${urgency.color}-300`
                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-sm font-medium">{urgency.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Audience */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Audience</label>
              <select
                value={context.audience}
                onChange={(e) => setContext({ ...context, audience: e.target.value as any })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="family">Family</option>
                <option value="work">Work/Professional</option>
                <option value="friends">Friends</option>
                <option value="romantic">Romantic Partner</option>
                <option value="authority">Authority Figure</option>
              </select>
            </div>

            {/* Relationship */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Relationship</label>
              <select
                value={context.relationship}
                onChange={(e) => setContext({ ...context, relationship: e.target.value as any })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="close">Close</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="distant">Distant</option>
              </select>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              <span>{isGenerating ? 'Generating...' : 'Generate Excuse'}</span>
            </button>
          </div>
        </div>

        {/* Result Panel */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Generated Excuse</h2>
          
          {currentExcuse ? (
            <div className="space-y-6">
              {/* Believability Score */}
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span className="font-medium text-white">Believability Score</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    currentExcuse.believabilityScore >= 80 ? 'bg-emerald-400' :
                    currentExcuse.believabilityScore >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}></div>
                  <span className="text-xl font-bold text-white">{currentExcuse.believabilityScore}%</span>
                </div>
              </div>

              {/* Excuse Content */}
              <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <h3 className="font-semibold text-white mb-2">{currentExcuse.title}</h3>
                <p className="text-slate-300 leading-relaxed">{currentExcuse.content}</p>
                <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-slate-600">
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full">
                    {currentExcuse.category}
                  </span>
                  <div className="flex items-center space-x-1 text-slate-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(currentExcuse.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center space-x-2 p-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center space-x-2 p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors">
                  <Volume2 className="w-4 h-4" />
                  <span>Voice</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">Ready to Generate</h3>
              <p className="text-slate-400">Configure your context and click generate to create your excuse</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}