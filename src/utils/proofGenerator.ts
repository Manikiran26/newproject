import { ProofType, ExcuseCategory } from '../types';
import { translations } from './translations';

export interface ProofData {
  type: ProofType;
  content: string;
  description: string;
  filename: string;
  fullContent?: string;
  sender?: string;
  subject?: string;
  documentTitle?: string;
  documentId?: string;
  authority?: string;
  photoDetails?: string;
  previewContent?: string;
}

export function generateProof(category: ExcuseCategory, content: string, language: string = 'en'): ProofData {
  const proofGenerators = {
    medical: generateMedicalProof,
    transport: generateTransportProof,
    work: generateWorkProof,
    family: generateFamilyProof,
    technology: generateTechProof,
    weather: generateWeatherProof,
    emergency: generateEmergencyProof,
    personal: generatePersonalProof
  };

  const generator = proofGenerators[category] || generatePersonalProof;
  return generator(content, language);
}

function getTranslation(key: string, language: string): string {
  const lang = language as keyof typeof translations;
  return translations[lang]?.[key as keyof typeof translations.en] || translations.en[key as keyof typeof translations.en] || key;
}

function generateMedicalProof(content: string, language: string): ProofData {
  const proofTypes: ProofType[] = ['screenshot', 'document', 'email'];
  const selectedType = proofTypes[Math.floor(Math.random() * proofTypes.length)];
  
  const proofs = {
    screenshot: {
      type: 'screenshot' as ProofType,
      content: getTranslation('screenshotAppointmentConfirmation', language),
      description: getTranslation('mobileAppNotification', language),
      filename: 'appointment_confirmation.png',
      previewContent: `${getTranslation('cityHospitalMobileApp', language)}\n\n${getTranslation('appointmentConfirmed', language)}\n\n${getTranslation('drSarahJohnson', language)}, MD\n${getTranslation('emergencyConsultation', language)}\n${getTranslation('date', language)}: ${getTranslation('today', language)}, 2:30 PM\n${getTranslation('location', language)}: ${getTranslation('emergencyWing', language)}\n${getTranslation('reference', language)}: #EMG-2024-0157\n\n${getTranslation('pleaseArrive15Minutes', language)}\n${getTranslation('bringValidID', language)}`
    },
    document: {
      type: 'document' as ProofType,
      content: getTranslation('medicalCertificateFromDr', language),
      description: getTranslation('officialMedicalCertificate', language),
      filename: 'medical_certificate.pdf',
      documentTitle: getTranslation('medicalCertificate', language),
      documentId: 'MC-2024-' + Math.floor(Math.random() * 10000),
      authority: getTranslation('cityGeneralHospital', language),
      fullContent: getTranslation('medicalCertificateContent', language)
    },
    email: {
      type: 'email' as ProofType,
      content: getTranslation('emailFromReception', language),
      description: getTranslation('hospitalEmailConfirming', language),
      filename: 'hospital_email.png',
      sender: 'reception@cityhospital.com',
      subject: getTranslation('emergencyAppointmentConfirmation', language),
      fullContent: getTranslation('hospitalEmailContent', language)
    }
  };
  
  return proofs[selectedType];
}

function generateTransportProof(content: string, language: string): ProofData {
  const proofTypes: ProofType[] = ['photo', 'screenshot', 'receipt'];
  const selectedType = proofTypes[Math.floor(Math.random() * proofTypes.length)];
  
  const proofs = {
    photo: {
      type: 'photo' as ProofType,
      content: getTranslation('photoBrokenDownVehicle', language),
      description: getTranslation('clearImageShowingCar', language),
      filename: 'breakdown_photo.jpg',
      photoDetails: getTranslation('vehicleStoppedHighway', language)
    },
    screenshot: {
      type: 'screenshot' as ProofType,
      content: getTranslation('screenshotRideSharing', language),
      description: getTranslation('appInterfaceDisplaying', language),
      filename: 'rideshare_unavailable.png',
      previewContent: `UberX\n\n${getTranslation('noDriversAvailable', language)}\n\n${getTranslation('noDriversInArea', language)}\n\n${getTranslation('estimatedWaitTime', language)}: 45+ ${getTranslation('minutes', language)}\n\n${getTranslation('tryAgainLater', language)}\n\n${getTranslation('lastUpdated', language)}: ` + new Date().toLocaleTimeString()
    },
    receipt: {
      type: 'receipt' as ProofType,
      content: getTranslation('towingServiceReceipt', language),
      description: getTranslation('officialReceiptShowing', language),
      filename: 'towing_receipt.pdf',
      previewContent: `AAA ${getTranslation('roadsideAssistance', language)}\n${getTranslation('emergencyTowingService', language)}\n\n${getTranslation('receipt', language)} #: TOW-` + Math.floor(Math.random() * 100000) + `\n${getTranslation('date', language)}: ` + new Date().toLocaleDateString() + `\n${getTranslation('time', language)}: ` + new Date().toLocaleTimeString() + `\n\n${getTranslation('servicesProvided', language)}:\n- ${getTranslation('emergencyRoadsideAssistance', language)}\n- ${getTranslation('vehicleTowing', language)} (15 ${getTranslation('miles', language)})\n- ${getTranslation('diagnosticCheck', language)}\n\n${getTranslation('total', language)}: $125.00\n${getTranslation('paid', language)}: ${getTranslation('creditCard', language)}\n\n${getTranslation('thankYouAAA', language)}`
    }
  };
  
  return proofs[selectedType];
}

function generateWorkProof(content: string, language: string): ProofData {
  return {
    type: 'email',
    content: getTranslation('emailThreadWithClient', language),
    description: getTranslation('clientCommunicationShowing', language),
    filename: 'client_emergency.png',
    sender: 'client@importantcompany.com',
    subject: getTranslation('urgentProjectDeadline', language),
    fullContent: getTranslation('clientEmailContent', language)
  };
}

function generateFamilyProof(content: string, language: string): ProofData {
  return {
    type: 'message',
    content: getTranslation('textMessageFromFamily', language),
    description: getTranslation('smsConversationShowing', language),
    filename: 'family_messages.png',
    previewContent: getTranslation('familyMessageContent', language)
  };
}

function generateTechProof(content: string, language: string): ProofData {
  return {
    type: 'screenshot',
    content: getTranslation('screenshotSystemError', language),
    description: getTranslation('technicalDiagnosticsShowing', language),
    filename: 'tech_error.png',
    previewContent: getTranslation('systemErrorContent', language)
  };
}

function generateWeatherProof(content: string, language: string): ProofData {
  return {
    type: 'photo',
    content: getTranslation('photoSevereWeather', language),
    description: getTranslation('imageShowingDangerous', language),
    filename: 'weather_conditions.jpg',
    photoDetails: getTranslation('heavyFloodingMainRoad', language)
  };
}

function generateEmergencyProof(content: string, language: string): ProofData {
  return {
    type: 'document',
    content: getTranslation('policeIncidentReport', language),
    description: getTranslation('officialDocumentationEmergency', language),
    filename: 'incident_report.pdf',
    documentTitle: getTranslation('policeIncidentReport', language),
    documentId: 'PIR-2024-' + Math.floor(Math.random() * 100000),
    authority: getTranslation('metropolitanPoliceDepartment', language),
    fullContent: getTranslation('incidentReportContent', language)
  };
}

function generatePersonalProof(content: string, language: string): ProofData {
  return {
    type: 'photo',
    content: getTranslation('photoEvidencePersonal', language),
    description: getTranslation('visualProofCircumstances', language),
    filename: 'personal_emergency.jpg',
    photoDetails: getTranslation('lockedOutResidence', language)
  };
}