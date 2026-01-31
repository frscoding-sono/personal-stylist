// src/constants.js
export const APP_STEPS = {
  SPLASH: 'splash',
  HOME: 'home',
  PROFILE: 'profile',
  SCAN: 'scan',
  SCAN_COMPLETE: 'scanComplete',
  SOLUTION: 'solution',
  CONFIRMATION: 'confirmation',
  WEEKLY: 'weekly',
  CALENDAR: 'calendar',
  CHECKOUT: 'checkout',
};

export const STEP_ORDER = [
  'splash',
  'home',
  'profile',
  'scan',
  'scanComplete',
  'solution',
  'confirmation',
  'weekly',
  'calendar',
  'checkout',
];

export const CATEGORIES = {
  HAIR: 'HAIR',
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
  SHOES: 'SHOES',
};

export const NAVIGATION_CONFIG = {
  hideBottomNav: ['splash', 'scan', 'scanComplete', 'checkout'],
  mainNavItems: ['home', 'profile', 'solution', 'weekly'],
};
