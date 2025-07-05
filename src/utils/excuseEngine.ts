import { Excuse, ExcuseContext, ExcuseCategory } from '../types';

const excuseTemplates = {
  medical: [
    "I woke up with severe food poisoning from last night's dinner",
    "My doctor scheduled an emergency appointment for concerning symptoms",
    "I'm experiencing a migraine that's making it impossible to function",
    "I had an allergic reaction and need to stay home for observation"
  ],
  family: [
    "My elderly relative had a fall and I need to rush to the hospital",
    "There's a family emergency that requires my immediate attention",
    "My child's school called about an incident requiring parent pickup",
    "A close family member is having a mental health crisis"
  ],
  work: [
    "My laptop crashed and I lost all my work - IT is investigating",
    "There's been a data breach affecting our department's systems",
    "I'm dealing with a critical client emergency that can't wait",
    "The presentation files got corrupted and need to be rebuilt"
  ],
  transport: [
    "My car broke down on the highway and I'm waiting for a tow",
    "There's been a major accident blocking all routes to the office",
    "The train service has been suspended due to signal failures",
    "My Uber driver got into an accident and I'm stranded"
  ],
  technology: [
    "My internet provider had a massive outage in my area",
    "My phone fell in water and I can't access important work files",
    "There's been a power outage affecting my entire neighborhood",
    "My home security system malfunctioned and I need to wait for repairs"
  ],
  weather: [
    "Severe flooding has made the roads to my house impassable",
    "A tree fell on my car during the storm last night",
    "The extreme weather conditions make travel dangerous",
    "My heating system failed during the cold snap and pipes might freeze"
  ],
  emergency: [
    "I witnessed an accident and need to stay to give a police statement",
    "There's been a gas leak in my building and we're evacuating",
    "I found an injured animal and am rushing it to the vet",
    "My neighbor's house alarm won't stop and I'm helping them resolve it"
  ],
  personal: [
    "I'm having an anxiety attack and need some time to recover",
    "I locked myself out and the locksmith can't come until this afternoon",
    "I spilled coffee all over my only clean work outfit",
    "My babysitter canceled at the last minute and I can't find a replacement"
  ]
};

export function generateExcuse(context: ExcuseContext): Excuse {
  const templates = excuseTemplates[context.situation as ExcuseCategory] || excuseTemplates.personal;
  const baseExcuse = templates[Math.floor(Math.random() * templates.length)];
  
  const believabilityScore = calculateBelievabilityScore(context);
  const enhancedExcuse = enhanceExcuseForContext(baseExcuse, context);
  
  return {
    id: Date.now().toString(),
    title: generateTitle(context.situation as ExcuseCategory),
    content: enhancedExcuse,
    category: context.situation as ExcuseCategory,
    believabilityScore,
    context,
    timestamp: Date.now(),
    language: 'en'
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

function enhanceExcuseForContext(excuse: string, context: ExcuseContext): string {
  let enhanced = excuse;
  
  // Add urgency indicators
  if (context.urgency === 'critical') {
    enhanced = `URGENT: ${enhanced}. This requires immediate attention.`;
  } else if (context.urgency === 'high') {
    enhanced = `${enhanced}. This is quite serious and can't be delayed.`;
  }
  
  // Add relationship context
  if (context.relationship === 'professional') {
    enhanced = `${enhanced} I sincerely apologize for any inconvenience this may cause.`;
  } else if (context.relationship === 'close') {
    enhanced = `${enhanced} I'm really sorry about this, I know it's not ideal timing.`;
  }
  
  return enhanced;
}

function generateTitle(category: ExcuseCategory): string {
  const titles = {
    medical: 'Health Emergency',
    family: 'Family Crisis',
    work: 'Work Emergency',
    transport: 'Transportation Issue',
    technology: 'Technical Problem',
    weather: 'Weather Related',
    emergency: 'Emergency Situation',
    personal: 'Personal Matter'
  };
  
  return titles[category] || 'Unexpected Situation';
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