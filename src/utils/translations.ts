export const translations = {
  en: {
    dashboard: 'Dashboard',
    generateExcuse: 'Generate Excuse',
    proofGenerator: 'Proof Generator',
    emergencyAlerts: 'Emergency Alerts',
    apologyGenerator: 'Apology Generator',
    settings: 'Settings',
    savedExcuses: 'Saved Excuses',
    believabilityScore: 'Believability Score',
    category: 'Category',
    urgency: 'Urgency',
    audience: 'Audience',
    relationship: 'Relationship',
    generateNow: 'Generate Now',
    saveExcuse: 'Save Excuse',
    copyToClipboard: 'Copy to Clipboard',
    shareExcuse: 'Share Excuse',
    customizeProof: 'Customize Proof',
    scheduleAlert: 'Schedule Alert',
    voicePlayback: 'Voice Playback'
  },
  es: {
    dashboard: 'Panel de Control',
    generateExcuse: 'Generar Excusa',
    proofGenerator: 'Generador de Pruebas',
    emergencyAlerts: 'Alertas de Emergencia',
    apologyGenerator: 'Generador de Disculpas',
    settings: 'Configuración',
    savedExcuses: 'Excusas Guardadas',
    believabilityScore: 'Puntuación de Credibilidad',
    category: 'Categoría',
    urgency: 'Urgencia',
    audience: 'Audiencia',
    relationship: 'Relación',
    generateNow: 'Generar Ahora',
    saveExcuse: 'Guardar Excusa',
    copyToClipboard: 'Copiar al Portapapeles',
    shareExcuse: 'Compartir Excusa',
    customizeProof: 'Personalizar Prueba',
    scheduleAlert: 'Programar Alerta',
    voicePlayback: 'Reproducción de Voz'
  },
  fr: {
    dashboard: 'Tableau de Bord',
    generateExcuse: 'Générer une Excuse',
    proofGenerator: 'Générateur de Preuves',
    emergencyAlerts: 'Alertes d\'Urgence',
    apologyGenerator: 'Générateur d\'Excuses',
    settings: 'Paramètres',
    savedExcuses: 'Excuses Sauvegardées',
    believabilityScore: 'Score de Crédibilité',
    category: 'Catégorie',
    urgency: 'Urgence',
    audience: 'Public',
    relationship: 'Relation',
    generateNow: 'Générer Maintenant',
    saveExcuse: 'Sauvegarder l\'Excuse',
    copyToClipboard: 'Copier dans le Presse-papiers',
    shareExcuse: 'Partager l\'Excuse',
    customizeProof: 'Personnaliser la Preuve',
    scheduleAlert: 'Programmer une Alerte',
    voicePlayback: 'Lecture Vocale'
  }
};

export function useTranslation(language: string) {
  const t = (key: keyof typeof translations.en): string => {
    const lang = language as keyof typeof translations;
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  return { t };
}