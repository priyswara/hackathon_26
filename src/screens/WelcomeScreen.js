/**
 * Screen 1: Welcome & Role Hub
 */

import { locales } from '../data/locales.js';

export function renderWelcomeScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;

  return `
    <div class="screen" id="screen-welcome">
      <!-- USP Header Card -->
      <div class="card card-hero">
        <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255, 255, 255, 0.2); padding: 4px 10px; border-radius: var(--radius-full); font-size: 11px; font-weight: 700; margin-bottom: 8px;">
          <span>${t.nationalInitiativeBadge}</span>
        </div>
        <h1 class="hero-title">${t.appTitle}</h1>
        <p class="hero-subtitle">${t.welcomeHeroDesc}</p>
      </div>

      <!-- Role Selection -->
      <div class="section-header">
        <h2 class="section-title">
          <i data-lucide="shield-check" style="color: var(--color-primary); width: 18px; height: 18px;"></i>
          ${t.selectRole}
        </h2>
        <span style="font-size: 11px; color: var(--color-text-muted);">${t.interactiveDemo}</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        <!-- Role 1: Patient / Citizen -->
        <div class="card card-clickable flex-between role-select-card" data-set-role="patient" style="border-left: 4px solid var(--color-primary);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div class="action-icon-circle" style="background: var(--color-primary-light); color: var(--color-primary);">
              <i data-lucide="user"></i>
            </div>
            <div>
              <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--color-text-primary);">${t.patientRole}</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">${t.patientRoleDesc}</div>
            </div>
          </div>
          <i data-lucide="chevron-right" style="color: var(--color-text-muted); width: 18px; height: 18px;"></i>
        </div>

        <!-- Role 2: ASHA Health Worker -->
        <div class="card card-clickable flex-between role-select-card" data-set-role="health_worker" style="border-left: 4px solid #00D2A0;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div class="action-icon-circle" style="background: #E6FAF5; color: #00A37D;">
              <i data-lucide="users"></i>
            </div>
            <div>
              <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--color-text-primary);">${t.healthWorkerRole}</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">${t.healthWorkerRoleDesc}</div>
            </div>
          </div>
          <i data-lucide="chevron-right" style="color: var(--color-text-muted); width: 18px; height: 18px;"></i>
        </div>

        <!-- Role 3: Doctor Console -->
        <div class="card card-clickable flex-between role-select-card" data-set-role="doctor" style="border-left: 4px solid #8B5CF6;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div class="action-icon-circle" style="background: #F4F0FF; color: #7C3AED;">
              <i data-lucide="stethoscope"></i>
            </div>
            <div>
              <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--color-text-primary);">${t.doctorRole}</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">${t.doctorRoleDesc}</div>
            </div>
          </div>
          <i data-lucide="chevron-right" style="color: var(--color-text-muted); width: 18px; height: 18px;"></i>
        </div>

        <!-- Role 4: PHC / Facility Admin -->
        <div class="card card-clickable flex-between role-select-card" data-set-role="facility" style="border-left: 4px solid #E88C1F;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div class="action-icon-circle" style="background: var(--color-warning-light); color: var(--color-warning);">
              <i data-lucide="building"></i>
            </div>
            <div>
              <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--color-text-primary);">${t.facilityRole}</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">${t.facilityRoleDesc}</div>
            </div>
          </div>
          <i data-lucide="chevron-right" style="color: var(--color-text-muted); width: 18px; height: 18px;"></i>
        </div>
      </div>

      <!-- Core Innovations Highlight -->
      <div class="card" style="background: #FAF9FD; border: 1px dashed var(--color-border); padding: 14px;">
        <h3 style="font-family: var(--font-heading); font-size: 13px; font-weight: 700; color: var(--color-primary); margin-bottom: 8px;">
          ✨ ${t.platformInnovationsTitle}
        </h3>
        <ul style="font-size: 11px; color: var(--color-text-secondary); padding-left: 16px; display: flex; flex-direction: column; gap: 4px;">
          <li><strong>${t.innovationsNetworkTitle}</strong> ${t.innovationsNetworkDesc}</li>
          <li><strong>${t.innovationsJourneyTitle}</strong> ${t.innovationsJourneyDesc}</li>
          <li><strong>${t.innovationsAshaTitle}</strong> ${t.innovationsAshaDesc}</li>
        </ul>
      </div>

      <!-- Prototype Disclaimer -->
      <div class="compliance-disclaimer">
        ${t.prototypeDisclaimer}
      </div>
    </div>
  `;
}
