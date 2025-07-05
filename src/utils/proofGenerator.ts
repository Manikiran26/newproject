import { ProofType, ExcuseCategory } from '../types';

export interface ProofData {
  type: ProofType;
  content: string;
  description: string;
  filename: string;
}

export function generateProof(category: ExcuseCategory, content: string): ProofData {
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
  return generator(content);
}

function generateMedicalProof(content: string): ProofData {
  const proofTypes: ProofType[] = ['screenshot', 'document', 'email'];
  const selectedType = proofTypes[Math.floor(Math.random() * proofTypes.length)];
  
  const proofs = {
    screenshot: {
      content: 'Screenshot of appointment confirmation from hospital app',
      description: 'Mobile app notification showing emergency appointment booking',
      filename: 'appointment_confirmation.png'
    },
    document: {
      content: 'Medical certificate from Dr. Sarah Johnson, MD',
      description: 'Official medical certificate recommending rest and recovery',
      filename: 'medical_certificate.pdf'
    },
    email: {
      content: 'Email from reception@cityhospital.com regarding urgent consultation',
      description: 'Hospital email confirming emergency appointment slot',
      filename: 'hospital_email.png'
    }
  };
  
  return { type: selectedType, ...proofs[selectedType] };
}

function generateTransportProof(content: string): ProofData {
  const proofs = {
    photo: {
      content: 'Photo of broken down vehicle with hazard lights on',
      description: 'Clear image showing car stopped on roadside with visible damage',
      filename: 'breakdown_photo.jpg'
    },
    screenshot: {
      content: 'Screenshot of ride-sharing app showing "No drivers available"',
      description: 'App interface displaying service unavailability in area',
      filename: 'rideshare_unavailable.png'
    },
    receipt: {
      content: 'Towing service receipt from AAA Roadside Assistance',
      description: 'Official receipt showing emergency towing charges',
      filename: 'towing_receipt.pdf'
    }
  };
  
  const proofKeys = Object.keys(proofs) as ProofType[];
  const selectedType = proofKeys[Math.floor(Math.random() * proofKeys.length)];
  
  return { type: selectedType, ...proofs[selectedType] };
}

function generateWorkProof(content: string): ProofData {
  return {
    type: 'email',
    content: 'Email thread with client regarding urgent deadline changes',
    description: 'Client communication showing critical project requirements',
    filename: 'client_emergency.png'
  };
}

function generateFamilyProof(content: string): ProofData {
  return {
    type: 'message',
    content: 'Text message from family member about emergency situation',
    description: 'SMS conversation showing family crisis details',
    filename: 'family_messages.png'
  };
}

function generateTechProof(content: string): ProofData {
  return {
    type: 'screenshot',
    content: 'Screenshot of system error message and internet speed test',
    description: 'Technical diagnostics showing connectivity/system failures',
    filename: 'tech_error.png'
  };
}

function generateWeatherProof(content: string): ProofData {
  return {
    type: 'photo',
    content: 'Photo of severe weather conditions affecting travel',
    description: 'Image showing dangerous weather conditions in local area',
    filename: 'weather_conditions.jpg'
  };
}

function generateEmergencyProof(content: string): ProofData {
  return {
    type: 'document',
    content: 'Police incident report or emergency services documentation',
    description: 'Official documentation of emergency situation involvement',
    filename: 'incident_report.pdf'
  };
}

function generatePersonalProof(content: string): ProofData {
  return {
    type: 'photo',
    content: 'Photo evidence of personal emergency situation',
    description: 'Visual proof of circumstances preventing attendance',
    filename: 'personal_emergency.jpg'
  };
}