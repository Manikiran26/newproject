import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../utils/translations';
import { Apology } from '../types';
import { Heart, RefreshCw, Copy, Download, Volume2, MessageCircle, Check, X } from 'lucide-react';

export default function ApologyGenerator() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation(state.preferences.defaultLanguage);
  const [apologyConfig, setApologyConfig] = useState({
    tone: 'sincere' as const,
    length: 'medium' as const,
    followUp: false,
    situation: ''
  });
  const [generatedApology, setGeneratedApology] = useState<Apology | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const apologyTemplates = {
    sincere: {
      short: [
        t('sincereShort1'),
        t('sincereShort2'),
        t('sincereShort3')
      ],
      medium: [
        t('sincereMedium1'),
        t('sincereMedium2')
      ],
      long: [
        t('sincereLong1')
      ]
    },
    casual: {
      short: [
        t('casualShort1'),
        t('casualShort2'),
        t('casualShort3')
      ],
      medium: [
        t('casualMedium1'),
        t('casualMedium2')
      ],
      long: [
        t('casualLong1')
      ]
    },
    formal: {
      short: [
        t('formalShort1'),
        t('formalShort2'),
        t('formalShort3')
      ],
      medium: [
        t('formalMedium1'),
        t('formalMedium2')
      ],
      long: [
        t('formalLong1')
      ]
    },
    'guilt-inducing': {
      short: [
        t('guiltShort1'),
        t('guiltShort2'),
        t('guiltShort3')
      ],
      medium: [
        t('guiltMedium1'),
        t('guiltMedium2')
      ],
      long: [
        t('guiltLong1')
      ]
    }
  };

  const handleGenerateApology = async () => {
    setIsGenerating(true);
    
    // Simulate generation time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const templates = apologyTemplates[apologyConfig.tone][apologyConfig.length];
    const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
    
    const apology: Apology = {
      id: Date.now().toString(),
      content: selectedTemplate,
      tone: apologyConfig.tone,
      length: apologyConfig.length,
      followUp: apologyConfig.followUp
    };
    
    setGeneratedApology(apology);
    dispatch({ type: 'ADD_APOLOGY', payload: apology });
    setIsGenerating(false);
  };

  const handleCopy = async () => {
    if (generatedApology) {
      try {
        await navigator.clipboard.writeText(generatedApology.content);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = generatedApology.content;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    }
  };

  const handleDownload = () => {
    if (generatedApology) {
      const content = `${t('apologyLetter')}
      
${t('tone')}: ${t(generatedApology.tone)}
${t('length')}: ${t(generatedApology.length)}
${t('generated')}: ${new Date().toLocaleString()}

---

${generatedApology.content}

${generatedApology.followUp ? `\n\n--- ${t('followUpReminder')} ---\n${t('considerFollowUp')}` : ''}

---
${t('generatedBy')} ExcuseAI - ${t('apologyGenerator')}
${t('forPersonalUse')}`;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `apology_${generatedApology.tone}_${Date.now()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    }
  };

  const handleVoice = () => {
    if (generatedApology && 'speechSynthesis' in window) {
      if (isPlaying) {
        // Stop current speech
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        // Start speech
        const utterance = new SpeechSynthesisUtterance(generatedApology.content);
        utterance.rate = 0.7; // Slower for apologies
        utterance.pitch = 0.9; // Slightly lower pitch for sincerity
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
          {t('apologyGenerator')}
        </h1>
        <p className={`${
          state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
        }`}>
          {t('generateHeartfeltApologies')}
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
            {t('apologyConfiguration')}
          </h2>
          
          <div className="space-y-6">
            {/* Tone Selection */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                {t('tone')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'sincere', label: t('sincere'), color: 'emerald' },
                  { value: 'casual', label: t('casual'), color: 'blue' },
                  { value: 'formal', label: t('formal'), color: 'purple' },
                  { value: 'guilt-inducing', label: t('guiltInducing'), color: 'red' }
                ].map((tone) => (
                  <button
                    key={tone.value}
                    onClick={() => setApologyConfig({ ...apologyConfig, tone: tone.value as any })}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      apologyConfig.tone === tone.value
                        ? `bg-${tone.color}-600/20 border-${tone.color}-500 text-${tone.color}-300`
                        : state.preferences.theme === 'light'
                          ? 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-sm font-medium">{tone.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Length Selection */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                {t('length')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'short', label: t('short') },
                  { value: 'medium', label: t('medium') },
                  { value: 'long', label: t('long') }
                ].map((length) => (
                  <button
                    key={length.value}
                    onClick={() => setApologyConfig({ ...apologyConfig, length: length.value as any })}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      apologyConfig.length === length.value
                        ? state.preferences.theme === 'light'
                          ? 'bg-pink-100 border-pink-300 text-pink-700'
                          : 'bg-pink-600/20 border-pink-500 text-pink-300'
                        : state.preferences.theme === 'light'
                          ? 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-sm font-medium">{length.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Situation Context */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                {t('situationContextOptional')}
              </label>
              <textarea
                value={apologyConfig.situation}
                onChange={(e) => setApologyConfig({ ...apologyConfig, situation: e.target.value })}
                placeholder={t('describeSituationToApologize')}
                className={`w-full p-3 rounded-lg border focus:ring-1 resize-none transition-colors ${
                  state.preferences.theme === 'light'
                    ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500'
                    : 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-pink-500 focus:ring-pink-500'
                }`}
                rows={3}
              />
            </div>

            {/* Follow-up Option */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="followUp"
                checked={apologyConfig.followUp}
                onChange={(e) => setApologyConfig({ ...apologyConfig, followUp: e.target.checked })}
                className="w-4 h-4 text-pink-600 bg-slate-700 border-slate-600 rounded focus:ring-pink-500"
              />
              <label htmlFor="followUp" className={`text-sm font-medium ${
                state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
              }`}>
                {t('includeFollowUpCommitment')}
              </label>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateApology}
              disabled={isGenerating}
              className="w-full flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Heart className="w-5 h-5" />
              )}
              <span>{isGenerating ? t('generating') : t('generateApology')}</span>
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
            {t('generatedApology')}
          </h2>
          
          {generatedApology ? (
            <div className="space-y-6">
              {/* Apology Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className={`text-center p-3 rounded-lg ${
                  state.preferences.theme === 'light' ? 'bg-gray-100' : 'bg-slate-700/50'
                }`}>
                  <div className={`text-sm ${
                    state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                  }`}>
                    {t('tone')}
                  </div>
                  <div className={`font-medium capitalize ${
                    state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {t(generatedApology.tone)}
                  </div>
                </div>
                <div className={`text-center p-3 rounded-lg ${
                  state.preferences.theme === 'light' ? 'bg-gray-100' : 'bg-slate-700/50'
                }`}>
                  <div className={`text-sm ${
                    state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                  }`}>
                    {t('length')}
                  </div>
                  <div className={`font-medium capitalize ${
                    state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {t(generatedApology.length)}
                  </div>
                </div>
                <div className={`text-center p-3 rounded-lg ${
                  state.preferences.theme === 'light' ? 'bg-gray-100' : 'bg-slate-700/50'
                }`}>
                  <div className={`text-sm ${
                    state.preferences.theme === 'light' ? 'text-gray-600' : 'text-slate-400'
                  }`}>
                    {t('words')}
                  </div>
                  <div className={`font-medium ${
                    state.preferences.theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {generatedApology.content.split(' ').length}
                  </div>
                </div>
              </div>

              {/* Apology Content */}
              <div className={`p-4 rounded-lg border ${
                state.preferences.theme === 'light' 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-slate-700/30 border-slate-600'
              }`}>
                <div className="prose prose-slate max-w-none">
                  <p className={`leading-relaxed whitespace-pre-wrap ${
                    state.preferences.theme === 'light' ? 'text-gray-700' : 'text-slate-300'
                  }`}>
                    {generatedApology.content}
                  </p>
                </div>
              </div>

              {/* Follow-up Reminder */}
              {generatedApology.followUp && (
                <div className={`p-3 rounded-lg border ${
                  state.preferences.theme === 'light'
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-blue-600/20 border-blue-500/50'
                }`}>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className={`w-4 h-4 ${
                      state.preferences.theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      state.preferences.theme === 'light' ? 'text-blue-800' : 'text-blue-300'
                    }`}>
                      {t('followUpReminder')}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${
                    state.preferences.theme === 'light' ? 'text-blue-700' : 'text-blue-200'
                  }`}>
                    {t('considerFollowUp')}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3">
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
                      : 'bg-pink-600 hover:bg-pink-700 text-white'
                  }`}
                >
                  {downloadSuccess ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  <span>{downloadSuccess ? t('downloaded') : t('download')}</span>
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
              <Heart className={`w-16 h-16 mx-auto mb-4 ${
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
                {t('configureApologyStyle')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}