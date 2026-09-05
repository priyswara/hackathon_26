/**
 * Screen 12: PHC / Facility Admin Operations Dashboard
 * Professional Responsive Web Layout with 4 Stat Cards, Resource Health, and Side-by-Side Analytics Charts
 */

import { locales } from '../data/locales.js';
import { renderFootfallChart, renderReferralDonut } from '../components/Charts.js';

export function renderFacilityScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const facility = state.facilities[0]; // PHC Rampur

  return `
    <div class="screen" id="screen-facility">
      <!-- Screen Header -->
      <div class="flex-between">
        <div>
          <h2 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-text-primary);">${t.facilityDashboard}</h2>
          <span style="font-size: 12px; color: var(--color-text-secondary);">${facility.name} • Block Primary Health Centre Operations</span>
        </div>
        <span class="status-badge badge-success" style="font-size: 11px; padding: 4px 12px;">● ${t.operationalBadge}</span>
      </div>

      <!-- 4 Stat Metric Cards Grid on Desktop -->
      <div class="grid-4">
        <div class="stat-card" style="border-bottom: 4px solid var(--color-primary);">
          <div class="stat-number" style="color: var(--color-primary);">${facility.todayFootfall}</div>
          <div class="stat-label">${t.statTodayFootfall}</div>
        </div>

        <div class="stat-card" style="border-bottom: 4px solid var(--color-warning);">
          <div class="stat-number" style="color: var(--color-warning);">${facility.avgWaitMins}m</div>
          <div class="stat-label">${t.statAvgOpdWait}</div>
        </div>

        <div class="stat-card" style="border-bottom: 4px solid var(--color-success);">
          <div class="stat-number" style="color: var(--color-success);">${facility.medicinesAvailableRate}</div>
          <div class="stat-label">${t.statDrugInStock}</div>
        </div>

        <div class="stat-card" style="border-bottom: 4px solid #8B5CF6;">
          <div class="stat-number" style="color: #8B5CF6;">${facility.bedsOccupied}/${facility.bedsTotal}</div>
          <div class="stat-label">Bed Occupancy</div>
        </div>
      </div>

      <!-- Capacity & Alert Row: 2-Column Split -->
      <div class="split-1-1">
        <!-- Bed & Critical Care Capacity Progress -->
        <div class="card" style="padding: 20px 24px;">
          <div class="flex-between" style="margin-bottom: 8px;">
            <span style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-text-primary);">
              ${t.bedCapacityTitle}
            </span>
            <span style="font-size: 12px; font-weight: 700; color: var(--color-primary);">${facility.bedsOccupied} / ${facility.bedsTotal} ${t.bedsInUseFormat}</span>
          </div>

          <!-- Progress Bar -->
          <div style="width: 100%; height: 12px; background: #ECEAF3; border-radius: 6px; overflow: hidden; margin-bottom: 12px;">
            <div style="width: ${(facility.bedsOccupied / facility.bedsTotal) * 100}%; height: 100%; background: linear-gradient(90deg, var(--color-primary), #8B5CF6); border-radius: 6px;"></div>
          </div>

          <div class="flex-between" style="font-size: 12px; color: var(--color-text-secondary);">
            <span>${t.generalWardAvailable}</span>
            <span style="color: var(--color-success); font-weight: 700;">${t.icuOxygenBedsFree}</span>
          </div>
        </div>

        <!-- Low Stock Alerts -->
        <div class="card" style="border-left: 5px solid var(--color-danger); padding: 20px 24px;">
          <div class="flex-between" style="margin-bottom: 6px;">
            <span style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-danger);">
              ${t.criticalRestockAlertTitle}
            </span>
            <span class="status-badge badge-danger" style="font-size: 10px;">${t.restockReqBadge}</span>
          </div>
          <p style="font-size: 12.5px; color: var(--color-text-secondary); line-height: 1.5;">
            ${t.amoxRestockDesc}
          </p>
        </div>
      </div>

      <!-- Side-by-Side Analytics Charts Row: 2-Column Split -->
      <div class="split-1-1">
        <!-- Hourly Patient Footfall Trend Chart -->
        <div class="card" style="padding: 22px;">
          <div class="flex-between" style="margin-bottom: 12px;">
            <span style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-text-primary);">
              ${t.footfallTrendTitle}
            </span>
            <span class="status-badge badge-primary" style="font-size: 10px;">${t.realTimeBadge}</span>
          </div>
          ${renderFootfallChart(t)}
        </div>

        <!-- Inter-Facility Referral Analytics -->
        <div class="card" style="padding: 22px;">
          <div class="flex-between" style="margin-bottom: 12px;">
            <span style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-text-primary);">
              ${t.referralAnalyticsTitle}
            </span>
          </div>
          ${renderReferralDonut(t)}
        </div>
      </div>

      <div class="compliance-disclaimer" style="margin-top: 10px;">
        ${t.nhmDashboardDisclaimer}
      </div>
    </div>
  `;
}
