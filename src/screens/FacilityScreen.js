/**
 * Screen: HEALER Facility Dashboard
 * Clean, focused dashboard for healthcare centre administrators.
 * Primary actions: [Appointments], [Services], [Staff], [Facility Information].
 */

import { locales } from '../data/locales.js';

export function renderFacilityScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;

  const actions = [
    {
      id: 'fac-action-appointments',
      title: t.facActionAppointments || 'Appointments',
      desc: t.facActionAppointmentsDesc || 'Manage incoming OPD footfall and tokens',
      icon: 'calendar'
    },
    {
      id: 'fac-action-services',
      title: t.facActionServices || 'Services',
      desc: t.facActionServicesDesc || 'Configure available departments and clinics',
      icon: 'stethoscope'
    },
    {
      id: 'fac-action-staff',
      title: t.facActionStaff || 'Staff',
      desc: t.facActionStaffDesc || 'Manage doctors, nurses, and health workers',
      icon: 'users'
    },
    {
      id: 'fac-action-facility-info',
      title: t.facActionFacilityInfo || 'Facility Information',
      desc: t.facActionFacilityInfoDesc || 'Update address, operating hours, and beds',
      icon: 'building'
    }
  ];

  return `
    <div class="screen" id="screen-facility" style="max-width: 900px; margin: 0 auto; width: 100%;">
      
      <!-- Top Header -->
      <div style="margin-bottom: 24px;">
        <div style="font-size: 13px; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">
          ${t.portalFacilityTitle || 'Facility Portal'}
        </div>
        <h1 style="font-size: 24px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
          ${t.facDashboardTitle || 'Facility Dashboard'}
        </h1>
        <p style="font-size: 14px; color: var(--color-text-secondary);">
          ${t.facDashboardSub || 'Facility administration, services, and operations.'}
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

      <!-- Operational Summary -->
      <div class="card" style="padding: 22px;">
        <h3 style="font-size: 16px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
          <i data-lucide="activity" style="width: 18px; height: 18px; color: var(--color-primary);"></i>
          <span>Facility Capacity & Status</span>
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
          <div style="padding: 14px; background: var(--color-surface-muted); border-radius: var(--radius-sm);">
            <span style="font-size: 12px; color: var(--color-text-secondary); display: block;">Total Inpatient Beds</span>
            <strong style="font-size: 20px; color: var(--color-text-primary);">12 Beds (8 Occupied)</strong>
          </div>

          <div style="padding: 14px; background: var(--color-surface-muted); border-radius: var(--radius-sm);">
            <span style="font-size: 12px; color: var(--color-text-secondary); display: block;">Doctors on Duty</span>
            <strong style="font-size: 20px; color: var(--color-primary);">3 Active</strong>
          </div>

          <div style="padding: 14px; background: var(--color-surface-muted); border-radius: var(--radius-sm);">
            <span style="font-size: 12px; color: var(--color-text-secondary); display: block;">Today's OPD Footfall</span>
            <strong style="font-size: 20px; color: var(--color-text-primary);">68 Registered</strong>
          </div>
        </div>
      </div>

    </div>
  `;
}
