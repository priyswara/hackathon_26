/**
 * Screen 11: Doctor Tele-OPD Console
 */

import { locales } from '../data/locales.js';

export function renderDoctorScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const queue = state.queue || [];

  const priorityLabelMap = {
    High: t.highPriorityBadge,
    Medium: t.mediumPriorityBadge,
    Low: t.lowPriorityBadge
  };

  return `
    <div class="screen" id="screen-doctor">
      <!-- Screen Header -->
      <div class="flex-between">
        <div>
          <h2 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: var(--color-text-primary);">${t.doctorDashboard}</h2>
          <span style="font-size: 11px; color: var(--color-primary); font-weight: 600;">${t.docHeaderInfo}</span>
        </div>
        <span class="status-badge badge-success" style="font-size: 9px;">${t.onlineTeleOpdBadge}</span>
      </div>

      <!-- Current Serving Patient Card -->
      <div class="card" style="background: linear-gradient(135deg, #1E1B2E 0%, #29243E 100%); color: #FFFFFF; border: none;">
        <div class="flex-between" style="margin-bottom: 6px;">
          <span style="font-size: 11px; font-weight: 700; color: var(--color-accent); text-transform: uppercase;">${t.currentlyConsultingTitle}</span>
          <span class="status-badge badge-warning" style="font-size: 9px;">${t.tokenB11Badge}</span>
        </div>

        <div style="font-family: var(--font-heading); font-size: 18px; font-weight: 700; margin-bottom: 2px;">
          ${t.patientGangaRamInfo}
        </div>
        <div style="font-size: 12px; color: rgba(255, 255, 255, 0.8); margin-bottom: 12px;">
          ${t.gangaRamSymptoms}
        </div>

        <div style="display: flex; gap: 8px;">
          <button class="btn btn-sm btn-primary" id="btn-doc-start-call" style="flex: 1; background: var(--color-primary);">
            <i data-lucide="video"></i> ${t.connectVideoAudioBtn}
          </button>
          <button class="btn btn-sm btn-secondary" id="btn-doc-open-chat" style="flex: 1; background: rgba(255, 255, 255, 0.15); color: #FFFFFF; border: none;">
            <i data-lucide="message-square"></i> ${t.openChatBtn}
          </button>
        </div>
      </div>

      <!-- Live Priority Queue Table -->
      <div class="section-header">
        <h3 class="section-title">
          <i data-lucide="list-ordered" style="color: var(--color-primary); width: 18px; height: 18px;"></i>
          ${t.livePrioritizedQueueWaiting}
        </h3>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${queue.map(item => {
          const isHigh = item.priorityLevel === 'High';
          const isMedium = item.priorityLevel === 'Medium';
          const priorityText = priorityLabelMap[item.priorityLevel] || item.priorityLevel;

          return `
            <div class="card flex-between" style="padding: 10px 14px; border-left: 4px solid ${isHigh ? 'var(--color-danger)' : (isMedium ? 'var(--color-warning)' : 'var(--color-primary)')};">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-text-primary); width: 40px;">
                  ${item.token}
                </div>
                <div>
                  <div style="font-family: var(--font-heading); font-size: 13px; font-weight: 700; color: var(--color-text-primary);">
                    ${item.patientName}
                  </div>
                  <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; margin-top: 1px;">
                    <span class="status-badge ${isHigh ? 'badge-danger' : (isMedium ? 'badge-warning' : 'badge-primary')}" style="padding: 1px 5px; font-size: 9px;">
                      ${priorityText}
                    </span>
                    <span style="color: var(--color-text-muted);">${t.waitTimePrefix} ${item.waitTime}</span>
                  </div>
                </div>
              </div>

              <div style="display: flex; gap: 4px;">
                <button class="btn btn-sm btn-outline btn-doc-view-record" data-patient="${item.patientName}" style="padding: 4px 8px; font-size: 11px;" title="${t.viewRecordTitle}">
                  <i data-lucide="file-text" style="width: 14px; height: 14px;"></i>
                </button>
                <button class="btn btn-sm btn-primary btn-doc-call-patient" data-token="${item.token}" style="padding: 4px 8px; font-size: 11px;" title="${t.admitConsultTitle}">
                  <i data-lucide="play" style="width: 14px; height: 14px;"></i>
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Quick Doctor Action Drawer Trigger -->
      <div class="card" style="padding: 12px; background: #FAF9FD;">
        <div style="font-family: var(--font-heading); font-size: 13px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 8px;">
          ${t.quickClinicalActionsTitle}
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-sm btn-secondary flex-1" id="btn-doc-issue-rx" style="flex: 1; font-size: 11px;">
            <i data-lucide="file-check"></i> ${t.oneClickRxBtn}
          </button>
          <button class="btn btn-sm btn-outline flex-1" id="btn-doc-refer-dh" style="flex: 1; font-size: 11px; color: var(--color-warning); border-color: var(--color-warning);">
            <i data-lucide="arrow-up-right"></i> ${t.referDistrictBtn}
          </button>
        </div>
      </div>

      <div class="compliance-disclaimer">
        ${t.hprDisclaimer}
      </div>
    </div>
  `;
}
