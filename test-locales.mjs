import { locales } from './src/data/locales.js';
import { initialMockDB, MockStore } from './src/data/mockData.js';
import { renderAppShell } from './src/components/AppShell.js';
import { renderLanguageModal } from './src/components/LanguageModal.js';
import { renderFootfallChart, renderReferralDonut } from './src/components/Charts.js';

import { renderWelcomeScreen } from './src/screens/WelcomeScreen.js';
import { renderOTPVerificationScreen } from './src/screens/OTPVerificationScreen.js';
import { renderPatientHomeScreen } from './src/screens/PatientHomeScreen.js';
import { renderAppointmentQueueScreen } from './src/screens/AppointmentQueueScreen.js';
import { renderTriageScreen } from './src/screens/TriageScreen.js';
import { renderNetworkConsultationScreen } from './src/screens/NetworkConsultationScreen.js';
import { renderConsultationChatScreen } from './src/screens/ConsultationChatScreen.js';
import { renderHealthJourneyScreen } from './src/screens/HealthJourneyScreen.js';
import { renderMedicinesDiagnosticsScreen } from './src/screens/MedicinesDiagnosticsScreen.js';
import { renderFollowUpsScreen } from './src/screens/FollowUpsScreen.js';
import { renderHealthWorkerScreen } from './src/screens/HealthWorkerScreen.js';
import { renderDoctorScreen } from './src/screens/DoctorScreen.js';
import { renderFacilityScreen } from './src/screens/FacilityScreen.js';
import { renderSchemesScreen } from './src/screens/SchemesScreen.js';
import { renderEmergencyScreen } from './src/screens/EmergencyScreen.js';

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
  { name: 'WelcomeScreen', fn: renderWelcomeScreen },
  { name: 'OTPVerificationScreen (Mobile Step)', fn: (state) => renderOTPVerificationScreen(state, 'mobile') },
  { name: 'OTPVerificationScreen (OTP Step)', fn: (state) => renderOTPVerificationScreen(state, 'otp', '123456') },
  { name: 'OTPVerificationScreen (Error State)', fn: (state) => renderOTPVerificationScreen(state, 'otp', '000000', 'Incorrect OTP') },
  { name: 'PatientHomeScreen', fn: renderPatientHomeScreen },
  { name: 'AppointmentQueueScreen', fn: renderAppointmentQueueScreen },
  { name: 'TriageScreen', fn: renderTriageScreen },
  { name: 'NetworkConsultationScreen', fn: (state) => renderNetworkConsultationScreen({ ...state, networkMode: 'good' }) },
  { name: 'NetworkConsultationScreen (Moderate)', fn: (state) => renderNetworkConsultationScreen({ ...state, networkMode: 'moderate' }) },
  { name: 'NetworkConsultationScreen (Low)', fn: (state) => renderNetworkConsultationScreen({ ...state, networkMode: 'low' }) },
  { name: 'ConsultationChatScreen', fn: renderConsultationChatScreen },
  { name: 'HealthJourneyScreen', fn: renderHealthJourneyScreen },
  { name: 'MedicinesDiagnosticsScreen (Meds)', fn: (state) => renderMedicinesDiagnosticsScreen(state, 'medicines') },
  { name: 'MedicinesDiagnosticsScreen (Diag)', fn: (state) => renderMedicinesDiagnosticsScreen(state, 'diagnostics') },
  { name: 'FollowUpsScreen', fn: renderFollowUpsScreen },
  { name: 'HealthWorkerScreen', fn: renderHealthWorkerScreen },
  { name: 'DoctorScreen', fn: renderDoctorScreen },
  { name: 'FacilityScreen', fn: renderFacilityScreen },
  { name: 'SchemesScreen', fn: renderSchemesScreen },
  { name: 'EmergencyScreen', fn: renderEmergencyScreen }
];

langs.forEach(lang => {
  const store = new MockStore();
  store.setLanguage(lang);
  const state = store.getState();

  // Test AppShell for each role
  ['patient', 'health_worker', 'doctor', 'facility'].forEach(role => {
    state.currentRole = role;
    const shellHtml = renderAppShell(null, state);
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
    if (/smart india hackathon|sih 2024/i.test(html)) {
      console.error(`[${lang}] ${name} contains Hackathon reference!`);
      errors++;
    }
  });
});

console.log(`\n=== TEST SUMMARY: ${errors === 0 ? 'ALL PASSED (0 ERRORS)' : errors + ' ERRORS FOUND'} ===`);
process.exit(errors === 0 ? 0 : 1);
