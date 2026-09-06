/**
 * Screen: HEALER Appointments Management
 * Clean, focused view of Upcoming and Past appointments with token numbers,
 * statuses, and cancellation controls.
 */

import { locales } from '../data/locales.js';

export function renderAppointmentsScreen(state, activeTab = 'upcoming') {
  const t = locales[state.currentLanguage] || locales.en;
  const allAppointments = state.appointments || [];

  const upcomingAppts = allAppointments.filter(a => a.isUpcoming && a.status !== 'cancelled');
  const pastAppts = allAppointments.filter(a => !a.isUpcoming || a.status === 'cancelled');

  const displayedAppts = activeTab === 'upcoming' ? upcomingAppts : pastAppts;

  return `
    <div class="screen" id="screen-appointments" style="max-width: 780px; margin: 0 auto; width: 100%;">
      
      <!-- Top Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h1 style="font-size: 22px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
            ${t.appointmentsTitle || 'Appointments'}
          </h1>
          <p style="font-size: 13.5px; color: var(--color-text-secondary);">
            ${t.appointmentsSub || 'Manage your scheduled and past visits.'}
          </p>
        </div>

        <button class="btn btn-primary" id="btn-appointments-book-new">
          <i data-lucide="calendar-plus" style="width: 16px; height: 16px;"></i>
          <span>${t.btnBookNew || 'Book an Appointment'}</span>
        </button>
      </div>

      <!-- 2 Tabs: Upcoming & Past -->
      <div style="display: flex; border-bottom: 1.5px solid var(--color-border); margin-bottom: 20px; gap: 8px;">
        <button class="btn btn-ghost ${activeTab === 'upcoming' ? 'active' : ''}" id="tab-btn-upcoming" style="border-radius: 0; border-bottom: 3px solid ${activeTab === 'upcoming' ? 'var(--color-primary)' : 'transparent'}; font-weight: 700; color: ${activeTab === 'upcoming' ? 'var(--color-primary)' : 'var(--color-text-secondary)'};">
          ${t.tabUpcoming || 'Upcoming'} (${upcomingAppts.length})
        </button>
        <button class="btn btn-ghost ${activeTab === 'past' ? 'active' : ''}" id="tab-btn-past" style="border-radius: 0; border-bottom: 3px solid ${activeTab === 'past' ? 'var(--color-primary)' : 'transparent'}; font-weight: 700; color: ${activeTab === 'past' ? 'var(--color-primary)' : 'var(--color-text-secondary)'};">
          ${t.tabPast || 'Past'} (${pastAppts.length})
        </button>
      </div>

      <!-- Appointments List -->
      ${displayedAppts.length === 0 ? `
        <div class="card" style="text-align: center; padding: 48px 24px;">
          <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
            <i data-lucide="calendar-x" style="width: 26px; height: 26px;"></i>
          </div>
          <h3 style="font-size: 17px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 6px;">
            ${activeTab === 'upcoming' ? (t.noUpcomingTitle || 'No upcoming appointments') : (t.noPastTitle || 'No past appointments')}
          </h3>
          <p style="font-size: 13.5px; color: var(--color-text-secondary); max-width: 360px; margin: 0 auto 20px auto;">
            ${activeTab === 'upcoming' ? (t.noUpcomingDesc || 'You do not have any appointments scheduled.') : (t.noPastDesc || 'Your completed visits will appear here.')}
          </p>
          ${activeTab === 'upcoming' ? `
            <button class="btn btn-primary" id="btn-empty-book-appt">
              <i data-lucide="calendar-plus" style="width: 15px; height: 15px;"></i>
              <span>${t.btnBookNew || 'Book an Appointment'}</span>
            </button>
          ` : ''}
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${displayedAppts.map(appt => {
            const isConfirmed = appt.status === 'confirmed';
            const isCancelled = appt.status === 'cancelled';
            const statusClass = isConfirmed ? 'badge-primary' : (isCancelled ? 'badge-danger' : 'badge-success');
            const statusLabel = isConfirmed ? (t.statusConfirmed || 'Confirmed') : (isCancelled ? (t.statusCancelled || 'Cancelled') : (t.statusCompleted || 'Completed'));

            return `
              <div class="card" style="padding: 20px 22px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
                  <div>
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
                      <span style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-primary);">
                        #${appt.token}
                      </span>
                      <span class="status-badge ${statusClass}">
                        ${statusLabel}
                      </span>
                    </div>
                    <div style="font-size: 15px; font-weight: 700; color: var(--color-text-primary);">
                      ${appt.service || 'General OPD Consultation'}
                    </div>
                  </div>

                  <div style="text-align: right;">
                    <div style="font-size: 14px; font-weight: 700; color: var(--color-text-primary);">
                      ${appt.time}
                    </div>
                    <div style="font-size: 12px; color: var(--color-text-secondary);">
                      ${appt.date}
                    </div>
                  </div>
                </div>

                <div style="background: var(--color-surface-muted); padding: 12px 14px; border-radius: var(--radius-sm); margin-bottom: 14px; display: flex; flex-direction: column; gap: 4px; font-size: 13px;">
                  <div><span style="color: var(--color-text-secondary);">${t.wizardStep1 || 'Facility'}:</span> <strong>${appt.facility}</strong></div>
                  <div><span style="color: var(--color-text-secondary);">${t.wizardStep3 || 'Doctor'}:</span> <strong>${appt.doctor}</strong></div>
                </div>

                ${isConfirmed && appt.isUpcoming ? `
                  <div style="display: flex; justify-content: flex-end; gap: 10px;">
                    <button class="btn btn-outline btn-sm btn-cancel-appointment" data-appt-id="${appt.id}" style="color: var(--color-danger); border-color: rgba(214, 69, 69, 0.3);">
                      <i data-lucide="x" style="width: 14px; height: 14px;"></i>
                      <span>${t.btnCancel || 'Cancel'}</span>
                    </button>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      `}

    </div>
  `;
}
