import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
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
  | { type: 'SET_VIEW'; payload: string }
  | { type: 'CLEAR_ALL_DATA' };

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
      // Check if excuse is already saved to avoid duplicates
      const isAlreadySaved = state.savedExcuses.some(e => e.id === action.payload.id);
      if (isAlreadySaved) {
        return state;
      }
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
      const newPreferences = { ...state.preferences, ...action.payload };
      
      // Apply theme immediately to document
      if (action.payload.theme) {
        const root = document.documentElement;
        if (action.payload.theme === 'light') {
          root.classList.add('light-theme');
          root.classList.remove('dark-theme');
        } else {
          root.classList.add('dark-theme');
          root.classList.remove('light-theme');
        }
      }
      
      return { ...state, preferences: newPreferences };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'CLEAR_ALL_DATA':
      return {
        ...state,
        excuses: [],
        savedExcuses: [],
        emergencyAlerts: [],
        apologies: []
      };
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

  // Apply initial theme on mount
  useEffect(() => {
    const root = document.documentElement;
    if (state.preferences.theme === 'light') {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    } else {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    }
  }, []);

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