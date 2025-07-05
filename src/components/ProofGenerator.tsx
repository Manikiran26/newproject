import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { generateProof } from '../utils/proofGenerator';
import { ExcuseCategory } from '../types';
import { Shield, Download, Eye, RefreshCw, FileText, Camera, Mail } from 'lucide-react';

export default function ProofGenerator() {
  const { state } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<ExcuseCategory>('work');
  const [customContent, setCustomContent] = useState('');
  const [generatedProof, setGeneratedProof] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateProof = async () => {
    setIsGenerating(true);
    
    // Simulate proof generation time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const proof = generateProof(selectedCategory, customContent);
    setGeneratedProof(proof);
    setIsGenerating(false);
  };

  const getProofIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'photo': return Camera;
      case 'email': return Mail;
      case 'screenshot': return Eye;
      default: return FileText;
    }
  };

  const categories = [
    { value: 'medical', label: 'Medical', icon: '🏥' },
    { value: 'work', label: 'Work', icon: '💼' },
    { value: 'transport', label: 'Transport', icon: '🚗' },
    { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { value: 'technology', label: 'Technology', icon: '💻' },
    { value: 'weather', label: 'Weather', icon: '🌧️' },
    { value: 'emergency', label: 'Emergency', icon: '🚨' },
    { value: 'personal', label: 'Personal', icon: '👤' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Proof Generator</h1>
        <p className="text-slate-400">Generate realistic supporting evidence for your excuses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Proof Configuration</h2>
          
          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Proof Category</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value as ExcuseCategory)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                      selectedCategory === cat.value
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="text-sm font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Content */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Custom Context (Optional)
              </label>
              <textarea
                value={customContent}
                onChange={(e) => setCustomContent(e.target.value)}
                placeholder="Provide additional context to customize your proof..."
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                rows={4}
              />
            </div>

            {/* Recent Excuses for Reference */}
            {state.excuses.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Recent Excuses (for reference)
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {state.excuses.slice(0, 3).map((excuse) => (
                    <button
                      key={excuse.id}
                      onClick={() => setCustomContent(excuse.content)}
                      className="w-full text-left p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors"
                    >
                      <div className="font-medium text-white text-sm">{excuse.title}</div>
                      <div className="text-slate-400 text-xs mt-1 line-clamp-2">{excuse.content}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerateProof}
              disabled={isGenerating}
              className="w-full flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Shield className="w-5 h-5" />
              )}
              <span>{isGenerating ? 'Generating Proof...' : 'Generate Proof'}</span>
            </button>
          </div>
        </div>

        {/* Result Panel */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Generated Proof</h2>
          
          {generatedProof ? (
            <div className="space-y-6">
              {/* Proof Type */}
              <div className="flex items-center space-x-3 p-4 bg-slate-700/50 rounded-lg">
                {React.createElement(getProofIcon(generatedProof.type), {
                  className: "w-6 h-6 text-emerald-400"
                })}
                <div>
                  <h3 className="font-semibold text-white capitalize">{generatedProof.type} Proof</h3>
                  <p className="text-sm text-slate-400">{generatedProof.filename}</p>
                </div>
              </div>

              {/* Proof Preview */}
              <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <h4 className="font-medium text-white mb-3">Content Preview</h4>
                <div className="bg-slate-800 p-4 rounded-lg border-2 border-dashed border-slate-600">
                  <div className="text-center py-8">
                    {React.createElement(getProofIcon(generatedProof.type), {
                      className: "w-12 h-12 text-slate-500 mx-auto mb-3"
                    })}
                    <p className="text-slate-300 font-medium">{generatedProof.content}</p>
                    <p className="text-slate-400 text-sm mt-2">{generatedProof.description}</p>
                  </div>
                </div>
              </div>

              {/* Proof Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-600">
                  <span className="text-slate-400">Type:</span>
                  <span className="text-white capitalize">{generatedProof.type}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-600">
                  <span className="text-slate-400">Filename:</span>
                  <span className="text-white font-mono text-sm">{generatedProof.filename}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-600">
                  <span className="text-slate-400">Category:</span>
                  <span className="text-white capitalize">{selectedCategory}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400">Generated:</span>
                  <span className="text-white">{new Date().toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>

              {/* Disclaimer */}
              <div className="p-3 bg-orange-600/20 border border-orange-500/50 rounded-lg">
                <p className="text-orange-300 text-xs">
                  ⚠️ Generated proofs are for entertainment purposes only. Use responsibly and ethically.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">Ready to Generate Proof</h3>
              <p className="text-slate-400">Select a category and click generate to create supporting evidence</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}