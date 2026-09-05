/**
 * Screen 9: Follow-ups & ASHA Coordination
 * 2-Column Responsive Web Layout for Post-Care Follow-ups & Village Field Worker Connect
 */

import { locales } from '../data/locales.js';

export function renderFollowUpsScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const followUps = state.followUps || [];

  const followUpItemMap = {
    'FU-01': { title: t.fu1Title, purpose: t.fu1Purpose, dueDate: t.fu1Date },
    'FU-02': { title: t.fu2Title, purpose: t.fu2Purpose, dueDate: t.fu2Date },
    'FU-03': { title: t.fu3Title, purpose: t.fu3Purpose, dueDate: t.fu3Date }
  };

  const statusMap = {
    'Confirmed': t.statusConfirmed,
    'Scheduled': t.statusScheduled,
    'Upcoming': t.statusUpcoming
  };

  return `
    <div class="screen" id="screen-followups">
      <!-- Screen Header -->
      <div class="flex-between">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="header-btn" id="btn-back-home" title="${t.back}">
            <i data-lucide="arrow-left"></i>
          </button>
          <div>
            <h2 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-text-primary);">${t.followUps}</h2>
            <div style="font-size: 12px; color: var(--color-text-secondary);">Post-Discharge Care & Frontline ASHA Home Visits</div>
          </div>
        </div>
      </div>

      <!-- 2-Column Responsive Layout -->
      <div class="split-1-2" style="align-items: start; gap: 24px;">
        
        <!-- Left Column: Designated ASHA Worker Contact Card -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div class="card" style="background: linear-gradient(135deg, #FAF5FF 0%, #F3EEFF 100%); border: 1.5px solid rgba(108, 60, 233, 0.3); padding: 24px;">
            <div class="flex-between" style="margin-bottom: 12px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--color-primary-dark); text-transform: uppercase; letter-spacing: 0.5px;">${t.designatedWorkerTitle}</span>
              <span class="status-badge badge-success" style="font-size: 10px;">${t.activeInVillageBadge}</span>
            </div>

            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
              <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--color-primary); color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-weight: 800; font-size: 18px; box-shadow: 0 4px 12px rgba(108, 60, 233, 0.3); flex-shrink: 0;">
                SD
              </div>
              <div>
                <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-text-primary);">${t.sunitaDeviRole}</div>
                <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 1px;">${t.sunitaDeviLocation}</div>
                <div style="font-size: 12px; color: var(--color-primary); font-weight: 700; margin-top: 3px;">+91 94250 88219</div>
              </div>
            </div>

            <div style="display: flex; gap: 10px;">
              <button class="btn btn-primary flex-1" id="btn-call-asha-direct" style="padding: 10px;">
                <i data-lucide="phone"></i> ${t.callSunitaBtn}
              </button>
              <button class="btn btn-secondary flex-1" id="btn-msg-asha-direct" style="padding: 10px;">
                <i data-lucide="message-square"></i> ${t.requestVisitBtn}
              </button>
            </div>
          </div>

          <!-- ASHA Protocol Summary Card -->
          <div class="card" style="background: var(--color-surface); padding: 18px;">
            <div style="font-family: var(--font-heading); font-size: 13.5px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 6px;">
              📋 Frontline Care Continuity
            </div>
            <p style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.4;">
              Your ASHA worker receives encrypted doctor discharge notes to perform bedside vitals checks, medication adherence reviews, and maternal care tracking.
            </p>
          </div>
        </div>

        <!-- Right Column: Scheduled Reminders & Tasks List -->
        <div class="card" style="padding: 24px;">
          <div class="section-header" style="margin-bottom: 16px;">
            <h3 class="section-title">
              <i data-lucide="calendar-check" style="color: var(--color-primary); width: 20px; height: 20px;"></i>
              ${t.upcomingCareCheckinsTitle}
            </h3>
            <span class="status-badge badge-primary" style="font-size: 10px;">${followUps.length} Pending</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${followUps.map(item => {
              const localizedItem = followUpItemMap[item.id] || { title: item.title, purpose: item.purpose, dueDate: item.dueDate };
              const statusText = statusMap[item.status] || item.status;

              return `
                <div class="card" style="padding: 16px 18px; border-left: 4px solid var(--color-primary); background: #FAF9FD;">
                  <div class="flex-between" style="margin-bottom: 4px;">
                    <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-text-primary);">
                      ${localizedItem.title}
                    </div>
                    <span class="status-badge badge-primary" style="font-size: 10px;">${statusText}</span>
                  </div>

                  <div style="font-size: 12.5px; color: var(--color-text-secondary); margin-bottom: 10px; line-height: 1.4;">
                    ${localizedItem.purpose}
                  </div>

                  <div class="flex-between" style="font-size: 12px; color: var(--color-text-muted); border-top: 1px solid var(--color-border); padding-top: 8px;">
                    <span><i data-lucide="user" style="width: 13px; height: 13px; display: inline-block; vertical-align: middle;"></i> ${item.workerName}</span>
                    <span style="font-weight: 700; color: var(--color-primary);">${localizedItem.dueDate}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>

      <div class="compliance-disclaimer" style="margin-top: 10px;">
        ${t.ashaContinuityDisclaimer}
      </div>
    </div>
  `;
}
