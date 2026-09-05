/**
 * Screen 12: PHC / Facility Admin Operations Dashboard
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
          <h2 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: var(--color-text-primary);">${t.facilityDashboard}</h2>
          <span style="font-size: 11px; color: var(--color-text-secondary);">${facility.name}</span>
        </div>
        <span class="status-badge badge-success" style="font-size: 9px;">${t.operationalBadge}</span>
      </div>

      <!-- High-Level Key Performance Indicators -->
      <div class="grid-3">
        <div class="card" style="padding: 10px 8px; text-align: center;">
          <div class="stat-number" style="font-size: 24px; color: var(--color-primary);">${facility.todayFootfall}</div>
          <div class="stat-label" style="font-size: 9px;">${t.statTodayFootfall}</div>
        </div>

        <div class="card" style="padding: 10px 8px; text-align: center;">
          <div class="stat-number" style="font-size: 24px; color: var(--color-warning);">${facility.avgWaitMins}m</div>
          <div class="stat-label" style="font-size: 9px;">${t.statAvgOpdWait}</div>
        </div>

        <div class="card" style="padding: 10px 8px; text-align: center;">
          <div class="stat-number" style="font-size: 24px; color: var(--color-success);">${facility.medicinesAvailableRate}</div>
          <div class="stat-label" style="font-size: 9px;">${t.statDrugInStock}</div>
        </div>
      </div>

      <!-- Bed & Critical Care Capacity Progress -->
      <div class="card" style="padding: 14px;">
        <div class="flex-between" style="margin-bottom: 6px;">
          <span style="font-family: var(--font-heading); font-size: 13px; font-weight: 700; color: var(--color-text-primary);">
            ${t.bedCapacityTitle}
          </span>
          <span style="font-size: 11px; font-weight: 600; color: var(--color-primary);">${facility.bedsOccupied} / ${facility.bedsTotal} ${t.bedsInUseFormat}</span>
        </div>

        <!-- Progress Bar -->
        <div style="width: 100%; height: 10px; background: #ECEAF3; border-radius: 6px; overflow: hidden; margin-bottom: 8px;">
          <div style="width: ${(facility.bedsOccupied / facility.bedsTotal) * 100}%; height: 100%; background: linear-gradient(90deg, var(--color-primary), #8B5CF6); border-radius: 6px;"></div>
        </div>

        <div class="flex-between" style="font-size: 11px; color: var(--color-text-secondary);">
          <span>${t.generalWardAvailable}</span>
          <span style="color: var(--color-success); font-weight: 700;">${t.icuOxygenBedsFree}</span>
        </div>
      </div>

      <!-- Hourly Patient Footfall Trend Chart -->
      <div class="card" style="padding: 14px;">
        <div class="flex-between">
          <span style="font-family: var(--font-heading); font-size: 13px; font-weight: 700; color: var(--color-text-primary);">
            ${t.footfallTrendTitle}
          </span>
          <span class="status-badge badge-primary" style="font-size: 9px;">${t.realTimeBadge}</span>
        </div>
        ${renderFootfallChart(t)}
      </div>

      <!-- Inter-Facility Referral Analytics -->
      <div class="card" style="padding: 14px;">
        <div class="flex-between">
          <span style="font-family: var(--font-heading); font-size: 13px; font-weight: 700; color: var(--color-text-primary);">
            ${t.referralAnalyticsTitle}
          </span>
        </div>
        ${renderReferralDonut(t)}
      </div>

      <!-- Low Stock Alerts -->
      <div class="card" style="border-left: 4px solid var(--color-danger); padding: 12px 14px;">
        <div class="flex-between" style="margin-bottom: 4px;">
          <span style="font-family: var(--font-heading); font-size: 13px; font-weight: 700; color: var(--color-danger);">
            ${t.criticalRestockAlertTitle}
          </span>
          <span class="status-badge badge-danger" style="font-size: 9px;">${t.restockReqBadge}</span>
        </div>
        <p style="font-size: 11px; color: var(--color-text-secondary);">
          ${t.amoxRestockDesc}
        </p>
      </div>

      <div class="compliance-disclaimer">
        ${t.nhmDashboardDisclaimer}
      </div>
    </div>
  `;
}
