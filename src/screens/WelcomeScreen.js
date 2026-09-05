/**
 * Screen 1: GraminArogya Landing & Portal Selection
 * Professional, clean web landing page introducing the platform and 4 role categories.
 * Fully localized across English, Hindi, Tamil, Telugu, and Malayalam.
 */

import { locales } from '../data/locales.js';

export function renderWelcomeScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;

  return `
    <div class="screen" id="screen-welcome" style="max-width: 1080px; margin: 0 auto; padding: 10px 0;">
      
      <!-- Top Hero Section -->
      <div class="card card-hero" style="padding: 36px 32px; margin-bottom: 32px; text-align: center;">
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.18); padding: 6px 14px; border-radius: var(--radius-full); font-size: 12px; font-weight: 700; margin-bottom: 16px;">
          <i data-lucide="cross" style="width: 15px; height: 15px; color: var(--color-accent);"></i>
          <span>${t.appTitle} — ${t.tagline}</span>
        </div>
        
        <h1 class="hero-title" style="font-size: 34px; line-height: 1.25; margin-bottom: 12px; max-width: 820px; margin-left: auto; margin-right: auto;">
          ${t.landingTagline}
        </h1>
        
        <p class="hero-subtitle" style="font-size: 15px; line-height: 1.6; max-width: 720px; margin-left: auto; margin-right: auto; opacity: 0.95;">
          ${t.landingHeroSub}
        </p>
      </div>

      <!-- Portal Selection Section -->
      <div style="margin-bottom: 24px;">
        <div style="text-align: center; margin-bottom: 28px;">
          <h2 style="font-family: var(--font-heading); font-size: 24px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 6px; display: inline-flex; align-items: center; gap: 10px;">
            <i data-lucide="grid" style="color: var(--color-primary); width: 22px; height: 22px;"></i>
            ${t.choosePortalTitle}
          </h2>
          <p style="font-size: 14px; color: var(--color-text-secondary); max-width: 540px; margin: 0 auto;">
            ${t.choosePortalSub}
          </p>
        </div>

        <!-- 2x2 Responsive Portal Cards Grid (Desktop 2x2, Mobile Stacked) -->
        <div class="portal-selection-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
          
          <!-- Card 1: Patient Portal -->
          <div class="card card-clickable portal-card" data-portal="patient" style="padding: 24px; border-top: 5px solid var(--color-primary); display: flex; flex-direction: column; justify-content: space-between; transition: all 0.25s ease;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                <div style="width: 48px; height: 48px; border-radius: var(--radius-sm); background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center;">
                  <i data-lucide="user" style="width: 24px; height: 24px;"></i>
                </div>
                <span class="status-badge badge-primary" style="font-size: 11px; font-weight: 700;">
                  ${t.roleCitizen}
                </span>
              </div>

              <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 8px;">
                ${t.portalPatientTitle}
              </h3>
              <p style="font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 20px;">
                ${t.portalPatientDesc}
              </p>
            </div>

            <button class="btn btn-primary btn-full btn-enter-portal" data-portal="patient" style="padding: 11px 16px; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span>${t.enterPortalBtn}</span>
              <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </button>
          </div>

          <!-- Card 2: Health Worker Portal -->
          <div class="card card-clickable portal-card" data-portal="health_worker" style="padding: 24px; border-top: 5px solid #00D2A0; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.25s ease;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                <div style="width: 48px; height: 48px; border-radius: var(--radius-sm); background: #E6FAF5; color: #00A37D; display: flex; align-items: center; justify-content: center;">
                  <i data-lucide="users" style="width: 24px; height: 24px;"></i>
                </div>
                <span class="status-badge badge-success" style="font-size: 11px; font-weight: 700;">
                  ${t.roleAsha}
                </span>
              </div>

              <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 8px;">
                ${t.portalHealthWorkerTitle}
              </h3>
              <p style="font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 20px;">
                ${t.portalHealthWorkerDesc}
              </p>
            </div>

            <button class="btn btn-full btn-enter-portal" data-portal="health_worker" style="background: #00A37D; color: #FFFFFF; padding: 11px 16px; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span>${t.enterPortalBtn}</span>
              <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </button>
          </div>

          <!-- Card 3: Doctor Portal -->
          <div class="card card-clickable portal-card" data-portal="doctor" style="padding: 24px; border-top: 5px solid #8B5CF6; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.25s ease;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                <div style="width: 48px; height: 48px; border-radius: var(--radius-sm); background: #F4F0FF; color: #7C3AED; display: flex; align-items: center; justify-content: center;">
                  <i data-lucide="stethoscope" style="width: 24px; height: 24px;"></i>
                </div>
                <span class="status-badge" style="background: #F4F0FF; color: #7C3AED; font-size: 11px; font-weight: 700;">
                  ${t.roleDocConsole}
                </span>
              </div>

              <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 8px;">
                ${t.portalDoctorTitle}
              </h3>
              <p style="font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 20px;">
                ${t.portalDoctorDesc}
              </p>
            </div>

            <button class="btn btn-full btn-enter-portal" data-portal="doctor" style="background: #7C3AED; color: #FFFFFF; padding: 11px 16px; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span>${t.enterPortalBtn}</span>
              <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </button>
          </div>

          <!-- Card 4: Facility Portal -->
          <div class="card card-clickable portal-card" data-portal="facility" style="padding: 24px; border-top: 5px solid var(--color-warning); display: flex; flex-direction: column; justify-content: space-between; transition: all 0.25s ease;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                <div style="width: 48px; height: 48px; border-radius: var(--radius-sm); background: var(--color-warning-light); color: var(--color-warning); display: flex; align-items: center; justify-content: center;">
                  <i data-lucide="building" style="width: 24px; height: 24px;"></i>
                </div>
                <span class="status-badge badge-warning" style="font-size: 11px; font-weight: 700;">
                  ${t.rolePhcAdmin}
                </span>
              </div>

              <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 8px;">
                ${t.portalFacilityTitle}
              </h3>
              <p style="font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 20px;">
                ${t.portalFacilityDesc}
              </p>
            </div>

            <button class="btn btn-warning btn-full btn-enter-portal" data-portal="facility" style="padding: 11px 16px; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span>${t.enterPortalBtn}</span>
              <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </button>
          </div>

        </div>
      </div>

      <!-- Prototype Disclaimer -->
      <div class="compliance-disclaimer" style="margin-top: 24px; text-align: center;">
        ${t.prototypeNotice}
      </div>
    </div>
  `;
}
