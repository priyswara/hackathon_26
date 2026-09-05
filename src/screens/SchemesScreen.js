/**
 * Screen 13: Coverage & Government Health Schemes
 */

import { locales } from '../data/locales.js';

export function renderSchemesScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const schemes = state.schemes || [];

  const schemeItemMap = {
    'SCH-1': {
      name: t.scheme1Name,
      coverage: t.scheme1Coverage,
      status: t.scheme1Status,
      benefits: [t.scheme1Benefit1, t.scheme1Benefit2, t.scheme1Benefit3]
    },
    'SCH-2': {
      name: t.scheme2Name,
      coverage: t.scheme2Coverage,
      status: t.scheme2Status,
      benefits: [t.scheme2Benefit1, t.scheme2Benefit2, t.scheme2Benefit3]
    },
    'SCH-3': {
      name: t.scheme3Name,
      coverage: t.scheme3Coverage,
      status: t.scheme3Status,
      benefits: [t.scheme3Benefit1, t.scheme3Benefit2]
    }
  };

  return `
    <div class="screen" id="screen-schemes">
      <!-- Screen Header -->
      <div class="flex-between">
        <button class="header-btn" id="btn-back-home" title="${t.back}">
          <i data-lucide="arrow-left"></i>
        </button>
        <h2 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700;">${t.schemesTitle}</h2>
        <div style="width: 36px;"></div>
      </div>

      <!-- Ayushman Bharat Active Card -->
      <div class="card card-hero">
        <div class="flex-between" style="margin-bottom: 6px;">
          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase;">${t.pmjayCardLinkedBadge}</span>
          <span class="status-badge badge-success" style="font-size: 9px; padding: 2px 8px;">${t.activeBadge}</span>
        </div>
        <div class="hero-title" style="font-size: 22px;">${t.coverageAmount}</div>
        <p class="hero-subtitle">${t.pmjaySummary}</p>
      </div>

      <!-- Government Health Schemes List -->
      <div class="section-header">
        <h3 class="section-title">
          <i data-lucide="award" style="color: var(--color-primary); width: 18px; height: 18px;"></i>
          ${t.eligibleProgramsTitle}
        </h3>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${schemes.map(s => {
          const localizedScheme = schemeItemMap[s.id] || { name: s.name, coverage: s.coverage, status: s.status, benefits: s.benefits };

          return `
            <div class="card" style="padding: 14px; border-left: 4px solid ${s.color};">
              <div class="flex-between" style="margin-bottom: 4px;">
                <div style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: var(--color-text-primary);">
                  ${localizedScheme.name}
                </div>
                <span class="status-badge badge-success" style="font-size: 9px;">${localizedScheme.status}</span>
              </div>

              <div style="font-size: 13px; font-weight: 700; color: ${s.color}; margin-bottom: 8px;">
                ${localizedScheme.coverage}
              </div>

              <ul style="font-size: 11px; color: var(--color-text-secondary); padding-left: 16px; display: flex; flex-direction: column; gap: 3px;">
                ${localizedScheme.benefits.map(b => `<li>${b}</li>`).join('')}
              </ul>
            </div>
          `;
        }).join('')}
      </div>

      <div class="compliance-disclaimer">
        ${t.nhaBisDisclaimer}
      </div>
    </div>
  `;
}
