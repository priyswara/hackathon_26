/**
 * Screen 7: Connected Health Journey (Continuity Feature)
 * Longitudinal care timeline uniting Triage, Teleconsult, Diagnostics, Pharmacy, and ASHA Follow-up
 * Professional 2-Column Web Care Journey Dashboard with Complete 5-Language Native Localization
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

  const getLocalizedStep = (step) => {
    // 1. Check if it's one of the predefined steps
    if (initialStepMap[step.id]) {
      return initialStepMap[step.id];
    }

    // 2. Dynamic Triage completed step
    if (step.title && step.title.includes('Digital Smart Triage Completed')) {
      return {
        title: t.step1Title,
        provider: t.step1Provider,
        facility: t.step1Facility,
        date: t.justNowLabel,
        summary: step.summary
      };
    }

    // 3. Dynamic Teleconsultation booking step
    if (step.title && step.title.includes('Teleconsultation Booked')) {
      const docName = step.provider || t.docName;
      const timeStr = step.date ? step.date.replace(/Today,?\s*/i, '') : '';
      const tokenMatch = step.summary ? step.summary.match(/#([A-Za-z0-9-]+)/) : null;
      const tokenNum = tokenMatch ? tokenMatch[1] : 'B-14';
      return {
        title: `${t.teleconsultBookedTitle} (${docName})`,
        provider: docName,
        facility: step.facility || t.step2Facility,
        date: `${t.todayLabel}, ${timeStr}`,
        summary: `${t.confirmedSlotSummary} ${timeStr}. Token #${tokenNum} ${t.generatedTag}.`
      };
    }

    // 4. Dynamic Diagnostic booking step
    if (step.title && step.title.includes('Diagnostic Booked')) {
      const testName = step.title.replace('Diagnostic Booked: ', '').replace('Diagnostic Booked', '').trim();
      const timeStr = step.date ? step.date.replace(/Today,?\s*/i, '') : '';
      return {
        title: `${t.diagBookedTitle}: ${testName}`,
        provider: t.diagUnitProvider,
        facility: step.facility || t.step3Facility,
        date: `${t.todayLabel}, ${timeStr}`,
        summary: `${t.diagBookingSummaryPrefix} ${testName}. ${t.diagBookingSummarySuffix}`
      };
    }

    // Default fallback with date localization
    let localizedDate = step.date || '';
    if (localizedDate.includes('Today')) {
      localizedDate = localizedDate.replace('Today', t.todayLabel);
    } else if (localizedDate.includes('Tomorrow')) {
      localizedDate = localizedDate.replace('Tomorrow', t.tomorrowLabel);
    } else if (localizedDate.includes('Pending Consult')) {
      localizedDate = t.pendingConsultLabel;
    }

    return {
      title: step.title,
      provider: step.provider,
      facility: step.facility,
      date: localizedDate,
      summary: step.summary
    };
  };

  return `
    <div class="screen" id="screen-health-journey">
      <!-- Screen Header -->
      <div class="flex-between">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="header-btn" id="btn-back-home" title="${t.back}">
            <i data-lucide="arrow-left"></i>
          </button>
          <div>
            <h2 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-text-primary);">${t.careJourney}</h2>
            <div style="font-size: 12px; color: var(--color-text-secondary);">${t.journeyHeaderSubtitle}</div>
          </div>
        </div>
      </div>

      <!-- 2-Column Responsive Layout -->
      <div class="split-1-2" style="align-items: start; gap: 24px;">
        
        <!-- Left Column: Patient Profile & Care Episode Overview -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <!-- Overview Header Hero Card -->
          <div class="card card-hero" style="padding: 24px;">
            <div class="flex-between" style="margin-bottom: 10px;">
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.9;">${t.unifiedCareCycleBadge}</span>
              <span class="status-badge badge-success" style="font-size: 10px; padding: 2px 8px;">${t.activeCareEpisodeBadge}</span>
            </div>
            <h3 class="hero-title" style="font-size: 20px; line-height: 1.3;">${t.patientRecordTitle}</h3>
            <p class="hero-subtitle" style="font-size: 13px; line-height: 1.5; margin-top: 4px;">${t.journeySubtitle}</p>
          </div>

          <!-- ABHA Health ID & Records Card -->
          <div class="card" style="padding: 20px;">
            <div class="flex-between" style="margin-bottom: 12px;">
              <span style="font-family: var(--font-heading); font-size: 14px; font-weight: 800; color: var(--color-text-primary);">${t.abdmCardTitle}</span>
              <span class="status-badge badge-primary">${t.linkedBadge}</span>
            </div>
            
            <div style="background: var(--color-bg); padding: 12px 14px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); margin-bottom: 12px;">
              <div style="font-size: 11px; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700;">${t.abhaIdLabel}</div>
              <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-primary); letter-spacing: 0.5px;">91-4820-1928-3011</div>
            </div>

            <div style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.4;">
              ${t.abhaSecurityNotice}
            </div>
          </div>
        </div>

        <!-- Right Column: Interactive Longitudinal Timeline -->
        <div class="card" style="padding: 24px;">
          <div class="section-header" style="margin-bottom: 18px;">
            <h3 class="section-title">
              <i data-lucide="git-commit" style="color: var(--color-primary); width: 20px; height: 20px;"></i>
              ${t.careMilestoneTimeline}
            </h3>
            <span class="status-badge badge-primary" style="font-size: 10px;">${journey.length} ${t.encountersCount}</span>
          </div>

          <!-- Timeline List or Empty State -->
          ${journey.length === 0 ? `
            <div style="text-align: center; padding: 40px 20px;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
                <i data-lucide="file-question" style="width: 24px; height: 24px;"></i>
              </div>
              <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 4px;">
                ${t.emptyJourneyTitle}
              </h4>
              <p style="font-size: 13px; color: var(--color-text-secondary); max-width: 380px; margin: 0 auto;">
                ${t.emptyJourneyDesc}
              </p>
            </div>
          ` : `
            <div class="timeline">
              ${journey.map((step, idx) => {
                const isCompleted = step.status === 'completed';
                const isActive = step.status === 'active';
                const localizedStep = getLocalizedStep(step);
                const statusLabel = isCompleted ? t.statusCompleted : (isActive ? t.statusInProgress : t.statusPending);

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

                    <div class="timeline-content card-clickable" style="border-left: 4px solid ${isCompleted ? 'var(--color-success)' : (isActive ? 'var(--color-primary)' : 'var(--color-border)')};">
                      <div class="flex-between" style="margin-bottom: 4px;">
                        <span style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-text-primary);">
                          ${localizedStep.title}
                        </span>
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <span class="status-badge ${isCompleted ? 'badge-success' : (isActive ? 'badge-primary' : 'badge-warning')}" style="font-size: 9.5px; padding: 1px 6px;">
                            ${statusLabel}
                          </span>
                          <span style="font-size: 11px; color: var(--color-text-muted); font-weight: 600;">
                            ${localizedStep.date}
                          </span>
                        </div>
                      </div>

                      <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--color-primary); font-weight: 600; margin-bottom: 6px;">
                        <span>${localizedStep.provider}</span>
                        <span>•</span>
                        <span>${localizedStep.facility}</span>
                      </div>

                      <p style="font-size: 13px; color: var(--color-text-secondary); line-height: 1.4;">
                        ${localizedStep.summary}
                      </p>

                      ${isActive ? `
                        <div style="margin-top: 10px; display: flex; gap: 8px;">
                          <button class="btn btn-sm btn-primary" id="btn-journey-action-active" style="padding: 6px 14px; font-size: 12px;">
                            ${t.openLiveStepBtn}
                          </button>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

      </div>

      <div class="compliance-disclaimer" style="margin-top: 10px;">
        ${t.abdmComplianceDisclaimer}
      </div>
    </div>
  `;
}
