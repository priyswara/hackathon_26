/**
 * Screen 4: Digital Smart Triage
 */

import { locales } from '../data/locales.js';

export function renderTriageScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;

  return `
    <div class="screen" id="screen-triage">
      <!-- Screen Header -->
      <div class="flex-between">
        <button class="header-btn" id="btn-back-home" title="${t.back}">
          <i data-lucide="arrow-left"></i>
        </button>
        <h2 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700;">${t.triageTitle}</h2>
        <div style="width: 36px;"></div>
      </div>

      <!-- Introduction Banner -->
      <div class="card" style="background: linear-gradient(135deg, #F3EEFF 0%, #EFE8FC 100%); border-color: rgba(108, 60, 233, 0.2);">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary); color: #FFFFFF; display: flex; align-items: center; justify-content: center;">
            <i data-lucide="activity" style="width: 18px; height: 18px;"></i>
          </div>
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: var(--color-primary-dark);">${t.triageSubtitle}</h3>
          </div>
        </div>
        <p style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.4;">
          ${t.triageBannerDesc}
        </p>
      </div>

      <!-- Symptom Checklist Form -->
      <div class="card" id="triage-form-card">
        <h3 style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 12px;">
          ${t.symptomQuestion}
        </h3>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <label class="card card-clickable flex-between" style="padding: 12px; border-color: var(--color-border); background: var(--color-surface); cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" class="triage-checkbox" value="High Fever > 102°F" style="width: 18px; height: 18px; accent-color: var(--color-primary);" checked>
              <span style="font-size: 13px; font-weight: 600; color: var(--color-text-primary);">${t.feverCheck}</span>
            </div>
            <i data-lucide="thermometer" style="color: var(--color-danger); width: 18px; height: 18px;"></i>
          </label>

          <label class="card card-clickable flex-between" style="padding: 12px; border-color: var(--color-border); background: var(--color-surface); cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" class="triage-checkbox" value="Shortness of Breath" style="width: 18px; height: 18px; accent-color: var(--color-primary);" id="chk-breathing">
              <span style="font-size: 13px; font-weight: 600; color: var(--color-text-primary);">${t.breathingCheck}</span>
            </div>
            <i data-lucide="wind" style="color: var(--color-warning); width: 18px; height: 18px;"></i>
          </label>

          <label class="card card-clickable flex-between" style="padding: 12px; border-color: var(--color-border); background: var(--color-surface); cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" class="triage-checkbox" value="Dry Cough > 3 Days" style="width: 18px; height: 18px; accent-color: var(--color-primary);" checked>
              <span style="font-size: 13px; font-weight: 600; color: var(--color-text-primary);">${t.coughCheck}</span>
            </div>
            <i data-lucide="clock" style="color: var(--color-text-secondary); width: 18px; height: 18px;"></i>
          </label>

          <label class="card card-clickable flex-between" style="padding: 12px; border-color: var(--color-border); background: var(--color-surface); cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" class="triage-checkbox" value="Severe Dizziness" style="width: 18px; height: 18px; accent-color: var(--color-primary);">
              <span style="font-size: 13px; font-weight: 600; color: var(--color-text-primary);">${t.dizzinessCheck}</span>
            </div>
            <i data-lucide="alert-circle" style="color: var(--color-primary); width: 18px; height: 18px;"></i>
          </label>
        </div>

        <button class="btn btn-primary btn-full" id="btn-calculate-triage" style="margin-top: 16px;">
          <i data-lucide="sparkles"></i>
          ${t.analyzeRisk}
        </button>
      </div>

      <!-- Result Card (Dynamic Output) -->
      <div class="card" id="triage-result-card" style="display: none; border-top: 4px solid var(--color-warning);">
        <div class="flex-between" style="margin-bottom: 8px;">
          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--color-text-secondary);">${t.triageUrgencyAssessment}</span>
          <span class="status-badge badge-warning" id="triage-result-badge">${t.mediumPriorityBadge}</span>
        </div>

        <h4 id="triage-result-title" style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 6px;">
          ${t.mediumPriorityAlertTitle}
        </h4>

        <p id="triage-result-desc" style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.4; margin-bottom: 14px;">
          ${t.mediumPriorityAlertDesc}
        </p>

        <div style="display: flex; gap: 8px;" id="triage-result-actions">
          <button class="btn btn-sm btn-primary flex-1" id="btn-triage-goto-teleconsult" style="flex: 1;">
            <i data-lucide="video"></i> ${t.teleconsultBtn}
          </button>
          <button class="btn btn-sm btn-secondary flex-1" id="btn-triage-goto-journey" style="flex: 1;">
            <i data-lucide="activity"></i> ${t.viewJourneyBtn}
          </button>
        </div>
      </div>

      <!-- Mandatory Compliance Disclaimer -->
      <div class="compliance-disclaimer">
        ${t.triageDisclaimer}
      </div>
    </div>
  `;
}
