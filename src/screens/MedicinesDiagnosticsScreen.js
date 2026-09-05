/**
 * Screen 8: Medicines & Diagnostics Lab
 * Professional Responsive Web Layout for Live PHC Pharmacy & Diagnostic Lab Bookings
 */

import { locales } from '../data/locales.js';

export function renderMedicinesDiagnosticsScreen(state, activeTab = 'medicines') {
  const t = locales[state.currentLanguage] || locales.en;
  const medicines = state.medicines || [];
  const diagnostics = state.diagnostics || [];

  return `
    <div class="screen" id="screen-medicines-diagnostics">
      <!-- Screen Header -->
      <div class="flex-between">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="header-btn" id="btn-back-home" title="${t.back}">
            <i data-lucide="arrow-left"></i>
          </button>
          <div>
            <h2 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-text-primary);">${t.pharmacyDiagnosticsTitle}</h2>
            <div style="font-size: 12px; color: var(--color-text-secondary);">DVDMS Live Stock & Free Diagnostic Packages</div>
          </div>
        </div>
      </div>

      <!-- Controls Row: Tab Switcher + Search Filter -->
      <div class="split-1-1" style="align-items: center; gap: 16px;">
        <!-- Tab Switcher -->
        <div class="network-switch-control" style="background: var(--color-surface);">
          <button class="net-switch-btn ${activeTab === 'medicines' ? 'active' : ''}" id="tab-btn-medicines" style="padding: 10px 18px;">
            <i data-lucide="pill"></i>
            <span>${t.medicineStock}</span>
          </button>
          <button class="net-switch-btn ${activeTab === 'diagnostics' ? 'active' : ''}" id="tab-btn-diagnostics" style="padding: 10px 18px;">
            <i data-lucide="flask-conical"></i>
            <span>${t.diagnostics}</span>
          </button>
        </div>

        <!-- Search Box -->
        <div class="search-box">
          <i data-lucide="search"></i>
          <input type="text" class="search-input" id="input-med-search" placeholder="${t.searchMedDiagPlaceholder}" />
        </div>
      </div>

      <!-- Tab Content Area -->
      <div id="med-diag-tab-content">
        ${activeTab === 'medicines' ? renderMedicinesTab(medicines, t) : renderDiagnosticsTab(diagnostics, t)}
      </div>

      <div class="compliance-disclaimer" style="margin-top: 10px;">
        ${t.dvdmsDisclaimer}
      </div>
    </div>
  `;
}

function renderMedicinesTab(medicines, t) {
  const medItemMap = {
    'MED-1': { name: t.med1Name, category: t.med1Category, dosage: t.med1Dosage },
    'MED-2': { name: t.med2Name, category: t.med2Category, dosage: t.med2Dosage },
    'MED-3': { name: t.med3Name, category: t.med3Category, dosage: t.med3Dosage },
    'MED-4': { name: t.med4Name, category: t.med4Category, dosage: t.med4Dosage },
    'MED-5': { name: t.med5Name, category: t.med5Category, dosage: t.med5Dosage },
    'MED-6': { name: t.med6Name, category: t.med6Category, dosage: t.med6Dosage }
  };

  const statusLabelMap = {
    'Available': t.statusAvailable,
    'Low Stock': t.statusLowStock,
    'Unavailable': t.statusUnavailable
  };

  return `
    <div class="grid-2" id="medicines-list-container">
      ${medicines.map(med => {
        let badgeClass = 'badge-success';
        if (med.stockStatus === 'Low Stock') badgeClass = 'badge-warning';
        if (med.stockStatus === 'Unavailable') badgeClass = 'badge-danger';

        const localizedMed = medItemMap[med.id] || { name: med.name, category: med.category, dosage: med.dosage };
        const statusText = statusLabelMap[med.stockStatus] || med.stockStatus;

        return `
          <div class="card flex-between med-item-card" data-name="${med.name.toLowerCase()}" style="padding: 16px 20px;">
            <div>
              <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-text-primary);">
                ${localizedMed.name}
              </div>
              <div style="font-size: 12px; color: var(--color-primary); font-weight: 700; margin-top: 2px;">
                ${localizedMed.category} • ${localizedMed.dosage}
              </div>
              <div style="font-size: 11.5px; color: var(--color-text-muted); margin-top: 4px;">
                <i data-lucide="building" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;"></i> ${med.facility} • ${t.updatedAgoPrefix} ${med.updatedMinsAgo}${t.updatedAgoMins}
              </div>
            </div>

            <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
              <span class="status-badge ${badgeClass}" style="font-size: 10px; padding: 3px 8px;">
                ${statusText}
              </span>
              <span style="font-size: 12px; color: var(--color-text-secondary); font-weight: 700;">
                ${med.stockUnits}
              </span>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderDiagnosticsTab(diagnostics, t) {
  const diagItemMap = {
    'DIAG-1': { testName: t.diag1Name, purpose: t.diag1Purpose },
    'DIAG-2': { testName: t.diag2Name, purpose: t.diag2Purpose },
    'DIAG-3': { testName: t.diag3Name, purpose: t.diag3Purpose },
    'DIAG-4': { testName: t.diag4Name, purpose: t.diag4Purpose }
  };

  return `
    <div class="grid-2">
      ${diagnostics.map(diag => {
        const localizedDiag = diagItemMap[diag.id] || { testName: diag.testName, purpose: diag.purpose };

        return `
          <div class="card" style="padding: 20px; border-left: 5px solid var(--color-primary); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div class="flex-between" style="margin-bottom: 6px;">
                <div style="font-family: var(--font-heading); font-size: 15.5px; font-weight: 800; color: var(--color-text-primary);">
                  ${localizedDiag.testName}
                </div>
                <span class="status-badge badge-success" style="font-size: 10px;">${t.freePmjayBadge}</span>
              </div>

              <div style="font-size: 12.5px; color: var(--color-text-secondary); margin-bottom: 12px; line-height: 1.4;">
                ${localizedDiag.purpose}
              </div>

              <div class="flex-between" style="background: #FAF9FD; padding: 8px 12px; border-radius: var(--radius-sm); margin-bottom: 14px; font-size: 12px;">
                <span><i data-lucide="building" style="width: 13px; height: 13px; display: inline-block; vertical-align: middle;"></i> ${diag.facility}</span>
                <span style="color: var(--color-primary); font-weight: 700;">${t.diagnosticTurnaroundLabel} ${diag.reportTurnaround}</span>
              </div>
            </div>

            <button class="btn btn-primary btn-full btn-book-diagnostic" data-test="${diag.testName}" data-facility="${diag.facility}" style="padding: 10px;">
              <i data-lucide="calendar-plus"></i> ${t.bookFreeSlotBtn} (${diag.slotTime})
            </button>
          </div>
        `;
      }).join('')}
    </div>
  `;
}
