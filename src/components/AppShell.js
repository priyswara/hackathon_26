/**
 * AppShell Component — Professional Web Application Shell
 * Features Desktop Sidebar, Web Top Header with Network Simulation & Language Switcher,
 * Mobile Responsive Drawer, and Main Screen Outlet.
 */

import { locales } from '../data/locales.js';

export function renderAppShell(container, state, navigateTo, openLanguageModal, showEmergencyScreen) {
  const t = locales[state.currentLanguage] || locales.en;
  
  // Define Role-specific navigation items using localization keys
  let navItems = [];
  
  if (state.currentRole === 'patient') {
    navItems = [
      { id: 'patient_home', label: t.navHome, icon: 'home' },
      { id: 'appointment_queue', label: t.navOpdToken, icon: 'calendar' },
      { id: 'triage', label: t.digitalTriage, icon: 'activity' },
      { id: 'network_consultation', label: t.consultDoctor, icon: 'video' },
      { id: 'health_journey', label: t.navJourney, icon: 'git-commit' },
      { id: 'medicines_diagnostics', label: t.navMedicineLab, icon: 'package' },
      { id: 'followups', label: t.followUps, icon: 'heart-handshake' },
      { id: 'schemes', label: t.schemes, icon: 'shield' },
      { id: 'emergency_sos', label: t.navSos, icon: 'alert-triangle', isSOS: true }
    ];
  } else if (state.currentRole === 'health_worker') {
    navItems = [
      { id: 'health_worker', label: t.navRoster, icon: 'users' },
      { id: 'triage', label: t.navTriageCheck, icon: 'clipboard' },
      { id: 'network_consultation', label: t.consultDoctor, icon: 'video' },
      { id: 'health_journey', label: t.navRecords, icon: 'file-text' },
      { id: 'medicines_diagnostics', label: t.navSupply, icon: 'package' },
      { id: 'followups', label: t.followUps, icon: 'heart-handshake' },
      { id: 'schemes', label: t.schemes, icon: 'shield' },
      { id: 'emergency_sos', label: t.navSos, icon: 'alert-triangle', isSOS: true }
    ];
  } else if (state.currentRole === 'doctor') {
    navItems = [
      { id: 'doctor', label: t.navQueue, icon: 'user-check' },
      { id: 'network_consultation', label: t.navTeleconsult, icon: 'video' },
      { id: 'consultation_chat', label: t.navChatRx, icon: 'message-square' },
      { id: 'health_journey', label: t.navRecords, icon: 'file-text' },
      { id: 'facility', label: t.navFacility, icon: 'layers' }
    ];
  } else if (state.currentRole === 'facility') {
    navItems = [
      { id: 'facility', label: t.navOperations, icon: 'bar-chart-2' },
      { id: 'medicines_diagnostics', label: t.navPharmacy, icon: 'package' },
      { id: 'doctor', label: t.navDoctors, icon: 'user-check' },
      { id: 'patient_home', label: t.navPatientView, icon: 'user' }
    ];
  }
  
  const roleNameMap = {
    patient: t.roleCitizen,
    health_worker: t.roleAsha,
    doctor: t.roleDocConsole,
    facility: t.rolePhcAdmin
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

  return `
    <div class="app-shell">
      <!-- Mobile / Tablet Sidebar Drawer Overlay -->
      <div class="sidebar-overlay" id="sidebar-overlay"></div>

      <!-- Left Desktop Sidebar Navigation -->
      <aside class="app-sidebar" id="app-sidebar">
        <!-- Sidebar Brand Header -->
        <div class="sidebar-header">
          <div class="sidebar-brand-icon" id="btn-brand-home" title="${t.appTitle}">
            <i data-lucide="cross"></i>
          </div>
          <div class="sidebar-brand-text" id="btn-brand-text">
            <span class="sidebar-brand-name">${t.appTitle}</span>
            <span class="sidebar-brand-tag">${t.tagline}</span>
          </div>
        </div>

        <!-- Sidebar Navigation List -->
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

        <!-- Sidebar Footer -->
        <div class="sidebar-footer">
          <div class="sidebar-role-card" id="btn-change-role" title="${t.selectRole || 'Change Role'}">
            <div style="display: flex; align-items: center; gap: 8px;">
              <i data-lucide="shield-check" style="color: var(--color-primary); width: 16px; height: 16px;"></i>
              <div>
                <div style="font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700;">Current Role</div>
                <div style="font-family: var(--font-heading); font-size: 12px; font-weight: 700; color: var(--color-text-primary);">${roleNameMap[state.currentRole]}</div>
              </div>
            </div>
            <i data-lucide="chevron-right" style="color: var(--color-text-muted); width: 14px; height: 14px;"></i>
          </div>
        </div>
      </aside>

      <!-- Main Web Container -->
      <div class="app-main">
        <!-- Top Web Header -->
        <header class="app-header">
          <div class="header-left">
            <button class="header-toggle-sidebar" id="btn-toggle-sidebar" title="Menu">
              <i data-lucide="menu"></i>
            </button>
            
            <div class="header-breadcrumb">
              <span class="portal-badge">${roleNameMap[state.currentRole]}</span>
              <span style="color: var(--color-border); font-size: 18px;">/</span>
              <span style="color: var(--color-text-primary); font-size: 14px; font-weight: 600;">GraminArogya Platform</span>
            </div>
          </div>

          <div class="header-right">
            <!-- Bandwidth Simulator Pill in Header -->
            <div class="header-network-pill ${state.networkMode}" id="header-network-pill" title="Network Simulation Mode">
              <span class="badge-dot-indicator" style="background: currentColor;"></span>
              <span>${state.networkMode.toUpperCase()}: ${netModeLabels[state.networkMode]}</span>
            </div>

            <!-- Role Badge -->
            <div class="role-badge-pill" id="btn-header-role" title="${t.selectRole}">
              <i data-lucide="user-check" style="width: 14px; height: 14px;"></i>
              <span>${roleNameMap[state.currentRole]}</span>
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

        <!-- Main Screen Content Outlet -->
        <main class="app-content" id="app-screen-outlet">
          <!-- Screen HTML rendered dynamically here -->
        </main>
      </div>

      <!-- Mobile Bottom Navigation (Visible only on < 768px) -->
      <nav class="app-bottom-nav">
        ${navItems.slice(0, 5).map(item => `
          <button class="nav-item ${item.isSOS ? 'nav-sos-btn' : ''}" data-nav="${item.id}" id="mobile-nav-${item.id}">
            <i data-lucide="${item.icon}"></i>
            <span>${item.label}</span>
          </button>
        `).join('')}
      </nav>
    </div>
  `;
}
