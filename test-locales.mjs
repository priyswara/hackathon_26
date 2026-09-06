import { locales } from './src/data/locales.js';
import { initialMockDB, appStore } from './src/data/mockData.js';
import { renderAppShell } from './src/components/AppShell.js';
import { renderLanguageModal } from './src/components/LanguageModal.js';

import { renderWelcomeScreen } from './src/screens/WelcomeScreen.js';
import { renderOTPVerificationScreen } from './src/screens/OTPVerificationScreen.js';
import { renderPatientHomeScreen } from './src/screens/PatientHomeScreen.js';
import { renderAppointmentWizardScreen } from './src/screens/AppointmentWizardScreen.js';
import { renderAppointmentsScreen } from './src/screens/AppointmentsScreen.js';
import { renderNearbyClinicsScreen } from './src/screens/NearbyClinicsScreen.js';
import { renderHealthJourneyScreen } from './src/screens/HealthJourneyScreen.js';
import { renderHowToUseScreen } from './src/screens/HowToUseScreen.js';
import { renderHealthWorkerScreen } from './src/screens/HealthWorkerScreen.js';
import { renderDoctorScreen } from './src/screens/DoctorScreen.js';
import { renderFacilityScreen } from './src/screens/FacilityScreen.js';
import { renderProfileScreen } from './src/screens/ProfileScreen.js';

const langs = ['en', 'hi', 'ta', 'te', 'ml'];
const enKeys = Object.keys(locales.en);

let errors = 0;

console.log('=== 1. CHECKING DICTIONARY COMPLETENESS ===');
langs.forEach(lang => {
  if (!locales[lang]) {
    console.error(`Missing language dictionary for ${lang}`);
    errors++;
    return;
  }
  const keys = Object.keys(locales[lang]);
  const missingKeys = enKeys.filter(k => !locales[lang][k]);
  if (missingKeys.length > 0) {
    console.error(`[${lang}] Missing ${missingKeys.length} keys:`, missingKeys);
    errors++;
  } else {
    console.log(`✓ [${lang}] All ${keys.length} keys present and translated.`);
  }
});

console.log('\n=== 2. CHECKING SCREEN RENDERING FOR ALL 5 LANGUAGES ===');
const screens = [
  { name: 'WelcomeScreen', fn: (state) => renderWelcomeScreen(state) },
  { name: 'OTPVerificationScreen (Mobile Step)', fn: (state) => renderOTPVerificationScreen(state, 'identifier') },
  { name: 'OTPVerificationScreen (OTP Step)', fn: (state) => renderOTPVerificationScreen(state, 'otp', '123456') },
  { name: 'OTPVerificationScreen (Error State)', fn: (state) => renderOTPVerificationScreen(state, 'otp', '000000', 'Incorrect OTP') },
  { name: 'PatientHomeScreen', fn: (state) => renderPatientHomeScreen(state) },
  { name: 'AppointmentWizardScreen (Step 1)', fn: (state) => renderAppointmentWizardScreen(state, { step: 1 }) },
  { name: 'AppointmentWizardScreen (Step 2)', fn: (state) => renderAppointmentWizardScreen(state, { step: 2 }) },
  { name: 'AppointmentWizardScreen (Step 3)', fn: (state) => renderAppointmentWizardScreen(state, { step: 3 }) },
  { name: 'AppointmentWizardScreen (Step 4)', fn: (state) => renderAppointmentWizardScreen(state, { step: 4 }) },
  { name: 'AppointmentWizardScreen (Step 5)', fn: (state) => renderAppointmentWizardScreen(state, { step: 5 }) },
  { name: 'AppointmentWizardScreen (Step 6)', fn: (state) => renderAppointmentWizardScreen(state, { step: 6 }) },
  { name: 'AppointmentWizardScreen (Step 7)', fn: (state) => renderAppointmentWizardScreen(state, { step: 7, confirmedToken: 'B-15' }) },
  { name: 'AppointmentsScreen (Upcoming)', fn: (state) => renderAppointmentsScreen(state, 'upcoming') },
  { name: 'AppointmentsScreen (Past)', fn: (state) => renderAppointmentsScreen(state, 'past') },
  { name: 'NearbyClinicsScreen', fn: (state) => renderNearbyClinicsScreen(state, 'all') },
  { name: 'HealthJourneyScreen', fn: (state) => renderHealthJourneyScreen(state) },
  { name: 'HowToUseScreen', fn: (state) => renderHowToUseScreen(state) },
  { name: 'HealthWorkerScreen', fn: (state) => renderHealthWorkerScreen(state) },
  { name: 'DoctorScreen', fn: (state) => renderDoctorScreen(state) },
  { name: 'FacilityScreen', fn: (state) => renderFacilityScreen(state) },
  { name: 'ProfileScreen', fn: (state) => renderProfileScreen(state) }
];

langs.forEach(lang => {
  appStore.setLanguage(lang);
  const state = appStore.getState();

  // Test AppShell for each role
  ['patient', 'health_worker', 'doctor', 'facility'].forEach(role => {
    state.currentRole = role;
    const shellHtml = renderAppShell(null, state, 'patient_home');
    if (shellHtml.includes('undefined')) {
      console.error(`[${lang}] AppShell for role ${role} contains "undefined"!`);
      errors++;
    }
  });

  // Test Modal
  const modalHtml = renderLanguageModal(lang);
  if (modalHtml.includes('undefined')) {
    console.error(`[${lang}] LanguageModal contains "undefined"!`);
    errors++;
  }

  // Test Screens
  screens.forEach(({ name, fn }) => {
    const html = fn(state);
    if (html.includes('undefined')) {
      console.error(`[${lang}] ${name} contains "undefined"!`);
      errors++;
    }
    if (/smart india hackathon|sih 2024|graminarogya/i.test(html)) {
      console.error(`[${lang}] ${name} contains legacy references!`);
      errors++;
    }
  });
});

console.log(`\n=== TEST SUMMARY: ${errors === 0 ? 'ALL PASSED (0 ERRORS)' : errors + ' ERRORS FOUND'} ===`);
process.exit(errors === 0 ? 0 : 1);
