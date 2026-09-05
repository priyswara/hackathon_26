/**
 * Screen 1: Welcome & Role Portal Hub
 * Professional Split Web Landing & Role Access Portal
 */

import { locales } from '../data/locales.js';

export function renderWelcomeScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;

  return `
    <div class="screen" id="screen-welcome">
      <!-- Desktop Split Layout: Left Hero Statement + Right Role Selection -->
      <div class="split-1-1" style="align-items: start; gap: 28px;">
        
        <!-- Left Column: Branding, Mission Statement & Innovations -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <!-- Hero USP Card -->
          <div class="card card-hero" style="padding: 32px 28px;">
            <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255, 255, 255, 0.15); padding: 5px 12px; border-radius: var(--radius-full); font-size: 11.5px; font-weight: 700; margin-bottom: 14px; width: fit-content;">
              <i data-lucide="award" style="width: 14px; height: 14px; color: var(--color-accent);"></i>
              <span>${t.nationalInitiativeBadge}</span>
            </div>
            
            <h1 class="hero-title" style="font-size: 32px; line-height: 1.2;">
              ${t.appTitle}
            </h1>
            <p style="font-size: 16px; font-weight: 600; color: var(--color-accent); margin-bottom: 10px;">
              ${t.tagline || 'Access healthcare, closer to home.'}
            </p>
            <p class="hero-subtitle" style="font-size: 14px; line-height: 1.6;">
              ${t.welcomeHeroDesc}
            </p>
          </div>

          <!-- Core Innovations Highlight Card -->
          <div class="card" style="background: var(--color-surface); border: 1px solid var(--color-border); padding: 22px;">
            <h3 style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-primary); margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="sparkles" style="width: 18px; height: 18px;"></i>
              ${t.platformInnovationsTitle}
            </h3>
            
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div style="display: flex; gap: 12px;">
                <div style="width: 36px; height: 36px; border-radius: var(--radius-sm); background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <i data-lucide="wifi" style="width: 18px; height: 18px;"></i>
                </div>
                <div>
                  <div style="font-family: var(--font-heading); font-size: 13.5px; font-weight: 700; color: var(--color-text-primary);">${t.innovationsNetworkTitle}</div>
                  <div style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.4; margin-top: 2px;">${t.innovationsNetworkDesc}</div>
                </div>
              </div>

              <div style="display: flex; gap: 12px;">
                <div style="width: 36px; height: 36px; border-radius: var(--radius-sm); background: var(--color-warning-light); color: var(--color-warning); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <i data-lucide="git-commit" style="width: 18px; height: 18px;"></i>
                </div>
                <div>
                  <div style="font-family: var(--font-heading); font-size: 13.5px; font-weight: 700; color: var(--color-text-primary);">${t.innovationsJourneyTitle}</div>
                  <div style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.4; margin-top: 2px;">${t.innovationsJourneyDesc}</div>
                </div>
              </div>

              <div style="display: flex; gap: 12px;">
                <div style="width: 36px; height: 36px; border-radius: var(--radius-sm); background: var(--color-accent-light); color: var(--color-accent-dark); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <i data-lucide="users" style="width: 18px; height: 18px;"></i>
                </div>
                <div>
                  <div style="font-family: var(--font-heading); font-size: 13.5px; font-weight: 700; color: var(--color-text-primary);">${t.innovationsAshaTitle}</div>
                  <div style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.4; margin-top: 2px;">${t.innovationsAshaDesc}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Role Selection Cards -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div class="section-header" style="margin-bottom: 4px;">
            <h2 class="section-title">
              <i data-lucide="shield-check" style="color: var(--color-primary); width: 20px; height: 20px;"></i>
              ${t.selectRole}
            </h2>
            <span class="status-badge badge-primary" style="font-size: 10px;">${t.interactiveDemo || 'Live Demo Portals'}</span>
          </div>

          <!-- Role 1: Patient / Citizen -->
          <div class="card card-clickable flex-between role-select-card" data-set-role="patient" style="border-left: 5px solid var(--color-primary); padding: 18px 20px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <div class="action-icon-circle" style="background: var(--color-primary-light); color: var(--color-primary); width: 48px; height: 48px;">
                <i data-lucide="user" style="width: 24px; height: 24px;"></i>
              </div>
              <div>
                <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-text-primary);">${t.patientRole}</div>
                <div style="font-size: 12.5px; color: var(--color-text-secondary); margin-top: 2px;">${t.patientRoleDesc}</div>
              </div>
            </div>
            <i data-lucide="arrow-right" style="color: var(--color-primary); width: 20px; height: 20px; flex-shrink: 0;"></i>
          </div>

          <!-- Role 2: ASHA Health Worker -->
          <div class="card card-clickable flex-between role-select-card" data-set-role="health_worker" style="border-left: 5px solid #00D2A0; padding: 18px 20px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <div class="action-icon-circle" style="background: #E6FAF5; color: #00A37D; width: 48px; height: 48px;">
                <i data-lucide="users" style="width: 24px; height: 24px;"></i>
              </div>
              <div>
                <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-text-primary);">${t.healthWorkerRole}</div>
                <div style="font-size: 12.5px; color: var(--color-text-secondary); margin-top: 2px;">${t.healthWorkerRoleDesc}</div>
              </div>
            </div>
            <i data-lucide="arrow-right" style="color: #00A37D; width: 20px; height: 20px; flex-shrink: 0;"></i>
          </div>

          <!-- Role 3: Doctor Console -->
          <div class="card card-clickable flex-between role-select-card" data-set-role="doctor" style="border-left: 5px solid #8B5CF6; padding: 18px 20px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <div class="action-icon-circle" style="background: #F4F0FF; color: #7C3AED; width: 48px; height: 48px;">
                <i data-lucide="stethoscope" style="width: 24px; height: 24px;"></i>
              </div>
              <div>
                <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-text-primary);">${t.doctorRole}</div>
                <div style="font-size: 12.5px; color: var(--color-text-secondary); margin-top: 2px;">${t.doctorRoleDesc}</div>
              </div>
            </div>
            <i data-lucide="arrow-right" style="color: #7C3AED; width: 20px; height: 20px; flex-shrink: 0;"></i>
          </div>

          <!-- Role 4: PHC / Facility Admin -->
          <div class="card card-clickable flex-between role-select-card" data-set-role="facility" style="border-left: 5px solid #E88C1F; padding: 18px 20px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <div class="action-icon-circle" style="background: var(--color-warning-light); color: var(--color-warning); width: 48px; height: 48px;">
                <i data-lucide="building" style="width: 24px; height: 24px;"></i>
              </div>
              <div>
                <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-text-primary);">${t.facilityRole}</div>
                <div style="font-size: 12.5px; color: var(--color-text-secondary); margin-top: 2px;">${t.facilityRoleDesc}</div>
              </div>
            </div>
            <i data-lucide="arrow-right" style="color: var(--color-warning); width: 20px; height: 20px; flex-shrink: 0;"></i>
          </div>
        </div>

      </div>

      <!-- Compliance Disclaimer -->
      <div class="compliance-disclaimer" style="margin-top: 10px;">
        ${t.prototypeDisclaimer}
      </div>
    </div>
  `;
}
