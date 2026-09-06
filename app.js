/**
 * HEALER — Main Application Router & State Controller
 * Modern, Simple, Clean Healthcare Web Application
 */

import { appStore } from './src/data/mockData.js';
import { locales } from './src/data/locales.js';
import { renderAppShell } from './src/components/AppShell.js';
import { renderLanguageModal } from './src/components/LanguageModal.js';

// Screen Renderers
import { renderWelcomeScreen } from './src/screens/WelcomeScreen.js';
import { renderOTPVerificationScreen } from './src/screens/OTPVerificationScreen.js';
import { renderPatientHomeScreen } from './src/screens/PatientHomeScreen.js';
import { renderAppointmentWizardScreen } from './src/screens/AppointmentWizardScreen.js';
import { renderAppointmentsScreen } from './src/screens/AppointmentsScreen.js';
import { renderNearbyClinicsScreen } from './src/screens/NearbyClinicsScreen.js';
import { renderHealthJourneyScreen } from './src/screens/HealthJourneyScreen.js';
import { renderHowToUseScreen } from './src/screens/HowToUseScreen.js';
import { renderHealthWorkerScreen } from './src/screens/HealthWorkerScreen.js';
import { renderDoctorScreen } from './src/screens/DoctorScreen.js';
import { renderFacilityScreen } from './src/screens/FacilityScreen.js';
import { renderProfileScreen } from './src/screens/ProfileScreen.js';

class AppRouter {
  constructor() {
    this.currentScreen = 'welcome';
    this.isLanguageModalOpen = false;
    this.isSidebarOpen = false;

    // Login & OTP state
    this.otpStep = 'identifier'; // 'identifier' | 'otp'
    this.currentOtpValue = '';
    this.otpErrorMessage = '';

    // Appointment Wizard state
    this.wizardState = {
      step: 1,
      facility: 'PHC Rampur Community Health Centre',
      service: 'General OPD Consultation',
      doctor: 'Dr. Ananya Sharma',
      date: 'Today',
      time: '10:30 AM',
      confirmedToken: 'B-15'
    };

    // Appointments tab state
    this.appointmentsTab = 'upcoming'; // 'upcoming' | 'past'

    // Nearby Care state
    this.nearbyFilter = 'all';
    this.selectedFacilityModalId = null;
    this.leafletMapInstance = null;

    // Subscribe to store updates
    appStore.subscribe(() => {
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
    
    // Reset wizard if opening fresh
    if (screenId === 'appointment_wizard' && this.wizardState.step === 7) {
      this.wizardState.step = 1;
    }

    this.render();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleSidebarDrawer() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const sidebar = document.getElementById('app-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('drawer-open', this.isSidebarOpen);
    if (overlay) overlay.classList.toggle('active', this.isSidebarOpen);
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

  openLanguageModal() {
    this.isLanguageModalOpen = true;
    this.render();
  }

  closeLanguageModal() {
    this.isLanguageModalOpen = false;
    this.render();
  }

  render() {
    const state = appStore.getState();
    const appContainer = document.getElementById('phone-app-root') || document.querySelector('.app-root-container');
    if (!appContainer) return;

    // Render Shell structure
    appContainer.innerHTML = renderAppShell(
      appContainer,
      state,
      this.currentScreen,
      (screen) => this.navigateTo(screen),
      () => this.openLanguageModal()
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

    // Hydrate Lucide Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Initialize Leaflet Map if on nearby clinics screen
    if (this.currentScreen === 'nearby_clinics') {
      setTimeout(() => this.initLeafletMap(state), 50);
    }

    // Attach screen-specific interactive listeners
    this.attachScreenListeners(state);
  }

  getScreenHTML(screenId, state) {
    switch (screenId) {
      case 'welcome':
        return renderWelcomeScreen(state);
      case 'otp_verification':
        return renderOTPVerificationScreen(state, this.otpStep, this.currentOtpValue, this.otpErrorMessage);
      case 'patient_home':
        return renderPatientHomeScreen(state);
      case 'appointment_wizard':
        return renderAppointmentWizardScreen(state, this.wizardState);
      case 'appointments':
        return renderAppointmentsScreen(state, this.appointmentsTab);
      case 'nearby_clinics':
        return renderNearbyClinicsScreen(state, this.nearbyFilter, this.selectedFacilityModalId);
      case 'health_journey':
        return renderHealthJourneyScreen(state);
      case 'how_to_use':
        return renderHowToUseScreen(state);
      case 'health_worker':
        return renderHealthWorkerScreen(state);
      case 'doctor':
        return renderDoctorScreen(state);
      case 'facility':
        return renderFacilityScreen(state);
      case 'profile':
        return renderProfileScreen(state);
      default:
        return renderPatientHomeScreen(state);
    }
  }

  initLeafletMap(state) {
    const mapElement = document.getElementById('healer-leaflet-map');
    if (!mapElement || typeof L === 'undefined') return;

    if (this.leafletMapInstance) {
      this.leafletMapInstance.remove();
      this.leafletMapInstance = null;
    }

    const facilities = state.facilities || [];
    const centerLat = 25.432;
    const centerLng = 78.567;

    try {
      const map = L.map('healer-leaflet-map', {
        zoomControl: true,
        scrollWheelZoom: false
      }).setView([centerLat, centerLng], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Add Custom Facility Markers
      facilities.forEach(fac => {
        if (fac.lat && fac.lng) {
          const marker = L.marker([fac.lat, fac.lng]).addTo(map);
          marker.bindPopup(`
            <div style="font-family: var(--font-body); padding: 4px;">
              <strong style="font-size: 13px; color: var(--color-primary);">${fac.name}</strong>
              <div style="font-size: 11.5px; color: #555; margin-top: 2px;">${fac.type} • ${fac.distance}</div>
              <div style="font-size: 11.5px; color: #286B4F; font-weight: 700; margin-top: 2px;">${fac.status || 'Open'}</div>
            </div>
          `);
        }
      });

      this.leafletMapInstance = map;
    } catch (e) {
      console.warn('Leaflet map init warning:', e);
    }
  }

  attachGlobalListeners() {
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

      // Navigation item click delegation
      const navBtn = e.target.closest('[data-nav]');
      if (navBtn) {
        const targetScreen = navBtn.dataset.nav;
        this.navigateTo(targetScreen);
        return;
      }

      // Brand click -> Return to welcome or home
      if (e.target.closest('#btn-brand-home')) {
        if (state.isVerified) {
          if (state.currentRole === 'health_worker') this.navigateTo('health_worker');
          else if (state.currentRole === 'doctor') this.navigateTo('doctor');
          else if (state.currentRole === 'facility') this.navigateTo('facility');
          else this.navigateTo('patient_home');
        } else {
          this.navigateTo('welcome');
        }
        return;
      }

      // Switch Portal button click
      if (e.target.closest('#btn-header-switch-portal') || e.target.closest('#btn-switch-portal-sidebar') || e.target.closest('#btn-profile-switch-portal')) {
        appStore.switchPortal();
        this.navigateTo('welcome');
        this.showToast(t.choosePortalTitle || 'Select a portal', 'info');
        return;
      }

      // Logout button click
      if (e.target.closest('#btn-logout-sidebar') || e.target.closest('#btn-profile-logout')) {
        appStore.logout();
        this.navigateTo('welcome');
        this.showToast(t.logout || 'Logged out', 'info');
        return;
      }

      // Language modal open button
      if (e.target.closest('#btn-open-lang') || e.target.closest('#btn-profile-change-lang')) {
        this.openLanguageModal();
        return;
      }

      // Close language modal
      if (e.target.closest('#btn-close-lang') || (e.target.id === 'language-modal-overlay' && !e.target.closest('#language-modal-dialog'))) {
        this.closeLanguageModal();
        return;
      }

      // Language option selection
      const langOption = e.target.closest('.lang-modal-card');
      if (langOption) {
        const langCode = langOption.dataset.lang;
        appStore.setLanguage(langCode);
        this.closeLanguageModal();
        return;
      }

      // Facility details modal close
      if (e.target.closest('#btn-close-facility-modal') || e.target.id === 'facility-details-modal-overlay') {
        this.selectedFacilityModalId = null;
        this.render();
        return;
      }
    });
  }

  attachScreenListeners(state) {
    const t = locales[state.currentLanguage] || locales.en;

    // Welcome Screen Buttons
    const getStartedBtn = document.getElementById('btn-hero-get-started');
    if (getStartedBtn) {
      getStartedBtn.onclick = () => {
        const portalSection = document.getElementById('section-portal-selection');
        if (portalSection) {
          portalSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }

    const howItWorksBtn = document.getElementById('btn-hero-how-it-works');
    if (howItWorksBtn) {
      howItWorksBtn.onclick = () => {
        const howSection = document.getElementById('section-how-it-works');
        if (howSection) {
          howSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }

    // Portal selection cards
    document.querySelectorAll('.portal-card-clean, .btn-enter-portal').forEach(el => {
      el.onclick = (e) => {
        e.stopPropagation();
        const portal = el.dataset.portal || el.closest('.portal-card-clean')?.dataset.portal;
        if (portal) {
          appStore.selectPortal(portal);
          this.otpStep = 'identifier';
          this.currentOtpValue = '';
          this.otpErrorMessage = '';
          this.navigateTo('otp_verification');
        }
      };
    });

    // OTP Screen Back Button
    const btnOtpBack = document.getElementById('btn-otp-back-portal');
    if (btnOtpBack) {
      btnOtpBack.onclick = () => this.navigateTo('welcome');
    }

    // Step 1: Send OTP Form
    const sendOtpForm = document.getElementById('form-send-otp');
    if (sendOtpForm) {
      sendOtpForm.onsubmit = (e) => {
        e.preventDefault();
        const identifierInput = document.getElementById('input-user-identifier');
        const identifier = identifierInput && identifierInput.value.trim() ? identifierInput.value.trim() : '9876543210';
        
        if (identifier.includes('@')) {
          state.userEmail = identifier;
        } else {
          state.userMobile = '+91 ' + identifier.replace('+91', '').trim();
        }

        this.otpStep = 'otp';
        this.currentOtpValue = '';
        this.otpErrorMessage = '';
        this.showToast(t.demoOtpNote || 'Demo mode: use 123456', 'info');
        this.render();
      };
    }

    // Auto-fill OTP button
    const autoFillBtn = document.getElementById('btn-autofill-otp');
    if (autoFillBtn) {
      autoFillBtn.onclick = () => {
        const otpInput = document.getElementById('input-otp-code');
        if (otpInput) {
          otpInput.value = '123456';
          this.currentOtpValue = '123456';
          otpInput.focus();
        }
      };
    }

    // OTP code live input
    const otpInput = document.getElementById('input-otp-code');
    if (otpInput) {
      otpInput.oninput = (e) => {
        this.currentOtpValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
        if (otpInput.value !== this.currentOtpValue) {
          otpInput.value = this.currentOtpValue;
        }
      };
    }

    // Step 2: Verify OTP Form
    const verifyOtpForm = document.getElementById('form-verify-otp');
    if (verifyOtpForm) {
      verifyOtpForm.onsubmit = (e) => {
        e.preventDefault();
        const codeInput = document.getElementById('input-otp-code');
        const enteredCode = codeInput ? codeInput.value.trim() : this.currentOtpValue;

        if (!enteredCode || enteredCode.length < 6) {
          this.otpErrorMessage = t.invalidOtp || 'Please enter a valid 6-digit code (Use: 123456).';
          this.render();
          return;
        }

        if (enteredCode === '123456' || enteredCode.length === 6) {
          const selectedPortal = state.selectedPortal || state.currentRole || 'patient';
          this.otpErrorMessage = '';
          this.currentOtpValue = '';

          // Authenticate session
          appStore.setAuthenticatedSession('mock_token_' + Date.now(), {
            identifier: state.userMobile || state.userEmail || '9876543210',
            role: selectedPortal
          });
          
          this.showToast(t.loginSuccess || 'Signed in successfully.', 'success');

          // Navigate to respective dashboard
          if (selectedPortal === 'health_worker') {
            this.navigateTo('health_worker');
          } else if (selectedPortal === 'doctor') {
            this.navigateTo('doctor');
          } else if (selectedPortal === 'facility') {
            this.navigateTo('facility');
          } else {
            this.navigateTo('patient_home');
          }
        } else {
          this.otpErrorMessage = t.invalidOtp || 'Please enter a valid 6-digit code (Use: 123456).';
          this.render();
        }
      };
    }

    // Change number button
    const changeMobileBtn = document.getElementById('btn-change-mobile');
    if (changeMobileBtn) {
      changeMobileBtn.onclick = () => {
        this.otpStep = 'identifier';
        this.otpErrorMessage = '';
        this.render();
      };
    }

    // Resend OTP button
    const resendOtpBtn = document.getElementById('btn-resend-demo-otp');
    if (resendOtpBtn) {
      resendOtpBtn.onclick = () => {
        this.showToast(t.demoOtpNote || 'Demo mode: use 123456', 'info');
      };
    }

    // Patient Home: First-time welcome actions
    const dismissWelcomeBtn = document.getElementById('btn-dismiss-welcome');
    if (dismissWelcomeBtn) {
      dismissWelcomeBtn.onclick = () => {
        appStore.dismissWelcomeBanner();
      };
    }

    const welcomeBookBtn = document.getElementById('btn-welcome-book');
    if (welcomeBookBtn) {
      welcomeBookBtn.onclick = () => this.navigateTo('appointment_wizard');
    }

    const welcomeNearbyBtn = document.getElementById('btn-welcome-nearby');
    if (welcomeNearbyBtn) {
      welcomeNearbyBtn.onclick = () => this.navigateTo('nearby_clinics');
    }

    const welcomeJourneyBtn = document.getElementById('btn-welcome-journey');
    if (welcomeJourneyBtn) {
      welcomeJourneyBtn.onclick = () => this.navigateTo('health_journey');
    }

    // Patient Home: 4 Main Dashboard Actions
    const actionBookAppt = document.getElementById('action-book-appointment');
    if (actionBookAppt) {
      actionBookAppt.onclick = () => this.navigateTo('appointment_wizard');
    }

    const actionFindNearby = document.getElementById('action-find-nearby');
    if (actionFindNearby) {
      actionFindNearby.onclick = () => this.navigateTo('nearby_clinics');
    }

    const actionJourney = document.getElementById('action-health-journey');
    if (actionJourney) {
      actionJourney.onclick = () => this.navigateTo('health_journey');
    }

    const actionMyAppts = document.getElementById('action-my-appointments');
    if (actionMyAppts) {
      actionMyAppts.onclick = () => this.navigateTo('appointments');
    }

    const activeTokenCard = document.getElementById('card-patient-active-token');
    if (activeTokenCard) {
      activeTokenCard.onclick = () => this.navigateTo('appointments');
    }

    // Appointment Wizard Steps Navigation & Selections
    document.querySelectorAll('[data-wizard-select]').forEach(el => {
      el.onclick = () => {
        const type = el.dataset.wizardSelect;
        const val = el.dataset.value;
        if (type && val) {
          this.wizardState[type] = val;
          this.render();
        }
      };
    });

    const wizardCancel = document.getElementById('btn-wizard-cancel');
    if (wizardCancel) {
      wizardCancel.onclick = () => this.navigateTo('patient_home');
    }

    const nextBtn1 = document.getElementById('btn-wizard-next-1');
    if (nextBtn1) nextBtn1.onclick = () => { this.wizardState.step = 2; this.render(); };

    const prevBtn2 = document.getElementById('btn-wizard-prev-2');
    if (prevBtn2) prevBtn2.onclick = () => { this.wizardState.step = 1; this.render(); };
    const nextBtn2 = document.getElementById('btn-wizard-next-2');
    if (nextBtn2) nextBtn2.onclick = () => { this.wizardState.step = 3; this.render(); };

    const prevBtn3 = document.getElementById('btn-wizard-prev-3');
    if (prevBtn3) prevBtn3.onclick = () => { this.wizardState.step = 2; this.render(); };
    const nextBtn3 = document.getElementById('btn-wizard-next-3');
    if (nextBtn3) nextBtn3.onclick = () => { this.wizardState.step = 4; this.render(); };

    const prevBtn4 = document.getElementById('btn-wizard-prev-4');
    if (prevBtn4) prevBtn4.onclick = () => { this.wizardState.step = 3; this.render(); };
    const nextBtn4 = document.getElementById('btn-wizard-next-4');
    if (nextBtn4) nextBtn4.onclick = () => { this.wizardState.step = 5; this.render(); };

    const prevBtn5 = document.getElementById('btn-wizard-prev-5');
    if (prevBtn5) prevBtn5.onclick = () => { this.wizardState.step = 4; this.render(); };
    const nextBtn5 = document.getElementById('btn-wizard-next-5');
    if (nextBtn5) nextBtn5.onclick = () => { this.wizardState.step = 6; this.render(); };

    const prevBtn6 = document.getElementById('btn-wizard-prev-6');
    if (prevBtn6) prevBtn6.onclick = () => { this.wizardState.step = 5; this.render(); };

    // Confirm Appointment in Wizard
    const confirmWizardBtn = document.getElementById('btn-wizard-confirm');
    if (confirmWizardBtn) {
      confirmWizardBtn.onclick = async () => {
        confirmWizardBtn.disabled = true;
        confirmWizardBtn.innerHTML = 'Confirming...';

        const createdAppt = await appStore.addAppointment(
          this.wizardState.facility,
          this.wizardState.service,
          this.wizardState.doctor,
          this.wizardState.date,
          this.wizardState.time
        );

        this.wizardState.confirmedToken = createdAppt.token;
        this.wizardState.step = 7;
        this.showToast(t.confirmedTitle || 'Appointment confirmed!', 'success');
        this.render();
      };
    }

    const wizardDoneBtn = document.getElementById('btn-wizard-done');
    if (wizardDoneBtn) {
      wizardDoneBtn.onclick = () => {
        this.wizardState.step = 1;
        this.navigateTo('patient_home');
      };
    }

    const wizardGotoApptsBtn = document.getElementById('btn-wizard-goto-appointments');
    if (wizardGotoApptsBtn) {
      wizardGotoApptsBtn.onclick = () => {
        this.wizardState.step = 1;
        this.navigateTo('appointments');
      };
    }

    // Appointments Screen Actions
    const bookNewApptBtn = document.getElementById('btn-appointments-book-new') || document.getElementById('btn-empty-book-appt');
    if (bookNewApptBtn) {
      bookNewApptBtn.onclick = () => this.navigateTo('appointment_wizard');
    }

    const tabUpcomingBtn = document.getElementById('tab-btn-upcoming');
    if (tabUpcomingBtn) {
      tabUpcomingBtn.onclick = () => {
        this.appointmentsTab = 'upcoming';
        this.render();
      };
    }

    const tabPastBtn = document.getElementById('tab-btn-past');
    if (tabPastBtn) {
      tabPastBtn.onclick = () => {
        this.appointmentsTab = 'past';
        this.render();
      };
    }

    document.querySelectorAll('.btn-cancel-appointment').forEach(btn => {
      btn.onclick = () => {
        const apptId = btn.dataset.apptId;
        if (confirm(t.cancelConfirmMsg || 'Are you sure you want to cancel this appointment?')) {
          appStore.cancelAppointment(apptId);
          this.showToast(t.statusCancelled || 'Appointment cancelled', 'warning');
        }
      };
    });

    // Nearby Care Screen Filters & Details Modal
    document.querySelectorAll('[data-facility-filter]').forEach(chip => {
      chip.onclick = () => {
        this.nearbyFilter = chip.dataset.facilityFilter;
        this.render();
      };
    });

    const useMyLocationBtn = document.getElementById('btn-use-my-location');
    if (useMyLocationBtn) {
      useMyLocationBtn.onclick = () => {
        this.showToast('Location updated: Showing facilities within 15 km of Rampur', 'success');
      };
    }

    document.querySelectorAll('.btn-view-facility-details').forEach(btn => {
      btn.onclick = () => {
        this.selectedFacilityModalId = btn.dataset.facilityId;
        this.render();
      };
    });

    document.querySelectorAll('.btn-quick-book-facility, #btn-modal-book-facility').forEach(btn => {
      btn.onclick = () => {
        const facName = btn.dataset.facilityName;
        if (facName) {
          this.wizardState.facility = facName;
          this.wizardState.step = 2;
        }
        this.selectedFacilityModalId = null;
        this.navigateTo('appointment_wizard');
      };
    });

    // Health Journey First Book Button
    const journeyBookFirstBtn = document.getElementById('btn-journey-book-first');
    if (journeyBookFirstBtn) {
      journeyBookFirstBtn.onclick = () => this.navigateTo('appointment_wizard');
    }
  }
}

// Start HEALER App
function startHealerApp() {
  if (!window.appRouter) {
    window.appRouter = new AppRouter();
    window.appRouter.init();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startHealerApp);
} else {
  startHealerApp();
}
