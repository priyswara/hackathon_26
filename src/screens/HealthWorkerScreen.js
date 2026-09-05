/**
 * Screen 10: Frontline Health Worker (ASHA) Dashboard
 * Professional Responsive Web Layout with 4 Stat Cards and Village Patient Roster
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
      <!-- Screen Header with Sync Action -->
      <div class="flex-between">
        <div>
          <h2 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-text-primary);">${t.ashaTitle}</h2>
          <span style="font-size: 12px; color: var(--color-text-secondary);">${t.ashaSubtitle} • Village Subcentre Rampur</span>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-outline" id="btn-asha-sync-records" title="${t.syncRecordsBtn}">
            <i data-lucide="refresh-cw" style="width: 15px; height: 15px;"></i> ${t.syncRecordsBtn}
          </button>
          <button class="btn btn-primary" id="btn-asha-register-patient">
            <i data-lucide="user-plus"></i> ${t.registerPatientBtn}
          </button>
        </div>
      </div>

      <!-- 4 Stat Cards Grid on Desktop -->
      <div class="grid-4">
        <div class="stat-card" style="border-bottom: 4px solid var(--color-danger);">
          <div class="stat-number" style="color: var(--color-danger);">04</div>
          <div class="stat-label">${t.statHighRiskAnc}</div>
        </div>

        <div class="stat-card" style="border-bottom: 4px solid var(--color-primary);">
          <div class="stat-number" style="color: var(--color-primary);">08</div>
          <div class="stat-label">${t.statVisitsToday}</div>
        </div>

        <div class="stat-card" style="border-bottom: 4px solid var(--color-success);">
          <div class="stat-number" style="color: var(--color-success);">100%</div>
          <div class="stat-label">${t.statOfflineSynced}</div>
        </div>

        <div class="stat-card" style="border-bottom: 4px solid var(--color-warning);">
          <div class="stat-number" style="color: var(--color-warning);">142</div>
          <div class="stat-label">Assigned Households</div>
        </div>
      </div>

      <!-- Village Priority Patient Roster -->
      <div class="card" style="padding: 24px;">
        <div class="section-header" style="margin-bottom: 16px;">
          <h3 class="section-title">
            <i data-lucide="users" style="color: var(--color-primary); width: 20px; height: 20px;"></i>
            ${t.villageRosterTitle}
          </h3>
          <span class="status-badge badge-primary" style="font-size: 11px;">${t.sortedByUrgency}</span>
        </div>

        <div class="grid-2">
          ${roster.map(pt => {
            const isHigh = pt.urgency === 'high';
            const isMedium = pt.urgency === 'medium';
            const borderClr = isHigh ? 'var(--color-danger)' : (isMedium ? 'var(--color-warning)' : 'var(--color-primary)');
            const categoryText = categoryMap[pt.id] || pt.category;
            const statusText = statusMap[pt.status] || pt.status;

            return `
              <div class="card" style="padding: 18px 20px; border-left: 5px solid ${borderClr}; background: #FAF9FD; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div class="flex-between" style="margin-bottom: 6px;">
                    <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-text-primary);">
                      ${pt.name} <span style="font-size: 12px; font-weight: 500; color: var(--color-text-muted);">(${pt.age} yrs, ${pt.village})</span>
                    </div>
                    <span class="status-badge ${isHigh ? 'badge-danger' : (isMedium ? 'badge-warning' : 'badge-primary')}" style="font-size: 10px;">
                      ${statusText}
                    </span>
                  </div>

                  <div style="font-size: 13px; font-weight: 700; color: ${isHigh ? 'var(--color-danger)' : 'var(--color-text-secondary)'}; margin-bottom: 4px;">
                    ${categoryText}
                  </div>

                  <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 12px;">
                    ${t.vitalsPrefix} <strong>${pt.vitals}</strong> • ${t.lastVisitPrefix} ${pt.lastVisit}
                  </div>
                </div>

                <div style="display: flex; gap: 8px; border-top: 1px solid var(--color-border); padding-top: 12px;">
                  <button class="btn btn-secondary flex-1 btn-asha-log-vitals" data-patient="${pt.name}" style="font-size: 12px; padding: 8px;">
                    <i data-lucide="clipboard"></i> ${t.logVitalsBtn}
                  </button>
                  <button class="btn btn-outline flex-1 btn-asha-start-triage" data-patient="${pt.name}" style="font-size: 12px; padding: 8px;">
                    <i data-lucide="activity"></i> ${t.triageCheckBtn}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="compliance-disclaimer" style="margin-top: 10px;">
        ${t.meshSyncDisclaimer}
      </div>
    </div>
  `;
}
