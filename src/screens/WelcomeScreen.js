/**
 * Screen 1: GraminArogya Landing & Portal Selection (Palette 3)
 * Professional, clean web landing page introducing the platform and 4 role categories.
 * Fully localized across English, Hindi, Tamil, Telugu, and Malayalam.
 */

import { locales } from '../data/locales.js';

export function renderWelcomeScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;

  return `
    <div class="screen" id="screen-welcome" style="max-width: 1100px; margin: 0 auto; width: 100%;">
      
      <!-- Top Hero Section (Forest Green Gradient) -->
      <div class="card card-hero" style="padding: 34px 28px; margin-bottom: 28px; text-align: center;">
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.16); padding: 5px 14px; border-radius: var(--radius-full); font-size: 11.5px; font-weight: 700; margin-bottom: 14px;">
          <i data-lucide="plus-circle" style="width: 14px; height: 14px; color: var(--color-secondary);"></i>
          <span>${t.appTitle} — Rural Health Link</span>
        </div>
        
        <h1 style="font-size: clamp(22px, 4vw, 32px); line-height: 1.25; margin-bottom: 12px; max-width: 820px; margin-left: auto; margin-right: auto; color: #FFFFFF;">
          ${t.landingTagline || 'Healthcare access, closer to home.'}
        </h1>
        
        <p style="font-size: 14px; line-height: 1.6; max-width: 700px; margin-left: auto; margin-right: auto; color: rgba(255, 255, 255, 0.92);">
          ${t.landingHeroSub || 'Bridging gaps in rural healthcare access through network-aware tele-OPD, intelligent triage, and integrated care journeys.'}
        </p>
      </div>

      <!-- Portal Selection Section -->
      <div style="margin-bottom: 24px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 6px; display: inline-flex; align-items: center; gap: 8px;">
            <i data-lucide="grid" style="color: var(--color-primary); width: 20px; height: 20px;"></i>
            ${t.choosePortalTitle || 'Choose your portal'}
          </h2>
          <p style="font-size: 13.5px; color: var(--color-text-secondary); max-width: 520px; margin: 0 auto;">
            ${t.choosePortalSub || 'Select your role category to access customized clinical tools and services.'}
          </p>
        </div>

        <!-- 4 Responsive Portal Cards Grid -->
        <div class="portal-selection-grid">
          
          <!-- Card 1: Patient Portal -->
          <div class="card card-clickable portal-card" data-portal="patient" style="border-top: 4px solid var(--color-primary);">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
                <div style="width: 44px; height: 44px; border-radius: var(--radius-sm); background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center;">
                  <i data-lucide="user" style="width: 22px; height: 22px;"></i>
                </div>
                <span class="status-badge badge-primary">
                  ${t.roleCitizen || 'Citizen'}
                </span>
              </div>

              <h3 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 6px;">
                ${t.portalPatientTitle || 'Patient Portal'}
              </h3>
              <p style="font-size: 13px; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 16px;">
                ${t.portalPatientDesc || 'Access appointments, triage, teleconsultation, medicine stock, and care journey.'}
              </p>
            </div>

            <button class="btn btn-primary btn-full btn-enter-portal" data-portal="patient">
              <span>${t.enterPortalBtn || 'Enter Portal'}</span>
              <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
            </button>
          </div>

          <!-- Card 2: Health Worker Portal -->
          <div class="card card-clickable portal-card" data-portal="health_worker" style="border-top: 4px solid #286B4F;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
                <div style="width: 44px; height: 44px; border-radius: var(--radius-sm); background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center;">
                  <i data-lucide="users" style="width: 22px; height: 22px;"></i>
                </div>
                <span class="status-badge badge-success">
                  ${t.roleAsha || 'ASHA Worker'}
                </span>
              </div>

              <h3 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 6px;">
                ${t.portalHealthWorkerTitle || 'Health Worker Portal'}
              </h3>
              <p style="font-size: 13px; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 16px;">
                ${t.portalHealthWorkerDesc || 'Manage village roster, high-risk maternal alerts, offline logs, and home visits.'}
              </p>
            </div>

            <button class="btn btn-primary btn-full btn-enter-portal" data-portal="health_worker">
              <span>${t.enterPortalBtn || 'Enter Portal'}</span>
              <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
            </button>
          </div>

          <!-- Card 3: Doctor Portal -->
          <div class="card card-clickable portal-card" data-portal="doctor" style="border-top: 4px solid var(--color-primary-dark);">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
                <div style="width: 44px; height: 44px; border-radius: var(--radius-sm); background: var(--color-primary-light); color: var(--color-primary-dark); display: flex; align-items: center; justify-content: center;">
                  <i data-lucide="stethoscope" style="width: 22px; height: 22px;"></i>
                </div>
                <span class="status-badge badge-primary">
                  ${t.roleDocConsole || 'Dr. Console'}
                </span>
              </div>

              <h3 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 6px;">
                ${t.portalDoctorTitle || 'Doctor Portal'}
              </h3>
              <p style="font-size: 13px; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 16px;">
                ${t.portalDoctorDesc || 'View priority OPD queue, conduct video/audio consults, and write e-Prescriptions.'}
              </p>
            </div>

            <button class="btn btn-primary btn-full btn-enter-portal" data-portal="doctor">
              <span>${t.enterPortalBtn || 'Enter Portal'}</span>
              <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
            </button>
          </div>

          <!-- Card 4: Facility Portal -->
          <div class="card card-clickable portal-card" data-portal="facility" style="border-top: 4px solid var(--color-accent);">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
                <div style="width: 44px; height: 44px; border-radius: var(--radius-sm); background: var(--color-accent-light); color: var(--color-accent); display: flex; align-items: center; justify-content: center;">
                  <i data-lucide="building" style="width: 22px; height: 22px;"></i>
                </div>
                <span class="status-badge badge-accent">
                  ${t.rolePhcAdmin || 'PHC Admin'}
                </span>
              </div>

              <h3 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 6px;">
                ${t.portalFacilityTitle || 'Facility Portal'}
              </h3>
              <p style="font-size: 13px; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 16px;">
                ${t.portalFacilityDesc || 'Monitor live beds, critical medicine stock, footfall trends, and referral logs.'}
              </p>
            </div>

            <button class="btn btn-accent btn-full btn-enter-portal" data-portal="facility">
              <span>${t.enterPortalBtn || 'Enter Portal'}</span>
              <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
            </button>
          </div>

        </div>
      </div>

      <!-- Prototype Disclaimer -->
      <div style="margin-top: 20px; text-align: center; font-size: 11.5px; color: var(--color-text-muted);">
        ${t.prototypeNotice || 'National Rural Health Mission Concept • Prototype Healthcare Access System'}
      </div>
    </div>
  `;
}
