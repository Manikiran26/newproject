import { ProofType, ExcuseCategory } from '../types';

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
      type: 'screenshot' as ProofType,
      content: 'Screenshot of appointment confirmation from hospital app',
      description: 'Mobile app notification showing emergency appointment booking',
      filename: 'appointment_confirmation.png',
      previewContent: 'City Hospital Mobile App\n\nAppointment Confirmed\n\nDr. Sarah Johnson, MD\nEmergency Consultation\nDate: Today, 2:30 PM\nLocation: Emergency Wing\nReference: #EMG-2024-0157\n\nPlease arrive 15 minutes early.\nBring valid ID and insurance card.'
    },
    document: {
      type: 'document' as ProofType,
      content: 'Medical certificate from Dr. Sarah Johnson, MD',
      description: 'Official medical certificate recommending rest and recovery',
      filename: 'medical_certificate.pdf',
      documentTitle: 'Medical Certificate',
      documentId: 'MC-2024-' + Math.floor(Math.random() * 10000),
      authority: 'City General Hospital',
      fullContent: 'This is to certify that the patient has been examined and found to be suffering from acute gastroenteritis. The patient is advised complete bed rest for 24-48 hours and should avoid solid foods. Return to normal activities is recommended only after symptoms have completely subsided.\n\nThis condition is highly contagious and the patient should remain isolated to prevent spread to others.\n\nMedical attention was sought due to severe symptoms including nausea, vomiting, and dehydration requiring immediate care.'
    },
    email: {
      type: 'email' as ProofType,
      content: 'Email from reception@cityhospital.com regarding urgent consultation',
      description: 'Hospital email confirming emergency appointment slot',
      filename: 'hospital_email.png',
      sender: 'reception@cityhospital.com',
      subject: 'Emergency Appointment Confirmation - Urgent',
      fullContent: 'Dear Patient,\n\nThis email confirms your emergency appointment scheduled for today at 2:30 PM with Dr. Sarah Johnson in our Emergency Wing.\n\nAppointment Details:\n- Date: ' + new Date().toLocaleDateString() + '\n- Time: 2:30 PM\n- Doctor: Dr. Sarah Johnson, MD\n- Department: Emergency Medicine\n- Reference: EMG-2024-0157\n\nPlease arrive 15 minutes early and bring:\n- Valid photo ID\n- Insurance card\n- List of current medications\n\nIf you need to reschedule, please call (555) 123-4567 immediately.\n\nCity General Hospital\nEmergency Department'
    }
  };
  
  return proofs[selectedType];
}

function generateTransportProof(content: string): ProofData {
  const proofTypes: ProofType[] = ['photo', 'screenshot', 'receipt'];
  const selectedType = proofTypes[Math.floor(Math.random() * proofTypes.length)];
  
  const proofs = {
    photo: {
      type: 'photo' as ProofType,
      content: 'Photo of broken down vehicle with hazard lights on',
      description: 'Clear image showing car stopped on roadside with visible damage',
      filename: 'breakdown_photo.jpg',
      photoDetails: 'Vehicle stopped on highway shoulder with hazard lights flashing, visible steam from engine compartment, emergency triangle placed behind vehicle'
    },
    screenshot: {
      type: 'screenshot' as ProofType,
      content: 'Screenshot of ride-sharing app showing "No drivers available"',
      description: 'App interface displaying service unavailability in area',
      filename: 'rideshare_unavailable.png',
      previewContent: 'UberX\n\nNo drivers available\n\nThere are no drivers in your area right now. This could be due to high demand or weather conditions.\n\nEstimated wait time: 45+ minutes\n\nTry again later or consider alternative transportation.\n\nLast updated: ' + new Date().toLocaleTimeString()
    },
    receipt: {
      type: 'receipt' as ProofType,
      content: 'Towing service receipt from AAA Roadside Assistance',
      description: 'Official receipt showing emergency towing charges',
      filename: 'towing_receipt.pdf',
      previewContent: 'AAA ROADSIDE ASSISTANCE\nEmergency Towing Service\n\nReceipt #: TOW-' + Math.floor(Math.random() * 100000) + '\nDate: ' + new Date().toLocaleDateString() + '\nTime: ' + new Date().toLocaleTimeString() + '\n\nServices Provided:\n- Emergency Roadside Assistance\n- Vehicle Towing (15 miles)\n- Diagnostic Check\n\nTotal: $125.00\nPaid: Credit Card\n\nThank you for choosing AAA!'
    }
  };
  
  return proofs[selectedType];
}

function generateWorkProof(content: string): ProofData {
  return {
    type: 'email',
    content: 'Email thread with client regarding urgent deadline changes',
    description: 'Client communication showing critical project requirements',
    filename: 'client_emergency.png',
    sender: 'client@importantcompany.com',
    subject: 'URGENT: Project Deadline Moved Up - Immediate Action Required',
    fullContent: 'Hi there,\n\nI hope this email finds you well. Unfortunately, I have some urgent news regarding our project timeline.\n\nDue to unexpected changes in our board meeting schedule, we need to move up the project delivery date by 48 hours. The new deadline is now ' + new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString() + ' at 9:00 AM.\n\nI understand this is extremely short notice, but this project is critical for our Q1 presentation to stakeholders. We\'re willing to discuss additional compensation for the rush delivery.\n\nPlease confirm receipt of this email and let me know if you can accommodate this timeline change.\n\nBest regards,\nJohn Smith\nProject Manager\nImportant Company Inc.'
  };
}

function generateFamilyProof(content: string): ProofData {
  return {
    type: 'message',
    content: 'Text message from family member about emergency situation',
    description: 'SMS conversation showing family crisis details',
    filename: 'family_messages.png',
    previewContent: 'Mom (2 minutes ago)\nHoney, I need you to come to the hospital right away. Dad had a fall and we\'re in the emergency room. He\'s conscious but they want to run some tests.\n\nYou (1 minute ago)\nOh no! Which hospital? I\'m leaving work now.\n\nMom (Just now)\nSt. Mary\'s Hospital, Emergency entrance. Room 12. Please hurry but drive safely. I\'ll keep you updated.\n\nDelivered ✓'
  };
}

function generateTechProof(content: string): ProofData {
  return {
    type: 'screenshot',
    content: 'Screenshot of system error message and internet speed test',
    description: 'Technical diagnostics showing connectivity/system failures',
    filename: 'tech_error.png',
    previewContent: 'SYSTEM ERROR\n\nConnection Failed\nError Code: 0x80070057\n\nYour internet connection appears to be offline. Please check your network settings and try again.\n\nInternet Speed Test Results:\nDownload: 0.00 Mbps\nUpload: 0.00 Mbps\nPing: Timeout\n\nLast successful connection: Yesterday 11:47 PM\n\nTroubleshooting steps attempted:\n✓ Restart router\n✓ Check cables\n✓ Contact ISP\n\nISP Status: Outage reported in your area\nEstimated repair time: 4-6 hours'
  };
}

function generateWeatherProof(content: string): ProofData {
  return {
    type: 'photo',
    content: 'Photo of severe weather conditions affecting travel',
    description: 'Image showing dangerous weather conditions in local area',
    filename: 'weather_conditions.jpg',
    photoDetails: 'Heavy flooding on main road with water level reaching car door height, multiple vehicles stranded, emergency vehicles present, road closure signs visible'
  };
}

function generateEmergencyProof(content: string): ProofData {
  return {
    type: 'document',
    content: 'Police incident report or emergency services documentation',
    description: 'Official documentation of emergency situation involvement',
    filename: 'incident_report.pdf',
    documentTitle: 'Police Incident Report',
    documentId: 'PIR-2024-' + Math.floor(Math.random() * 100000),
    authority: 'Metropolitan Police Department',
    fullContent: 'INCIDENT REPORT\n\nIncident Number: ' + Math.floor(Math.random() * 1000000) + '\nDate: ' + new Date().toLocaleDateString() + '\nTime: ' + new Date().toLocaleTimeString() + '\nLocation: Main Street & 5th Avenue\n\nNature of Incident: Traffic Accident - Witness Statement Required\n\nSummary: Witness observed motor vehicle collision at intersection. Statement required for insurance and legal proceedings. Witness cooperation essential for case resolution.\n\nWitness Information:\nStatus: Cooperative witness\nStatement: Provided on scene\nFollow-up: May be required for court proceedings\n\nOfficer Badge #: 4521\nReport Filed: ' + new Date().toLocaleString()
  };
}

function generatePersonalProof(content: string): ProofData {
  return {
    type: 'photo',
    content: 'Photo evidence of personal emergency situation',
    description: 'Visual proof of circumstances preventing attendance',
    filename: 'personal_emergency.jpg',
    photoDetails: 'Locked out of residence, keys visible inside through window, locksmith business card in hand, timestamp showing current date and time'
  };
}