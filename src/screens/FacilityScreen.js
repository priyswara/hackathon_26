/**
 * Screen: PHC / Facility Admin Operations Dashboard (Palette 3)
 * Clean layout with 4 Stat Cards, Bed Occupancy Progress, Low-Stock Alerts, and Analytics Charts.
 */

import { locales } from '../data/locales.js';
import { renderFootfallChart, renderReferralDonut } from '../components/Charts.js';

export function renderFacilityScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const facility = state.facilities[0] || {
    name: 'PHC Rampur Community Health Centre',
    todayFootfall: 68,
    avgWaitMins: 18,
    medicinesAvailableRate: '88%',
    bedsOccupied: 8,
    bedsTotal: 12
  };

  const occRate = Math.round((facility.bedsOccupied / facility.bedsTotal) * 100);

  return `
    <div class="screen" id="screen-facility" style="width: 100%;">
      
      <!-- Screen Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h1 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-text-primary);">
            ${t.facilityDashboard || 'PHC Operations Dashboard'}
          </h1>
          <span style="font-size: 12px; color: var(--color-text-secondary);">
            ${facility.name} • Block Primary Health Centre Operations
          </span>
        </div>
        <span class="status-badge badge-primary">
          ● ${t.operationalBadge || 'Operational'}
        </span>
      </div>

      <!-- 4 Stat Metric Cards Grid -->
      <div class="dashboard-metrics-grid">
        <div class="metric-card" style="border-left: 4px solid var(--color-primary);">
          <div class="metric-icon-box">
            <i data-lucide="users"></i>
          </div>
          <div>
            <div class="metric-value">${facility.todayFootfall}</div>
            <div class="metric-label">${t.statTodayFootfall || 'Today Footfall'}</div>
          </div>
        </div>

        <div class="metric-card" style="border-left: 4px solid var(--color-warning);">
          <div class="metric-icon-box" style="background: var(--color-warning-light); color: var(--color-warning);">
            <i data-lucide="clock"></i>
          </div>
          <div>
            <div class="metric-value">${facility.avgWaitMins}m</div>
            <div class="metric-label">${t.statAvgOpdWait || 'Avg OPD Wait'}</div>
          </div>
        </div>

        <div class="metric-card" style="border-left: 4px solid var(--color-primary);">
          <div class="metric-icon-box">
            <i data-lucide="package-check"></i>
          </div>
          <div>
            <div class="metric-value">${facility.medicinesAvailableRate}</div>
            <div class="metric-label">${t.statDrugInStock || 'Drug Stock'}</div>
          </div>
        </div>

        <div class="metric-card" style="border-left: 4px solid var(--color-accent);">
          <div class="metric-icon-box" style="background: var(--color-accent-light); color: var(--color-accent);">
            <i data-lucide="bed"></i>
          </div>
          <div>
            <div class="metric-value">${facility.bedsOccupied}/${facility.bedsTotal}</div>
            <div class="metric-label">Bed Occupancy (${occRate}%)</div>
          </div>
        </div>
      </div>

      <!-- Capacity & Alerts Grid: 2-Column Split -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 20px;">
        
        <!-- Bed & Critical Care Capacity Progress -->
        <div class="card" style="padding: 20px 22px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-text-primary);">
              ${t.bedCapacityTitle || 'Bed Occupancy & Care Capacity'}
            </span>
            <span style="font-size: 12px; font-weight: 700; color: var(--color-primary);">
              ${facility.bedsOccupied} / ${facility.bedsTotal} In Use
            </span>
          </div>

          <!-- Progress Bar -->
          <div style="width: 100%; height: 10px; background: var(--color-border); border-radius: var(--radius-full); overflow: hidden; margin-bottom: 12px;">
            <div style="width: ${occRate}%; height: 100%; background: var(--color-primary); border-radius: var(--radius-full);"></div>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--color-text-secondary);">
            <span>General Ward: 4 Available</span>
            <span style="color: var(--color-primary); font-weight: 700;">2 ICU / Oxygen Beds Free</span>
          </div>
        </div>

        <!-- Low Stock Alerts -->
        <div class="card" style="border-left: 4px solid var(--color-accent); padding: 20px 22px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-accent);">
              ${t.criticalRestockAlertTitle || 'Critical Restock Alert'}
            </span>
            <span class="status-badge badge-accent" style="font-size: 10px;">Restock Needed</span>
          </div>
          <p style="font-size: 12.5px; color: var(--color-text-secondary); line-height: 1.5;">
            Azithromycin 500mg (18 strips remaining). Restock requested to Shivpuri District Warehouse.
          </p>
        </div>
      </div>

      <!-- Side-by-Side Analytics Charts Row -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 16px;">
        
        <!-- Hourly Footfall Chart -->
        <div class="card" style="padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-family: var(--font-heading); font-size: 14.5px; font-weight: 800; color: var(--color-text-primary);">
              ${t.footfallTrendTitle || 'Hourly Patient Footfall Trend'}
            </span>
            <span class="status-badge badge-primary" style="font-size: 10px;">Live Sensor</span>
          </div>
          ${renderFootfallChart(t)}
        </div>

        <!-- Inter-Facility Referral Analytics -->
        <div class="card" style="padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-family: var(--font-heading); font-size: 14.5px; font-weight: 800; color: var(--color-text-primary);">
              ${t.referralAnalyticsTitle || 'Inter-Facility Referral Analytics'}
            </span>
          </div>
          ${renderReferralDonut(t)}
        </div>
      </div>

      <div style="margin-top: 12px; text-align: center; font-size: 11.5px; color: var(--color-text-muted);">
        ${t.nhmDashboardDisclaimer || 'National Rural Health Mission Real-Time Facility Metric Feed'}
      </div>
    </div>
  `;
}
