/**
 * Screen: HEALER Nearby Care & Interactive Map
 * Clean, trustworthy healthcare locator with OpenStreetMap + Leaflet,
 * facility filters (PHC, CHC, Hospital, Clinic, Pharmacy, Diagnostic Centre),
 * and direct appointment booking.
 */

import { locales } from '../data/locales.js';

export function renderNearbyClinicsScreen(state, activeFilter = 'all', selectedFacilityId = null) {
  const t = locales[state.currentLanguage] || locales.en;
  const allFacilities = state.facilities || [];

  const filteredFacilities = activeFilter === 'all'
    ? allFacilities
    : allFacilities.filter(f => f.category === activeFilter);

  const selectedFacility = selectedFacilityId 
    ? allFacilities.find(f => f.id === selectedFacilityId)
    : null;

  const filterButtons = [
    { key: 'all', label: t.filterAll || 'All' },
    { key: 'phc', label: t.filterPhc || 'PHC' },
    { key: 'chc', label: t.filterChc || 'CHC' },
    { key: 'hospital', label: t.filterHospital || 'Hospital' },
    { key: 'clinic', label: t.filterClinic || 'Clinic' },
    { key: 'pharmacy', label: t.filterPharmacy || 'Pharmacy' },
    { key: 'diagnostic', label: t.filterDiagnostic || 'Diagnostic Centre' }
  ];

  return `
    <div class="screen" id="screen-nearby-clinics" style="max-width: 980px; margin: 0 auto; width: 100%;">
      
      <!-- Top Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h1 style="font-size: 22px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 4px;">
            ${t.nearbyCareTitle || 'Find healthcare near you'}
          </h1>
          <p style="font-size: 13.5px; color: var(--color-text-secondary);">
            ${t.nearbyCareSub || 'Locate local healthcare facilities, check distance, and book care.'}
          </p>
        </div>

        <button class="btn btn-primary" id="btn-use-my-location">
          <i data-lucide="crosshair" style="width: 15px; height: 15px;"></i>
          <span>${t.btnUseMyLocation || 'Use my location'}</span>
        </button>
      </div>

      <!-- Interactive Map Container -->
      <div id="healer-leaflet-map" class="leaflet-map-wrapper"></div>

      <!-- Category Filter Chips -->
      <div class="facility-filter-chips">
        ${filterButtons.map(btn => `
          <button class="filter-chip ${activeFilter === btn.key ? 'active' : ''}" data-facility-filter="${btn.key}">
            ${btn.label}
          </button>
        `).join('')}
      </div>

      <!-- Facility Cards Grid -->
      <div class="facility-list-grid">
        ${filteredFacilities.map(fac => `
          <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; gap: 14px;">
            
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; gap: 8px;">
                <h3 style="font-size: 15.5px; font-weight: 800; color: var(--color-text-primary); line-height: 1.3;">
                  ${fac.name}
                </h3>
                <span class="status-badge badge-primary" style="flex-shrink: 0;">
                  ${fac.distance}
                </span>
              </div>

              <div style="font-size: 12.5px; color: var(--color-text-secondary); margin-bottom: 10px;">
                ${fac.type} • <strong style="color: var(--color-primary);">${fac.status || 'Open'}</strong>
              </div>

              <div style="font-size: 12px; color: var(--color-text-muted); display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                <i data-lucide="clock" style="width: 13px; height: 13px;"></i>
                <span>${fac.hours || '08:00 AM - 04:00 PM'}</span>
              </div>

              <div style="font-size: 12px; color: var(--color-text-muted); display: flex; align-items: center; gap: 6px;">
                <i data-lucide="phone" style="width: 13px; height: 13px;"></i>
                <span>${fac.phone || '+91 751 245 8891'}</span>
              </div>
            </div>

            <!-- Card Actions -->
            <div style="display: flex; gap: 8px; border-top: 1px solid var(--color-border-light); padding-top: 12px;">
              <button class="btn btn-outline btn-sm btn-view-facility-details" data-facility-id="${fac.id}" style="flex: 1;">
                <i data-lucide="info" style="width: 14px; height: 14px;"></i>
                <span>${t.viewDetails || 'View Details'}</span>
              </button>
              
              <button class="btn btn-primary btn-sm btn-quick-book-facility" data-facility-name="${fac.name}" style="flex: 1;">
                <i data-lucide="calendar-plus" style="width: 14px; height: 14px;"></i>
                <span>${t.btnBookAtFacility || 'Book'}</span>
              </button>
            </div>

          </div>
        `).join('')}
      </div>

      <!-- Facility Details Modal (If open) -->
      ${selectedFacility ? `
        <div class="modal-overlay active" id="facility-details-modal-overlay">
          <div class="modal-dialog">
            <div class="modal-header">
              <div style="display: flex; align-items: center; gap: 8px;">
                <i data-lucide="building" style="width: 20px; height: 20px; color: var(--color-primary);"></i>
                <h3 class="modal-title">${selectedFacility.name}</h3>
              </div>
              <button class="btn btn-ghost btn-sm" id="btn-close-facility-modal" style="padding: 4px; border-radius: 50%; width: 32px; height: 32px;">
                <i data-lucide="x" style="width: 18px; height: 18px;"></i>
              </button>
            </div>

            <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; font-size: 13.5px;">
              <div>
                <span class="status-badge badge-primary">${selectedFacility.type}</span>
                <span class="status-badge badge-success" style="margin-left: 6px;">${selectedFacility.status || 'Open'}</span>
              </div>

              <div>
                <span style="color: var(--color-text-secondary); display: block; font-size: 12px; font-weight: 700; text-transform: uppercase;">Address</span>
                <strong>${selectedFacility.address || 'Hospital Road, Rampur'}</strong> (${selectedFacility.distance} away)
              </div>

              <div>
                <span style="color: var(--color-text-secondary); display: block; font-size: 12px; font-weight: 700; text-transform: uppercase;">${t.operatingHours || 'Operating Hours'}</span>
                <strong>${selectedFacility.hours || '08:00 AM - 04:00 PM'}</strong>
              </div>

              <div>
                <span style="color: var(--color-text-secondary); display: block; font-size: 12px; font-weight: 700; text-transform: uppercase;">${t.contactNumber || 'Contact Number'}</span>
                <strong>${selectedFacility.phone || '+91 751 245 8891'}</strong>
              </div>

              <div>
                <span style="color: var(--color-text-secondary); display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">${t.availableServices || 'Available Services'}</span>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                  ${(selectedFacility.services || ['General OPD', 'Maternal Care', 'Diagnostics']).map(s => `
                    <span class="status-badge" style="background: var(--color-surface-muted); color: var(--color-text-primary); font-size: 11.5px;">
                      ${s}
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 10px;">
              <button class="btn btn-primary btn-full" id="btn-modal-book-facility" data-facility-name="${selectedFacility.name}">
                <i data-lucide="calendar-plus" style="width: 16px; height: 16px;"></i>
                <span>${t.btnBookAtFacility || 'Book Appointment'}</span>
              </button>
            </div>
          </div>
        </div>
      ` : ''}

    </div>
  `;
}
