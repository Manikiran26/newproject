import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Apology } from '../types';
import { Heart, RefreshCw, Copy, Save, Volume2, MessageCircle } from 'lucide-react';

export default function ApologyGenerator() {
  const { state, dispatch } = useApp();
  const [apologyConfig, setApologyConfig] = useState({
    tone: 'sincere' as const,
    length: 'medium' as const,
    followUp: false,
    situation: ''
  });
  const [generatedApology, setGeneratedApology] = useState<Apology | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const apologyTemplates = {
    sincere: {
      short: [
        "I sincerely apologize for my absence. I understand this may have caused inconvenience, and I take full responsibility.",
        "I'm truly sorry for not being able to make it. This was completely unintentional, and I deeply regret any disruption caused.",
        "Please accept my heartfelt apology for missing our commitment. I value our relationship and am sorry for letting you down."
      ],
      medium: [
        "I want to offer my sincere apologies for my unexpected absence. I understand that my not being there may have caused significant inconvenience and disruption to your plans. This situation was completely beyond my control, but I recognize that doesn't diminish the impact on you. I take full responsibility for not communicating sooner and deeply regret any stress or frustration this may have caused.",
        "I am writing to express my deepest apologies for my absence. I understand that reliability is important, and I failed to meet that expectation. While the circumstances were truly unavoidable, I should have found a way to communicate more effectively with you. I sincerely regret any inconvenience, disappointment, or additional burden this may have placed on you."
      ],
      long: [
        "I want to begin by offering my most sincere and heartfelt apologies for my unexpected absence. I understand that when someone fails to show up as expected, it can create a ripple effect of inconvenience, frustration, and disappointment that extends far beyond just the immediate moment. I recognize that my absence may have disrupted your carefully laid plans, caused you to rearrange your schedule, or perhaps even put additional burden on others who had to compensate for my missing presence.\n\nWhile I want to explain that the circumstances leading to my absence were truly beyond my control and completely unforeseen, I also understand that explanations, however valid, cannot undo the inconvenience caused. I take full responsibility for not having better contingency plans in place and for not communicating with you sooner about my situation.\n\nI deeply value our relationship and the trust you place in me, and I am genuinely sorry for letting you down. Moving forward, I am committed to implementing better communication strategies and backup plans to ensure this type of situation doesn't occur again."
      ]
    },
    casual: {
      short: [
        "Hey, really sorry about missing out! Something crazy came up and I couldn't make it. Hope it wasn't too much of a hassle!",
        "So sorry for the no-show! Had a bit of an emergency situation. Thanks for understanding!",
        "Apologies for bailing! Totally unplanned situation. Hope we can reschedule soon!"
      ],
      medium: [
        "I'm really sorry for not showing up! I know it's super frustrating when someone doesn't come through, and I feel terrible about it. Something unexpected happened that I just couldn't get out of, but I should have let you know sooner. I hope it didn't mess up your day too much, and I'd love to make it up to you somehow.",
        "Hey, I owe you a big apology for my disappearing act! I know how annoying it is when people don't show up, especially without much notice. I had this crazy situation pop up that I just couldn't handle remotely. I should have called you right away instead of hoping I could still make it work. Really sorry for any trouble this caused!"
      ],
      long: [
        "I'm reaching out to apologize for my unexpected absence and for not being there when I said I would be. I know how frustrating and inconsiderate it must seem when someone just doesn't show up, especially when you're counting on them. Trust me, I'm usually pretty reliable, so this whole situation has been as stressful for me as I'm sure it was inconvenient for you.\n\nSomething completely unexpected came up that required my immediate attention, and honestly, I thought I could handle it quickly and still make it. But as these things tend to go, it spiraled into something much bigger and more time-consuming than I anticipated. I should have reached out to you much sooner instead of holding onto hope that I could still pull through.\n\nI really appreciate your patience and understanding, and I hope we can work something out to make up for this. I know actions speak louder than words, so I'm committed to being more communicative in the future and having better backup plans."
      ]
    },
    formal: {
      short: [
        "Please accept my formal apology for my absence. I understand the professional implications and deeply regret any inconvenience caused.",
        "I wish to extend my sincerest apologies for failing to fulfill my commitment. I recognize the impact of my absence on professional obligations.",
        "I formally apologize for my unexpected absence and any disruption this may have caused to scheduled proceedings."
      ],
      medium: [
        "I am writing to formally apologize for my absence from our scheduled engagement. I understand that professional commitments require reliability and consistency, standards which I failed to meet in this instance. While I encountered unavoidable circumstances, I recognize that this does not excuse the inconvenience and potential disruption caused by my absence. I accept full responsibility for this lapse in professional conduct.",
        "Please accept this formal apology regarding my unexpected absence. I am acutely aware that such incidents reflect poorly on professional standards and can impact operational efficiency. I want to assure you that this situation arose from circumstances entirely beyond my control, though I understand this does not mitigate the inconvenience caused. I am committed to ensuring such incidents do not recur."
      ],
      long: [
        "I am writing to offer my most formal and comprehensive apology for my unexpected absence from our scheduled commitment. I understand that in professional contexts, reliability and punctuality are not merely courtesies but fundamental expectations that form the foundation of trust and effective collaboration.\n\nI recognize that my absence may have resulted in operational disruptions, scheduling complications, and potential inconvenience to multiple stakeholders. While I want to convey that the circumstances leading to my absence were entirely unforeseen and beyond my control, I also understand that explanations, however legitimate, cannot retroactively address the immediate impacts of my unavailability.\n\nI take full accountability for not having established more robust contingency protocols and for any communication delays that may have exacerbated the situation. Moving forward, I am implementing comprehensive measures to prevent similar occurrences and ensure more effective emergency communication procedures. I greatly value our professional relationship and am committed to rebuilding any trust that may have been affected by this incident."
      ]
    },
    'guilt-inducing': {
      short: [
        "I'm devastated that I let you down. I know you were counting on me, and I feel terrible about breaking that trust.",
        "I can't forgive myself for disappointing you. I understand if you're upset with me - I would be too in your position.",
        "I'm heartbroken that I caused you inconvenience. I know how much this meant to you, and I failed you when you needed me most."
      ],
      medium: [
        "I am absolutely devastated about missing our commitment, and I can't stop thinking about how I've let you down. I know you were counting on me, and the thought that I've broken your trust and caused you stress is keeping me up at night. I understand that sorry doesn't fix the inconvenience I've caused, but I need you to know that this is eating away at me. I can't imagine how frustrated and disappointed you must be, and I wouldn't blame you if you never wanted to rely on me again.",
        "I feel sick about having to cancel on you, especially knowing how much you had riding on this. I can't shake the image of you waiting, wondering where I was, maybe worried that something had happened to me. The guilt is overwhelming because I know I've not only inconvenienced you but potentially damaged the trust between us. I've been beating myself up about this because I know how it feels to be let down by someone you're counting on, and I never wanted to be that person for you."
      ],
      long: [
        "I am writing this with a heavy heart, knowing that my words can't undo the disappointment and inconvenience I've caused you. I've been tormented by the thought of how my absence affected you, and I can't escape the guilt of knowing that I let down someone who trusted me to be there.\n\nI keep imagining how you must have felt when I didn't show up - the initial confusion, then growing concern, and finally the realization that I had failed to keep my word. The thought that you might have worried about my safety, rearranged your schedule, or had to explain my absence to others fills me with an overwhelming sense of shame and regret.\n\nI understand that trust, once broken, is not easily repaired, and I'm terrified that my actions may have permanently damaged our relationship. I know that you had every right to depend on me, and I failed you in the most fundamental way. The weight of this failure is crushing, and I find myself questioning whether I deserve your forgiveness or if I've irreparably harmed something precious between us.\n\nI don't expect you to absolve me of this guilt immediately, if ever. I only hope that in time, you might find it in your heart to give me another chance to prove that I can be the reliable person you deserved from the beginning."
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
      await navigator.clipboard.writeText(generatedApology.content);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Apology Generator</h1>
        <p className="text-slate-400">Generate heartfelt apologies to follow up on your excuses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Apology Configuration</h2>
          
          <div className="space-y-6">
            {/* Tone Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Tone</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'sincere', label: 'Sincere', color: 'emerald' },
                  { value: 'casual', label: 'Casual', color: 'blue' },
                  { value: 'formal', label: 'Formal', color: 'purple' },
                  { value: 'guilt-inducing', label: 'Guilt-Inducing', color: 'red' }
                ].map((tone) => (
                  <button
                    key={tone.value}
                    onClick={() => setApologyConfig({ ...apologyConfig, tone: tone.value as any })}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      apologyConfig.tone === tone.value
                        ? `bg-${tone.color}-600/20 border-${tone.color}-500 text-${tone.color}-300`
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
              <label className="block text-sm font-medium text-slate-300 mb-3">Length</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'short', label: 'Short' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'long', label: 'Long' }
                ].map((length) => (
                  <button
                    key={length.value}
                    onClick={() => setApologyConfig({ ...apologyConfig, length: length.value as any })}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      apologyConfig.length === length.value
                        ? 'bg-pink-600/20 border-pink-500 text-pink-300'
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
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Situation Context (Optional)
              </label>
              <textarea
                value={apologyConfig.situation}
                onChange={(e) => setApologyConfig({ ...apologyConfig, situation: e.target.value })}
                placeholder="Describe the situation you need to apologize for..."
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 resize-none"
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
              <label htmlFor="followUp" className="text-sm font-medium text-slate-300">
                Include follow-up commitment
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
              <span>{isGenerating ? 'Generating...' : 'Generate Apology'}</span>
            </button>
          </div>
        </div>

        {/* Result Panel */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Generated Apology</h2>
          
          {generatedApology ? (
            <div className="space-y-6">
              {/* Apology Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                  <div className="text-sm text-slate-400">Tone</div>
                  <div className="font-medium text-white capitalize">{generatedApology.tone}</div>
                </div>
                <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                  <div className="text-sm text-slate-400">Length</div>
                  <div className="font-medium text-white capitalize">{generatedApology.length}</div>
                </div>
                <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                  <div className="text-sm text-slate-400">Words</div>
                  <div className="font-medium text-white">{generatedApology.content.split(' ').length}</div>
                </div>
              </div>

              {/* Apology Content */}
              <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {generatedApology.content}
                  </p>
                </div>
              </div>

              {/* Follow-up Reminder */}
              {generatedApology.followUp && (
                <div className="p-3 bg-blue-600/20 border border-blue-500/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300 text-sm font-medium">Follow-up Reminder</span>
                  </div>
                  <p className="text-blue-200 text-sm mt-1">
                    Consider sending a follow-up message in 24-48 hours to reinforce your commitment.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center space-x-2 p-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors">
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors">
                  <Volume2 className="w-4 h-4" />
                  <span>Voice</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">Ready to Generate</h3>
              <p className="text-slate-400">Configure your apology style and click generate</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}