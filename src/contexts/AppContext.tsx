import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Excuse, EmergencyAlert, Apology, UserPreferences } from '../types';

interface AppState {
  excuses: Excuse[];
  savedExcuses: Excuse[];
  emergencyAlerts: EmergencyAlert[];
  apologies: Apology[];
  preferences: UserPreferences;
  isLoading: boolean;
  currentView: string;
}

type AppAction = 
  | { type: 'ADD_EXCUSE'; payload: Excuse }
  | { type: 'SAVE_EXCUSE'; payload: Excuse }
  | { type: 'REMOVE_EXCUSE'; payload: string }
  | { type: 'ADD_EMERGENCY_ALERT'; payload: EmergencyAlert }
  | { type: 'ADD_APOLOGY'; payload: Apology }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_VIEW'; payload: string };

const initialState: AppState = {
  excuses: [],
  savedExcuses: [],
  emergencyAlerts: [],
  apologies: [],
  preferences: {
    defaultLanguage: 'en',
    preferredCategories: ['work', 'transport', 'medical'],
    voiceEnabled: false,
    autoProofGeneration: true,
    emergencyContactsEnabled: false,
    theme: 'dark'
  },
  isLoading: false,
  currentView: 'dashboard'
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_EXCUSE':
      return { ...state, excuses: [action.payload, ...state.excuses] };
    case 'SAVE_EXCUSE':
      return { ...state, savedExcuses: [action.payload, ...state.savedExcuses] };
    case 'REMOVE_EXCUSE':
      return { 
        ...state, 
        savedExcuses: state.savedExcuses.filter(e => e.id !== action.payload) 
      };
    case 'ADD_EMERGENCY_ALERT':
      return { ...state, emergencyAlerts: [action.payload, ...state.emergencyAlerts] };
    case 'ADD_APOLOGY':
      return { ...state, apologies: [action.payload, ...state.apologies] };
    case 'UPDATE_PREFERENCES':
      return { ...state, preferences: { ...state.preferences, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}