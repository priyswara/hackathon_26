/**
 * Screen 9: Follow-ups & ASHA Coordination
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
        <button class="header-btn" id="btn-back-home" title="${t.back}">
          <i data-lucide="arrow-left"></i>
        </button>
        <h2 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700;">${t.followUps}</h2>
        <div style="width: 36px;"></div>
      </div>

      <!-- Assigned ASHA Card -->
      <div class="card" style="background: linear-gradient(135deg, #FAF5FF 0%, #F3EEFF 100%); border: 1.5px solid rgba(108, 60, 233, 0.3);">
        <div class="flex-between" style="margin-bottom: 8px;">
          <span style="font-size: 11px; font-weight: 700; color: var(--color-primary-dark); text-transform: uppercase;">${t.designatedWorkerTitle}</span>
          <span class="status-badge badge-success" style="font-size: 9px;">${t.activeInVillageBadge}</span>
        </div>

        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="width: 46px; height: 46px; border-radius: 50%; background: var(--color-primary); color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-weight: 700; font-size: 16px;">
            SD
          </div>
          <div>
            <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--color-text-primary);">${t.sunitaDeviRole}</div>
            <div style="font-size: 11px; color: var(--color-text-secondary);">${t.sunitaDeviLocation}</div>
            <div style="font-size: 11px; color: var(--color-primary); font-weight: 600; margin-top: 2px;">+91 94250 88219</div>
          </div>
        </div>

        <div style="display: flex; gap: 8px;">
          <button class="btn btn-sm btn-primary" id="btn-call-asha-direct" style="flex: 1;">
            <i data-lucide="phone"></i> ${t.callSunitaBtn}
          </button>
          <button class="btn btn-sm btn-secondary" id="btn-msg-asha-direct" style="flex: 1;">
            <i data-lucide="message-square"></i> ${t.requestVisitBtn}
          </button>
        </div>
      </div>

      <!-- Scheduled Reminders & Follow-up Tasks -->
      <div class="section-header">
        <h3 class="section-title">
          <i data-lucide="calendar-check" style="color: var(--color-primary); width: 18px; height: 18px;"></i>
          ${t.upcomingCareCheckinsTitle}
        </h3>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${followUps.map(item => {
          const localizedItem = followUpItemMap[item.id] || { title: item.title, purpose: item.purpose, dueDate: item.dueDate };
          const statusText = statusMap[item.status] || item.status;

          return `
            <div class="card" style="padding: 14px; border-left: 4px solid var(--color-primary);">
              <div class="flex-between" style="margin-bottom: 4px;">
                <div style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: var(--color-text-primary);">
                  ${localizedItem.title}
                </div>
                <span class="status-badge badge-primary" style="font-size: 9px;">${statusText}</span>
              </div>

              <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 6px;">
                ${localizedItem.purpose}
              </div>

              <div class="flex-between" style="font-size: 11px; color: var(--color-text-muted);">
                <span><i data-lucide="user" style="width: 12px; height: 12px; display: inline-block;"></i> ${item.workerName}</span>
                <span style="font-weight: 600; color: var(--color-primary);">${localizedItem.dueDate}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="compliance-disclaimer">
        ${t.ashaContinuityDisclaimer}
      </div>
    </div>
  `;
}
