/**
 * Screen: HEALER Appointment Booking Wizard
 * 7-Step sequential booking wizard with clear step indicator,
 * Back/Continue navigation, and instant Confirmation summary.
 */

import { locales } from '../data/locales.js';

export function renderAppointmentWizardScreen(state, wizardState) {
  const t = locales[state.currentLanguage] || locales.en;
  const currentStep = wizardState.step || 1; // 1 to 7

  const facilities = state.facilities || [];
  const services = state.services || [];
  const doctors = state.doctors || [];

  const selectedFacility = wizardState.facility || (facilities[0] ? facilities[0].name : 'PHC Rampur Community Health Centre');
  const selectedService = wizardState.service || (services[0] ? (t[services[0].code] || services[0].name) : 'General OPD Consultation');
  const selectedDoctor = wizardState.doctor || (doctors[0] ? doctors[0].name : 'Dr. Ananya Sharma');
  const selectedDate = wizardState.date || t.dateToday || 'Today';
  const selectedTime = wizardState.time || '10:30 AM';
  const bookedToken = wizardState.confirmedToken || 'B-15';

  const timeSlots = ['10:30 AM', '11:15 AM', '02:00 PM', '03:30 PM', '04:45 PM'];

  // Step names
  const steps = [
    { num: 1, label: t.wizardStep1 || 'Facility' },
    { num: 2, label: t.wizardStep2 || 'Service' },
    { num: 3, label: t.wizardStep3 || 'Doctor' },
    { num: 4, label: t.wizardStep4 || 'Date' },
    { num: 5, label: t.wizardStep5 || 'Time' },
    { num: 6, label: t.wizardStep6 || 'Confirm' }
  ];

  return `
    <div class="screen" id="screen-appointment-wizard" style="max-width: 680px; margin: 0 auto; width: 100%;">
      
      <!-- Wizard Header -->
      <div style="margin-bottom: 22px;">
        <h1 style="font-size: 22px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
          ${t.bookAppointmentTitle || 'Book an Appointment'}
        </h1>
        <p style="font-size: 13.5px; color: var(--color-text-secondary);">
          ${t.bookAppointmentSub || 'Follow these quick steps to schedule your care.'}
        </p>
      </div>

      <!-- Step Progress Bar (1 to 6) -->
      ${currentStep <= 6 ? `
        <div class="wizard-progress-bar">
          ${steps.map(s => {
            const isCompleted = currentStep > s.num;
            const isActive = currentStep === s.num;
            return `
              <div class="wizard-step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" data-wizard-goto="${s.num}">
                <div class="wizard-node-circle">
                  ${isCompleted ? '<i data-lucide="check" style="width: 14px; height: 14px;"></i>' : s.num}
                </div>
                <span class="wizard-step-label">${s.label}</span>
              </div>
            `;
          }).join('')}
        </div>
      ` : ''}

      <!-- Main Step Container Card -->
      <div class="card" style="padding: 26px 24px;">

        ${currentStep === 1 ? `
          <!-- STEP 1: CHOOSE HEALTH FACILITY -->
          <div>
            <div style="margin-bottom: 18px;">
              <h2 style="font-size: 17px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
                ${t.chooseFacilityTitle || 'Choose a health facility'}
              </h2>
              <p style="font-size: 13px; color: var(--color-text-secondary);">
                ${t.chooseFacilitySub || 'Select a nearby healthcare centre.'}
              </p>
            </div>

            <div class="wizard-cards-list">
              ${facilities.map(fac => `
                <div class="wizard-choice-card ${fac.name === selectedFacility ? 'selected' : ''}" data-wizard-select="facility" data-value="${fac.name}">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 38px; height: 38px; border-radius: var(--radius-sm); background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                      <i data-lucide="building-2" style="width: 18px; height: 18px;"></i>
                    </div>
                    <div>
                      <div style="font-family: var(--font-heading); font-size: 14.5px; font-weight: 700; color: var(--color-text-primary);">${fac.name}</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">${fac.type} • <strong>${fac.distance}</strong> away</div>
                    </div>
                  </div>
                  <i data-lucide="${fac.name === selectedFacility ? 'check-circle-2' : 'circle'}" style="width: 20px; height: 20px; color: ${fac.name === selectedFacility ? 'var(--color-primary)' : 'var(--color-border)'}; flex-shrink: 0;"></i>
                </div>
              `).join('')}
            </div>

            <div class="wizard-footer-buttons">
              <button class="btn btn-outline" id="btn-wizard-cancel">
                <span>${t.btnCancel || 'Cancel'}</span>
              </button>
              <button class="btn btn-primary" id="btn-wizard-next-1">
                <span>${t.btnContinue || 'Continue'}</span>
                <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
              </button>
            </div>
          </div>
        ` : ''}

        ${currentStep === 2 ? `
          <!-- STEP 2: CHOOSE SERVICE -->
          <div>
            <div style="margin-bottom: 18px;">
              <h2 style="font-size: 17px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
                ${t.chooseServiceTitle || 'Choose a service'}
              </h2>
              <p style="font-size: 13px; color: var(--color-text-secondary);">
                ${t.chooseServiceSub || 'Select the type of care you need.'}
              </p>
            </div>

            <div class="wizard-cards-list">
              ${services.map(srv => {
                const srvName = t[srv.code] || srv.name;
                const srvDesc = t[srv.desc] || srv.desc;
                const isSelected = srvName === selectedService;
                return `
                  <div class="wizard-choice-card ${isSelected ? 'selected' : ''}" data-wizard-select="service" data-value="${srvName}">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="width: 38px; height: 38px; border-radius: var(--radius-sm); background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <i data-lucide="${srv.icon || 'stethoscope'}" style="width: 18px; height: 18px;"></i>
                      </div>
                      <div>
                        <div style="font-family: var(--font-heading); font-size: 14.5px; font-weight: 700; color: var(--color-text-primary);">${srvName}</div>
                        <div style="font-size: 12px; color: var(--color-text-secondary);">${srvDesc}</div>
                      </div>
                    </div>
                    <i data-lucide="${isSelected ? 'check-circle-2' : 'circle'}" style="width: 20px; height: 20px; color: ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}; flex-shrink: 0;"></i>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="wizard-footer-buttons">
              <button class="btn btn-outline" id="btn-wizard-prev-2">
                <i data-lucide="arrow-left" style="width: 15px; height: 15px;"></i>
                <span>${t.btnBack || 'Back'}</span>
              </button>
              <button class="btn btn-primary" id="btn-wizard-next-2">
                <span>${t.btnContinue || 'Continue'}</span>
                <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
              </button>
            </div>
          </div>
        ` : ''}

        ${currentStep === 3 ? `
          <!-- STEP 3: CHOOSE DOCTOR -->
          <div>
            <div style="margin-bottom: 18px;">
              <h2 style="font-size: 17px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
                ${t.chooseDoctorTitle || 'Choose a doctor'}
              </h2>
              <p style="font-size: 13px; color: var(--color-text-secondary);">
                ${t.chooseDoctorSub || 'Select a physician or general doctor.'}
              </p>
            </div>

            <div class="wizard-cards-list">
              ${doctors.map(doc => `
                <div class="wizard-choice-card ${doc.name === selectedDoctor ? 'selected' : ''}" data-wizard-select="doctor" data-value="${doc.name}">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 38px; height: 38px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                      ${doc.avatarInitials || 'DR'}
                    </div>
                    <div>
                      <div style="font-family: var(--font-heading); font-size: 14.5px; font-weight: 700; color: var(--color-text-primary);">${doc.name}</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">${doc.specialty} • ${doc.experience}</div>
                    </div>
                  </div>
                  <i data-lucide="${doc.name === selectedDoctor ? 'check-circle-2' : 'circle'}" style="width: 20px; height: 20px; color: ${doc.name === selectedDoctor ? 'var(--color-primary)' : 'var(--color-border)'}; flex-shrink: 0;"></i>
                </div>
              `).join('')}
            </div>

            <div class="wizard-footer-buttons">
              <button class="btn btn-outline" id="btn-wizard-prev-3">
                <i data-lucide="arrow-left" style="width: 15px; height: 15px;"></i>
                <span>${t.btnBack || 'Back'}</span>
              </button>
              <button class="btn btn-primary" id="btn-wizard-next-3">
                <span>${t.btnContinue || 'Continue'}</span>
                <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
              </button>
            </div>
          </div>
        ` : ''}

        ${currentStep === 4 ? `
          <!-- STEP 4: CHOOSE DATE -->
          <div>
            <div style="margin-bottom: 18px;">
              <h2 style="font-size: 17px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
                ${t.chooseDateTitle || 'Choose a date'}
              </h2>
              <p style="font-size: 13px; color: var(--color-text-secondary);">
                ${t.chooseDateSub || 'Select a convenient day for your visit.'}
              </p>
            </div>

            <div class="wizard-cards-list">
              ${[t.dateToday || 'Today', t.dateTomorrow || 'Tomorrow', 'In 2 Days'].map(d => `
                <div class="wizard-choice-card ${d === selectedDate ? 'selected' : ''}" data-wizard-select="date" data-value="${d}">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 38px; height: 38px; border-radius: var(--radius-sm); background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                      <i data-lucide="calendar" style="width: 18px; height: 18px;"></i>
                    </div>
                    <div>
                      <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--color-text-primary);">${d}</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">${d === (t.dateToday || 'Today') ? 'Same day OPD slot' : 'Scheduled advance slot'}</div>
                    </div>
                  </div>
                  <i data-lucide="${d === selectedDate ? 'check-circle-2' : 'circle'}" style="width: 20px; height: 20px; color: ${d === selectedDate ? 'var(--color-primary)' : 'var(--color-border)'}; flex-shrink: 0;"></i>
                </div>
              `).join('')}
            </div>

            <div class="wizard-footer-buttons">
              <button class="btn btn-outline" id="btn-wizard-prev-4">
                <i data-lucide="arrow-left" style="width: 15px; height: 15px;"></i>
                <span>${t.btnBack || 'Back'}</span>
              </button>
              <button class="btn btn-primary" id="btn-wizard-next-4">
                <span>${t.btnContinue || 'Continue'}</span>
                <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
              </button>
            </div>
          </div>
        ` : ''}

        ${currentStep === 5 ? `
          <!-- STEP 5: CHOOSE TIME -->
          <div>
            <div style="margin-bottom: 18px;">
              <h2 style="font-size: 17px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
                ${t.chooseTimeTitle || 'Choose an available time'}
              </h2>
              <p style="font-size: 13px; color: var(--color-text-secondary);">
                ${t.chooseTimeSub || 'Select an available appointment time slot.'}
              </p>
            </div>

            <div class="wizard-time-slots-grid">
              ${timeSlots.map(slot => `
                <button type="button" class="wizard-slot-pill ${slot === selectedTime ? 'selected' : ''}" data-wizard-select="time" data-value="${slot}">
                  ${slot}
                </button>
              `).join('')}
            </div>

            <div class="wizard-footer-buttons">
              <button class="btn btn-outline" id="btn-wizard-prev-5">
                <i data-lucide="arrow-left" style="width: 15px; height: 15px;"></i>
                <span>${t.btnBack || 'Back'}</span>
              </button>
              <button class="btn btn-primary" id="btn-wizard-next-5">
                <span>${t.btnContinue || 'Continue'}</span>
                <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
              </button>
            </div>
          </div>
        ` : ''}

        ${currentStep === 6 ? `
          <!-- STEP 6: REVIEW APPOINTMENT -->
          <div>
            <div style="margin-bottom: 18px;">
              <h2 style="font-size: 17px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
                ${t.reviewTitle || 'Review appointment'}
              </h2>
              <p style="font-size: 13px; color: var(--color-text-secondary);">
                ${t.reviewSub || 'Check your details before confirming.'}
              </p>
            </div>

            <!-- Review Summary Card -->
            <div style="background: var(--color-surface-muted); border-radius: var(--radius-sm); padding: 18px; margin-bottom: 22px; display: flex; flex-direction: column; gap: 12px;">
              
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 8px;">
                <span style="font-size: 13px; color: var(--color-text-secondary);">${t.wizardStep1 || 'Facility'}</span>
                <strong style="font-size: 13.5px; color: var(--color-text-primary); text-align: right;">${selectedFacility}</strong>
              </div>

              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 8px;">
                <span style="font-size: 13px; color: var(--color-text-secondary);">${t.wizardStep2 || 'Service'}</span>
                <strong style="font-size: 13.5px; color: var(--color-text-primary);">${selectedService}</strong>
              </div>

              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 8px;">
                <span style="font-size: 13px; color: var(--color-text-secondary);">${t.wizardStep3 || 'Doctor'}</span>
                <strong style="font-size: 13.5px; color: var(--color-text-primary);">${selectedDoctor}</strong>
              </div>

              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 8px;">
                <span style="font-size: 13px; color: var(--color-text-secondary);">${t.wizardStep4 || 'Date'}</span>
                <strong style="font-size: 13.5px; color: var(--color-text-primary);">${selectedDate}</strong>
              </div>

              <div style="display: flex; justify-content: space-between;">
                <span style="font-size: 13px; color: var(--color-text-secondary);">${t.wizardStep5 || 'Time'}</span>
                <strong style="font-size: 13.5px; color: var(--color-primary);">${selectedTime}</strong>
              </div>

            </div>

            <div class="wizard-footer-buttons">
              <button class="btn btn-outline" id="btn-wizard-prev-6">
                <i data-lucide="arrow-left" style="width: 15px; height: 15px;"></i>
                <span>${t.btnBack || 'Back'}</span>
              </button>
              <button class="btn btn-primary" id="btn-wizard-confirm">
                <i data-lucide="check-circle" style="width: 16px; height: 16px;"></i>
                <span>${t.btnConfirm || 'Confirm Appointment'}</span>
              </button>
            </div>
          </div>
        ` : ''}

        ${currentStep === 7 ? `
          <!-- STEP 7: APPOINTMENT CONFIRMED SUCCESS SCREEN -->
          <div style="text-align: center; padding: 16px 8px;">
            
            <div style="width: 58px; height: 58px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
              <i data-lucide="check" style="width: 32px; height: 32px;"></i>
            </div>

            <h2 style="font-size: 22px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 6px;">
              ${t.confirmedTitle || 'Appointment confirmed!'}
            </h2>
            <p style="font-size: 14px; color: var(--color-text-secondary); max-width: 440px; margin: 0 auto 24px auto;">
              ${t.confirmedSub || 'Your booking has been saved. Please show your token upon arrival.'}
            </p>

            <!-- Confirmed Details Box -->
            <div class="card" style="background: var(--color-surface-muted); border: 1.5px solid var(--color-secondary); padding: 20px; max-width: 460px; margin: 0 auto 24px auto; text-align: left;">
              
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border);">
                <div>
                  <span style="font-size: 11.5px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">
                    ${t.tokenBadge || 'Token Number'}
                  </span>
                  <div style="font-family: var(--font-heading); font-size: 28px; font-weight: 800; color: var(--color-primary);">
                    #${bookedToken}
                  </div>
                </div>
                <span class="status-badge badge-primary">
                  ${t.statusConfirmed || 'Confirmed'}
                </span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13.5px;">
                <div><span style="color: var(--color-text-secondary);">${t.wizardStep1 || 'Facility'}:</span> <strong>${selectedFacility}</strong></div>
                <div><span style="color: var(--color-text-secondary);">${t.wizardStep2 || 'Service'}:</span> <strong>${selectedService}</strong></div>
                <div><span style="color: var(--color-text-secondary);">${t.wizardStep3 || 'Doctor'}:</span> <strong>${selectedDoctor}</strong></div>
                <div><span style="color: var(--color-text-secondary);">${t.wizardStep4 || 'Date & Time'}:</span> <strong>${selectedDate} at ${selectedTime}</strong></div>
              </div>
            </div>

            <!-- Primary Action -->
            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <button class="btn btn-primary btn-lg" id="btn-wizard-done">
                <span>${t.btnDone || 'Done'}</span>
              </button>
              <button class="btn btn-outline btn-lg" id="btn-wizard-goto-appointments">
                <i data-lucide="calendar" style="width: 16px; height: 16px;"></i>
                <span>${t.btnViewAppointments || 'View Appointments'}</span>
              </button>
            </div>

          </div>
        ` : ''}

      </div>
    </div>
  `;
}
