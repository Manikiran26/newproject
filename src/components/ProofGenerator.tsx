import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { generateProof } from '../utils/proofGenerator';
import { useTranslation } from '../utils/translations';
import { ExcuseCategory } from '../types';
import { Shield, Download, Eye, RefreshCw, FileText, Camera, Mail, X } from 'lucide-react';

export default function ProofGenerator() {
  const { state } = useApp();
  const { t } = useTranslation(state.preferences.defaultLanguage);
  const [selectedCategory, setSelectedCategory] = useState<ExcuseCategory>('work');
  const [customContent, setCustomContent] = useState('');
  const [generatedProof, setGeneratedProof] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerateProof = async () => {
    setIsGenerating(true);
    
    // Simulate proof generation time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const proof = generateProof(selectedCategory, customContent, state.preferences.defaultLanguage);
    setGeneratedProof(proof);
    setIsGenerating(false);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownload = () => {
    if (!generatedProof) return;
    
    // Create a blob with the proof content
    const content = generateDownloadContent(generatedProof);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = generatedProof.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateDownloadContent = (proof: any) => {
    switch (proof.type) {
      case 'email':
        return `${t('from')}: ${proof.sender || 'noreply@example.com'}
${t('to')}: me@example.com
${t('subject')}: ${proof.subject || t('importantNotice')}
${t('date')}: ${new Date().toLocaleString()}

${proof.fullContent || proof.content}

---
${t('simulatedEmailDisclaimer')}`;
      
      case 'document':
        return `${proof.documentTitle || t('officialDocument')}

${proof.fullContent || proof.content}

${t('documentId')}: ${proof.documentId || 'DOC-' + Date.now()}
${t('generated')}: ${new Date().toLocaleString()}
${t('authority')}: ${proof.authority || t('officialAuthority')}

---
${t('simulatedDocumentDisclaimer')}`;
      
      default:
        return `${proof.content}

${t('description')}: ${proof.description}
${t('type')}: ${proof.type}
${t('generated')}: ${new Date().toLocaleString()}

---
${t('simulatedContentDisclaimer')}`;
    }
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
    { value: 'medical', label: t('medical'), icon: '🏥' },
    { value: 'work', label: t('work'), icon: '💼' },
    { value: 'transport', label: t('transport'), icon: '🚗' },
    { value: 'family', label: t('family'), icon: '👨‍👩‍👧‍👦' },
    { value: 'technology', label: t('technology'), icon: '💻' },
    { value: 'weather', label: t('weather'), icon: '🌧️' },
    { value: 'emergency', label: t('emergency'), icon: '🚨' },
    { value: 'personal', label: t('personal'), icon: '👤' }
  ];

  const renderProofPreview = () => {
    if (!generatedProof) return null;

    const IconComponent = getProofIcon(generatedProof.type);

    return (
      <div className={`p-4 rounded-lg border ${
        state.preferences.theme === 'light' 
          ? 'bg-gray-50 border-gray-200' 
          : 'bg-slate-700/30 border-slate-600'
      }`}>
        <h4 className={`font-medium mb-3 ${
          state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          {t('contentPreview')}
        </h4>
        <div className="bg-white p-6 rounded-lg border-2 border-dashed border-slate-300 min-h-[200px]">
          {generatedProof.type === 'email' ? (
            <div className="font-mono text-sm text-gray-800">
              <div className="border-b border-gray-300 pb-3 mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">{t('email')}</span>
                </div>
                <div className="text-xs space-y-1">
                  <div><strong>{t('from')}:</strong> {generatedProof.sender || 'noreply@example.com'}</div>
                  <div><strong>{t('to')}:</strong> me@example.com</div>
                  <div><strong>{t('subject')}:</strong> {generatedProof.subject || t('importantNotice')}</div>
                  <div><strong>{t('date')}:</strong> {new Date().toLocaleString()}</div>
                </div>
              </div>
              <div className="whitespace-pre-wrap text-gray-700">
                {generatedProof.fullContent || generatedProof.content}
              </div>
            </div>
          ) : generatedProof.type === 'document' ? (
            <div className="text-gray-800">
              <div className="text-center border-b border-gray-300 pb-4 mb-4">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-bold text-lg">{generatedProof.documentTitle || t('officialDocument')}</h3>
                <p className="text-sm text-gray-600">{t('documentId')}: {generatedProof.documentId || 'DOC-' + Date.now()}</p>
              </div>
              <div className="space-y-3">
                <p className="text-sm leading-relaxed">{generatedProof.fullContent || generatedProof.content}</p>
                <div className="mt-6 pt-4 border-t border-gray-300 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>{t('authority')}: {generatedProof.authority || t('officialAuthority')}</span>
                    <span>{t('date')}: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : generatedProof.type === 'photo' ? (
            <div className="text-center">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">{generatedProof.content}</h3>
              <p className="text-sm text-gray-600 mb-4">{generatedProof.description}</p>
              <div className="bg-gray-100 p-4 rounded border-2 border-dashed border-gray-300">
                <div className="text-gray-500 text-sm">
                  📸 {t('photoEvidence')}<br/>
                  {generatedProof.photoDetails || t('highResolutionImage')}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <IconComponent className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">{generatedProof.content}</h3>
              <p className="text-sm text-gray-600">{generatedProof.description}</p>
              <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-600">
                {generatedProof.previewContent || t('sampleContentHere')}
              </div>
            </div>
          )}
        </div>
      </div>
    );
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
          {t('proofGenerator')}
        </h1>
        <p className={`${
          state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
        }`}>
          {t('generateRealisticEvidence')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className={`backdrop-blur-sm rounded-xl border p-6 ${
          state.preferences.theme === 'light' 
            ? 'bg-white/70 border-gray-200' 
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <h2 className={`text-xl font-semibold mb-6 ${
            state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            {t('proofConfiguration')}
          </h2>
          
          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                {t('proofCategory')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value as ExcuseCategory)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                      selectedCategory === cat.value
                        ? state.preferences.theme === 'light'
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                        : state.preferences.theme === 'light'
                          ? 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
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
              <label className={`block text-sm font-medium mb-3 ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                {t('customContextOptional')}
              </label>
              <textarea
                value={customContent}
                onChange={(e) => setCustomContent(e.target.value)}
                placeholder={t('provideAdditionalContext')}
                className={`w-full p-3 rounded-lg border focus:ring-1 resize-none transition-colors ${
                  state.preferences.theme === 'light'
                    ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500'
                    : 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500'
                }`}
                rows={4}
              />
            </div>

            {/* Recent Excuses for Reference */}
            {state.excuses.length > 0 && (
              <div>
                <label className={`block text-sm font-medium mb-3 ${
                  state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                }`}>
                  {t('recentExcusesReference')}
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {state.excuses.slice(0, 3).map((excuse) => (
                    <button
                      key={excuse.id}
                      onClick={() => setCustomContent(excuse.content)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        state.preferences.theme === 'light'
                          ? 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                          : 'bg-slate-700/50 hover:bg-slate-700 border-slate-600'
                      }`}
                    >
                      <div className={`font-medium text-sm ${
                        state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {excuse.title}
                      </div>
                      <div className={`text-xs mt-1 line-clamp-2 ${
                        state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                      }`}>
                        {excuse.content}
                      </div>
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
              <span>{isGenerating ? t('generatingProof') : t('generateProof')}</span>
            </button>
          </div>
        </div>

        {/* Result Panel */}
        <div className={`backdrop-blur-sm rounded-xl border p-6 ${
          state.preferences.theme === 'light' 
            ? 'bg-white/70 border-gray-200' 
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <h2 className={`text-xl font-semibold mb-6 ${
            state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            {t('generatedProof')}
          </h2>
          
          {generatedProof ? (
            <div className="space-y-6">
              {/* Proof Type */}
              <div className={`flex items-center space-x-3 p-4 rounded-lg ${
                state.preferences.theme === 'light' ? 'bg-gray-100' : 'bg-slate-700/50'
              }`}>
                {React.createElement(getProofIcon(generatedProof.type), {
                  className: state.preferences.theme === 'light' ? "w-6 h-6 text-emerald-600" : "w-6 h-6 text-emerald-400"
                })}
                <div>
                  <h3 className={`font-semibold capitalize ${
                    state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {t(generatedProof.type)} {t('proof')}
                  </h3>
                  <p className={`text-sm ${
                    state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                  }`}>
                    {generatedProof.filename}
                  </p>
                </div>
              </div>

              {/* Proof Preview */}
              {renderProofPreview()}

              {/* Proof Details */}
              <div className="space-y-3">
                <div className={`flex justify-between items-center py-2 border-b ${
                  state.preferences.theme === 'light' ? 'border-gray-200' : 'border-slate-600'
                }`}>
                  <span className={state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'}>
                    {t('type')}:
                  </span>
                  <span className={`capitalize ${
                    state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {t(generatedProof.type)}
                  </span>
                </div>
                <div className={`flex justify-between items-center py-2 border-b ${
                  state.preferences.theme === 'light' ? 'border-gray-200' : 'border-slate-600'
                }`}>
                  <span className={state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'}>
                    {t('filename')}:
                  </span>
                  <span className={`font-mono text-sm ${
                    state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {generatedProof.filename}
                  </span>
                </div>
                <div className={`flex justify-between items-center py-2 border-b ${
                  state.preferences.theme === 'light' ? 'border-gray-200' : 'border-slate-600'
                }`}>
                  <span className={state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'}>
                    {t('category')}:
                  </span>
                  <span className={`capitalize ${
                    state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {t(selectedCategory)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className={state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'}>
                    {t('generated')}:
                  </span>
                  <span className={state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'}>
                    {new Date().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handlePreview}
                  className="flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>{t('preview')}</span>
                </button>
                <button 
                  onClick={handleDownload}
                  className="flex items-center justify-center space-x-2 p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('download')}</span>
                </button>
              </div>

              {/* Disclaimer */}
              <div className={`p-3 rounded-lg border ${
                state.preferences.theme === 'light'
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-orange-600/20 border-orange-500/50'
              }`}>
                <p className={`text-xs ${
                  state.preferences.theme === 'light' ? 'text-orange-700' : 'text-orange-300'
                }`}>
                  ⚠️ {t('proofDisclaimer')}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Shield className={`w-16 h-16 mx-auto mb-4 ${
                state.preferences.theme === 'light' ? 'text-gray-400' : 'text-slate-500'
              }`} />
              <h3 className={`text-lg font-medium mb-2 ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                {t('readyToGenerateProof')}
              </h3>
              <p className={`${
                state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
              }`}>
                {t('selectCategoryAndGenerate')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && generatedProof && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {t(generatedProof.type)} {t('preview')}
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              {generatedProof.type === 'email' ? (
                <div className="font-mono text-sm">
                  <div className="bg-gray-50 p-4 rounded-lg border mb-4">
                    <div className="space-y-2 text-xs">
                      <div><strong>{t('from')}:</strong> {generatedProof.sender || 'noreply@example.com'}</div>
                      <div><strong>{t('to')}:</strong> me@example.com</div>
                      <div><strong>{t('subject')}:</strong> {generatedProof.subject || t('importantNotice')}</div>
                      <div><strong>{t('date')}:</strong> {new Date().toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="whitespace-pre-wrap bg-white p-4 border rounded-lg">
                    {generatedProof.fullContent || generatedProof.content}
                  </div>
                </div>
              ) : generatedProof.type === 'document' ? (
                <div className="max-w-2xl mx-auto">
                  <div className="text-center border-b border-gray-300 pb-6 mb-6">
                    <FileText className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <h2 className="text-2xl font-bold text-gray-900">{generatedProof.documentTitle || t('officialDocument')}</h2>
                    <p className="text-gray-600 mt-2">{t('documentId')}: {generatedProof.documentId || 'DOC-' + Date.now()}</p>
                  </div>
                  <div className="space-y-4">
                    <p className="leading-relaxed text-gray-800">{generatedProof.fullContent || generatedProof.content}</p>
                    <div className="mt-8 pt-6 border-t border-gray-300 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>{t('authority')}: {generatedProof.authority || t('officialAuthority')}</span>
                        <span>{t('date')}: {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  {React.createElement(getProofIcon(generatedProof.type), {
                    className: "w-20 h-20 text-gray-400 mx-auto mb-6"
                  })}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{generatedProof.content}</h3>
                  <p className="text-gray-600 mb-6">{generatedProof.description}</p>
                  <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-700">{generatedProof.previewContent || t('detailedContentHere')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}