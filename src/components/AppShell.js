/**
 * AppShell Component
 * Manages Header, Network Status Bar, Bottom Navigation, and Toast System
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
      { id: 'emergency_sos', label: t.navSos, icon: 'alert-triangle', isSOS: true },
      { id: 'health_journey', label: t.navJourney, icon: 'activity' },
      { id: 'medicines_diagnostics', label: t.navMedicineLab, icon: 'package' }
    ];
  } else if (state.currentRole === 'health_worker') {
    navItems = [
      { id: 'health_worker', label: t.navRoster, icon: 'users' },
      { id: 'triage', label: t.navTriageCheck, icon: 'clipboard' },
      { id: 'emergency_sos', label: t.navSos, icon: 'alert-triangle', isSOS: true },
      { id: 'health_journey', label: t.navRecords, icon: 'file-text' },
      { id: 'medicines_diagnostics', label: t.navSupply, icon: 'package' }
    ];
  } else if (state.currentRole === 'doctor') {
    navItems = [
      { id: 'doctor', label: t.navQueue, icon: 'user-check' },
      { id: 'network_consultation', label: t.navTeleconsult, icon: 'video' },
      { id: 'consultation_chat', label: t.navChatRx, icon: 'message-square' },
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

  return `
    <!-- Top Status Bar Simulation -->
    <div class="phone-statusbar">
      <span class="time">09:41</span>
      <div class="status-icons">
        <span style="font-size: 10px; font-weight:700;">VOLTE</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
        <svg width="18" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="11" x2="23" y2="13"></line><rect x="3" y="8" width="11" height="8" fill="currentColor"></rect></svg>
      </div>
    </div>

    <!-- App Header -->
    <header class="app-header">
      <div class="app-brand" id="btn-brand-home">
        <div class="brand-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M2 12h20"></path></svg>
        </div>
        <div class="brand-info">
          <span class="brand-name">${t.appTitle}</span>
          <span class="brand-tag">${t.tagline}</span>
        </div>
      </div>
      
      <div class="header-actions">
        <div class="role-badge-pill" id="btn-change-role" title="Tap to switch role">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span>${roleNameMap[state.currentRole]}</span>
        </div>
        
        <button class="header-btn" id="btn-open-lang" title="Change Language & Voice">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
        </button>
      </div>
    </header>

    <!-- Network Simulator Bar -->
    <div class="network-bar ${state.networkMode}" id="network-status-bar">
      <div class="net-indicator-group">
        <div class="net-bars">
          <div class="net-bar"></div>
          <div class="net-bar"></div>
          <div class="net-bar"></div>
          <div class="net-bar"></div>
        </div>
        <span style="font-weight: 600;">${state.networkMode.toUpperCase()}</span>
      </div>
      <span class="net-mode-tag">${netModeLabels[state.networkMode]}</span>
    </div>

    <!-- Main Screen Render Outlet -->
    <main class="app-content" id="app-screen-outlet">
      <!-- Screen HTML will be injected here -->
    </main>

    <!-- Bottom Navigation Bar -->
    <nav class="app-bottom-nav">
      ${navItems.map(item => `
        <button class="nav-item ${item.isSOS ? 'nav-sos-btn' : ''}" data-nav="${item.id}" id="nav-${item.id}">
          <i data-lucide="${item.icon}"></i>
          <span>${item.label}</span>
        </button>
      `).join('')}
    </nav>
  `;
}
