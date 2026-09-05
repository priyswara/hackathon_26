/**
 * Screen 10: Frontline Health Worker (ASHA) Dashboard
 */

import { locales } from '../data/locales.js';

export function renderHealthWorkerScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const roster = state.healthWorkerRoster || [];

  const categoryMap = {
    'HW-P1': t.rosterPt1Category,
    'HW-P2': t.rosterPt2Category,
    'HW-P3': t.rosterPt3Category
  };

  const statusMap = {
    'Visit Required': t.urgencyVisitRequired,
    'Teleconsult Active': t.urgencyTeleconsultActive,
    'Routine Sync': t.urgencyRoutineSync
  };

  return `
    <div class="screen" id="screen-health-worker">
      <!-- Screen Header with Role Switch -->
      <div class="flex-between">
        <div>
          <h2 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: var(--color-text-primary);">${t.ashaTitle}</h2>
          <span style="font-size: 11px; color: var(--color-text-secondary);">${t.ashaSubtitle}</span>
        </div>
        <button class="btn btn-sm btn-outline" id="btn-asha-sync-records" title="${t.syncRecordsBtn}">
          <i data-lucide="refresh-cw" style="width: 14px; height: 14px;"></i> ${t.syncRecordsBtn}
        </button>
      </div>

      <!-- Stat Cards Grid -->
      <div class="grid-3">
        <div class="card" style="padding: 12px 8px; text-align: center; border-bottom: 3px solid var(--color-danger);">
          <div class="stat-number" style="font-size: 26px; color: var(--color-danger);">04</div>
          <div class="stat-label" style="font-size: 9px;">${t.statHighRiskAnc}</div>
        </div>

        <div class="card" style="padding: 12px 8px; text-align: center; border-bottom: 3px solid var(--color-primary);">
          <div class="stat-number" style="font-size: 26px; color: var(--color-primary);">08</div>
          <div class="stat-label" style="font-size: 9px;">${t.statVisitsToday}</div>
        </div>

        <div class="card" style="padding: 12px 8px; text-align: center; border-bottom: 3px solid var(--color-success);">
          <div class="stat-number" style="font-size: 26px; color: var(--color-success);">100%</div>
          <div class="stat-label" style="font-size: 9px;">${t.statOfflineSynced}</div>
        </div>
      </div>

      <!-- Quick Action: Register Villager -->
      <button class="btn btn-primary btn-full" id="btn-asha-register-patient">
        <i data-lucide="user-plus"></i>
        ${t.registerPatientBtn}
      </button>

      <!-- Priority Patient Roster -->
      <div class="section-header">
        <h3 class="section-title">
          <i data-lucide="users" style="color: var(--color-primary); width: 18px; height: 18px;"></i>
          ${t.villageRosterTitle}
        </h3>
        <span style="font-size: 10px; color: var(--color-text-muted);">${t.sortedByUrgency}</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${roster.map(pt => {
          const isHigh = pt.urgency === 'high';
          const isMedium = pt.urgency === 'medium';
          const borderClr = isHigh ? 'var(--color-danger)' : (isMedium ? 'var(--color-warning)' : 'var(--color-primary)');
          const categoryText = categoryMap[pt.id] || pt.category;
          const statusText = statusMap[pt.status] || pt.status;

          return `
            <div class="card" style="padding: 14px; border-left: 4px solid ${borderClr};">
              <div class="flex-between" style="margin-bottom: 4px;">
                <div style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: var(--color-text-primary);">
                  ${pt.name} <span style="font-size: 11px; font-weight: 500; color: var(--color-text-muted);">(${pt.age} yrs, ${pt.village})</span>
                </div>
                <span class="status-badge ${isHigh ? 'badge-danger' : (isMedium ? 'badge-warning' : 'badge-primary')}" style="font-size: 9px;">
                  ${statusText}
                </span>
              </div>

              <div style="font-size: 12px; font-weight: 600; color: ${isHigh ? 'var(--color-danger)' : 'var(--color-text-secondary)'}; margin-bottom: 2px;">
                ${categoryText}
              </div>

              <div style="font-size: 11px; color: var(--color-text-secondary); margin-bottom: 8px;">
                ${t.vitalsPrefix} <strong>${pt.vitals}</strong> • ${t.lastVisitPrefix} ${pt.lastVisit}
              </div>

              <div style="display: flex; gap: 6px;">
                <button class="btn btn-sm btn-secondary flex-1 btn-asha-log-vitals" data-patient="${pt.name}" style="flex: 1; padding: 4px 8px; font-size: 11px;">
                  <i data-lucide="clipboard"></i> ${t.logVitalsBtn}
                </button>
                <button class="btn btn-sm btn-outline flex-1 btn-asha-start-triage" data-patient="${pt.name}" style="flex: 1; padding: 4px 8px; font-size: 11px;">
                  <i data-lucide="activity"></i> ${t.triageCheckBtn}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="compliance-disclaimer">
        ${t.meshSyncDisclaimer}
      </div>
    </div>
  `;
}
