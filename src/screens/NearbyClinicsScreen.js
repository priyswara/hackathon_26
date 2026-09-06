/**
 * Screen: Nearby Health Centres & Clinic Map
 * Interactive rural health unit locator with live bed status, wait times, and direct slot booking.
 * 100% Responsive on Desktop & Mobile.
 */

import { locales } from '../data/locales.js';

export function renderNearbyClinicsScreen(state, selectedClinicId = 'FAC-01') {
  const t = locales[state.currentLanguage] || locales.en;
  const facilities = state.facilities || [];
  const activeClinic = facilities.find(f => f.id === selectedClinicId) || facilities[0];

  return `
    <div class="screen" id="screen-nearby-clinics" style="width: 100%;">
      
      <!-- Top Title Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h1 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
            🏥 Nearby Clinics & Health Units
          </h1>
          <p style="font-size: 13px; color: var(--color-text-secondary);">
            Find local PHCs, Sub-centres, bed availability, and book priority teleconsultation tokens.
          </p>
        </div>

        <div style="display: flex; gap: 8px;">
          <button class="btn btn-outline" id="btn-refresh-map" style="font-size: 12.5px; padding: 7px 14px; min-height: 36px;">
            <i data-lucide="refresh-cw" style="width: 14px; height: 14px;"></i>
            <span>Refresh Live Data</span>
          </button>
        </div>
      </div>

      <!-- Main Layout: 2-Column Split on Desktop, Stacked on Mobile -->
      <div class="clinic-directory-layout">
        
        <!-- Left Column: Interactive Visual Rural Map -->
        <div class="card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column;">
          
          <div style="padding: 14px 18px; background: var(--color-surface-muted); border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: var(--color-text-primary); display: flex; align-items: center; gap: 8px;">
              <i data-lucide="map-pin" style="color: var(--color-primary); width: 16px; height: 16px;"></i>
              Block Healthcare Coverage Map (Rampur Block)
            </span>
            <span class="status-badge badge-primary" style="font-size: 11px;">
              GPS: Active (25.43° N)
            </span>
          </div>

          <!-- Interactive SVG Map Canvas -->
          <div class="clinic-map-container" style="min-height: 380px; position: relative; background: #E9F1EC;">
            <svg class="clinic-map-svg" viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice" style="width: 100%; height: 380px; display: block;">
              <!-- Background Map Terrain & Roads -->
              <rect width="600" height="380" fill="#E8F1EC" />
              
              <!-- Forest / Green Zones -->
              <path d="M0,0 Q180,90 280,40 T600,60 L600,0 Z" fill="#D6E7DC" opacity="0.7" />
              <path d="M50,300 Q150,260 250,320 T600,350 L600,380 L0,380 Z" fill="#D6E7DC" opacity="0.6" />
              
              <!-- Rural Roads Network -->
              <path d="M-10,220 C120,200 220,180 340,160 S520,140 610,130" stroke="#FFFFFF" stroke-width="12" fill="none" stroke-linecap="round" />
              <path d="M-10,220 C120,200 220,180 340,160 S520,140 610,130" stroke="#C8D8CE" stroke-width="7" fill="none" stroke-linecap="round" />
              
              <path d="M220,-10 C220,90 240,180 260,260 S300,340 320,390" stroke="#FFFFFF" stroke-width="10" fill="none" stroke-linecap="round" />
              <path d="M220,-10 C220,90 240,180 260,260 S300,340 320,390" stroke="#C8D8CE" stroke-width="5" fill="none" stroke-linecap="round" />

              <path d="M340,160 C380,240 440,280 520,320" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="6,4" />
              <path d="M340,160 C380,240 440,280 520,320" stroke="#B2C7BA" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="6,4" />

              <!-- User Current Location Pin (Pulsing) -->
              <g transform="translate(180, 205)">
                <circle r="18" fill="rgba(40, 107, 79, 0.15)">
                  <animate attributeName="r" values="12;24;12" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle r="8" fill="#286B4F" stroke="#FFFFFF" stroke-width="2.5" />
                <text x="14" y="4" font-family="sans-serif" font-size="11" font-weight="bold" fill="#24352C">Your Location (Rampur)</text>
              </g>

              <!-- Pin 1: Ayushman Arogya Mandir (FAC-03) -->
              <g class="map-pin-group" data-id="FAC-03" transform="translate(140, 120)" style="cursor: pointer;">
                <circle r="16" fill="${activeClinic.id === 'FAC-03' ? '#286B4F' : '#FFFFFF'}" stroke="#286B4F" stroke-width="2.5" />
                <text x="0" y="4" text-anchor="middle" font-size="11" font-weight="800" fill="${activeClinic.id === 'FAC-03' ? '#FFFFFF' : '#286B4F'}">HWC</text>
                <text x="0" y="28" text-anchor="middle" font-size="10" font-weight="700" fill="#24352C">Rampur Sub-Centre (0.8km)</text>
              </g>

              <!-- Pin 2: PHC Rampur (FAC-01) -->
              <g class="map-pin-group" data-id="FAC-01" transform="translate(290, 165)" style="cursor: pointer;">
                <circle r="18" fill="${activeClinic.id === 'FAC-01' ? '#286B4F' : '#FFFFFF'}" stroke="#286B4F" stroke-width="3" />
                <text x="0" y="4" text-anchor="middle" font-size="12" font-weight="800" fill="${activeClinic.id === 'FAC-01' ? '#FFFFFF' : '#286B4F'}">PHC</text>
                <text x="0" y="30" text-anchor="middle" font-size="11" font-weight="800" fill="#24352C">PHC Rampur (2.4km)</text>
              </g>

              <!-- Pin 3: CHC Kotra Block Hospital (FAC-02) -->
              <g class="map-pin-group" data-id="FAC-02" transform="translate(460, 110)" style="cursor: pointer;">
                <circle r="18" fill="${activeClinic.id === 'FAC-02' ? '#286B4F' : '#FFFFFF'}" stroke="#286B4F" stroke-width="3" />
                <text x="0" y="4" text-anchor="middle" font-size="12" font-weight="800" fill="${activeClinic.id === 'FAC-02' ? '#FFFFFF' : '#286B4F'}">CHC</text>
                <text x="0" y="30" text-anchor="middle" font-size="11" font-weight="800" fill="#24352C">CHC Kotra (14km)</text>
              </g>

              <!-- Pin 4: Shivpuri District Hospital (FAC-04) -->
              <g class="map-pin-group" data-id="FAC-04" transform="translate(520, 310)" style="cursor: pointer;">
                <circle r="18" fill="${activeClinic.id === 'FAC-04' ? '#286B4F' : '#FFFFFF'}" stroke="#C97852" stroke-width="3" />
                <text x="0" y="4" text-anchor="middle" font-size="11" font-weight="800" fill="${activeClinic.id === 'FAC-04' ? '#FFFFFF' : '#C97852'}">DH</text>
                <text x="0" y="30" text-anchor="middle" font-size="10.5" font-weight="700" fill="#24352C">District Hospital (38km)</text>
              </g>
            </svg>

            <!-- Map Overlay Legend -->
            <div style="position: absolute; bottom: 12px; left: 12px; background: rgba(255,255,255,0.92); backdrop-filter: blur(4px); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); font-size: 11px; display: flex; gap: 10px; flex-wrap: wrap;">
              <span style="display: flex; align-items: center; gap: 4px;"><strong style="color: var(--color-primary);">●</strong> PHC: Primary Centre</span>
              <span style="display: flex; align-items: center; gap: 4px;"><strong style="color: var(--color-primary);">●</strong> CHC: Block Hospital</span>
              <span style="display: flex; align-items: center; gap: 4px;"><strong style="color: var(--color-accent);">●</strong> DH: District Referral</span>
            </div>
          </div>

          <!-- Active Selected Facility Quick Details Banner -->
          <div style="padding: 16px 20px; background: var(--color-surface); border-top: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <div style="font-size: 11px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">Selected Health Facility</div>
              <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-text-primary);">${activeClinic.name}</div>
              <div style="font-size: 12.5px; color: var(--color-text-secondary); margin-top: 2px;">
                ${activeClinic.type} • <strong>${activeClinic.distance}</strong> away • ${activeClinic.status || 'Open'}
              </div>
            </div>

            <div style="display: flex; gap: 8px;">
              <button class="btn btn-primary" id="btn-book-selected-clinic" data-id="${activeClinic.id}" style="font-size: 13px; padding: 8px 16px;">
                <i data-lucide="calendar" style="width: 15px; height: 15px;"></i>
                <span>Book Token / OPD Slot</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column: Clinic Directory List -->
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--color-text-primary);">
              Facilities in Your Block (${facilities.length})
            </span>
            <span style="font-size: 11.5px; color: var(--color-text-muted);">Click facility to inspect</span>
          </div>

          <div class="clinic-list-container">
            ${facilities.map(f => {
              const isSelected = f.id === activeClinic.id;
              const occRate = Math.round((f.bedsOccupied / f.bedsTotal) * 100) || 0;
              return `
                <div class="clinic-item-card ${isSelected ? 'selected' : ''}" data-id="${f.id}" id="clinic-card-${f.id}">
                  
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; gap: 8px;">
                    <div>
                      <div style="font-family: var(--font-heading); font-size: 14.5px; font-weight: 700; color: var(--color-text-primary); line-height: 1.2;">
                        ${f.name}
                      </div>
                      <span style="font-size: 11.5px; color: var(--color-text-secondary);">${f.type}</span>
                    </div>
                    <span class="status-badge badge-primary" style="font-size: 11px; flex-shrink: 0;">
                      ${f.distance}
                    </span>
                  </div>

                  <!-- Metrics Row -->
                  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; padding: 8px 10px; background: var(--color-surface-muted); border-radius: var(--radius-xs); margin-bottom: 10px; font-size: 11px;">
                    <div>
                      <span style="color: var(--color-text-muted); display: block;">Est. Wait</span>
                      <strong style="color: var(--color-text-primary); font-size: 12px;">${f.avgWaitMins} mins</strong>
                    </div>
                    <div>
                      <span style="color: var(--color-text-muted); display: block;">Beds</span>
                      <strong style="color: var(--color-text-primary); font-size: 12px;">${f.bedsOccupied}/${f.bedsTotal} (${occRate}%)</strong>
                    </div>
                    <div>
                      <span style="color: var(--color-text-muted); display: block;">Drugs Stock</span>
                      <strong style="color: var(--color-primary); font-size: 12px;">${f.medicinesAvailableRate}</strong>
                    </div>
                  </div>

                  <!-- Actions footer -->
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
                    <span style="color: var(--color-text-secondary); display: flex; align-items: center; gap: 4px;">
                      <i data-lucide="phone" style="width: 12px; height: 12px;"></i>
                      <span>${f.phone || '+91 751 245 8891'}</span>
                    </span>

                    <button class="btn btn-outline" style="padding: 4px 10px; font-size: 11.5px; min-height: 28px; height: 28px;">
                      <span>Select</span>
                      <i data-lucide="chevron-right" style="width: 13px; height: 13px;"></i>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}
