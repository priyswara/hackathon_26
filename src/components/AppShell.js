/**
 * HEALER — AppShell Component
 * Professional, clean web application shell with Desktop Sidebar, Top Header,
 * Language Selector, and Mobile Bottom Navigation.
 */

import { locales } from '../data/locales.js';

export function renderAppShell(container, state, currentScreen, navigateTo, openLanguageModal) {
  const t = locales[state.currentLanguage] || locales.en;
  const isAuthScreen = currentScreen === 'welcome' || currentScreen === 'otp_verification';

  // Role labels
  const roleNameMap = {
    patient: t.portalPatientTitle || 'Patient',
    health_worker: t.portalHealthWorkerTitle || 'Health Worker',
    doctor: t.portalDoctorTitle || 'Doctor',
    facility: t.portalFacilityTitle || 'Facility'
  };

  const currentLangObj = {
    en: 'English',
    hi: 'हिंदी',
    ta: 'தமிழ்',
    te: 'తెలుగు',
    ml: 'മലയാളം'
  };

  // If on Landing or OTP screen, render clean full-width landing shell
  if (isAuthScreen) {
    return `
      <div class="app-shell app-shell-landing">
        <header class="app-header" style="max-width: 1160px; margin: 0 auto; width: 100%; border: none; background: transparent;">
          <div class="header-left">
            <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" id="btn-brand-home">
              <div class="sidebar-brand-icon">
                <i data-lucide="cross"></i>
              </div>
              <span style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-primary); letter-spacing: -0.3px;">${t.appTitle}</span>
            </div>
          </div>

          <div class="header-right">
            <!-- Language Selector -->
            <button class="header-lang-btn" id="btn-open-lang" title="${t.selectLanguage}">
              <i data-lucide="globe" style="width: 15px; height: 15px; color: var(--color-primary);"></i>
              <span>${currentLangObj[state.currentLanguage] || 'Language'}</span>
            </button>
          </div>
        </header>

        <main class="app-content-landing" id="app-screen-outlet">
          <!-- Screen injected here -->
        </main>
      </div>
    `;
  }

  // Define Navigation Items based on current role
  let navItems = [];
  if (state.currentRole === 'patient') {
    navItems = [
      { id: 'patient_home', label: t.navHome || 'Home', icon: 'home' },
      { id: 'appointment_wizard', label: t.actionBookAppointment || 'Book Appointment', icon: 'calendar-plus' },
      { id: 'appointments', label: t.navAppointments || 'Appointments', icon: 'calendar' },
      { id: 'nearby_clinics', label: t.navNearby || 'Nearby Care', icon: 'map-pin' },
      { id: 'health_journey', label: t.navJourney || 'Health Journey', icon: 'git-commit' },
      { id: 'how_to_use', label: t.navHowToUse || 'How to Use', icon: 'book-open' },
      { id: 'profile', label: t.navProfile || 'Profile', icon: 'user' }
    ];
  } else if (state.currentRole === 'health_worker') {
    navItems = [
      { id: 'health_worker', label: t.navHome || 'Dashboard', icon: 'home' },
      { id: 'nearby_clinics', label: t.navNearby || 'Facilities', icon: 'map-pin' },
      { id: 'appointments', label: t.navAppointments || 'Appointments', icon: 'calendar' },
      { id: 'how_to_use', label: t.navHowToUse || 'How to Use', icon: 'book-open' },
      { id: 'profile', label: t.navProfile || 'Profile', icon: 'user' }
    ];
  } else if (state.currentRole === 'doctor') {
    navItems = [
      { id: 'doctor', label: t.navHome || 'Dashboard', icon: 'home' },
      { id: 'appointments', label: t.navAppointments || 'Appointments', icon: 'calendar' },
      { id: 'nearby_clinics', label: t.navNearby || 'Facilities', icon: 'map-pin' },
      { id: 'how_to_use', label: t.navHowToUse || 'How to Use', icon: 'book-open' },
      { id: 'profile', label: t.navProfile || 'Profile', icon: 'user' }
    ];
  } else if (state.currentRole === 'facility') {
    navItems = [
      { id: 'facility', label: t.navHome || 'Dashboard', icon: 'home' },
      { id: 'appointments', label: t.navAppointments || 'Appointments', icon: 'calendar' },
      { id: 'nearby_clinics', label: t.navNearby || 'Facilities', icon: 'map-pin' },
      { id: 'how_to_use', label: t.navHowToUse || 'How to Use', icon: 'book-open' },
      { id: 'profile', label: t.navProfile || 'Profile', icon: 'user' }
    ];
  }

  // Mobile Bottom Navigation Items (First 4 most important items)
  const mobileNavItems = [
    { id: state.currentRole === 'patient' ? 'patient_home' : state.currentRole, label: t.navHome || 'Home', icon: 'home' },
    { id: 'appointments', label: t.navAppointments || 'Appointments', icon: 'calendar' },
    { id: 'nearby_clinics', label: t.navNearby || 'Nearby', icon: 'map-pin' },
    { id: 'health_journey', label: t.navJourney || 'Journey', icon: 'git-commit' }
  ];

  return `
    <div class="app-shell">
      <!-- Mobile Drawer Overlay -->
      <div class="sidebar-overlay" id="sidebar-overlay"></div>

      <!-- Desktop Sidebar -->
      <aside class="app-sidebar" id="app-sidebar">
        <!-- Sidebar Brand -->
        <div class="sidebar-header" id="btn-brand-home" style="cursor: pointer;">
          <div class="sidebar-brand-icon">
            <i data-lucide="cross"></i>
          </div>
          <div>
            <div class="sidebar-brand-title">${t.appTitle}</div>
            <div class="sidebar-brand-portal">${roleNameMap[state.currentRole]}</div>
          </div>
        </div>

        <!-- Navigation Menu -->
        <div class="sidebar-nav-container">
          ${navItems.map(item => `
            <button class="sidebar-nav-item ${currentScreen === item.id ? 'active' : ''}" data-nav="${item.id}" id="nav-${item.id}">
              <i data-lucide="${item.icon}"></i>
              <span>${item.label}</span>
            </button>
          `).join('')}
        </div>

        <!-- Sidebar Footer -->
        <div class="sidebar-footer">
          <div class="sidebar-user-pill">
            <div class="sidebar-user-avatar">
              ${state.currentRole === 'doctor' ? 'DR' : (state.currentRole === 'health_worker' ? 'HW' : (state.currentRole === 'facility' ? 'FC' : 'PT'))}
            </div>
            <div style="min-width: 0; overflow: hidden;">
              <div style="font-weight: 700; font-size: 13px; color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${state.currentRole === 'doctor' ? 'Dr. Ananya Sharma' : (state.currentRole === 'health_worker' ? 'Sunita Devi' : (state.currentRole === 'facility' ? 'PHC Rampur Hub' : (state.patient.name || 'Ramesh Kumar')))}
              </div>
              <div style="font-size: 11px; color: var(--color-text-muted);">${state.userMobile || '+91 98765 43210'}</div>
            </div>
          </div>

          <button class="btn btn-outline btn-full btn-sm" id="btn-switch-portal-sidebar">
            <i data-lucide="grid" style="width: 14px; height: 14px;"></i>
            <span>${t.switchPortal}</span>
          </button>

          <button class="btn btn-outline btn-full btn-sm" id="btn-logout-sidebar" style="color: var(--color-danger); border-color: rgba(214, 69, 69, 0.3);">
            <i data-lucide="log-out" style="width: 14px; height: 14px;"></i>
            <span>${t.logout}</span>
          </button>
        </div>
      </aside>

      <!-- Main Application Area -->
      <div class="app-main">
        <!-- Top Web Header -->
        <header class="app-header">
          <div class="header-left">
            <button class="header-menu-btn" id="btn-toggle-sidebar" title="Menu">
              <i data-lucide="menu"></i>
            </button>

            <div class="header-title-badge">
              <span class="status-badge badge-primary">${roleNameMap[state.currentRole]}</span>
              <span class="hide-on-mobile" style="color: var(--color-border);">/</span>
              <span class="hide-on-mobile" style="color: var(--color-text-secondary); font-size: 13.5px; font-weight: 600;">${t.appTitle}</span>
            </div>
          </div>

          <div class="header-right">
            <!-- Language Switcher -->
            <button class="header-lang-btn" id="btn-open-lang" title="${t.selectLanguage}">
              <i data-lucide="globe" style="width: 15px; height: 15px; color: var(--color-primary);"></i>
              <span>${currentLangObj[state.currentLanguage] || 'Language'}</span>
            </button>

            <!-- Switch Portal / Logout on Desktop -->
            <button class="btn btn-outline btn-sm hide-on-mobile" id="btn-header-switch-portal" title="${t.switchPortal}">
              <i data-lucide="grid" style="width: 14px; height: 14px;"></i>
              <span>${t.switchPortal}</span>
            </button>
          </div>
        </header>

        <!-- Main Screen Outlet -->
        <main class="app-content" id="app-screen-outlet">
          <!-- Screen content injected dynamically -->
        </main>
      </div>

      <!-- Mobile Bottom Navigation Bar -->
      <nav class="app-bottom-nav">
        ${mobileNavItems.map(item => `
          <button class="bottom-nav-item ${currentScreen === item.id ? 'active' : ''}" data-nav="${item.id}" id="mobile-nav-${item.id}">
            <i data-lucide="${item.icon}"></i>
            <span>${item.label}</span>
          </button>
        `).join('')}
      </nav>
    </div>
  `;
}
