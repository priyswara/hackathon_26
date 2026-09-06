/**
 * Screen: Patient / Citizen Home Dashboard (Palette 3)
 * Clean, modern rural health home with OPD token tracker, Nearby Clinics Map tile, and quick clinical actions.
 */

import { locales } from '../data/locales.js';

export function renderPatientHomeScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const p = state.patient;

  return `
    <div class="screen" id="screen-patient-home" style="width: 100%;">
      
      <!-- Top Row: Welcome Banner + Live Token Card -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 22px;">
        
        <!-- Patient Profile Summary Card -->
        <div class="card" style="padding: 20px 22px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-weight: 800; font-size: 18px; flex-shrink: 0; border: 2px solid var(--color-secondary);">
              ${p.name ? p.name.split(' ').map(n => n[0]).join('') : 'RK'}
            </div>
            <div>
              <div style="font-size: 11.5px; color: var(--color-text-muted); font-weight: 700; text-transform: uppercase;">
                ${t.patientRole || 'Citizen Portal'}
              </div>
              <h2 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: var(--color-text-primary); line-height: 1.2;">
                ${p.name || 'Ramesh Kumar'}
              </h2>
              <div style="display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--color-text-secondary); margin-top: 3px;">
                <span>ABHA: ${p.abhaId || '91-4820-1928-44'}</span>
                <span class="status-badge badge-primary" style="padding: 1px 6px; font-size: 9.5px;">Linked</span>
              </div>
            </div>
          </div>

          <button class="btn btn-outline" id="btn-quick-voice" style="padding: 8px; border-radius: 50%; width: 40px; height: 40px; min-height: 40px;" title="${t.tapToSpeak || 'Voice'}">
            <i data-lucide="mic" style="color: var(--color-primary); width: 18px; height: 18px;"></i>
          </button>
        </div>

        <!-- Live OPD Token Banner (Forest Green Hero Card) -->
        <div class="card card-hero card-clickable" id="card-active-token" style="padding: 20px 22px; cursor: pointer;" title="Tap to view live queue">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="status-badge" style="background: rgba(255,255,255,0.22); color: #FFFFFF; font-size: 11px;">
                ● Live Token
              </span>
              <span style="font-size: 12px; opacity: 0.9;">PHC Rampur</span>
            </div>
            <i data-lucide="arrow-right" style="width: 16px; height: 16px; opacity: 0.9;"></i>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.85;">Your Active Token</span>
              <div style="font-family: var(--font-heading); font-size: 32px; font-weight: 800; line-height: 1;">
                ${p.activeToken || 'B-14'}
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 13px; font-weight: 700;">Serving #B-11</div>
              <div style="font-size: 11.5px; color: #FFFFFF; opacity: 0.9; margin-top: 2px;">
                ~${p.estimatedWaitMins || 14} min wait
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Quick Actions Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <h3 style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-text-primary); display: flex; align-items: center; gap: 8px;">
          <i data-lucide="layout-grid" style="color: var(--color-primary); width: 18px; height: 18px;"></i>
          ${t.quickActions || 'Healthcare Services'}
        </h3>
      </div>

      <!-- 8 Responsive Action Tiles -->
      <div class="action-tiles-grid">
        
        <!-- Tile 1: Nearby Clinics / Map (NEW PROMINENT FEATURE) -->
        <div class="action-tile" id="action-nearby-clinics" style="border: 1.5px solid var(--color-secondary); background: var(--color-surface);">
          <div class="action-tile-icon" style="background: var(--color-primary); color: #FFFFFF;">
            <i data-lucide="map-pin"></i>
          </div>
          <div class="action-tile-title" style="color: var(--color-primary);">Nearby Clinics & Map</div>
          <span style="font-size: 11px; color: var(--color-text-secondary);">Find PHCs & Sub-Centres</span>
        </div>

        <!-- Tile 2: Book OPD Appointment -->
        <div class="action-tile" id="action-book-opd">
          <div class="action-tile-icon">
            <i data-lucide="calendar-plus"></i>
          </div>
          <div class="action-tile-title">${t.bookAppointment || 'Book Appointment'}</div>
          <span style="font-size: 11px; color: var(--color-text-secondary);">${t.phcDoctorsDesc || 'PHC Doctors & Tokens'}</span>
        </div>

        <!-- Tile 3: Digital Smart Triage -->
        <div class="action-tile" id="action-triage">
          <div class="action-tile-icon">
            <i data-lucide="activity"></i>
          </div>
          <div class="action-tile-title">${t.digitalTriage || 'Symptom Triage'}</div>
          <span style="font-size: 11px; color: var(--color-text-secondary);">${t.triageDesc || 'AI Symptom Checker'}</span>
        </div>

        <!-- Tile 4: Network-Adaptive Teleconsult -->
        <div class="action-tile" id="action-teleconsult">
          <div class="action-tile-icon">
            <i data-lucide="video"></i>
          </div>
          <div class="action-tile-title">${t.consultDoctor || 'Teleconsultation'}</div>
          <span style="font-size: 11px; color: var(--color-text-secondary);">${t.adaptiveTeleconsultDesc || 'Video / Low-Bandwidth'}</span>
        </div>

        <!-- Tile 5: Health Journey Timeline -->
        <div class="action-tile" id="action-health-journey">
          <div class="action-tile-icon">
            <i data-lucide="git-commit"></i>
          </div>
          <div class="action-tile-title">${t.careJourney || 'Health Journey'}</div>
          <span style="font-size: 11px; color: var(--color-text-secondary);">${t.unifiedJourneyDesc || 'Synchronized History'}</span>
        </div>

        <!-- Tile 6: Pharmacy & Medicines -->
        <div class="action-tile" id="action-medicines">
          <div class="action-tile-icon">
            <i data-lucide="pill"></i>
          </div>
          <div class="action-tile-title">${t.medicineStock || 'Medicine Stock'}</div>
          <span style="font-size: 11px; color: var(--color-text-secondary);">${t.livePharmacyDesc || 'PHC Pharmacy Stock'}</span>
        </div>

        <!-- Tile 7: Follow-ups & ASHA -->
        <div class="action-tile" id="action-followups">
          <div class="action-tile-icon">
            <i data-lucide="heart-handshake"></i>
          </div>
          <div class="action-tile-title">${t.followUps || 'Follow-ups'}</div>
          <span style="font-size: 11px; color: var(--color-text-secondary);">${t.homeVisitsDesc || 'ASHA Home Care'}</span>
        </div>

        <!-- Tile 8: Health Schemes (PM-JAY) -->
        <div class="action-tile" id="action-schemes">
          <div class="action-tile-icon">
            <i data-lucide="shield"></i>
          </div>
          <div class="action-tile-title">${t.schemes || 'Schemes & PM-JAY'}</div>
          <span style="font-size: 11px; color: var(--color-text-secondary);">${t.pmjayDesc || '₹5 Lakh Free Cover'}</span>
        </div>

      </div>

      <!-- Bottom Row: Assigned ASHA & Active Episode -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
        
        <!-- ASHA Contact Card -->
        <div class="card" style="padding: 16px 18px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <i data-lucide="user-check" style="width: 20px; height: 20px;"></i>
            </div>
            <div>
              <div style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: var(--color-text-primary);">
                ${t.assignedAsha || 'Assigned ASHA: Sunita Devi'}
              </div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">
                ${t.nextHomeVisitTomorrow || 'Next Home Visit: Tomorrow 11 AM'}
              </div>
            </div>
          </div>
          <button class="btn btn-outline" id="btn-call-asha" style="padding: 6px 12px; font-size: 12px; min-height: 32px;">
            <i data-lucide="phone" style="width: 13px; height: 13px;"></i>
            <span>${t.callBtn || 'Call'}</span>
          </button>
        </div>

        <!-- Active Care Episode Alert -->
        <div class="card" style="padding: 16px 18px; display: flex; align-items: center; justify-content: space-between; border-left: 4px solid var(--color-primary);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <i data-lucide="stethoscope" style="width: 20px; height: 20px;"></i>
            </div>
            <div>
              <div style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: var(--color-text-primary);">
                Active Tele-Consult Episode
              </div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">
                Dr. Ananya Sharma • Paracetamol 650mg Active
              </div>
            </div>
          </div>
          <span class="status-badge badge-primary" style="font-size: 10.5px;">Active</span>
        </div>

      </div>

    </div>
  `;
}
