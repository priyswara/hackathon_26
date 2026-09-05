/**
 * Main Application Controller & State Router
 * Rural Healthcare Access Platform — Responsive Web Application
 */

import { appStore } from './src/data/mockData.js';
import { locales } from './src/data/locales.js';
import { renderAppShell } from './src/components/AppShell.js';
import { renderLanguageModal } from './src/components/LanguageModal.js';

// Screen Renderers
import { renderWelcomeScreen } from './src/screens/WelcomeScreen.js';
import { renderPatientHomeScreen } from './src/screens/PatientHomeScreen.js';
import { renderAppointmentQueueScreen } from './src/screens/AppointmentQueueScreen.js';
import { renderTriageScreen } from './src/screens/TriageScreen.js';
import { renderNetworkConsultationScreen } from './src/screens/NetworkConsultationScreen.js';
import { renderConsultationChatScreen } from './src/screens/ConsultationChatScreen.js';
import { renderHealthJourneyScreen } from './src/screens/HealthJourneyScreen.js';
import { renderMedicinesDiagnosticsScreen } from './src/screens/MedicinesDiagnosticsScreen.js';
import { renderFollowUpsScreen } from './src/screens/FollowUpsScreen.js';
import { renderHealthWorkerScreen } from './src/screens/HealthWorkerScreen.js';
import { renderDoctorScreen } from './src/screens/DoctorScreen.js';
import { renderFacilityScreen } from './src/screens/FacilityScreen.js';
import { renderSchemesScreen } from './src/screens/SchemesScreen.js';
import { renderEmergencyScreen } from './src/screens/EmergencyScreen.js';

class AppRouter {
  constructor() {
    this.currentScreen = 'welcome';
    this.activeMedDiagTab = 'medicines';
    this.selectedSlot = '10:30 AM';
    this.isLanguageModalOpen = false;
    this.isSidebarOpen = false;
    
    // Subscribe to global store
    appStore.subscribe((state) => {
      this.render();
    });
  }

  async init() {
    this.render();
    this.attachGlobalListeners();
    await appStore.initFromBackend();
  }

  navigateTo(screenId) {
    this.currentScreen = screenId;
    this.closeSidebarDrawer();
    this.render();
    
    // Scroll content to top
    const content = document.getElementById('app-screen-outlet');
    if (content) content.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleSidebarDrawer() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const sidebar = document.getElementById('app-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) {
      sidebar.classList.toggle('drawer-open', this.isSidebarOpen);
    }
    if (overlay) {
      overlay.classList.toggle('active', this.isSidebarOpen);
    }
  }

  closeSidebarDrawer() {
    this.isSidebarOpen = false;
    const sidebar = document.getElementById('app-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('drawer-open');
    if (overlay) overlay.classList.remove('active');
  }

  showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  render() {
    const state = appStore.getState();
    const appContainer = document.getElementById('phone-app-root') || document.querySelector('.app-root-container');
    if (!appContainer) return;

    // Render Shell structure
    appContainer.innerHTML = renderAppShell(
      appContainer,
      state,
      (screen) => this.navigateTo(screen),
      () => this.openLanguageModal(),
      () => this.navigateTo('emergency_sos')
    );

    // Render Active Screen inside outlet
    const outlet = document.getElementById('app-screen-outlet');
    if (outlet) {
      outlet.innerHTML = this.getScreenHTML(this.currentScreen, state);
    }

    // Append Language Modal if open
    if (this.isLanguageModalOpen) {
      const modalWrapper = document.createElement('div');
      modalWrapper.innerHTML = renderLanguageModal(state.currentLanguage);
      appContainer.appendChild(modalWrapper.firstElementChild);
      setTimeout(() => {
        const overlay = document.getElementById('language-modal-overlay');
        if (overlay) overlay.classList.add('active');
      }, 10);
    }

    // Update active nav button
    const navButtons = document.querySelectorAll('.sidebar-nav-item, .nav-item');
    navButtons.forEach(btn => {
      if (btn.dataset.nav === this.currentScreen) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Hydrate Lucide Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Attach screen-specific interactive listeners
    this.attachScreenListeners(state);
  }

  getScreenHTML(screenId, state) {
    switch (screenId) {
      case 'welcome':
        return renderWelcomeScreen(state);
      case 'patient_home':
        return renderPatientHomeScreen(state);
      case 'appointment_queue':
        return renderAppointmentQueueScreen(state);
      case 'triage':
        return renderTriageScreen(state);
      case 'network_consultation':
        return renderNetworkConsultationScreen(state);
      case 'consultation_chat':
        return renderConsultationChatScreen(state);
      case 'health_journey':
        return renderHealthJourneyScreen(state);
      case 'medicines_diagnostics':
        return renderMedicinesDiagnosticsScreen(state, this.activeMedDiagTab);
      case 'followups':
        return renderFollowUpsScreen(state);
      case 'health_worker':
        return renderHealthWorkerScreen(state);
      case 'doctor':
        return renderDoctorScreen(state);
      case 'facility':
        return renderFacilityScreen(state);
      case 'schemes':
        return renderSchemesScreen(state);
      case 'emergency_sos':
        return renderEmergencyScreen(state);
      default:
        return renderPatientHomeScreen(state);
    }
  }

  openLanguageModal() {
    this.isLanguageModalOpen = true;
    this.render();
  }

  closeLanguageModal() {
    this.isLanguageModalOpen = false;
    this.render();
  }

  attachGlobalListeners() {
    // Click delegation for navigation and actions
    document.addEventListener('click', (e) => {
      const state = appStore.getState();
      const t = locales[state.currentLanguage] || locales.en;

      // Sidebar mobile drawer toggle
      if (e.target.closest('#btn-toggle-sidebar')) {
        this.toggleSidebarDrawer();
        return;
      }

      // Sidebar mobile overlay click -> close drawer
      if (e.target.closest('#sidebar-overlay')) {
        this.closeSidebarDrawer();
        return;
      }

      // Navigation bar / item click delegation
      const navBtn = e.target.closest('[data-nav]');
      if (navBtn) {
        const targetScreen = navBtn.dataset.nav;
        this.navigateTo(targetScreen);
        return;
      }

      // Brand click -> Return to welcome or home
      if (e.target.closest('#btn-brand-home') || e.target.closest('#btn-brand-text')) {
        this.navigateTo('welcome');
        return;
      }

      // Role change badge click
      if (e.target.closest('#btn-change-role') || e.target.closest('#btn-header-role')) {
        this.navigateTo('welcome');
        return;
      }

      // Network indicator pill click -> Cycle network mode
      if (e.target.closest('#header-network-pill')) {
        const modes = ['good', 'moderate', 'low'];
        const currentIdx = modes.indexOf(state.networkMode);
        const nextMode = modes[(currentIdx + 1) % modes.length];
        appStore.setNetworkMode(nextMode);
        const newT = locales[state.currentLanguage] || locales.en;
        this.showToast(`${newT.networkSwitchedToast || 'Network Mode:'} ${nextMode.toUpperCase()}`, 'warning');
        return;
      }

      // Language modal open button
      if (e.target.closest('#btn-open-lang') || e.target.closest('#btn-quick-voice')) {
        this.openLanguageModal();
        return;
      }

      // Close language modal
      if (e.target.closest('#btn-close-lang') || (e.target.id === 'language-modal-overlay' && !e.target.closest('#language-modal-dialog'))) {
        this.closeLanguageModal();
        return;
      }

      // Language option selection
      const langOption = e.target.closest('.lang-option-card');
      if (langOption) {
        const langCode = langOption.dataset.lang;
        appStore.setLanguage(langCode);
        const newT = locales[langCode] || locales.en;
        this.showToast(newT.langSwitchedToast || `Language switched to ${locales[langCode].nativeName}`, 'success');
        this.closeLanguageModal();
        return;
      }

      // Voice Mic simulation in Language Modal
      const micBtn = e.target.closest('#btn-voice-mic');
      if (micBtn) {
        const heading = document.getElementById('voice-status-heading');
        const sub = document.getElementById('voice-status-sub');
        micBtn.classList.add('listening');
        if (heading) heading.textContent = `${t.listening} 🎙️`;
        if (sub) sub.textContent = t.voiceHelperSub;

        setTimeout(() => {
          micBtn.classList.remove('listening');
          this.showToast(t.voiceResolved, 'success');
          this.closeLanguageModal();
          this.navigateTo('appointment_queue');
        }, 1800);
        return;
      }
    });

    // Toolbar controls (if present)
    document.querySelectorAll('[data-demo-role]').forEach(btn => {
      btn.addEventListener('click', () => {
        const role = btn.dataset.demoRole;
        appStore.setRole(role);
        const state = appStore.getState();
        const t = locales[state.currentLanguage] || locales.en;
        if (role === 'patient') this.navigateTo('patient_home');
        else if (role === 'health_worker') this.navigateTo('health_worker');
        else if (role === 'doctor') this.navigateTo('doctor');
        else if (role === 'facility') this.navigateTo('facility');
        this.showToast(`${t.roleSwitchedToast} ${role.toUpperCase()}`, 'success');
      });
    });

    document.querySelectorAll('[data-demo-net]').forEach(btn => {
      btn.addEventListener('click', () => {
        const net = btn.dataset.demoNet;
        appStore.setNetworkMode(net);
        const state = appStore.getState();
        const t = locales[state.currentLanguage] || locales.en;
        this.showToast(`${t.networkSwitchedToast} ${net.toUpperCase()}`, 'warning');
      });
    });

    const resetBtn = document.getElementById('btn-reset-demo');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        appStore.resetToInitial();
        const state = appStore.getState();
        const t = locales[state.currentLanguage] || locales.en;
        this.navigateTo('welcome');
        this.showToast(t.resetStateToast, 'success');
      });
    }
  }

  attachScreenListeners(state) {
    const t = locales[state.currentLanguage] || locales.en;

    // Back to home button
    const backBtn = document.getElementById('btn-back-home');
    if (backBtn) {
      backBtn.onclick = () => {
        if (state.currentRole === 'health_worker') this.navigateTo('health_worker');
        else if (state.currentRole === 'doctor') this.navigateTo('doctor');
        else if (state.currentRole === 'facility') this.navigateTo('facility');
        else this.navigateTo('patient_home');
      };
    }

    // Role selection cards on Welcome Screen
    document.querySelectorAll('.role-select-card').forEach(card => {
      card.onclick = () => {
        const role = card.dataset.setRole;
        appStore.setRole(role);
        if (role === 'patient') this.navigateTo('patient_home');
        else if (role === 'health_worker') this.navigateTo('health_worker');
        else if (role === 'doctor') this.navigateTo('doctor');
        else if (role === 'facility') this.navigateTo('facility');
      };
    });

    // Patient Home Quick Action Tiles
    const mapAction = (id, screen) => {
      const el = document.getElementById(id);
      if (el) el.onclick = () => this.navigateTo(screen);
    };
    mapAction('card-active-token', 'appointment_queue');
    mapAction('action-book-opd', 'appointment_queue');
    mapAction('action-triage', 'triage');
    mapAction('action-teleconsult', 'network_consultation');
    mapAction('action-health-journey', 'health_journey');
    mapAction('action-medicines', 'medicines_diagnostics');
    mapAction('action-diagnostics', 'medicines_diagnostics');
    mapAction('action-followups', 'followups');
    mapAction('action-schemes', 'schemes');
    mapAction('card-asha-contact', 'followups');

    // Appointment & Queue Screen Actions
    document.querySelectorAll('.slot-btn').forEach(btn => {
      if (!btn.disabled) {
        btn.onclick = () => {
          document.querySelectorAll('.slot-btn').forEach(b => {
            b.classList.remove('btn-secondary', 'active');
            b.classList.add('btn-outline');
          });
          btn.classList.remove('btn-outline');
          btn.classList.add('btn-secondary', 'active');
          this.selectedSlot = btn.dataset.slot;
        };
      }
    });

    const confirmApptBtn = document.getElementById('btn-confirm-appointment');
    if (confirmApptBtn) {
      confirmApptBtn.onclick = async () => {
        confirmApptBtn.disabled = true;
        const originalText = confirmApptBtn.innerHTML;
        confirmApptBtn.innerHTML = `<span>Booking...</span>`;

        try {
          const docSelect = document.getElementById('select-doctor');
          const docName = docSelect ? docSelect.value : 'Dr. Ananya Sharma';
          const newToken = await appStore.addAppointment(docName, this.selectedSlot, 'PHC Rampur Hub');
          this.showToast(`Token #${newToken} — ${t.appointmentConfirmedToast}`, 'success');
          this.navigateTo('health_journey');
        } catch (err) {
          console.error('Appointment booking error:', err);
          this.showToast('Could not complete booking', 'danger');
        } finally {
          if (confirmApptBtn) {
            confirmApptBtn.disabled = false;
            confirmApptBtn.innerHTML = originalText;
          }
        }
      };
    }

    // Triage Screen Actions
    const triageCalcBtn = document.getElementById('btn-calculate-triage');
    if (triageCalcBtn) {
      triageCalcBtn.onclick = () => {
        const breathingChk = document.getElementById('chk-breathing');
        const isHigh = breathingChk && breathingChk.checked;
        const priority = isHigh ? 'High' : 'Medium';
        
        const symptoms = [];
        document.querySelectorAll('.triage-checkbox:checked').forEach(c => symptoms.push(c.value));
        
        appStore.submitTriageResult(priority, symptoms);

        const resultCard = document.getElementById('triage-result-card');
        const resultBadge = document.getElementById('triage-result-badge');
        const resultTitle = document.getElementById('triage-result-title');
        const resultDesc = document.getElementById('triage-result-desc');

        if (resultCard) {
          resultCard.style.display = 'block';
          if (isHigh) {
            resultCard.style.borderTopColor = 'var(--color-danger)';
            if (resultBadge) {
              resultBadge.className = 'status-badge badge-danger';
              resultBadge.textContent = t.highPriorityBadge;
            }
            if (resultTitle) resultTitle.textContent = t.criticalUrgentAlertTitle;
            if (resultDesc) resultDesc.innerHTML = `${t.criticalUrgentAlertDesc}`;
            
            // Add SOS button
            const actionsDiv = document.getElementById('triage-result-actions');
            if (actionsDiv) {
              actionsDiv.innerHTML = `
                <button class="btn btn-danger btn-full" id="btn-triage-goto-emergency" style="padding: 11px;">
                  <i data-lucide="phone-call"></i> ${t.triggerSosBtn}
                </button>
              `;
              const sosBtn = document.getElementById('btn-triage-goto-emergency');
              if (sosBtn) sosBtn.onclick = () => this.navigateTo('emergency_sos');
            }
          } else {
            resultCard.style.borderTopColor = 'var(--color-warning)';
            if (resultBadge) {
              resultBadge.className = 'status-badge badge-warning';
              resultBadge.textContent = t.mediumPriorityBadge;
            }
            if (resultTitle) resultTitle.textContent = t.mediumPriorityAlertTitle;
            if (resultDesc) resultDesc.textContent = t.mediumPriorityAlertDesc;
          }
          this.showToast(`${t.triageUrgencyAssessment}: ${isHigh ? t.highPriority : t.mediumPriority}`, isHigh ? 'danger' : 'warning');
          if (window.lucide) window.lucide.createIcons();
        }
      };
    }

    mapAction('btn-triage-goto-teleconsult', 'network_consultation');
    mapAction('btn-triage-goto-journey', 'health_journey');

    // Network Consultation Screen Actions
    document.querySelectorAll('.net-switch-btn').forEach(btn => {
      btn.onclick = () => {
        const mode = btn.dataset.setNet;
        if (mode) {
          appStore.setNetworkMode(mode);
          this.showToast(`${t.networkSwitchedToast} ${mode.toUpperCase()}`, 'warning');
        }
      };
    });

    mapAction('btn-toggle-chat-mode', 'consultation_chat');
    mapAction('btn-open-rx-drawer', 'consultation_chat');
    mapAction('btn-open-chat-from-net', 'consultation_chat');
    mapAction('btn-switch-to-video-call', 'network_consultation');

    const endCallBtn = document.getElementById('btn-end-consult-call');
    if (endCallBtn) {
      endCallBtn.onclick = () => {
        this.showToast(t.docRxDispatchedToast, 'success');
        this.navigateTo('consultation_chat');
      };
    }

    // Consultation Chat Form Submit
    const chatForm = document.getElementById('form-chat-send');
    if (chatForm) {
      chatForm.onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById('input-chat-text');
        if (input && input.value.trim()) {
          const text = input.value.trim();
          input.value = '';
          appStore.sendChatMessage(text);
          
          // Show typing indicator
          const typingInd = document.getElementById('chat-typing-indicator');
          if (typingInd) typingInd.style.display = 'flex';
          setTimeout(() => {
            if (typingInd) typingInd.style.display = 'none';
          }, 1100);
        }
      };
    }
    mapAction('btn-chat-view-journey', 'health_journey');
    mapAction('btn-chat-check-pharmacy', 'medicines_diagnostics');

    // Medicines & Diagnostics Screen Actions
    const tabMedBtn = document.getElementById('tab-btn-medicines');
    const tabDiagBtn = document.getElementById('tab-btn-diagnostics');
    if (tabMedBtn) {
      tabMedBtn.onclick = () => {
        this.activeMedDiagTab = 'medicines';
        this.render();
      };
    }
    if (tabDiagBtn) {
      tabDiagBtn.onclick = () => {
        this.activeMedDiagTab = 'diagnostics';
        this.render();
      };
    }

    // Medicine Search Filter
    const medSearchInput = document.getElementById('input-med-search');
    if (medSearchInput) {
      medSearchInput.oninput = (e) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('.med-item-card').forEach(card => {
          if (card.dataset.name.includes(q)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      };
    }

    // Diagnostic Booking Buttons
    document.querySelectorAll('.btn-book-diagnostic').forEach(btn => {
      btn.onclick = () => {
        const test = btn.dataset.test;
        const fac = btn.dataset.facility;
        appStore.bookDiagnosticTest(test, fac);
        this.showToast(`${test} — ${t.appointmentConfirmedToast}`, 'success');
        this.navigateTo('health_journey');
      };
    });

    // Health Worker Screen Actions
    const syncBtn = document.getElementById('btn-asha-sync-records');
    if (syncBtn) {
      syncBtn.onclick = () => {
        this.showToast(t.recordsSyncedToast, 'success');
      };
    }

    const regPtBtn = document.getElementById('btn-asha-register-patient');
    if (regPtBtn) {
      regPtBtn.onclick = () => {
        this.showToast(t.newRegLoadedToast, 'success');
      };
    }

    document.querySelectorAll('.btn-asha-start-triage').forEach(btn => {
      btn.onclick = () => this.navigateTo('triage');
    });

    // Doctor Screen Actions
    mapAction('btn-doc-start-call', 'network_consultation');
    mapAction('btn-doc-open-chat', 'consultation_chat');
    
    const docIssueRxBtn = document.getElementById('btn-doc-issue-rx');
    if (docIssueRxBtn) {
      docIssueRxBtn.onclick = () => {
        this.showToast(t.docRxDispatchedToast, 'success');
        this.navigateTo('consultation_chat');
      };
    }

    const docReferBtn = document.getElementById('btn-doc-refer-dh');
    if (docReferBtn) {
      docReferBtn.onclick = () => {
        this.showToast(t.docReferralSentToast, 'warning');
      };
    }

    document.querySelectorAll('.btn-doc-call-patient').forEach(btn => {
      btn.onclick = () => {
        this.showToast(`${t.docAdmitToast} #${btn.dataset.token}`, 'success');
        this.navigateTo('network_consultation');
      };
    });

    // Emergency Screen Actions
    const dispatch108Btn = document.getElementById('btn-dispatch-108');
    if (dispatch108Btn) {
      dispatch108Btn.onclick = () => {
        dispatch108Btn.innerHTML = `<i data-lucide="check-circle"></i> ${t.ambulanceEnRoute}`;
        dispatch108Btn.style.background = '#1E9E5A';
        const st = document.getElementById('ambulance-dispatch-status');
        if (st) st.textContent = t.liveGpsTrackingActive;
        this.showToast(t.ambulanceDispatchedToast, 'danger');
        if (window.lucide) window.lucide.createIcons();
      };
    }

    const alertAshaSosBtn = document.getElementById('btn-alert-asha-sos');
    if (alertAshaSosBtn) {
      alertAshaSosBtn.onclick = () => {
        this.showToast(t.ashaSosAlertedToast, 'warning');
      };
    }
  }
}

// Instantiate and start app on window load
window.addEventListener('DOMContentLoaded', () => {
  window.appRouter = new AppRouter();
  window.appRouter.init();
});
