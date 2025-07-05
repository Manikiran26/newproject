import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { generateExcuse } from '../utils/excuseEngine';
import { useTranslation } from '../utils/translations';
import { ExcuseContext, ExcuseCategory } from '../types';
import { 
  Sparkles, 
  Copy, 
  Download, 
  Share2, 
  Volume2, 
  RefreshCw,
  TrendingUp,
  Clock,
  Check,
  X,
  ExternalLink
} from 'lucide-react';

export default function ExcuseGenerator() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation(state.preferences.defaultLanguage);
  const [context, setContext] = useState<ExcuseContext>({
    situation: 'work',
    urgency: 'medium',
    audience: 'work',
    timeframe: 'immediate',
    relationship: 'professional'
  });
  const [currentExcuse, setCurrentExcuse] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const excuse = generateExcuse(context, state.preferences.defaultLanguage);
    setCurrentExcuse(excuse);
    dispatch({ type: 'ADD_EXCUSE', payload: excuse });
    setIsGenerating(false);
  };

  const handleDownload = () => {
    if (currentExcuse) {
      const content = `${t('excuseDocument')}
      
${t('believabilityScore')}: ${currentExcuse.believabilityScore}%
${t('category')}: ${t(currentExcuse.category)}
${t('urgency')}: ${t(currentExcuse.context.urgency)}
${t('audience')}: ${t(currentExcuse.context.audience)}
${t('generated')}: ${new Date().toLocaleString()}

---

${currentExcuse.title}

${currentExcuse.content}

---
${t('generatedBy')} ExcuseAI
${t('forPersonalUse')}`;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `excuse_${currentExcuse.category}_${Date.now()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    }
  };

  const handleCopy = async () => {
    if (currentExcuse) {
      try {
        await navigator.clipboard.writeText(currentExcuse.content);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = currentExcuse.content;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    }
  };

  const handleVoice = () => {
    if (currentExcuse && 'speechSynthesis' in window) {
      if (isPlaying) {
        // Stop current speech
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        // Start speech
        const utterance = new SpeechSynthesisUtterance(currentExcuse.content);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        // Set language based on user preference
        const langMap: { [key: string]: string } = {
          'en': 'en-US',
          'es': 'es-ES',
          'fr': 'fr-FR',
          'hi': 'hi-IN',
          'ml': 'ml-IN',
          'te': 'te-IN',
          'ta': 'ta-IN',
          'de': 'de-DE',
          'it': 'it-IT',
          'pt': 'pt-PT',
          'ru': 'ru-RU',
          'ja': 'ja-JP',
          'ko': 'ko-KR',
          'zh': 'zh-CN',
          'ar': 'ar-SA'
        };
        
        utterance.lang = langMap[state.preferences.defaultLanguage] || 'en-US';
        
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert(t('voiceNotSupported'));
    }
  };

  const generateShareLink = () => {
    if (!currentExcuse) return '';
    
    const shareData = {
      title: currentExcuse.title,
      content: currentExcuse.content,
      score: currentExcuse.believabilityScore
    };
    
    // Create a shareable URL (in a real app, this would be a proper backend endpoint)
    const encodedData = btoa(JSON.stringify(shareData));
    return `${window.location.origin}/shared-excuse/${encodedData}`;
  };

  const handleShare = (platform: string) => {
    if (!currentExcuse) return;
    
    const shareText = `${t('checkOutExcuse')}: "${currentExcuse.content}" - ${t('believabilityScore')}: ${currentExcuse.believabilityScore}%`;
    const shareUrl = generateShareLink();
    
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`,
      instagram: `https://www.instagram.com/`, // Instagram doesn't support direct text sharing
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      copy: shareUrl
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      alert(t('shareLinkCopied'));
    } else if (platform === 'instagram') {
      // For Instagram, copy text and open Instagram
      navigator.clipboard.writeText(shareText);
      window.open('https://www.instagram.com/', '_blank');
      alert(t('textCopiedInstagram'));
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
    
    setShowShareModal(false);
  };

  const categories: { value: ExcuseCategory; label: string; icon: string }[] = [
    { value: 'work', label: t('work'), icon: '💼' },
    { value: 'medical', label: t('medical'), icon: '🏥' },
    { value: 'family', label: t('family'), icon: '👨‍👩‍👧‍👦' },
    { value: 'transport', label: t('transport'), icon: '🚗' },
    { value: 'technology', label: t('technology'), icon: '💻' },
    { value: 'weather', label: t('weather'), icon: '🌧️' },
    { value: 'emergency', label: t('emergency'), icon: '🚨' },
    { value: 'personal', label: t('personal'), icon: '👤' }
  ];

  const urgencyLevels = [
    { value: 'low', label: t('low'), color: 'emerald' },
    { value: 'medium', label: t('medium'), color: 'yellow' },
    { value: 'high', label: t('high'), color: 'orange' },
    { value: 'critical', label: t('critical'), color: 'red' }
  ];

  const audienceOptions = [
    { value: 'family', label: t('family') },
    { value: 'work', label: t('workProfessional') },
    { value: 'friends', label: t('friends') },
    { value: 'romantic', label: t('romanticPartner') },
    { value: 'authority', label: t('authorityFigure') }
  ];

  const relationshipOptions = [
    { value: 'close', label: t('close') },
    { value: 'professional', label: t('professional') },
    { value: 'casual', label: t('casual') },
    { value: 'distant', label: t('distant') }
  ];

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
          {t('generateExcuse')}
        </h1>
        <p className={`${
          state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
        }`}>
          {t('createContextAware')}
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
            {t('configureContext')}
          </h2>
          
          <div className="space-y-6">
            {/* Situation */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                {t('situation')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setContext({ ...context, situation: cat.value })}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                      context.situation === cat.value
                        ? state.preferences.theme === 'light'
                          ? 'bg-blue-100 border-blue-300 text-blue-700'
                          : 'bg-blue-600/20 border-blue-500 text-blue-300'
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

            {/* Urgency */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                {t('urgency')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {urgencyLevels.map((urgency) => (
                  <button
                    key={urgency.value}
                    onClick={() => setContext({ ...context, urgency: urgency.value as any })}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      context.urgency === urgency.value
                        ? `bg-${urgency.color}-600/20 border-${urgency.color}-500 text-${urgency.color}-300`
                        : state.preferences.theme === 'light'
                          ? 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
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
              <label className={`block text-sm font-medium mb-3 ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                {t('audience')}
              </label>
              <select
                value={context.audience}
                onChange={(e) => setContext({ ...context, audience: e.target.value as any })}
                className={`w-full p-3 rounded-lg border focus:ring-1 transition-colors ${
                  state.preferences.theme === 'light'
                    ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500'
                }`}
              >
                {audienceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Relationship */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                {t('relationship')}
              </label>
              <select
                value={context.relationship}
                onChange={(e) => setContext({ ...context, relationship: e.target.value as any })}
                className={`w-full p-3 rounded-lg border focus:ring-1 transition-colors ${
                  state.preferences.theme === 'light'
                    ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    : 'bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500'
                }`}
              >
                {relationshipOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
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
              <span>{isGenerating ? t('generating') : t('generateExcuse')}</span>
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
            {t('generatedExcuse')}
          </h2>
          
          {currentExcuse ? (
            <div className="space-y-6">
              {/* Believability Score */}
              <div className={`flex items-center justify-between p-4 rounded-lg ${
                state.preferences.theme === 'light' ? 'bg-gray-100' : 'bg-slate-700/50'
              }`}>
                <div className="flex items-center space-x-2">
                  <TrendingUp className={`w-5 h-5 ${
                    state.preferences.theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'
                  }`} />
                  <span className={`font-medium ${
                    state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {t('believabilityScore')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    currentExcuse.believabilityScore >= 80 ? 'bg-emerald-400' :
                    currentExcuse.believabilityScore >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}></div>
                  <span className={`text-xl font-bold ${
                    state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {currentExcuse.believabilityScore}%
                  </span>
                </div>
              </div>

              {/* Excuse Content */}
              <div className={`p-4 rounded-lg border ${
                state.preferences.theme === 'light' 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-slate-700/30 border-slate-600'
              }`}>
                <h3 className={`font-semibold mb-2 ${
                  state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {currentExcuse.title}
                </h3>
                <p className={`leading-relaxed ${
                  state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                }`}>
                  {currentExcuse.content}
                </p>
                <div className={`flex items-center space-x-4 mt-4 pt-4 border-t ${
                  state.preferences.theme === 'light' ? 'border-gray-200' : 'border-slate-600'
                }`}>
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full">
                    {t(currentExcuse.category)}
                  </span>
                  <div className={`flex items-center space-x-1 text-sm ${
                    state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span>{new Date(currentExcuse.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleCopy}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-200 ${
                    copySuccess 
                      ? 'bg-emerald-600 text-white' 
                      : state.preferences.theme === 'light'
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copySuccess ? t('copied') : t('copy')}</span>
                </button>
                
                <button
                  onClick={handleDownload}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-200 ${
                    downloadSuccess 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {downloadSuccess ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  <span>{downloadSuccess ? t('downloaded') : t('download')}</span>
                </button>
                
                <button 
                  onClick={() => setShowShareModal(true)}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-colors ${
                    state.preferences.theme === 'light'
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  <span>{t('share')}</span>
                </button>
                
                <button 
                  onClick={handleVoice}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-colors ${
                    isPlaying 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : state.preferences.theme === 'light'
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlaying ? t('stop') : t('voice')}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Sparkles className={`w-16 h-16 mx-auto mb-4 ${
                state.preferences.theme === 'light' ? 'text-gray-400' : 'text-slate-500'
              }`} />
              <h3 className={`text-lg font-medium mb-2 ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                {t('readyToGenerate')}
              </h3>
              <p className={`${
                state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
              }`}>
                {t('configureContextAndGenerate')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && currentExcuse && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl max-w-md w-full border ${
            state.preferences.theme === 'light' 
              ? 'bg-white border-gray-200' 
              : 'bg-slate-800 border-slate-700'
          }`}>
            <div className={`flex items-center justify-between p-6 border-b ${
              state.preferences.theme === 'light' ? 'border-gray-200' : 'border-slate-700'
            }`}>
              <h3 className={`text-lg font-semibold ${
                state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {t('shareExcuse')}
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className={`p-2 rounded-lg transition-colors ${
                  state.preferences.theme === 'light' 
                    ? 'hover:bg-gray-100' 
                    : 'hover:bg-slate-700'
                }`}
              >
                <X className={`w-5 h-5 ${
                  state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
                }`} />
              </button>
            </div>
            
            <div className="p-6">
              <div className={`mb-4 p-3 rounded-lg ${
                state.preferences.theme === 'light' ? 'bg-gray-100' : 'bg-slate-700/50'
              }`}>
                <p className={`text-sm ${
                  state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                }`}>
                  {currentExcuse.content}
                </p>
                <p className={`text-xs mt-2 ${
                  state.preferences.theme === 'light' ? 'text-gray-500' : 'text-slate-400'
                }`}>
                  {t('believability')}: {currentExcuse.believabilityScore}%
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="flex items-center justify-center space-x-2 p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <span>📱</span>
                  <span>WhatsApp</span>
                </button>
                
                <button
                  onClick={() => handleShare('instagram')}
                  className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors"
                >
                  <span>📷</span>
                  <span>Instagram</span>
                </button>
                
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center justify-center space-x-2 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <span>🐦</span>
                  <span>Twitter</span>
                </button>
                
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <span>📘</span>
                  <span>Facebook</span>
                </button>
                
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center justify-center space-x-2 p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
                >
                  <span>💼</span>
                  <span>LinkedIn</span>
                </button>
                
                <button
                  onClick={() => handleShare('copy')}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-colors ${
                    state.preferences.theme === 'light'
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('copyLink')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}