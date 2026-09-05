/**
 * Screen 2: Patient Home
 */

import { locales } from '../data/locales.js';

export function renderPatientHomeScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const p = state.patient;

  return `
    <div class="screen" id="screen-patient-home">
      <!-- Patient Profile Summary -->
      <div class="flex-between">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, var(--color-primary), #8B5CF6); color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-weight: 700; font-size: 16px; box-shadow: 0 4px 10px rgba(108, 60, 233, 0.25);">
            RK
          </div>
          <div>
            <h2 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; color: var(--color-text-primary); line-height: 1.2;">${t.welcomeBack}</h2>
            <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--color-text-secondary); margin-top: 2px;">
              <span>${t.abhaId}</span>
              <span class="status-badge badge-success" style="padding: 1px 6px; font-size: 9px;">${t.abhaLinked}</span>
            </div>
          </div>
        </div>

        <button class="header-btn" id="btn-quick-voice" title="${t.tapToSpeak}">
          <i data-lucide="mic" style="color: var(--color-primary);"></i>
        </button>
      </div>

      <!-- Live Active Token Banner -->
      <div class="token-card card-clickable" id="card-active-token" title="Tap to view live queue">
        <div class="flex-between" style="margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span class="status-badge badge-warning" style="background: rgba(232, 140, 31, 0.2); color: #FFB356; border: 1px solid rgba(232, 140, 31, 0.4);">
              <span class="badge-dot-indicator" style="background: #FFB356;"></span> ${t.liveQueueBadge}
            </span>
            <span style="font-size: 11px; color: rgba(255, 255, 255, 0.7);">${t.phcLocation}</span>
          </div>
          <i data-lucide="arrow-right" style="color: rgba(255, 255, 255, 0.6); width: 16px; height: 16px;"></i>
        </div>

        <div class="flex-between" style="align-items: flex-end;">
          <div>
            <span style="font-size: 12px; color: rgba(255, 255, 255, 0.8); text-transform: uppercase; font-weight: 600;">${t.yourTokenNumber}</span>
            <div class="token-digits">${p.activeToken}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 13px; font-weight: 700; color: #FFFFFF;">${t.servingNow}</div>
            <div style="font-size: 11px; color: var(--color-accent); font-weight: 600; margin-top: 2px;">${t.estWait}</div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div class="section-header">
        <h3 class="section-title">
          <i data-lucide="grid" style="color: var(--color-primary); width: 18px; height: 18px;"></i>
          ${t.quickActions}
        </h3>
      </div>

      <div class="grid-2">
        <!-- 1: Book OPD Slot -->
        <div class="action-tile" id="action-book-opd">
          <div class="action-icon-circle" style="background: #F3EEFF; color: var(--color-primary);">
            <i data-lucide="calendar-plus"></i>
          </div>
          <div class="action-tile-title">${t.bookAppointment}</div>
          <div class="action-tile-desc">${t.phcDoctorsDesc}</div>
        </div>

        <!-- 2: Digital Triage -->
        <div class="action-tile" id="action-triage">
          <div class="action-icon-circle" style="background: #E8F7EE; color: var(--color-success);">
            <i data-lucide="activity"></i>
          </div>
          <div class="action-tile-title">${t.digitalTriage}</div>
          <div class="action-tile-desc">${t.triageDesc}</div>
        </div>

        <!-- 3: Network Teleconsult (Hero) -->
        <div class="action-tile" id="action-teleconsult" style="border: 1.5px solid rgba(108, 60, 233, 0.3); background: #FAF9FD;">
          <div class="action-icon-circle" style="background: var(--color-primary); color: #FFFFFF;">
            <i data-lucide="video"></i>
          </div>
          <div class="action-tile-title" style="color: var(--color-primary);">${t.consultDoctor}</div>
          <div class="action-tile-desc">${t.adaptiveTeleconsultDesc}</div>
        </div>

        <!-- 4: Connected Health Journey -->
        <div class="action-tile" id="action-health-journey">
          <div class="action-icon-circle" style="background: #FEF6EC; color: var(--color-warning);">
            <i data-lucide="git-commit"></i>
          </div>
          <div class="action-tile-title">${t.careJourney}</div>
          <div class="action-tile-desc">${t.unifiedJourneyDesc}</div>
        </div>

        <!-- 5: Medicine Stock -->
        <div class="action-tile" id="action-medicines">
          <div class="action-icon-circle" style="background: #E6FAF5; color: #00A37D;">
            <i data-lucide="pill"></i>
          </div>
          <div class="action-tile-title">${t.medicineStock}</div>
          <div class="action-tile-desc">${t.livePharmacyDesc}</div>
        </div>

        <!-- 6: Diagnostics & Lab -->
        <div class="action-tile" id="action-diagnostics">
          <div class="action-icon-circle" style="background: #F4F0FF; color: #7C3AED;">
            <i data-lucide="flask-conical"></i>
          </div>
          <div class="action-tile-title">${t.diagnostics}</div>
          <div class="action-tile-desc">${t.freeDiagnosticsDesc}</div>
        </div>

        <!-- 7: Follow-ups & ASHA -->
        <div class="action-tile" id="action-followups">
          <div class="action-icon-circle" style="background: #FDF2F8; color: #DB2777;">
            <i data-lucide="heart-handshake"></i>
          </div>
          <div class="action-tile-title">${t.followUps}</div>
          <div class="action-tile-desc">${t.homeVisitsDesc}</div>
        </div>

        <!-- 8: Government Schemes -->
        <div class="action-tile" id="action-schemes">
          <div class="action-icon-circle" style="background: #EFF6FF; color: #2563EB;">
            <i data-lucide="shield"></i>
          </div>
          <div class="action-tile-title">${t.schemes}</div>
          <div class="action-tile-desc">${t.pmjayDesc}</div>
        </div>
      </div>

      <!-- ASHA Contact Quick Card -->
      <div class="card card-clickable flex-between" id="card-asha-contact" style="background: #FAF9FD; border-left: 4px solid var(--color-primary);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center;">
            <i data-lucide="phone-call" style="width: 18px; height: 18px;"></i>
          </div>
          <div>
            <div style="font-family: var(--font-heading); font-size: 13px; font-weight: 700; color: var(--color-text-primary);">${t.assignedAsha}</div>
            <div style="font-size: 11px; color: var(--color-text-secondary);">${t.nextHomeVisitTomorrow}</div>
          </div>
        </div>
        <button class="btn btn-sm btn-primary" style="padding: 6px 12px; font-size: 11px;">${t.callBtn}</button>
      </div>
    </div>
  `;
}
