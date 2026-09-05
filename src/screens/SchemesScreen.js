/**
 * Screen 13: Coverage & Government Health Schemes
 * Professional Responsive Web Layout for National & State Health Entitlements
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
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="header-btn" id="btn-back-home" title="${t.back}">
            <i data-lucide="arrow-left"></i>
          </button>
          <div>
            <h2 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-text-primary);">${t.schemesTitle}</h2>
            <div style="font-size: 12px; color: var(--color-text-secondary);">Ayushman Bharat & Free Maternal Health Coverage</div>
          </div>
        </div>
      </div>

      <!-- Ayushman Bharat Active Hero Card -->
      <div class="card card-hero" style="padding: 28px 32px;">
        <div class="flex-between" style="margin-bottom: 8px;">
          <span style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${t.pmjayCardLinkedBadge}</span>
          <span class="status-badge badge-success" style="font-size: 10px; padding: 3px 10px;">${t.activeBadge}</span>
        </div>
        <div class="hero-title" style="font-size: 28px; color: #FFFFFF;">${t.coverageAmount}</div>
        <p class="hero-subtitle" style="font-size: 14px; margin-top: 4px;">${t.pmjaySummary}</p>
      </div>

      <!-- Government Health Schemes List Header -->
      <div class="section-header">
        <h3 class="section-title">
          <i data-lucide="award" style="color: var(--color-primary); width: 20px; height: 20px;"></i>
          ${t.eligibleProgramsTitle}
        </h3>
        <span class="status-badge badge-primary" style="font-size: 10px;">${schemes.length} Enrolled Programs</span>
      </div>

      <!-- 3-Column Responsive Scheme Grid on Desktop -->
      <div class="grid-3">
        ${schemes.map(s => {
          const localizedScheme = schemeItemMap[s.id] || { name: s.name, coverage: s.coverage, status: s.status, benefits: s.benefits };

          return `
            <div class="card" style="padding: 22px; border-left: 5px solid ${s.color}; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div class="flex-between" style="margin-bottom: 6px;">
                  <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-text-primary);">
                    ${localizedScheme.name}
                  </div>
                  <span class="status-badge badge-success" style="font-size: 9.5px;">${localizedScheme.status}</span>
                </div>

                <div style="font-size: 15px; font-weight: 800; color: ${s.color}; margin-bottom: 12px;">
                  ${localizedScheme.coverage}
                </div>

                <ul style="font-size: 12px; color: var(--color-text-secondary); padding-left: 18px; display: flex; flex-direction: column; gap: 6px; line-height: 1.4;">
                  ${localizedScheme.benefits.map(b => `<li>${b}</li>`).join('')}
                </ul>
              </div>

              <div style="margin-top: 16px; border-top: 1px solid var(--color-border); padding-top: 12px;">
                <span style="font-size: 11px; color: var(--color-text-muted);">Instant cashless admission at empanelled hospitals.</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="compliance-disclaimer" style="margin-top: 10px;">
        ${t.nhaBisDisclaimer}
      </div>
    </div>
  `;
}
