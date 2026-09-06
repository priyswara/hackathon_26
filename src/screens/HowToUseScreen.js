/**
 * Screen: HEALER User Manual ("How to Use")
 * Permanent beginner-friendly guide with 7 easy-to-follow steps.
 */

import { locales } from '../data/locales.js';

export function renderHowToUseScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;

  const manualSteps = [
    {
      num: 1,
      title: t.manualStep1Title || 'STEP 1 — Get Started',
      desc: t.manualStep1Desc || 'Choose how you want to use HEALER based on your role (Patient, Health Worker, Doctor, or Facility).',
      icon: 'grid'
    },
    {
      num: 2,
      title: t.manualStep2Title || 'STEP 2 — Sign In',
      desc: t.manualStep2Desc || 'Enter your phone number or email and use the demo verification code 123456.',
      icon: 'key'
    },
    {
      num: 3,
      title: t.manualStep3Title || 'STEP 3 — Find Healthcare',
      desc: t.manualStep3Desc || 'Open Nearby Care to view all health facilities around your location with distance and opening hours.',
      icon: 'map-pin'
    },
    {
      num: 4,
      title: t.manualStep4Title || 'STEP 4 — Book an Appointment',
      desc: t.manualStep4Desc || 'Follow the 6 simple steps to choose a facility, service, doctor, date and time slot.',
      icon: 'calendar-plus'
    },
    {
      num: 5,
      title: t.manualStep5Title || 'STEP 5 — Check Your Appointment',
      desc: t.manualStep5Desc || 'Open Appointments at any time to view your booking details and active digital token.',
      icon: 'calendar'
    },
    {
      num: 6,
      title: t.manualStep6Title || 'STEP 6 — Track Your Health',
      desc: t.manualStep6Desc || 'Use Health Journey to view your medical timeline, consultations, and follow-up activities.',
      icon: 'git-commit'
    },
    {
      num: 7,
      title: t.manualStep7Title || 'STEP 7 — Change Language',
      desc: t.manualStep7Desc || 'Use the language selector in the top header to switch between English, Hindi, Tamil, Telugu and Malayalam.',
      icon: 'globe'
    }
  ];

  return `
    <div class="screen" id="screen-how-to-use" style="max-width: 780px; margin: 0 auto; width: 100%;">
      
      <!-- Top Header -->
      <div style="margin-bottom: 22px;">
        <h1 style="font-size: 22px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 6px;">
          ${t.manualTitle || 'How to Use HEALER'}
        </h1>
        <p style="font-size: 14.5px; color: var(--color-text-secondary); line-height: 1.5;">
          ${t.manualIntro || 'HEALER helps you find healthcare, book appointments and keep track of your healthcare journey.'}
        </p>
      </div>

      <!-- 7 Steps List -->
      <div class="manual-steps-list">
        ${manualSteps.map(step => `
          <div class="manual-step-row">
            <div class="manual-step-badge">
              ${step.num}
            </div>
            <div class="manual-step-content" style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <i data-lucide="${step.icon}" style="width: 16px; height: 16px; color: var(--color-primary);"></i>
                <h3>${step.title}</h3>
              </div>
              <p>${step.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}
