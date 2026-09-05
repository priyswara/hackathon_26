/**
 * Screen 4: Digital Smart Triage
 * 2-Column Responsive Web Layout for Protocol-Driven Triage Assessment
 */

import { locales } from '../data/locales.js';

export function renderTriageScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;

  return `
    <div class="screen" id="screen-triage">
      <!-- Screen Header -->
      <div class="flex-between">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="header-btn" id="btn-back-home" title="${t.back}">
            <i data-lucide="arrow-left"></i>
          </button>
          <div>
            <h2 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-text-primary);">${t.triageTitle}</h2>
            <div style="font-size: 12px; color: var(--color-text-secondary);">${t.triageSubtitle}</div>
          </div>
        </div>
      </div>

      <!-- Introduction Banner -->
      <div class="card" style="background: linear-gradient(135deg, #F3EEFF 0%, #EFE8FC 100%); border-color: rgba(108, 60, 233, 0.2); padding: 20px 24px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--color-primary); color: #FFFFFF; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <i data-lucide="activity" style="width: 20px; height: 20px;"></i>
          </div>
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--color-primary-dark);">${t.triageSubtitle}</h3>
          </div>
        </div>
        <p style="font-size: 13px; color: var(--color-text-secondary); line-height: 1.5;">
          ${t.triageBannerDesc}
        </p>
      </div>

      <!-- 2-Column Responsive Split -->
      <div class="split-1-1" style="align-items: start; gap: 24px;">
        
        <!-- Left Column: Symptom Checklist Form -->
        <div class="card" id="triage-form-card" style="padding: 24px;">
          <h3 style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 16px;">
            ${t.symptomQuestion}
          </h3>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            <label class="card card-clickable flex-between" style="padding: 14px; border-color: var(--color-border); background: var(--color-surface); cursor: pointer;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <input type="checkbox" class="triage-checkbox" value="High Fever > 102°F" style="width: 18px; height: 18px; accent-color: var(--color-primary);" checked>
                <span style="font-size: 13.5px; font-weight: 600; color: var(--color-text-primary);">${t.feverCheck}</span>
              </div>
              <i data-lucide="thermometer" style="color: var(--color-danger); width: 20px; height: 20px;"></i>
            </label>

            <label class="card card-clickable flex-between" style="padding: 14px; border-color: var(--color-border); background: var(--color-surface); cursor: pointer;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <input type="checkbox" class="triage-checkbox" value="Shortness of Breath" style="width: 18px; height: 18px; accent-color: var(--color-primary);" id="chk-breathing">
                <span style="font-size: 13.5px; font-weight: 600; color: var(--color-text-primary);">${t.breathingCheck}</span>
              </div>
              <i data-lucide="wind" style="color: var(--color-warning); width: 20px; height: 20px;"></i>
            </label>

            <label class="card card-clickable flex-between" style="padding: 14px; border-color: var(--color-border); background: var(--color-surface); cursor: pointer;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <input type="checkbox" class="triage-checkbox" value="Dry Cough > 3 Days" style="width: 18px; height: 18px; accent-color: var(--color-primary);" checked>
                <span style="font-size: 13.5px; font-weight: 600; color: var(--color-text-primary);">${t.coughCheck}</span>
              </div>
              <i data-lucide="clock" style="color: var(--color-text-secondary); width: 20px; height: 20px;"></i>
            </label>

            <label class="card card-clickable flex-between" style="padding: 14px; border-color: var(--color-border); background: var(--color-surface); cursor: pointer;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <input type="checkbox" class="triage-checkbox" value="Severe Dizziness" style="width: 18px; height: 18px; accent-color: var(--color-primary);">
                <span style="font-size: 13.5px; font-weight: 600; color: var(--color-text-primary);">${t.dizzinessCheck}</span>
              </div>
              <i data-lucide="alert-circle" style="color: var(--color-primary); width: 20px; height: 20px;"></i>
            </label>
          </div>

          <button class="btn btn-primary btn-full" id="btn-calculate-triage" style="margin-top: 18px; padding: 13px;">
            <i data-lucide="sparkles"></i>
            ${t.analyzeRisk}
          </button>
        </div>

        <!-- Right Column: Result Card / Output Container -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <!-- Result Card (Dynamic Output) -->
          <div class="card" id="triage-result-card" style="display: block; border-top: 5px solid var(--color-warning); padding: 24px;">
            <div class="flex-between" style="margin-bottom: 10px;">
              <span style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; color: var(--color-text-secondary); letter-spacing: 0.5px;">${t.triageUrgencyAssessment}</span>
              <span class="status-badge badge-warning" id="triage-result-badge">${t.mediumPriorityBadge}</span>
            </div>

            <h4 id="triage-result-title" style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 8px;">
              ${t.mediumPriorityAlertTitle}
            </h4>

            <p id="triage-result-desc" style="font-size: 13px; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 18px;">
              ${t.mediumPriorityAlertDesc}
            </p>

            <div style="display: flex; gap: 10px;" id="triage-result-actions">
              <button class="btn btn-primary flex-1" id="btn-triage-goto-teleconsult">
                <i data-lucide="video"></i> ${t.teleconsultBtn}
              </button>
              <button class="btn btn-secondary flex-1" id="btn-triage-goto-journey">
                <i data-lucide="activity"></i> ${t.viewJourneyBtn}
              </button>
            </div>
          </div>

          <!-- Triage Info Card -->
          <div class="card" style="background: #FAF9FD; padding: 20px;">
            <div style="font-family: var(--font-heading); font-size: 13.5px; font-weight: 700; color: var(--color-primary); margin-bottom: 6px;">
              ℹ️ Clinical Triage Decision Matrix
            </div>
            <p style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.4;">
              Evaluates vital signs against national emergency clinical protocols. High priority instantly alerts 108 Emergency Response and village ASHA.
            </p>
          </div>
        </div>

      </div>

      <!-- Mandatory Compliance Disclaimer -->
      <div class="compliance-disclaimer" style="margin-top: 10px;">
        ${t.triageDisclaimer}
      </div>
    </div>
  `;
}
