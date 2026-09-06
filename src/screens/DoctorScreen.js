/**
 * Screen: HEALER Doctor Dashboard
 * Clean, focused clinical dashboard for teleconsultation physicians.
 * Primary actions: [Today's Appointments], [Patients], [Consultation History], [Profile].
 */

import { locales } from '../data/locales.js';

export function renderDoctorScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const queue = state.queue || [];

  const actions = [
    {
      id: 'doc-action-today-appts',
      title: t.docActionTodayAppts || "Today's Appointments",
      desc: t.docActionTodayApptsDesc || 'View live OPD queue and patients',
      icon: 'calendar'
    },
    {
      id: 'doc-action-patients',
      title: t.docActionPatients || 'Patients',
      desc: t.docActionPatientsDesc || 'Search medical history and records',
      icon: 'users'
    },
    {
      id: 'doc-action-history',
      title: t.docActionConsultHistory || 'Consultation History',
      desc: t.docActionConsultHistoryDesc || 'Review past visits and prescriptions',
      icon: 'file-text'
    },
    {
      id: 'doc-action-profile',
      title: t.docActionProfile || 'Profile',
      desc: t.docActionProfileDesc || 'Manage availability and clinic settings',
      icon: 'user'
    }
  ];

  return `
    <div class="screen" id="screen-doctor" style="max-width: 900px; margin: 0 auto; width: 100%;">
      
      <!-- Top Header -->
      <div style="margin-bottom: 24px;">
        <div style="font-size: 13px; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">
          ${t.portalDoctorTitle || 'Doctor Portal'}
        </div>
        <h1 style="font-size: 24px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
          ${t.docDashboardTitle || 'Doctor Dashboard'}
        </h1>
        <p style="font-size: 14px; color: var(--color-text-secondary);">
          ${t.docDashboardSub || 'Consultation queue, patient charts, and prescriptions.'}
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

      <!-- Live Queue Card -->
      <div class="card" style="padding: 22px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <h3 style="font-size: 16px; font-weight: 800; color: var(--color-text-primary); display: flex; align-items: center; gap: 8px;">
            <i data-lucide="clock" style="width: 18px; height: 18px; color: var(--color-primary);"></i>
            <span>Active Consultation Queue</span>
          </h3>
          <span class="status-badge badge-primary">${queue.length} Patients in Queue</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${queue.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: var(--color-surface-muted); border-radius: var(--radius-sm);">
              <div style="display: flex; align-items: center; gap: 10px;">
                <strong style="font-family: var(--font-heading); font-size: 16px; color: var(--color-primary);">#${item.token}</strong>
                <div>
                  <div style="font-size: 14px; font-weight: 700; color: var(--color-text-primary);">${item.patientName}</div>
                  <div style="font-size: 11.5px; color: var(--color-text-secondary);">Wait time: ~${item.waitTime}</div>
                </div>
              </div>
              <span class="status-badge ${item.priorityLevel === 'High' ? 'badge-danger' : 'badge-primary'}">
                ${item.priorityLevel || 'Medium'}
              </span>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}
