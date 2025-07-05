export interface Excuse {
  id: string;
  title: string;
  content: string;
  category: ExcuseCategory;
  believabilityScore: number;
  context: ExcuseContext;
  proofType?: ProofType;
  timestamp: number;
  language: string;
}

export interface ExcuseContext {
  situation: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  audience: 'family' | 'work' | 'friends' | 'romantic' | 'authority';
  timeframe: 'immediate' | 'past' | 'future';
  relationship: 'close' | 'professional' | 'casual' | 'distant';
}

export type ExcuseCategory = 
  | 'medical' 
  | 'family' 
  | 'work' 
  | 'transport' 
  | 'technology' 
  | 'weather' 
  | 'emergency' 
  | 'personal';

export type ProofType = 
  | 'screenshot' 
  | 'document' 
  | 'photo' 
  | 'receipt' 
  | 'email' 
  | 'message';

export interface EmergencyAlert {
  id: string;
  type: 'call' | 'text' | 'email';
  sender: string;
  content: string;
  scheduledTime?: number;
  isActive: boolean;
}

export interface Apology {
  id: string;
  content: string;
  tone: 'sincere' | 'casual' | 'formal' | 'guilt-inducing';
  length: 'short' | 'medium' | 'long';
  followUp: boolean;
}

export interface UserPreferences {
  defaultLanguage: string;
  preferredCategories: ExcuseCategory[];
  voiceEnabled: boolean;
  autoProofGeneration: boolean;
  emergencyContactsEnabled: boolean;
  theme: 'dark' | 'light';
}