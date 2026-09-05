/**
 * SVG Chart Visualizations for Facility Dashboard
 * Highly optimized, zero dependency, animated SVG charts with localization support
 */

export function renderFootfallChart(t) {
  const peakTag = (t && t.peakTag) ? t.peakTag : '(Peak)';
  return `
    <div style="width: 100%; height: 130px; position: relative; margin-top: 8px;">
      <svg viewBox="0 0 320 120" style="width: 100%; height: 100%; overflow: visible;">
        <defs>
          <linearGradient id="footfallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#6C3CE9" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#6C3CE9" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        
        <!-- Grid lines -->
        <line x1="0" y1="30" x2="320" y2="30" stroke="#ECEAF3" stroke-dasharray="3 3" />
        <line x1="0" y1="70" x2="320" y2="70" stroke="#ECEAF3" stroke-dasharray="3 3" />
        <line x1="0" y1="110" x2="320" y2="110" stroke="#ECEAF3" />
        
        <!-- Area fill -->
        <path d="M 0 110 L 0 85 Q 45 40 90 60 T 180 35 T 270 45 L 320 20 L 320 110 Z" fill="url(#footfallGrad)" />
        
        <!-- Smooth line path -->
        <path d="M 0 85 Q 45 40 90 60 T 180 35 T 270 45 L 320 20" fill="none" stroke="#6C3CE9" stroke-width="3.5" stroke-linecap="round" />
        
        <!-- Data points -->
        <circle cx="90" cy="60" r="4.5" fill="#6C3CE9" stroke="#FFFFFF" stroke-width="2" />
        <circle cx="180" cy="35" r="4.5" fill="#6C3CE9" stroke="#FFFFFF" stroke-width="2" />
        <circle cx="320" cy="20" r="5" fill="#00D2A0" stroke="#FFFFFF" stroke-width="2" />
      </svg>
      
      <!-- Chart axis labels -->
      <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--color-text-muted); margin-top: 4px;">
        <span>08:00 AM</span>
        <span>11:00 AM</span>
        <span>02:00 PM</span>
        <span>05:00 PM ${peakTag}</span>
      </div>
    </div>
  `;
}

export function renderReferralDonut(t) {
  const casesLabel = (t && t.donutCasesLabel) ? t.donutCasesLabel : 'Cases';
  const legend1 = (t && t.legendPhcResolved) ? t.legendPhcResolved : '65% PHC Resolved';
  const legend2 = (t && t.legendTeleSpecialist) ? t.legendTeleSpecialist : '25% Tele-Specialist';
  const legend3 = (t && t.legendDistrictHospital) ? t.legendDistrictHospital : '10% District Hospital';

  return `
    <div style="display: flex; align-items: center; justify-content: space-around; gap: 12px; margin-top: 8px;">
      <div style="width: 90px; height: 90px; position: relative;">
        <svg viewBox="0 0 36 36" style="width: 100%; height: 100%; transform: rotate(-90deg);">
          <!-- Background circle -->
          <circle cx="18" cy="18" r="14" fill="none" stroke="#ECEAF3" stroke-width="5" />
          <!-- Segment 1: Local Resolved (65%) -->
          <circle cx="18" cy="18" r="14" fill="none" stroke="#1E9E5A" stroke-width="5" stroke-dasharray="57.1 88" stroke-dashoffset="0" />
          <!-- Segment 2: Tele-referral (25%) -->
          <circle cx="18" cy="18" r="14" fill="none" stroke="#6C3CE9" stroke-width="5" stroke-dasharray="22 88" stroke-dashoffset="-57.1" />
          <!-- Segment 3: District Hospital (10%) -->
          <circle cx="18" cy="18" r="14" fill="none" stroke="#E88C1F" stroke-width="5" stroke-dasharray="8.8 88" stroke-dashoffset="-79.1" />
        </svg>
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <span style="font-family: var(--font-heading); font-size: 14px; font-weight: 800; color: var(--color-text-primary);">68</span>
          <span style="font-size: 8px; color: var(--color-text-muted); text-transform: uppercase;">${casesLabel}</span>
        </div>
      </div>
      
      <!-- Legends -->
      <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #1E9E5A;"></span>
          <span style="color: var(--color-text-primary); font-weight: 600;">${legend1}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #6C3CE9;"></span>
          <span style="color: var(--color-text-primary); font-weight: 600;">${legend2}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #E88C1F;"></span>
          <span style="color: var(--color-text-primary); font-weight: 600;">${legend3}</span>
        </div>
      </div>
    </div>
  `;
}
