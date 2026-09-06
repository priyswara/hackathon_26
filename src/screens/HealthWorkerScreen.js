/**
 * Screen: HEALER Health Worker Dashboard
 * Clean, focused dashboard for frontline health workers (ASHA / ANM).
 * Primary actions: [Patients], [Appointments], [Field Activities], [Reports].
 */

import { locales } from '../data/locales.js';

export function renderHealthWorkerScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;

  const actions = [
    {
      id: 'hw-action-patients',
      title: t.hwActionPatients || 'Patients',
      desc: t.hwActionPatientsDesc || 'View and manage registered village patients',
      icon: 'users'
    },
    {
      id: 'hw-action-appointments',
      title: t.hwActionAppointments || 'Appointments',
      desc: t.hwActionAppointmentsDesc || 'Community OPD bookings and schedules',
      icon: 'calendar'
    },
    {
      id: 'hw-action-field',
      title: t.hwActionFieldActivities || 'Field Activities',
      desc: t.hwActionFieldActivitiesDesc || 'Maternal care visits and immunization',
      icon: 'heart-handshake'
    },
    {
      id: 'hw-action-reports',
      title: t.hwActionReports || 'Reports',
      desc: t.hwActionReportsDesc || 'Monthly health summaries and survey logs',
      icon: 'file-text'
    }
  ];

  return `
    <div class="screen" id="screen-health-worker" style="max-width: 900px; margin: 0 auto; width: 100%;">
      
      <!-- Top Header -->
      <div style="margin-bottom: 24px;">
        <div style="font-size: 13px; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">
          ${t.portalHealthWorkerTitle || 'Health Worker Portal'}
        </div>
        <h1 style="font-size: 24px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
          ${t.hwDashboardTitle || 'Health Worker Dashboard'}
        </h1>
        <p style="font-size: 14px; color: var(--color-text-secondary);">
          ${t.hwDashboardSub || 'Field operations, patient registers, and community care.'}
        </p>
      </div>

      <!-- 4 Primary Action Cards Grid -->
      <div class="dashboard-actions-grid">
        ${actions.map(act => `
          <div class="dashboard-action-card" id="${act.id}">
            <div class="dashboard-action-icon">
              <i data-lucide="${act.icon}"></i>
            </div>
            <div>
              <h3 class="dashboard-action-title">${act.title}</h3>
              <p class="dashboard-action-desc">${act.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Quick Summary List -->
      <div class="card" style="padding: 22px;">
        <h3 style="font-size: 16px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
          <i data-lucide="bell" style="width: 18px; height: 18px; color: var(--color-primary);"></i>
          <span>Today's Priority Highlights</span>
        </h3>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; background: var(--color-surface-muted); border-radius: var(--radius-sm);">
            <div>
              <strong>Anita Sharma (ANC Visit)</strong>
              <div style="font-size: 12px; color: var(--color-text-secondary);">3rd Trimester checkup • Rampur Kalan</div>
            </div>
            <span class="status-badge badge-warning">Due Today</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; background: var(--color-surface-muted); border-radius: var(--radius-sm);">
            <div>
              <strong>Infant Immunization Drive</strong>
              <div style="font-size: 12px; color: var(--color-text-secondary);">Sub-centre session • 8 Children scheduled</div>
            </div>
            <span class="status-badge badge-primary">11:00 AM</span>
          </div>
        </div>
      </div>

    </div>
  `;
}
