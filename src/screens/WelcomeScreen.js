/**
 * Screen: HEALER Landing & Portal Selection
 * Clean, calm, trustworthy healthcare landing page.
 * Features:
 * - Clear brand identity: HEALER
 * - Tagline: "Healthcare made easier."
 * - Short supporting text
 * - Primary [Get Started] & Secondary [How it works]
 * - 4-step "How HEALER Works" section
 * - 4 Accessible Portals: Patient, Health Worker, Doctor, Facility
 */

import { locales } from '../data/locales.js';

export function renderWelcomeScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;

  return `
    <div class="screen" id="screen-welcome" style="max-width: 1060px; margin: 0 auto; width: 100%;">
      
      <!-- Clean Hero Section -->
      <section class="hero-clean-section">
        <h1 class="hero-app-title">${t.appTitle}</h1>
        <div class="hero-tagline">${t.tagline}</div>
        <p class="hero-supporting">${t.landingSupporting}</p>
        
        <div class="hero-buttons-row">
          <button class="btn btn-primary btn-lg" id="btn-hero-get-started">
            <span>${t.getStarted}</span>
            <i data-lucide="arrow-right" style="width: 18px; height: 18px;"></i>
          </button>
          
          <button class="btn btn-outline btn-lg" id="btn-hero-how-it-works">
            <i data-lucide="info" style="width: 18px; height: 18px; color: var(--color-primary);"></i>
            <span>${t.howItWorks}</span>
          </button>
        </div>
      </section>

      <!-- How HEALER Works Section -->
      <section id="section-how-it-works" style="margin-bottom: 48px; padding-top: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="font-size: 22px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 6px;">
            ${t.howItWorksTitle}
          </h2>
          <p style="font-size: 14px; color: var(--color-text-secondary);">
            ${t.howItWorksSub}
          </p>
        </div>

        <div class="how-it-works-grid">
          <!-- Step 1 -->
          <div class="how-step-card">
            <div class="how-step-icon">
              <i data-lucide="map-pin"></i>
            </div>
            <h3 class="how-step-title">${t.howStep1Title}</h3>
            <p class="how-step-desc">${t.howStep1Desc}</p>
          </div>

          <!-- Step 2 -->
          <div class="how-step-card">
            <div class="how-step-icon">
              <i data-lucide="stethoscope"></i>
            </div>
            <h3 class="how-step-title">${t.howStep2Title}</h3>
            <p class="how-step-desc">${t.howStep2Desc}</p>
          </div>

          <!-- Step 3 -->
          <div class="how-step-card">
            <div class="how-step-icon">
              <i data-lucide="calendar"></i>
            </div>
            <h3 class="how-step-title">${t.howStep3Title}</h3>
            <p class="how-step-desc">${t.howStep3Desc}</p>
          </div>

          <!-- Step 4 -->
          <div class="how-step-card">
            <div class="how-step-icon">
              <i data-lucide="git-commit"></i>
            </div>
            <h3 class="how-step-title">${t.howStep4Title}</h3>
            <p class="how-step-desc">${t.howStep4Desc}</p>
          </div>
        </div>
      </section>

      <!-- Portal Selection Section -->
      <section id="section-portal-selection" style="margin-bottom: 40px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="font-size: 22px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 6px;">
            ${t.choosePortalTitle}
          </h2>
          <p style="font-size: 14px; color: var(--color-text-secondary);">
            ${t.choosePortalSub}
          </p>
        </div>

        <div class="portal-grid-clean">
          <!-- 1. Patient Portal -->
          <div class="portal-card-clean" data-portal="patient" id="portal-card-patient">
            <div>
              <div class="portal-card-top" style="margin-bottom: 12px;">
                <div class="portal-card-icon">
                  <i data-lucide="user"></i>
                </div>
                <div>
                  <h3 class="portal-card-title">${t.portalPatientTitle}</h3>
                </div>
              </div>
              <p class="portal-card-desc">${t.portalPatientDesc}</p>
            </div>

            <button class="btn btn-primary btn-full btn-enter-portal" data-portal="patient">
              <span>${t.enterPortal}</span>
              <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
            </button>
          </div>

          <!-- 2. Health Worker Portal -->
          <div class="portal-card-clean" data-portal="health_worker" id="portal-card-health-worker">
            <div>
              <div class="portal-card-top" style="margin-bottom: 12px;">
                <div class="portal-card-icon">
                  <i data-lucide="users"></i>
                </div>
                <div>
                  <h3 class="portal-card-title">${t.portalHealthWorkerTitle}</h3>
                </div>
              </div>
              <p class="portal-card-desc">${t.portalHealthWorkerDesc}</p>
            </div>

            <button class="btn btn-primary btn-full btn-enter-portal" data-portal="health_worker">
              <span>${t.enterPortal}</span>
              <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
            </button>
          </div>

          <!-- 3. Doctor Portal -->
          <div class="portal-card-clean" data-portal="doctor" id="portal-card-doctor">
            <div>
              <div class="portal-card-top" style="margin-bottom: 12px;">
                <div class="portal-card-icon">
                  <i data-lucide="stethoscope"></i>
                </div>
                <div>
                  <h3 class="portal-card-title">${t.portalDoctorTitle}</h3>
                </div>
              </div>
              <p class="portal-card-desc">${t.portalDoctorDesc}</p>
            </div>

            <button class="btn btn-primary btn-full btn-enter-portal" data-portal="doctor">
              <span>${t.enterPortal}</span>
              <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
            </button>
          </div>

          <!-- 4. Facility Portal -->
          <div class="portal-card-clean" data-portal="facility" id="portal-card-facility">
            <div>
              <div class="portal-card-top" style="margin-bottom: 12px;">
                <div class="portal-card-icon">
                  <i data-lucide="building"></i>
                </div>
                <div>
                  <h3 class="portal-card-title">${t.portalFacilityTitle}</h3>
                </div>
              </div>
              <p class="portal-card-desc">${t.portalFacilityDesc}</p>
            </div>

            <button class="btn btn-primary btn-full btn-enter-portal" data-portal="facility">
              <span>${t.enterPortal}</span>
              <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
            </button>
          </div>
        </div>
      </section>

    </div>
  `;
}
