/**
 * Screen 14: Emergency / High Priority SOS (Red-Only)
 */

import { locales } from '../data/locales.js';

export function renderEmergencyScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;

  return `
    <div class="screen" id="screen-emergency">
      <!-- Screen Header -->
      <div class="flex-between">
        <button class="header-btn" id="btn-back-home" style="background: rgba(226, 61, 61, 0.1); border-color: rgba(226, 61, 61, 0.3);" title="${t.back}">
          <i data-lucide="arrow-left" style="color: var(--color-danger);"></i>
        </button>
        <h2 style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-danger);">${t.emergencySosModeTitle}</h2>
        <div style="width: 36px;"></div>
      </div>

      <!-- Pulsing Emergency Warning Banner -->
      <div class="emergency-screen-banner">
        <div style="font-size: 32px; margin-bottom: 4px;">🚨</div>
        <h1 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; line-height: 1.2;">
          ${t.criticalEmergencyResponseTitle}
        </h1>
        <p style="font-size: 12px; opacity: 0.9; margin-top: 4px;">
          ${t.emergencyBannerDesc}
        </p>
      </div>

      <!-- Primary Action: 108 Ambulance Dispatch -->
      <div class="card" style="border: 2px solid var(--color-danger); box-shadow: var(--shadow-danger); text-align: center; padding: 20px;">
        <button class="btn btn-danger btn-full" id="btn-dispatch-108" style="font-size: 15px; padding: 16px 14px; margin-bottom: 12px; line-height: 1.3;">
          <i data-lucide="phone-call" style="width: 22px; height: 22px;"></i>
          ${t.dial108AmbulanceBtn}
        </button>
        <div id="ambulance-dispatch-status" style="font-size: 12px; color: var(--color-danger); font-weight: 700;">
          ${t.gpsBroadcastReady}
        </div>
      </div>

      <!-- Secondary Emergency Coordination -->
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <!-- Nearest PHC Emergency Room -->
        <div class="card flex-between" style="border-left: 4px solid var(--color-danger);">
          <div>
            <div style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: var(--color-text-primary);">
              ${t.phcEmergencyWardTitle}
            </div>
            <div style="font-size: 11px; color: var(--color-text-secondary); margin-top: 2px;">
              ${t.distanceOxygenBeds}
            </div>
          </div>
          <button class="btn btn-sm btn-outline" id="btn-route-phc-er" style="color: var(--color-danger); border-color: var(--color-danger);">
            <i data-lucide="navigation"></i> ${t.routeBtn}
          </button>
        </div>

        <!-- ASHA SOS Alert Broadcast -->
        <div class="card flex-between" style="border-left: 4px solid var(--color-warning);">
          <div>
            <div style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: var(--color-text-primary);">
              ${t.alertAshaSunitaTitle}
            </div>
            <div style="font-size: 11px; color: var(--color-text-secondary); margin-top: 2px;">
              ${t.villageSubcentreDist}
            </div>
          </div>
          <button class="btn btn-sm btn-secondary" id="btn-alert-asha-sos">
            <i data-lucide="bell"></i> ${t.sendSosBtn}
          </button>
        </div>
      </div>

      <!-- Verbatim Emergency Compliance Disclaimer -->
      <div class="compliance-disclaimer" style="border-color: var(--color-danger); color: var(--color-danger); background: var(--color-danger-light);">
        ${t.emergencyWarningDisclaimer}
      </div>
    </div>
  `;
}
