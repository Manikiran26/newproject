import { Excuse, ExcuseContext, ExcuseCategory } from '../types';
import { translations } from './translations';

const excuseTemplates = {
  medical: {
    en: [
      "I woke up with severe food poisoning from last night's dinner",
      "My doctor scheduled an emergency appointment for concerning symptoms",
      "I'm experiencing a migraine that's making it impossible to function",
      "I had an allergic reaction and need to stay home for observation"
    ],
    es: [
      "Me desperté con una intoxicación alimentaria severa de la cena de anoche",
      "Mi médico programó una cita de emergencia por síntomas preocupantes",
      "Estoy experimentando una migraña que me hace imposible funcionar",
      "Tuve una reacción alérgica y necesito quedarme en casa en observación"
    ],
    fr: [
      "Je me suis réveillé avec une intoxication alimentaire sévère du dîner d'hier soir",
      "Mon médecin a programmé un rendez-vous d'urgence pour des symptômes inquiétants",
      "Je ressens une migraine qui me rend impossible de fonctionner",
      "J'ai eu une réaction allergique et je dois rester à la maison en observation"
    ],
    hi: [
      "मुझे कल रात के खाने से गंभीर फूड पॉइजनिंग हुई है",
      "मेरे डॉक्टर ने चिंताजनक लक्षणों के लिए आपातकालीन अपॉइंटमेंट रखा है",
      "मुझे माइग्रेन हो रहा है जो काम करना असंभव बना रहा है",
      "मुझे एलर्जी की प्रतिक्रिया हुई है और घर पर निगरानी में रहना है"
    ]
  },
  family: {
    en: [
      "My elderly relative had a fall and I need to rush to the hospital",
      "There's a family emergency that requires my immediate attention",
      "My child's school called about an incident requiring parent pickup",
      "A close family member is having a mental health crisis"
    ],
    es: [
      "Mi pariente mayor se cayó y necesito correr al hospital",
      "Hay una emergencia familiar que requiere mi atención inmediata",
      "La escuela de mi hijo llamó sobre un incidente que requiere que vaya a recogerlo",
      "Un familiar cercano está teniendo una crisis de salud mental"
    ],
    fr: [
      "Mon parent âgé a fait une chute et je dois me précipiter à l'hôpital",
      "Il y a une urgence familiale qui nécessite mon attention immédiate",
      "L'école de mon enfant a appelé pour un incident nécessitant que je vienne le chercher",
      "Un proche parent traverse une crise de santé mentale"
    ],
    hi: [
      "मेरे बुजुर्ग रिश्तेदार का गिरना हुआ है और मुझे अस्पताल जाना है",
      "एक पारिवारिक आपातकाल है जिसमें मेरा तत्काल ध्यान चाहिए",
      "मेरे बच्चे के स्कूल ने एक घटना के बारे में फोन किया है",
      "एक करीबी परिवारजन मानसिक स्वास्थ्य संकट में है"
    ]
  },
  work: {
    en: [
      "My laptop crashed and I lost all my work - IT is investigating",
      "There's been a data breach affecting our department's systems",
      "I'm dealing with a critical client emergency that can't wait",
      "The presentation files got corrupted and need to be rebuilt"
    ],
    es: [
      "Mi laptop se estrelló y perdí todo mi trabajo - IT está investigando",
      "Ha habido una violación de datos que afecta los sistemas de nuestro departamento",
      "Estoy lidiando con una emergencia crítica de cliente que no puede esperar",
      "Los archivos de presentación se corrompieron y necesitan ser reconstruidos"
    ],
    fr: [
      "Mon ordinateur portable s'est planté et j'ai perdu tout mon travail - l'IT enquête",
      "Il y a eu une violation de données affectant les systèmes de notre département",
      "Je traite une urgence client critique qui ne peut pas attendre",
      "Les fichiers de présentation se sont corrompus et doivent être reconstruits"
    ],
    hi: [
      "मेरा लैपटॉप क्रैश हो गया और मेरा सारा काम खो गया - IT जांच कर रहा है",
      "हमारे विभाग के सिस्टम को प्रभावित करने वाला डेटा ब्रीच हुआ है",
      "मैं एक महत्वपूर्ण क्लाइंट आपातकाल से निपट रहा हूं जो इंतजार नहीं कर सकता",
      "प्रेजेंटेशन फाइलें दूषित हो गईं और उन्हें फिर से बनाना होगा"
    ]
  },
  transport: {
    en: [
      "My car broke down on the highway and I'm waiting for a tow",
      "There's been a major accident blocking all routes to the office",
      "The train service has been suspended due to signal failures",
      "My Uber driver got into an accident and I'm stranded"
    ],
    es: [
      "Mi auto se descompuso en la autopista y estoy esperando una grúa",
      "Ha habido un accidente mayor bloqueando todas las rutas a la oficina",
      "El servicio de tren ha sido suspendido debido a fallas de señal",
      "Mi conductor de Uber tuvo un accidente y estoy varado"
    ],
    fr: [
      "Ma voiture est tombée en panne sur l'autoroute et j'attends une dépanneuse",
      "Il y a eu un accident majeur bloquant toutes les routes vers le bureau",
      "Le service de train a été suspendu en raison de pannes de signalisation",
      "Mon chauffeur Uber a eu un accident et je suis bloqué"
    ],
    hi: [
      "मेरी कार हाईवे पर खराब हो गई है और मैं टो का इंतजार कर रहा हूं",
      "ऑफिस के सभी रास्तों को बंद करने वाला एक बड़ा एक्सीडेंट हुआ है",
      "सिग्नल की खराबी के कारण ट्रेन सेवा बंद कर दी गई है",
      "मेरे उबर ड्राइवर का एक्सीडेंट हो गया और मैं फंस गया हूं"
    ]
  },
  technology: {
    en: [
      "My internet provider had a massive outage in my area",
      "My phone fell in water and I can't access important work files",
      "There's been a power outage affecting my entire neighborhood",
      "My home security system malfunctioned and I need to wait for repairs"
    ],
    es: [
      "Mi proveedor de internet tuvo una interrupción masiva en mi área",
      "Mi teléfono se cayó al agua y no puedo acceder a archivos importantes de trabajo",
      "Ha habido un corte de energía que afecta a todo mi vecindario",
      "Mi sistema de seguridad del hogar falló y necesito esperar las reparaciones"
    ],
    fr: [
      "Mon fournisseur d'internet a eu une panne massive dans ma région",
      "Mon téléphone est tombé dans l'eau et je ne peux pas accéder aux fichiers de travail importants",
      "Il y a eu une panne de courant affectant tout mon quartier",
      "Mon système de sécurité domestique a mal fonctionné et je dois attendre les réparations"
    ],
    hi: [
      "मेरे इंटरनेट प्रदाता के पास मेरे क्षेत्र में बड़ी आउटेज थी",
      "मेरा फोन पानी में गिर गया और मैं महत्वपूर्ण कार्य फाइलों तक नहीं पहुंच सकता",
      "मेरे पूरे पड़ोस को प्रभावित करने वाली बिजली कटौती हुई है",
      "मेरा होम सिक्यूरिटी सिस्टम खराब हो गया और मुझे मरम्मत का इंतजार करना है"
    ]
  },
  weather: {
    en: [
      "Severe flooding has made the roads to my house impassable",
      "A tree fell on my car during the storm last night",
      "The extreme weather conditions make travel dangerous",
      "My heating system failed during the cold snap and pipes might freeze"
    ],
    es: [
      "Las inundaciones severas han hecho intransitables las carreteras a mi casa",
      "Un árbol cayó sobre mi auto durante la tormenta anoche",
      "Las condiciones climáticas extremas hacen peligroso viajar",
      "Mi sistema de calefacción falló durante la ola de frío y las tuberías podrían congelarse"
    ],
    fr: [
      "Les inondations sévères ont rendu les routes vers ma maison impraticables",
      "Un arbre est tombé sur ma voiture pendant la tempête hier soir",
      "Les conditions météorologiques extrêmes rendent les voyages dangereux",
      "Mon système de chauffage a échoué pendant la vague de froid et les tuyaux pourraient geler"
    ],
    hi: [
      "गंभीर बाढ़ ने मेरे घर के रास्तों को अगम्य बना दिया है",
      "कल रात तूफान के दौरान मेरी कार पर एक पेड़ गिर गया",
      "अत्यधिक मौसम की स्थिति यात्रा को खतरनाक बनाती है",
      "ठंड की लहर के दौरान मेरा हीटिंग सिस्टम फेल हो गया और पाइप जम सकते हैं"
    ]
  },
  emergency: {
    en: [
      "I witnessed an accident and need to stay to give a police statement",
      "There's been a gas leak in my building and we're evacuating",
      "I found an injured animal and am rushing it to the vet",
      "My neighbor's house alarm won't stop and I'm helping them resolve it"
    ],
    es: [
      "Fui testigo de un accidente y necesito quedarme para dar una declaración policial",
      "Ha habido una fuga de gas en mi edificio y estamos evacuando",
      "Encontré un animal herido y lo estoy llevando de urgencia al veterinario",
      "La alarma de la casa de mi vecino no para y los estoy ayudando a resolverlo"
    ],
    fr: [
      "J'ai été témoin d'un accident et je dois rester pour faire une déclaration à la police",
      "Il y a eu une fuite de gaz dans mon immeuble et nous évacuons",
      "J'ai trouvé un animal blessé et je l'emmène d'urgence chez le vétérinaire",
      "L'alarme de la maison de mon voisin ne s'arrête pas et je les aide à la résoudre"
    ],
    hi: [
      "मैंने एक दुर्घटना देखी है और पुलिस बयान देने के लिए रुकना है",
      "मेरी बिल्डिंग में गैस लीक हुआ है और हम निकासी कर रहे हैं",
      "मुझे एक घायल जानवर मिला है और मैं इसे पशु चिकित्सक के पास ले जा रहा हूं",
      "मेरे पड़ोसी के घर का अलार्म नहीं रुक रहा और मैं उन्हें हल करने में मदद कर रहा हूं"
    ]
  },
  personal: {
    en: [
      "I'm having an anxiety attack and need some time to recover",
      "I locked myself out and the locksmith can't come until this afternoon",
      "I spilled coffee all over my only clean work outfit",
      "My babysitter canceled at the last minute and I can't find a replacement"
    ],
    es: [
      "Estoy teniendo un ataque de ansiedad y necesito tiempo para recuperarme",
      "Me quedé afuera sin llaves y el cerrajero no puede venir hasta esta tarde",
      "Derramé café sobre mi único traje de trabajo limpio",
      "Mi niñera canceló a último minuto y no puedo encontrar un reemplazo"
    ],
    fr: [
      "Je fais une crise d'anxiété et j'ai besoin de temps pour récupérer",
      "Je me suis enfermé dehors et le serrurier ne peut pas venir avant cet après-midi",
      "J'ai renversé du café sur ma seule tenue de travail propre",
      "Ma baby-sitter a annulé à la dernière minute et je ne trouve pas de remplaçant"
    ],
    hi: [
      "मुझे चिंता का दौरा पड़ रहा है और ठीक होने के लिए समय चाहिए",
      "मैं खुद को बाहर बंद कर लिया हूं और ताला बनाने वाला दोपहर तक नहीं आ सकता",
      "मैंने अपने एकमात्र साफ कार्य पोशाक पर कॉफी गिरा दी",
      "मेरी बेबीसिटर ने अंतिम समय में रद्द कर दिया और मुझे कोई विकल्प नहीं मिल रहा"
    ]
  }
};

export function generateExcuse(context: ExcuseContext, language: string = 'en'): Excuse {
  const category = context.situation as ExcuseCategory;
  const templates = excuseTemplates[category]?.[language as keyof typeof excuseTemplates.medical] || 
                   excuseTemplates[category]?.en || 
                   excuseTemplates.personal.en;
  
  const baseExcuse = templates[Math.floor(Math.random() * templates.length)];
  
  const believabilityScore = calculateBelievabilityScore(context);
  const enhancedExcuse = enhanceExcuseForContext(baseExcuse, context, language);
  
  return {
    id: Date.now().toString(),
    title: generateTitle(category, language),
    content: enhancedExcuse,
    category,
    believabilityScore,
    context,
    timestamp: Date.now(),
    language
  };
}

function calculateBelievabilityScore(context: ExcuseContext): number {
  let score = 70; // Base score
  
  // Adjust based on urgency
  switch (context.urgency) {
    case 'critical': score += 20; break;
    case 'high': score += 10; break;
    case 'medium': score += 5; break;
    case 'low': score -= 5; break;
  }
  
  // Adjust based on audience
  switch (context.audience) {
    case 'authority': score += 15; break;
    case 'work': score += 10; break;
    case 'family': score += 5; break;
    case 'friends': score -= 5; break;
    case 'romantic': score -= 10; break;
  }
  
  // Adjust based on relationship
  switch (context.relationship) {
    case 'distant': score += 15; break;
    case 'professional': score += 10; break;
    case 'casual': score += 5; break;
    case 'close': score -= 5; break;
  }
  
  return Math.min(Math.max(score, 20), 95);
}

function enhanceExcuseForContext(excuse: string, context: ExcuseContext, language: string): string {
  let enhanced = excuse;
  
  const t = (key: string) => {
    const lang = language as keyof typeof translations;
    return translations[lang]?.[key as keyof typeof translations.en] || translations.en[key as keyof typeof translations.en] || key;
  };
  
  // Add urgency indicators
  if (context.urgency === 'critical') {
    enhanced = `${t('urgent')}: ${enhanced}. ${t('requiresImmediateAttention')}.`;
  } else if (context.urgency === 'high') {
    enhanced = `${enhanced}. ${t('quiteSerious')}.`;
  }
  
  // Add relationship context
  if (context.relationship === 'professional') {
    enhanced = `${enhanced} ${t('sincerelyApologize')}.`;
  } else if (context.relationship === 'close') {
    enhanced = `${enhanced} ${t('reallySorry')}.`;
  }
  
  return enhanced;
}

function generateTitle(category: ExcuseCategory, language: string): string {
  const titles = {
    medical: {
      en: 'Health Emergency',
      es: 'Emergencia de Salud',
      fr: 'Urgence de Santé',
      hi: 'स्वास्थ्य आपातकाल'
    },
    family: {
      en: 'Family Crisis',
      es: 'Crisis Familiar',
      fr: 'Crise Familiale',
      hi: 'पारिवारिक संकट'
    },
    work: {
      en: 'Work Emergency',
      es: 'Emergencia de Trabajo',
      fr: 'Urgence de Travail',
      hi: 'कार्य आपातकाल'
    },
    transport: {
      en: 'Transportation Issue',
      es: 'Problema de Transporte',
      fr: 'Problème de Transport',
      hi: 'परिवहन समस्या'
    },
    technology: {
      en: 'Technical Problem',
      es: 'Problema Técnico',
      fr: 'Problème Technique',
      hi: 'तकनीकी समस्या'
    },
    weather: {
      en: 'Weather Related',
      es: 'Relacionado con el Clima',
      fr: 'Lié à la Météo',
      hi: 'मौसम संबंधी'
    },
    emergency: {
      en: 'Emergency Situation',
      es: 'Situación de Emergencia',
      fr: 'Situation d\'Urgence',
      hi: 'आपातकालीन स्थिति'
    },
    personal: {
      en: 'Personal Matter',
      es: 'Asunto Personal',
      fr: 'Affaire Personnelle',
      hi: 'व्यक्तिगत मामला'
    }
  };
  
  return titles[category]?.[language as keyof typeof titles.medical] || 
         titles[category]?.en || 
         'Unexpected Situation';
}

export function rankExcuses(excuses: Excuse[]): Excuse[] {
  return excuses.sort((a, b) => {
    // Primary sort by believability score
    if (b.believabilityScore !== a.believabilityScore) {
      return b.believabilityScore - a.believabilityScore;
    }
    
    // Secondary sort by urgency
    const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    const aUrgency = urgencyOrder[a.context.urgency];
    const bUrgency = urgencyOrder[b.context.urgency];
    
    if (bUrgency !== aUrgency) {
      return bUrgency - aUrgency;
    }
    
    // Tertiary sort by timestamp (newest first)
    return b.timestamp - a.timestamp;
  });
}