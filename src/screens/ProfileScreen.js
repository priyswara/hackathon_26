/**
 * Screen: HEALER User Profile
 * Clean, trustworthy profile screen showing personal details,
 * ABHA ID, language preference, and portal settings.
 */

import { locales } from '../data/locales.js';

export function renderProfileScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const p = state.patient || {};

  const currentLangObj = {
    en: 'English',
    hi: 'हिंदी (Hindi)',
    ta: 'தமிழ் (Tamil)',
    te: 'తెలుగు (Telugu)',
    ml: 'മലയാളം (Malayalam)'
  };

  const roleNameMap = {
    patient: t.portalPatientTitle || 'Patient',
    health_worker: t.portalHealthWorkerTitle || 'Health Worker',
    doctor: t.portalDoctorTitle || 'Doctor',
    facility: t.portalFacilityTitle || 'Facility'
  };

  return `
    <div class="screen" id="screen-profile" style="max-width: 680px; margin: 0 auto; width: 100%;">
      
      <!-- Top Header -->
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 22px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
          ${t.profileTitle || 'Profile'}
        </h1>
        <p style="font-size: 13.5px; color: var(--color-text-secondary);">
          ${t.profileSub || 'Your personal information and account settings.'}
        </p>
      </div>

      <!-- Main Profile Card -->
      <div class="card" style="padding: 24px; display: flex; flex-direction: column; gap: 20px;">
        
        <!-- User Info Header -->
        <div style="display: flex; align-items: center; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--color-border-light);">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); font-family: var(--font-heading); font-size: 22px; font-weight: 800; display: flex; align-items: center; justify-content: center; border: 2px solid var(--color-secondary);">
            ${p.name ? p.name.split(' ').map(n => n[0]).join('') : 'RK'}
          </div>
          <div>
            <h2 style="font-size: 18px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 2px;">
              ${p.name || 'Ramesh Kumar'}
            </h2>
            <div style="font-size: 13px; color: var(--color-text-secondary);">
              ${state.userMobile || '+91 98765 43210'}
            </div>
          </div>
        </div>

        <!-- Details List -->
        <div style="display: flex; flex-direction: column; gap: 14px; font-size: 14px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: var(--color-text-secondary);">${t.profileAbha || 'ABHA Health ID'}</span>
            <strong style="font-family: monospace; color: var(--color-primary);">${p.abhaId || '91-4820-1928-44'}</strong>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: var(--color-text-secondary);">${t.profileRole || 'Current Portal Role'}</span>
            <span class="status-badge badge-primary">${roleNameMap[state.currentRole]}</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: var(--color-text-secondary);">${t.profileLanguage || 'Preferred Language'}</span>
            <button class="btn btn-outline btn-sm" id="btn-profile-change-lang">
              <i data-lucide="globe" style="width: 14px; height: 14px; color: var(--color-primary);"></i>
              <span>${currentLangObj[state.currentLanguage] || 'English'}</span>
            </button>
          </div>

        </div>

        <!-- Actions -->
        <div style="display: flex; gap: 10px; padding-top: 14px; border-top: 1px solid var(--color-border-light); flex-wrap: wrap;">
          <button class="btn btn-outline" id="btn-profile-switch-portal" style="flex: 1;">
            <i data-lucide="grid" style="width: 15px; height: 15px;"></i>
            <span>${t.switchPortal || 'Switch Portal'}</span>
          </button>

          <button class="btn btn-outline" id="btn-profile-logout" style="flex: 1; color: var(--color-danger); border-color: rgba(214, 69, 69, 0.3);">
            <i data-lucide="log-out" style="width: 15px; height: 15px;"></i>
            <span>${t.logout || 'Logout'}</span>
          </button>
        </div>

      </div>

    </div>
  `;
}
