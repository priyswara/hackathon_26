/**
 * Screen 3: Appointment & Live Priority Queue
 */

import { locales } from '../data/locales.js';

export function renderAppointmentQueueScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const p = state.patient;
  const docs = state.doctors;
  const queue = state.queue;

  const docSpecialtyMap = {
    'General Medicine': t.docSpecialtyGenMed,
    'Pediatrics / Child Specialist': t.docSpecialtyPediatrics,
    'Obstetrics & Gynecology (Maternal)': t.docSpecialtyGyn
  };

  const priorityLabelMap = {
    High: t.highPriorityBadge,
    Medium: t.mediumPriorityBadge,
    Low: t.lowPriorityBadge
  };

  const statusLabelMap = {
    waiting: t.waitingStatus,
    serving: t.servingStatus,
    done: t.doneStatus
  };

  return `
    <div class="screen" id="screen-appointment-queue">
      <!-- Screen Header with Back Button -->
      <div class="flex-between">
        <button class="header-btn" id="btn-back-home" title="${t.back}">
          <i data-lucide="arrow-left"></i>
        </button>
        <h2 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700;">${t.bookAppointment}</h2>
        <div style="width: 36px;"></div>
      </div>

      <!-- Current Token Status Banner -->
      <div class="token-card">
        <div class="flex-between" style="margin-bottom: 6px;">
          <span style="font-size: 12px; color: rgba(255, 255, 255, 0.7); text-transform: uppercase; font-weight: 600;">${t.activeTokenLabel}</span>
          <span class="status-badge badge-warning" style="background: rgba(232, 140, 31, 0.25); color: #FFB356;">
            <span class="badge-dot-indicator" style="background: #FFB356;"></span> ${t.servingNow}
          </span>
        </div>
        <div class="flex-between" style="align-items: flex-end;">
          <div>
            <div class="token-digits">${p.activeToken}</div>
            <div style="font-size: 12px; color: rgba(255, 255, 255, 0.85); margin-top: 4px;">${t.phcLocation}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 20px; font-weight: 800; color: var(--color-accent);">${p.queuePosition}</div>
            <div style="font-size: 11px; color: rgba(255, 255, 255, 0.7);">${t.peopleAhead}</div>
          </div>
        </div>
      </div>

      <!-- Book New Appointment Form -->
      <div class="card" style="border-top: 3px solid var(--color-primary);">
        <h3 style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 12px;">
          <i data-lucide="calendar" style="color: var(--color-primary); width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i>
          ${t.bookNewConsultation}
        </h3>

        <!-- Doctor Select -->
        <div class="input-group" style="margin-bottom: 12px;">
          <label class="input-label">${t.selectDoctor}</label>
          <select class="input-field" id="select-doctor" style="cursor: pointer;">
            ${docs.map(doc => {
              const spec = docSpecialtyMap[doc.specialty] || doc.specialty;
              return `<option value="${doc.name}">${doc.name} — ${spec} (${doc.location})</option>`;
            }).join('')}
          </select>
        </div>

        <!-- Time Slots -->
        <div class="input-group" style="margin-bottom: 16px;">
          <label class="input-label">${t.availableSlots}</label>
          <div class="grid-3" id="slot-picker-grid">
            <button class="btn btn-sm btn-secondary slot-btn active" data-slot="10:30 AM">10:30 AM</button>
            <button class="btn btn-sm btn-outline slot-btn" data-slot="11:15 AM">11:15 AM</button>
            <button class="btn btn-sm btn-outline slot-btn" data-slot="02:00 PM">02:00 PM</button>
            <button class="btn btn-sm btn-outline slot-btn" data-slot="03:30 PM">03:30 PM</button>
            <button class="btn btn-sm btn-outline slot-btn" style="opacity: 0.4; cursor: not-allowed;" disabled title="${t.bookedSlotTag}">04:15 PM ${t.bookedSlotTag}</button>
            <button class="btn btn-sm btn-outline slot-btn" data-slot="04:45 PM">04:45 PM</button>
          </div>
        </div>

        <button class="btn btn-primary btn-full" id="btn-confirm-appointment">
          <i data-lucide="check-circle-2"></i>
          ${t.confirmBooking}
        </button>
      </div>

      <!-- Live Priority-Sorted Queue List -->
      <div class="section-header">
        <h3 class="section-title">
          <i data-lucide="users" style="color: var(--color-primary); width: 18px; height: 18px;"></i>
          ${t.triageQueue}
        </h3>
        <span style="font-size: 10px; color: var(--color-text-muted);">${t.sortedByUrgency}</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${queue.map(item => {
          const isCurrentPatient = item.token === p.activeToken;
          const isServing = item.status === 'serving';
          const badgeClass = item.priorityLevel === 'High' ? 'badge-danger' : (item.priorityLevel === 'Medium' ? 'badge-warning' : 'badge-primary');
          const priorityText = priorityLabelMap[item.priorityLevel] || item.priorityLevel;
          const statusText = isServing ? t.nowServingBadge : (statusLabelMap[item.status] || item.status);
          
          return `
            <div class="card flex-between" style="padding: 12px 14px; border-left: 4px solid ${isServing ? 'var(--color-accent)' : (isCurrentPatient ? 'var(--color-primary)' : 'var(--color-border)')}; background: ${isCurrentPatient ? 'var(--color-primary-light)' : 'var(--color-surface)'};">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: ${isCurrentPatient ? 'var(--color-primary)' : 'var(--color-text-primary)'}; width: 44px;">
                  ${item.token}
                </div>
                <div>
                  <div style="font-family: var(--font-heading); font-size: 13px; font-weight: 700; color: var(--color-text-primary);">
                    ${item.patientName} ${isCurrentPatient ? `<span style="color: var(--color-primary); font-size: 11px;">${t.youTag}</span>` : ''}
                  </div>
                  <div style="display: flex; align-items: center; gap: 6px; margin-top: 2px;">
                    <span class="status-badge ${badgeClass}" style="padding: 1px 6px; font-size: 9px;">${priorityText}</span>
                    <span style="font-size: 11px; color: var(--color-text-muted);">• ${t.waitTimePrefix} ${item.waitTime}</span>
                  </div>
                </div>
              </div>

              ${isServing ? `
                <span class="status-badge badge-success" style="font-size: 10px;">${t.nowServingBadge}</span>
              ` : `
                <span style="font-size: 11px; font-weight: 600; color: var(--color-text-secondary); text-transform: capitalize;">${statusText}</span>
              `}
            </div>
          `;
        }).join('')}
      </div>

      <div class="compliance-disclaimer">
        ${t.queueAlgorithmDisclaimer}
      </div>
    </div>
  `;
}
