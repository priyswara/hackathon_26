/**
 * Screen 14: Emergency / High Priority SOS (Red-Only)
 * Professional Responsive Web Layout for Urgent Medical Response & 108 Dispatch
 */

import { locales } from '../data/locales.js';

export function renderEmergencyScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;

  return `
    <div class="screen" id="screen-emergency">
      <!-- Screen Header -->
      <div class="flex-between">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="header-btn" id="btn-back-home" style="background: rgba(226, 61, 61, 0.1); border-color: rgba(226, 61, 61, 0.3);" title="${t.back}">
            <i data-lucide="arrow-left" style="color: var(--color-danger);"></i>
          </button>
          <div>
            <h2 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-danger);">${t.emergencySosModeTitle}</h2>
            <div style="font-size: 12px; color: var(--color-danger); font-weight: 600;">Immediate Priority Medical Response Mode</div>
          </div>
        </div>
      </div>

      <!-- Pulsing Emergency Warning Banner -->
      <div class="emergency-screen-banner" style="padding: 28px 32px;">
        <div style="font-size: 36px; margin-bottom: 6px;">🚨</div>
        <h1 style="font-family: var(--font-heading); font-size: 24px; font-weight: 800; line-height: 1.2;">
          ${t.criticalEmergencyResponseTitle}
        </h1>
        <p style="font-size: 13.5px; opacity: 0.95; margin-top: 6px; max-width: 680px; margin-left: auto; margin-right: auto; line-height: 1.5;">
          ${t.emergencyBannerDesc}
        </p>
      </div>

      <!-- 2-Column Responsive Layout -->
      <div class="split-1-1" style="align-items: stretch; gap: 24px;">
        
        <!-- Left Column: Primary 108 Ambulance Dispatch Console -->
        <div class="card" style="border: 2px solid var(--color-danger); box-shadow: var(--shadow-danger); text-align: center; padding: 28px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--color-danger-light); color: var(--color-danger); display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <i data-lucide="ambulance" style="width: 28px; height: 28px;"></i>
          </div>

          <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: var(--color-danger); margin-bottom: 8px;">
            National Ambulance Hotline
          </h3>

          <button class="btn btn-danger btn-full" id="btn-dispatch-108" style="font-size: 16px; padding: 16px 20px; margin-bottom: 14px; line-height: 1.3;">
            <i data-lucide="phone-call" style="width: 22px; height: 22px;"></i>
            ${t.dial108AmbulanceBtn}
          </button>
          
          <div id="ambulance-dispatch-status" style="font-size: 13px; color: var(--color-danger); font-weight: 700;">
            ${t.gpsBroadcastReady}
          </div>
        </div>

        <!-- Right Column: Secondary Emergency Coordination -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <!-- Nearest PHC Emergency Room -->
          <div class="card flex-between" style="border-left: 5px solid var(--color-danger); padding: 20px 24px;">
            <div>
              <div style="font-family: var(--font-heading); font-size: 15.5px; font-weight: 800; color: var(--color-text-primary);">
                ${t.phcEmergencyWardTitle}
              </div>
              <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 4px;">
                ${t.distanceOxygenBeds}
              </div>
            </div>
            <button class="btn btn-outline" id="btn-route-phc-er" style="color: var(--color-danger); border-color: var(--color-danger); padding: 9px 16px;">
              <i data-lucide="navigation"></i> ${t.routeBtn}
            </button>
          </div>

          <!-- ASHA SOS Alert Broadcast -->
          <div class="card flex-between" style="border-left: 5px solid var(--color-warning); padding: 20px 24px;">
            <div>
              <div style="font-family: var(--font-heading); font-size: 15.5px; font-weight: 800; color: var(--color-text-primary);">
                ${t.alertAshaSunitaTitle}
              </div>
              <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 4px;">
                ${t.villageSubcentreDist}
              </div>
            </div>
            <button class="btn btn-secondary" id="btn-alert-asha-sos" style="padding: 9px 16px;">
              <i data-lucide="bell"></i> ${t.sendSosBtn}
            </button>
          </div>
        </div>

      </div>

      <!-- Verbatim Emergency Compliance Disclaimer -->
      <div class="compliance-disclaimer" style="border-color: var(--color-danger); color: var(--color-danger); background: var(--color-danger-light); margin-top: 10px;">
        ${t.emergencyWarningDisclaimer}
      </div>
    </div>
  `;
}
