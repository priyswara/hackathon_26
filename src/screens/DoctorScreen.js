/**
 * Screen 11: Doctor Tele-OPD Console
 * Professional Responsive Web Layout with 4 Stat Cards, Split Consultation Station & Priority Queue Table
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
          <h2 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-text-primary);">${t.doctorDashboard}</h2>
          <span style="font-size: 12px; color: var(--color-primary); font-weight: 700;">${t.docHeaderInfo} • PHC Telemedicine Hub</span>
        </div>
        <span class="status-badge badge-success" style="font-size: 11px; padding: 4px 12px;">● ${t.onlineTeleOpdBadge}</span>
      </div>

      <!-- 4 Stat Cards Grid on Desktop -->
      <div class="grid-4">
        <div class="stat-card" style="border-bottom: 4px solid var(--color-primary);">
          <div class="stat-number" style="color: var(--color-primary);">12</div>
          <div class="stat-label">Patients in Queue</div>
        </div>

        <div class="stat-card" style="border-bottom: 4px solid var(--color-danger);">
          <div class="stat-number" style="color: var(--color-danger);">03</div>
          <div class="stat-label">${t.highPriorityBadge} Emergency</div>
        </div>

        <div class="stat-card" style="border-bottom: 4px solid var(--color-warning);">
          <div class="stat-number" style="color: var(--color-warning);">01</div>
          <div class="stat-label">Currently Consulting</div>
        </div>

        <div class="stat-card" style="border-bottom: 4px solid var(--color-success);">
          <div class="stat-number" style="color: var(--color-success);">18</div>
          <div class="stat-label">Completed Today</div>
        </div>
      </div>

      <!-- 2-Column Responsive Layout -->
      <div class="split-1-2" style="align-items: start; gap: 24px;">
        
        <!-- Left Column: Current Patient Consultation Card & Quick Clinical Actions -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <!-- Current Serving Patient Card -->
          <div class="card" style="background: linear-gradient(135deg, #1E1B2E 0%, #29243E 100%); color: #FFFFFF; border: none; padding: 24px;">
            <div class="flex-between" style="margin-bottom: 8px;">
              <span style="font-size: 11.5px; font-weight: 700; color: var(--color-accent); text-transform: uppercase; letter-spacing: 0.5px;">${t.currentlyConsultingTitle}</span>
              <span class="status-badge badge-warning" style="font-size: 10px;">${t.tokenB11Badge}</span>
            </div>

            <div style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; margin-bottom: 4px;">
              ${t.patientGangaRamInfo}
            </div>
            <div style="font-size: 13px; color: rgba(255, 255, 255, 0.85); margin-bottom: 18px; line-height: 1.4;">
              ${t.gangaRamSymptoms}
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              <button class="btn btn-primary btn-full" id="btn-doc-start-call" style="background: var(--color-primary); padding: 11px;">
                <i data-lucide="video"></i> ${t.connectVideoAudioBtn}
              </button>
              <button class="btn btn-secondary btn-full" id="btn-doc-open-chat" style="background: rgba(255, 255, 255, 0.15); color: #FFFFFF; border: none; padding: 11px;">
                <i data-lucide="message-square"></i> ${t.openChatBtn}
              </button>
            </div>
          </div>

          <!-- Quick Doctor Action Card -->
          <div class="card" style="padding: 20px; background: #FAF9FD;">
            <div style="font-family: var(--font-heading); font-size: 14px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 12px;">
              ${t.quickClinicalActionsTitle}
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <button class="btn btn-secondary btn-full" id="btn-doc-issue-rx" style="font-size: 12px; padding: 9px;">
                <i data-lucide="file-check"></i> ${t.oneClickRxBtn}
              </button>
              <button class="btn btn-outline btn-full" id="btn-doc-refer-dh" style="font-size: 12px; padding: 9px; color: var(--color-warning); border-color: var(--color-warning);">
                <i data-lucide="arrow-up-right"></i> ${t.referDistrictBtn}
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column: Live Priority Queue List Table -->
        <div class="card" style="padding: 24px;">
          <div class="section-header" style="margin-bottom: 16px;">
            <h3 class="section-title">
              <i data-lucide="list-ordered" style="color: var(--color-primary); width: 20px; height: 20px;"></i>
              ${t.livePrioritizedQueueWaiting}
            </h3>
            <span class="status-badge badge-primary" style="font-size: 10px;">${queue.length} Active Patients</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${queue.map(item => {
              const isHigh = item.priorityLevel === 'High';
              const isMedium = item.priorityLevel === 'Medium';
              const priorityText = priorityLabelMap[item.priorityLevel] || item.priorityLevel;

              return `
                <div class="card flex-between" style="padding: 14px 18px; border-left: 5px solid ${isHigh ? 'var(--color-danger)' : (isMedium ? 'var(--color-warning)' : 'var(--color-primary)')}; background: #FAF9FD;">
                  <div style="display: flex; align-items: center; gap: 14px;">
                    <div style="font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: var(--color-text-primary); width: 44px;">
                      ${item.token}
                    </div>
                    <div>
                      <div style="font-family: var(--font-heading); font-size: 14.5px; font-weight: 800; color: var(--color-text-primary);">
                        ${item.patientName}
                      </div>
                      <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; margin-top: 2px;">
                        <span class="status-badge ${isHigh ? 'badge-danger' : (isMedium ? 'badge-warning' : 'badge-primary')}" style="padding: 2px 7px; font-size: 9.5px;">
                          ${priorityText}
                        </span>
                        <span style="color: var(--color-text-muted);">${t.waitTimePrefix} ${item.waitTime}</span>
                      </div>
                    </div>
                  </div>

                  <div style="display: flex; gap: 8px;">
                    <button class="btn btn-sm btn-outline btn-doc-view-record" data-patient="${item.patientName}" style="padding: 7px 12px; font-size: 12px;" title="${t.viewRecordTitle}">
                      <i data-lucide="file-text" style="width: 15px; height: 15px;"></i>
                    </button>
                    <button class="btn btn-sm btn-primary btn-doc-call-patient" data-token="${item.token}" style="padding: 7px 14px; font-size: 12px;" title="${t.admitConsultTitle}">
                      <i data-lucide="play" style="width: 15px; height: 15px;"></i>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>

      <div class="compliance-disclaimer" style="margin-top: 10px;">
        ${t.hprDisclaimer}
      </div>
    </div>
  `;
}
