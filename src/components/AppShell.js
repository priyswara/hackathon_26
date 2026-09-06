/**
 * AppShell Component — Professional Web Application Shell
 * Features Desktop Sidebar (strictly role-isolated for verified sessions),
 * Clean Landing & Verification Header, Web Top Header with Network Simulation,
 * Language Switcher, User Menu with Switch Portal & Logout, and Mobile Drawer.
 * 100% Mobile & Desktop Responsive.
 */

import { locales } from '../data/locales.js';

export function renderAppShell(container, state, currentScreen, navigateTo, openLanguageModal, showEmergencyScreen) {
  const t = locales[state.currentLanguage] || locales.en;
  const isAuthScreen = currentScreen === 'welcome' || currentScreen === 'otp_verification';

  // Role names mapping
  const roleNameMap = {
    patient: t.portalPatientTitle || t.patientRole,
    health_worker: t.portalHealthWorkerTitle || t.healthWorkerRole,
    doctor: t.portalDoctorTitle || t.doctorRole,
    facility: t.portalFacilityTitle || t.facilityRole
  };

  const netModeLabels = {
    good: t.goodSignal,
    moderate: t.moderateSignal,
    low: t.lowSignal
  };

  const currentLangObj = {
    en: 'English',
    hi: 'हिंदी',
    ta: 'தமிழ்',
    te: 'తెలుగు',
    ml: 'മലയാളം'
  };

  // If on landing or OTP screen, render a full-width clean application shell without inner sidebar
  if (isAuthScreen) {
    return `
      <div class="app-shell app-shell-landing">
        <!-- Clean Landing Top Web Header -->
        <header class="app-header" style="max-width: 1200px; margin: 8px auto 14px auto; width: 100%;">
          <div class="header-left">
            <div style="display: flex; align-items: center; gap: 8px; cursor: pointer;" id="btn-brand-home">
              <div class="sidebar-brand-icon" style="width: 36px; height: 36px;">
                <i data-lucide="cross" style="width: 20px; height: 20px;"></i>
              </div>
              <div style="display: flex; flex-direction: column;">
                <span style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-primary); letter-spacing: -0.3px;">${t.appTitle}</span>
                <span class="hide-on-mobile" style="font-size: 11px; color: var(--color-text-secondary); font-weight: 600;">${t.landingTagline}</span>
              </div>
            </div>
          </div>

          <div class="header-right">
            <!-- Bandwidth Simulator Pill -->
            <div class="header-network-pill ${state.networkMode}" id="header-network-pill" title="Network Simulation Mode">
              <span class="badge-dot-indicator" style="background: currentColor;"></span>
              <span>${state.networkMode.toUpperCase()}: ${netModeLabels[state.networkMode]}</span>
            </div>

            <!-- Language Switcher -->
            <button class="header-lang-btn" id="btn-open-lang" title="${t.selectLanguage}">
              <i data-lucide="globe" style="width: 15px; height: 15px; color: var(--color-primary);"></i>
              <span>${currentLangObj[state.currentLanguage] || 'Language'}</span>
            </button>

            <!-- Quick Voice Assistant -->
            <button class="header-btn" id="btn-quick-voice" title="${t.tapToSpeak}">
              <i data-lucide="mic" style="color: var(--color-primary); width: 16px; height: 16px;"></i>
            </button>
          </div>
        </header>

        <!-- Main Screen Outlet for Landing / OTP -->
        <main class="app-content-landing" id="app-screen-outlet" style="max-width: 1200px; margin: 0 auto; width: 100%; padding: 0 14px 40px 14px;">
          <!-- Screen HTML injected dynamically here -->
        </main>
      </div>
    `;
  }

  // Define Strictly Role-Isolated Navigation Items for Verified Portal
  let navItems = [];
  
  if (state.currentRole === 'patient') {
    navItems = [
      { id: 'patient_home', label: t.navHome || 'Home', icon: 'home' },
      { id: 'nearby_clinics', label: 'Nearby Clinics', icon: 'map-pin' },
      { id: 'appointment_queue', label: t.navOpdToken || 'OPD Token', icon: 'calendar' },
      { id: 'triage', label: t.digitalTriage || 'Triage', icon: 'activity' },
      { id: 'network_consultation', label: t.consultDoctor || 'Teleconsult', icon: 'video' },
      { id: 'health_journey', label: t.navJourney || 'Journey', icon: 'git-commit' },
      { id: 'medicines_diagnostics', label: t.navMedicineLab || 'Medicines', icon: 'package' },
      { id: 'followups', label: t.followUps || 'Follow-ups', icon: 'heart-handshake' },
      { id: 'schemes', label: t.schemes || 'Schemes', icon: 'shield' },
      { id: 'emergency_sos', label: t.navSos || '108 SOS', icon: 'alert-triangle', isSOS: true }
    ];
  } else if (state.currentRole === 'health_worker') {
    navItems = [
      { id: 'health_worker', label: t.navRoster || 'Roster', icon: 'users' },
      { id: 'nearby_clinics', label: 'Block Facilities', icon: 'map-pin' },
      { id: 'triage', label: t.navTriageCheck || 'Triage Check', icon: 'clipboard' },
      { id: 'network_consultation', label: t.consultDoctor || 'Teleconsult', icon: 'video' },
      { id: 'health_journey', label: t.navRecords || 'Records', icon: 'file-text' },
      { id: 'medicines_diagnostics', label: t.navSupply || 'Supply', icon: 'package' },
      { id: 'followups', label: t.followUps || 'Follow-ups', icon: 'heart-handshake' },
      { id: 'schemes', label: t.schemes || 'Schemes', icon: 'shield' },
      { id: 'emergency_sos', label: t.navSos || '108 SOS', icon: 'alert-triangle', isSOS: true }
    ];
  } else if (state.currentRole === 'doctor') {
    navItems = [
      { id: 'doctor', label: t.navQueue || 'Queue', icon: 'user-check' },
      { id: 'nearby_clinics', label: 'Clinics & Beds', icon: 'map-pin' },
      { id: 'network_consultation', label: t.navTeleconsult || 'Teleconsult', icon: 'video' },
      { id: 'consultation_chat', label: t.navChatRx || 'Chat & Rx', icon: 'message-square' },
      { id: 'health_journey', label: t.navRecords || 'Records', icon: 'file-text' },
      { id: 'followups', label: t.followUps || 'Follow-ups', icon: 'heart-handshake' }
    ];
  } else if (state.currentRole === 'facility') {
    navItems = [
      { id: 'facility', label: t.navOperations || 'Operations', icon: 'bar-chart-2' },
      { id: 'nearby_clinics', label: 'Network Units', icon: 'map-pin' },
      { id: 'appointment_queue', label: t.navOpdToken || 'OPD Token', icon: 'calendar' },
      { id: 'medicines_diagnostics', label: t.navPharmacy || 'Pharmacy', icon: 'package' },
      { id: 'doctor', label: t.navDoctors || 'Doctors', icon: 'user-check' },
      { id: 'health_journey', label: t.navRecords || 'Records', icon: 'file-text' }
    ];
  }

  return `
    <div class="app-shell">
      <!-- Mobile / Tablet Sidebar Drawer Overlay -->
      <div class="sidebar-overlay" id="sidebar-overlay"></div>

      <!-- Left Desktop Sidebar Navigation (Strictly Role-Isolated) -->
      <aside class="app-sidebar" id="app-sidebar">
        
        <!-- Sidebar Brand & Portal Identity -->
        <div class="sidebar-header">
          <div class="sidebar-brand-icon" id="btn-brand-home" title="${t.appTitle}">
            <i data-lucide="cross"></i>
          </div>
          <div class="sidebar-brand-text" id="btn-brand-text">
            <span class="sidebar-brand-name">${t.appTitle}</span>
            <span class="sidebar-brand-tag">${roleNameMap[state.currentRole]}</span>
          </div>
        </div>

        <!-- Sidebar Navigation Items -->
        <div class="sidebar-nav-section">${t.quickActions || 'Navigation'}</div>
        <ul class="sidebar-nav-list">
          ${navItems.map(item => `
            <li>
              <button class="sidebar-nav-item ${item.isSOS ? 'is-sos' : ''}" data-nav="${item.id}" id="nav-${item.id}">
                <i data-lucide="${item.icon}"></i>
                <span>${item.label}</span>
              </button>
            </li>
          `).join('')}
        </ul>

        <!-- Sidebar Footer with Profile, Switch Portal & Logout -->
        <div class="sidebar-footer">
          <!-- User Profile & Verified ID -->
          <div class="sidebar-role-card" style="cursor: default;">
            <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px; flex-shrink: 0;">
                ${state.currentRole === 'doctor' ? 'DR' : (state.currentRole === 'health_worker' ? 'HW' : (state.currentRole === 'facility' ? 'PH' : 'PT'))}
              </div>
              <div style="min-width: 0; overflow: hidden;">
                <div style="font-family: var(--font-heading); font-size: 13px; font-weight: 700; color: var(--color-text-primary); line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  ${state.currentRole === 'doctor' ? 'Dr. Ananya Sharma' : (state.currentRole === 'health_worker' ? 'Sunita Devi (ASHA)' : (state.currentRole === 'facility' ? 'PHC Rampur Hub' : (state.patient.name || 'Ramesh Kumar')))}
                </div>
                <div style="font-size: 11px; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${state.userMobile || '+91 98765 43210'}</div>
              </div>
            </div>
          </div>

          <!-- Switch Portal Button -->
          <button class="btn btn-outline btn-full" id="btn-switch-portal-sidebar" style="padding: 8px 12px; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <i data-lucide="refresh-cw" style="width: 14px; height: 14px;"></i>
            <span>${t.switchPortal}</span>
          </button>

          <!-- Logout Button -->
          <button class="btn btn-outline btn-full" id="btn-logout-sidebar" style="padding: 8px 12px; font-size: 12px; font-weight: 700; color: var(--color-danger); border-color: rgba(229, 57, 53, 0.3); display: flex; align-items: center; justify-content: center; gap: 6px;">
            <i data-lucide="log-out" style="width: 14px; height: 14px;"></i>
            <span>${t.logout}</span>
          </button>
        </div>
      </aside>

      <!-- Main Web Application Area -->
      <div class="app-main">
        <!-- Top Web Header -->
        <header class="app-header">
          <div class="header-left">
            <button class="header-toggle-sidebar" id="btn-toggle-sidebar" title="Menu">
              <i data-lucide="menu"></i>
            </button>
            
            <div class="header-breadcrumb">
              <span class="portal-badge">${roleNameMap[state.currentRole]}</span>
              <span class="hide-on-mobile" style="color: var(--color-border); font-size: 18px;">/</span>
              <span class="hide-on-mobile" style="color: var(--color-text-primary); font-size: 14px; font-weight: 700;">${t.appTitle}</span>
            </div>
          </div>

          <div class="header-right">
            <!-- Bandwidth Simulator Pill in Header -->
            <div class="header-network-pill ${state.networkMode}" id="header-network-pill" title="Network Simulation Mode">
              <span class="badge-dot-indicator" style="background: currentColor;"></span>
              <span>${state.networkMode.toUpperCase()}: ${netModeLabels[state.networkMode]}</span>
            </div>

            <!-- Language Switcher -->
            <button class="header-lang-btn" id="btn-open-lang" title="${t.selectLanguage}">
              <i data-lucide="globe" style="width: 15px; height: 15px; color: var(--color-primary);"></i>
              <span>${currentLangObj[state.currentLanguage] || 'Language'}</span>
            </button>

            <!-- User Menu / Controls in Header -->
            <div style="display: flex; align-items: center; gap: 6px;">
              <button class="btn btn-outline" id="btn-header-switch-portal" title="${t.switchPortal}" style="padding: 6px 10px; font-size: 12px; display: flex; align-items: center; gap: 6px; min-height: 38px;">
                <i data-lucide="grid" style="width: 15px; height: 15px;"></i>
                <span class="hide-on-mobile">${t.switchPortal}</span>
              </button>

              <button class="btn btn-outline" id="btn-header-logout" title="${t.logout}" style="padding: 6px 10px; font-size: 12px; color: var(--color-danger); border-color: rgba(229, 57, 53, 0.3); display: flex; align-items: center; gap: 6px; min-height: 38px;">
                <i data-lucide="log-out" style="width: 15px; height: 15px;"></i>
                <span class="hide-on-mobile">${t.logout}</span>
              </button>
            </div>
          </div>
        </header>

        <!-- Main Screen Content Outlet -->
        <main class="app-content" id="app-screen-outlet">
          <!-- Screen HTML rendered dynamically here -->
        </main>
      </div>

      <!-- Mobile Bottom Navigation (Visible only on < 768px when inside portal) -->
      <nav class="app-bottom-nav">
        ${navItems.slice(0, 5).map(item => `
          <button class="nav-item ${item.isSOS ? 'nav-sos-btn' : ''}" data-nav="${item.id}" id="mobile-nav-${item.id}">
            <i data-lucide="${item.icon}" style="width: 18px; height: 18px;"></i>
            <span>${item.label}</span>
          </button>
        `).join('')}
      </nav>
    </div>
  `;
}
