/**
 * Screen 7: Connected Health Journey (Continuity Feature)
 * Longitudinal care timeline uniting Triage, Teleconsult, Diagnostics, Pharmacy, and ASHA Follow-up
 */

import { locales } from '../data/locales.js';

export function renderHealthJourneyScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const journey = state.careJourney || [];

  const initialStepMap = {
    'STEP-1': {
      title: t.step1Title,
      provider: t.step1Provider,
      facility: t.step1Facility,
      date: t.step1Date,
      summary: t.step1Summary
    },
    'STEP-2': {
      title: t.step2Title,
      provider: t.step2Provider,
      facility: t.step2Facility,
      date: t.step2Date,
      summary: t.step2Summary
    },
    'STEP-3': {
      title: t.step3Title,
      provider: t.step3Provider,
      facility: t.step3Facility,
      date: t.step3Date,
      summary: t.step3Summary
    },
    'STEP-4': {
      title: t.step4Title,
      provider: t.step4Provider,
      facility: t.step4Facility,
      date: t.step4Date,
      summary: t.step4Summary
    }
  };

  return `
    <div class="screen" id="screen-health-journey">
      <!-- Screen Header -->
      <div class="flex-between">
        <button class="header-btn" id="btn-back-home" title="${t.back}">
          <i data-lucide="arrow-left"></i>
        </button>
        <h2 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700;">${t.careJourney}</h2>
        <div style="width: 36px;"></div>
      </div>

      <!-- Overview Header -->
      <div class="card card-hero">
        <div class="flex-between" style="margin-bottom: 6px;">
          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.9;">${t.unifiedCareCycleBadge}</span>
          <span class="status-badge badge-success" style="font-size: 9px; padding: 2px 8px;">${t.activeCareEpisodeBadge}</span>
        </div>
        <h3 class="hero-title" style="font-size: 18px;">${t.patientRecordTitle}</h3>
        <p class="hero-subtitle">${t.journeySubtitle}</p>
      </div>

      <!-- Timeline List -->
      <div class="timeline" style="margin-top: 8px;">
        ${journey.map((step, idx) => {
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';
          
          const localizedStep = initialStepMap[step.id] || {
            title: step.title,
            provider: step.provider,
            facility: step.facility,
            date: step.date,
            summary: step.summary
          };

          return `
            <div class="timeline-item ${isCompleted ? 'completed' : (isActive ? 'active' : '')}">
              <div class="timeline-node">
                ${isCompleted ? `
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ` : (isActive ? `
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: #FFFFFF;"></span>
                ` : `
                  <span style="font-size: 10px; font-weight: 700;">${idx + 1}</span>
                `)}
              </div>

              <div class="timeline-content card-clickable" style="border-left: 3px solid ${isCompleted ? 'var(--color-success)' : (isActive ? 'var(--color-primary)' : 'var(--color-border)')};">
                <div class="flex-between" style="margin-bottom: 4px;">
                  <span style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: var(--color-text-primary);">
                    ${localizedStep.title}
                  </span>
                  <span style="font-size: 10px; color: var(--color-text-muted); font-weight: 600;">
                    ${localizedStep.date}
                  </span>
                </div>

                <div style="display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--color-primary); font-weight: 600; margin-bottom: 6px;">
                  <span>${localizedStep.provider}</span>
                  <span>•</span>
                  <span>${localizedStep.facility}</span>
                </div>

                <p style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.4;">
                  ${localizedStep.summary}
                </p>

                ${isActive ? `
                  <div style="margin-top: 8px; display: flex; gap: 6px;">
                    <button class="btn btn-sm btn-primary" id="btn-journey-action-active" style="padding: 4px 10px; font-size: 11px;">
                      ${t.openLiveStepBtn}
                    </button>
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="compliance-disclaimer">
        ${t.abdmComplianceDisclaimer}
      </div>
    </div>
  `;
}
