/**
 * Screen: HEALER Patient Dashboard
 * Clean, calm, human dashboard focusing on the 4 primary actions:
 * 1. [Book an Appointment]
 * 2. [Find Nearby Care]
 * 3. [My Health Journey]
 * 4. [My Appointments]
 * Plus: First-time user welcome section (dismissable) and Active Token status card.
 */

import { locales } from '../data/locales.js';
import { appStore } from '../data/mockData.js';

export function renderPatientHomeScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const p = state.patient || {};
  const isDismissed = appStore.isWelcomeDismissed();

  // Time-based friendly greeting
  const hour = new Date().getHours();
  let greeting = t.greetingGeneral || 'Welcome';
  if (hour < 12) greeting = t.greetingMorning || 'Good morning';
  else if (hour < 17) greeting = t.greetingAfternoon || 'Good afternoon';
  else greeting = t.greetingEvening || 'Good evening';

  const patientName = p.name || 'Ramesh Kumar';
  const activeAppt = (state.appointments || []).find(a => a.isUpcoming && a.status === 'confirmed');

  return `
    <div class="screen" id="screen-patient-home" style="width: 100%;">
      
      <!-- Greeting Header -->
      <div style="margin-bottom: 22px;">
        <div style="font-size: 13px; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">
          ${t.portalPatientTitle || 'Patient Portal'}
        </div>
        <h1 style="font-size: clamp(22px, 3.5vw, 28px); font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
          ${greeting}, ${patientName}
        </h1>
        <p style="font-size: 14.5px; color: var(--color-text-secondary);">
          ${t.whatWouldYouDo || 'What would you like to do today?'}
        </p>
      </div>

      <!-- First-Time User Welcome Banner (Dismissable) -->
      ${!isDismissed ? `
        <div class="welcome-dismissable-card" id="welcome-dismissable-card">
          <div style="display: flex; align-items: flex-start; gap: 14px;">
            <div style="width: 40px; height: 40px; border-radius: var(--radius-sm); background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <i data-lucide="sparkles" style="width: 20px; height: 20px;"></i>
            </div>
            <div>
              <h3 style="font-size: 15.5px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
                ${t.welcomeBannerTitle || 'Welcome to HEALER'}
              </h3>
              <p style="font-size: 13px; color: var(--color-text-secondary); margin-bottom: 10px;">
                ${t.welcomeBannerDesc || 'Here are a few things you can do:'}
              </p>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button class="btn btn-outline btn-sm" id="btn-welcome-book">
                  <i data-lucide="calendar-plus" style="width: 13px; height: 13px;"></i>
                  <span>${t.actionBookAppointment}</span>
                </button>
                <button class="btn btn-outline btn-sm" id="btn-welcome-nearby">
                  <i data-lucide="map-pin" style="width: 13px; height: 13px;"></i>
                  <span>${t.actionNearbyCare}</span>
                </button>
                <button class="btn btn-outline btn-sm" id="btn-welcome-journey">
                  <i data-lucide="git-commit" style="width: 13px; height: 13px;"></i>
                  <span>${t.actionHealthJourney}</span>
                </button>
              </div>
            </div>
          </div>

          <button class="btn btn-primary btn-sm" id="btn-dismiss-welcome" style="align-self: flex-start;">
            <i data-lucide="check" style="width: 14px; height: 14px;"></i>
            <span>${t.welcomeGotIt || 'Got it'}</span>
          </button>
        </div>
      ` : ''}

      <!-- Active Token Card (If present) -->
      ${activeAppt ? `
        <div class="card card-hero" id="card-patient-active-token" style="padding: 22px 24px; margin-bottom: 24px; cursor: pointer;" title="${t.viewQueueDetails}">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="status-badge" style="background: rgba(255,255,255,0.22); color: #FFFFFF; font-size: 11.5px;">
                ● ${t.activeTokenTitle}
              </span>
              <span style="font-size: 12.5px; opacity: 0.9;">${activeAppt.facility}</span>
            </div>
            <i data-lucide="chevron-right" style="width: 18px; height: 18px; opacity: 0.9;"></i>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 12px;">
            <div>
              <span style="font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.85;">${t.tokenBadge}</span>
              <div style="font-family: var(--font-heading); font-size: 34px; font-weight: 800; line-height: 1;">
                #${activeAppt.token}
              </div>
              <div style="font-size: 12.5px; opacity: 0.9; margin-top: 4px;">
                ${activeAppt.doctor} • ${activeAppt.time} (${activeAppt.date})
              </div>
            </div>

            <div style="text-align: right;">
              <div style="font-size: 13px; font-weight: 700;">${t.tokenServing}: #B-11</div>
              <div style="font-size: 11.5px; opacity: 0.9; margin-top: 2px;">
                ~${p.estimatedWaitMins || 12} min wait
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 4 Primary Action Cards Grid -->
      <div class="dashboard-actions-grid">
        
        <!-- Action 1: Book an Appointment -->
        <div class="dashboard-action-card" id="action-book-appointment">
          <div class="dashboard-action-icon">
            <i data-lucide="calendar-plus"></i>
          </div>
          <div>
            <h3 class="dashboard-action-title">${t.actionBookAppointment}</h3>
            <p class="dashboard-action-desc">${t.actionBookAppointmentDesc}</p>
          </div>
        </div>

        <!-- Action 2: Find Nearby Care -->
        <div class="dashboard-action-card" id="action-find-nearby">
          <div class="dashboard-action-icon">
            <i data-lucide="map-pin"></i>
          </div>
          <div>
            <h3 class="dashboard-action-title">${t.actionNearbyCare}</h3>
            <p class="dashboard-action-desc">${t.actionNearbyCareDesc}</p>
          </div>
        </div>

        <!-- Action 3: My Health Journey -->
        <div class="dashboard-action-card" id="action-health-journey">
          <div class="dashboard-action-icon">
            <i data-lucide="git-commit"></i>
          </div>
          <div>
            <h3 class="dashboard-action-title">${t.actionHealthJourney}</h3>
            <p class="dashboard-action-desc">${t.actionHealthJourneyDesc}</p>
          </div>
        </div>

        <!-- Action 4: My Appointments -->
        <div class="dashboard-action-card" id="action-my-appointments">
          <div class="dashboard-action-icon">
            <i data-lucide="calendar"></i>
          </div>
          <div>
            <h3 class="dashboard-action-title">${t.actionMyAppointments}</h3>
            <p class="dashboard-action-desc">${t.actionMyAppointmentsDesc}</p>
          </div>
        </div>

      </div>

    </div>
  `;
}
