/**
 * Screen: HEALER Health Journey
 * Simple, longitudinal healthcare timeline uniting:
 * Appointment → Consultation → Prescription → Follow-up
 */

import { locales } from '../data/locales.js';

export function renderHealthJourneyScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const journey = state.careJourney || [];

  return `
    <div class="screen" id="screen-health-journey" style="max-width: 780px; margin: 0 auto; width: 100%;">
      
      <!-- Top Header -->
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 22px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
          ${t.journeyTitle || 'My Health Journey'}
        </h1>
        <p style="font-size: 13.5px; color: var(--color-text-secondary);">
          ${t.journeySub || 'A simple timeline of your healthcare visits and progress.'}
        </p>
      </div>

      <!-- Timeline List or Empty State -->
      ${journey.length === 0 ? `
        <div class="card" style="text-align: center; padding: 48px 24px;">
          <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
            <i data-lucide="calendar-plus" style="width: 26px; height: 26px;"></i>
          </div>
          <h3 style="font-size: 17px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 6px;">
            ${t.noJourneyTitle || 'No health activity yet'}
          </h3>
          <p style="font-size: 13.5px; color: var(--color-text-secondary); max-width: 380px; margin: 0 auto 20px auto;">
            ${t.noJourneyDesc || 'Your healthcare timeline will build as you book appointments and visit doctors.'}
          </p>
          <button class="btn btn-primary" id="btn-journey-book-first">
            <i data-lucide="calendar-plus" style="width: 15px; height: 15px;"></i>
            <span>${t.actionBookAppointment || 'Book an Appointment'}</span>
          </button>
        </div>
      ` : `
        <div class="journey-timeline">
          ${journey.map(step => {
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';
            const statusClass = isCompleted ? 'badge-success' : (isActive ? 'badge-primary' : 'badge-warning');
            const statusLabel = isCompleted ? (t.statusCompleted || 'Completed') : (isActive ? 'Active' : 'Upcoming');

            return `
              <div class="journey-event-item">
                <div class="journey-event-node ${isCompleted ? 'completed' : ''}">
                  ${isCompleted ? '<i data-lucide="check" style="width: 13px; height: 13px;"></i>' : '<span style="width: 8px; height: 8px; border-radius: 50%; background: var(--color-primary);"></span>'}
                </div>

                <div class="journey-event-card">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; flex-wrap: wrap; gap: 8px;">
                    <div>
                      <h3 style="font-size: 15.5px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 2px;">
                        ${step.title}
                      </h3>
                      <div style="font-size: 12.5px; color: var(--color-primary); font-weight: 700;">
                        ${step.provider} • ${step.facility}
                      </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="status-badge ${statusClass}">
                        ${statusLabel}
                      </span>
                      <span style="font-size: 12px; color: var(--color-text-muted);">
                        ${step.date}
                      </span>
                    </div>
                  </div>

                  <p style="font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.45;">
                    ${step.summary}
                  </p>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}

    </div>
  `;
}
