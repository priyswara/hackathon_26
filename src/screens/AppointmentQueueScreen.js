/**
 * Screen: Appointment Slot Booking & Live Priority Queue (Palette 3)
 * Responsive layout with clean doctor selection, time slot pills, and real-time OPD token status.
 */

import { locales } from '../data/locales.js';

export function renderAppointmentQueueScreen(state, selectedSlot = '10:30 AM') {
  const t = locales[state.currentLanguage] || locales.en;
  const p = state.patient;
  const docs = state.doctors || [];
  const queue = state.queue || [];

  return `
    <div class="screen" id="screen-appointment-queue" style="width: 100%;">
      
      <!-- Screen Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="btn btn-outline" id="btn-back-home" style="padding: 6px 12px; min-height: 36px;" title="${t.back || 'Back'}">
            <i data-lucide="arrow-left" style="width: 15px; height: 15px;"></i>
            <span class="hide-on-mobile">${t.back || 'Back'}</span>
          </button>
          <div>
            <h1 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-text-primary);">
              ${t.bookAppointment || 'Book Appointment & Live Token'}
            </h1>
            <span style="font-size: 12px; color: var(--color-text-secondary);">
              PHC Rampur Community Health Centre • Network-Adaptive Tele-OPD
            </span>
          </div>
        </div>

        <span class="status-badge badge-primary">
          <i data-lucide="clock" style="width: 12px; height: 12px;"></i>
          Live Token System Active
        </span>
      </div>

      <!-- 2-Column Responsive Split on Desktop, Stacked on Mobile -->
      <div class="clinic-directory-layout" style="align-items: start;">
        
        <!-- Left: Slot Booking Form -->
        <div class="card" style="border-top: 4px solid var(--color-primary); padding: 22px;">
          
          <h2 style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="calendar-plus" style="color: var(--color-primary); width: 18px; height: 18px;"></i>
            ${t.bookNewConsultation || 'Select Doctor & Time Slot'}
          </h2>

          <!-- Select Doctor -->
          <div class="form-group">
            <label class="form-label" for="select-doctor">${t.selectDoctor || 'Choose Doctor'}</label>
            <select class="form-select" id="select-doctor">
              ${docs.map(doc => `
                <option value="${doc.name}">${doc.name} — ${doc.specialty} (${doc.location})</option>
              `).join('')}
            </select>
          </div>

          <!-- Select Health Centre Facility -->
          <div class="form-group">
            <label class="form-label" for="select-facility">Healthcare Facility</label>
            <select class="form-select" id="select-facility">
              <option value="PHC Rampur Community Health Centre">PHC Rampur Community Health Centre (2.4 km)</option>
              <option value="Ayushman Arogya Mandir (Rampur Sub-Centre)">Ayushman Arogya Mandir (0.8 km)</option>
              <option value="CHC Kotra Block Hospital">CHC Kotra Block Hospital (14 km)</option>
            </select>
          </div>

          <!-- Time Slots Picker -->
          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label">${t.availableSlots || 'Available Slots for Today'}</label>
            <div class="slots-grid" id="slot-picker-grid">
              ${['10:30 AM', '11:15 AM', '02:00 PM', '03:30 PM', '04:45 PM'].map(slot => `
                <button type="button" class="slot-pill ${slot === selectedSlot ? 'selected' : ''}" data-slot="${slot}">
                  ${slot}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Confirm Booking Button -->
          <button type="button" class="btn btn-primary btn-full" id="btn-confirm-appointment" style="padding: 12px; font-size: 14.5px;">
            <i data-lucide="check-circle" style="width: 17px; height: 17px;"></i>
            <span>${t.confirmBooking || 'Generate Token & Confirm'}</span>
          </button>
        </div>

        <!-- Right: Current Active Token & Live Priority Queue -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          
          <!-- Active Token Highlight Banner (Forest Green Card) -->
          <div class="card card-hero" style="padding: 20px 22px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.9;">
                ${t.activeTokenLabel || 'Your Active OPD Token'}
              </span>
              <span class="status-badge" style="background: rgba(255,255,255,0.22); color: #FFFFFF; font-size: 11px;">
                ● Serving Now: B-11
              </span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-end;">
              <div>
                <div style="font-family: var(--font-heading); font-size: 36px; font-weight: 800; line-height: 1; letter-spacing: 1px;">
                  ${p.activeToken || 'B-14'}
                </div>
                <div style="font-size: 12px; opacity: 0.9; margin-top: 6px;">
                  Rampur Tele-OPD Consultation
                </div>
              </div>

              <div style="text-align: right;">
                <div style="font-family: var(--font-heading); font-size: 26px; font-weight: 800; color: #FFFFFF;">
                  #${p.queuePosition || '3'}
                </div>
                <div style="font-size: 11px; opacity: 0.85;">
                  ${t.peopleAhead || 'Ahead in queue'} (~${p.estimatedWaitMins || 10}m)
                </div>
              </div>
            </div>
          </div>

          <!-- Live Priority Queue Table -->
          <div class="card" style="padding: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-family: var(--font-heading); font-size: 14.5px; font-weight: 700; color: var(--color-text-primary); display: flex; align-items: center; gap: 6px;">
                <i data-lucide="users" style="width: 16px; height: 16px; color: var(--color-primary);"></i>
                ${t.triageQueue || 'Live OPD Triage Queue'}
              </span>
              <span style="font-size: 11px; color: var(--color-text-muted);">
                ${t.sortedByUrgency || 'Urgency Priority'}
              </span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${queue.map(item => {
                const isCurrent = item.token === p.activeToken;
                const isServing = item.status === 'serving';
                const badgeClass = item.priorityLevel === 'High' ? 'badge-danger' : (item.priorityLevel === 'Medium' ? 'badge-warning' : 'badge-primary');
                
                return `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-radius: var(--radius-sm); border: 1px solid ${isCurrent ? 'var(--color-primary)' : 'var(--color-border)'}; background: ${isCurrent ? 'var(--color-primary-light)' : (isServing ? 'var(--color-surface-hover)' : 'var(--color-surface)')};">
                    
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span style="font-family: var(--font-heading); font-weight: 800; font-size: 15px; color: ${isCurrent ? 'var(--color-primary)' : 'var(--color-text-primary)'}; width: 38px;">
                        ${item.token}
                      </span>
                      <div>
                        <div style="font-size: 13px; font-weight: 700; color: var(--color-text-primary);">
                          ${item.patientName} ${isCurrent ? `<span style="color: var(--color-primary); font-size: 10.5px; font-weight: 800;">(You)</span>` : ''}
                        </div>
                        <div style="font-size: 11px; color: var(--color-text-muted);">
                          Wait: ${item.waitTime || '5 min'}
                        </div>
                      </div>
                    </div>

                    <span class="status-badge ${badgeClass}" style="font-size: 10px;">
                      ${item.priorityLevel || 'Medium'}
                    </span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}
