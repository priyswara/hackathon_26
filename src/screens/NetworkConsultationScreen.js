/**
 * Screen 5: Network-Aware Consultation (Hero Feature)
 * Dynamic 3-mode auto-adaptation for rural bandwidth realities
 */

import { locales } from '../data/locales.js';

export function renderNetworkConsultationScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const mode = state.networkMode || 'good';

  return `
    <div class="screen" id="screen-network-consultation">
      <!-- Screen Header -->
      <div class="flex-between">
        <button class="header-btn" id="btn-back-home" title="${t.back}">
          <i data-lucide="arrow-left"></i>
        </button>
        <div style="text-align: center;">
          <h2 style="font-family: var(--font-heading); font-size: 15px; font-weight: 700;">${t.consultDoctor}</h2>
          <span style="font-size: 10px; color: var(--color-success); font-weight: 600;">${t.liveConnectedHub}</span>
        </div>
        <button class="header-btn" id="btn-toggle-chat-mode" title="${t.openChatBtn}">
          <i data-lucide="message-square"></i>
        </button>
      </div>

      <!-- Network Mode Simulator Switcher -->
      <div class="card" style="padding: 10px; background: #FAF9FD;">
        <div class="flex-between" style="margin-bottom: 6px; padding: 0 4px;">
          <span style="font-size: 11px; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase;">
            ${t.simulateBandwidthTitle}
          </span>
          <span class="status-badge ${mode === 'good' ? 'badge-success' : (mode === 'moderate' ? 'badge-warning' : 'badge-danger')}" style="font-size: 9px;">
            ${mode.toUpperCase()} ${t.modeLabel}
          </span>
        </div>

        <div class="network-switch-control">
          <button class="net-switch-btn ${mode === 'good' ? 'active' : ''}" data-set-net="good" id="btn-net-good">
            <i data-lucide="wifi" style="width: 16px; height: 16px;"></i>
            <span>${t.goodSignal}</span>
          </button>
          
          <button class="net-switch-btn ${mode === 'moderate' ? 'active' : ''}" data-set-net="moderate" id="btn-net-moderate">
            <i data-lucide="phone-call" style="width: 16px; height: 16px;"></i>
            <span>${t.moderateSignal}</span>
          </button>
          
          <button class="net-switch-btn ${mode === 'low' ? 'active' : ''}" data-set-net="low" id="btn-net-low">
            <i data-lucide="message-circle" style="width: 16px; height: 16px;"></i>
            <span>${t.lowSignal}</span>
          </button>
        </div>
      </div>

      <!-- Hero Viewport Container: Changes dynamically based on mode -->
      <div id="consultation-viewport-container">
        ${renderViewportForMode(mode, t)}
      </div>

      <!-- Doctor Profile Information -->
      <div class="card flex-between" style="padding: 12px 14px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-weight: 700;">
            AS
          </div>
          <div>
            <div style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: var(--color-text-primary);">${t.docName}</div>
            <div style="font-size: 11px; color: var(--color-text-secondary);">${t.docSpecialtyHub}</div>
          </div>
        </div>

        <button class="btn btn-sm btn-secondary" id="btn-open-rx-drawer">
          <i data-lucide="file-text" style="width: 14px; height: 14px;"></i> ${t.rxSummaryBtn}
        </button>
      </div>

      <!-- Call Controls -->
      <div class="flex-center" style="gap: 16px; margin-top: 4px;">
        <button class="header-btn" id="btn-mute-audio" style="width: 48px; height: 48px; background: var(--color-surface); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm);" title="${t.muteAudioTitle}">
          <i data-lucide="mic"></i>
        </button>
        
        <button class="btn btn-danger" id="btn-end-consult-call" style="border-radius: var(--radius-full); width: 60px; height: 60px; padding: 0; box-shadow: var(--shadow-danger);" title="${t.endCallTitle}">
          <i data-lucide="phone-off" style="width: 24px; height: 24px;"></i>
        </button>
        
        <button class="header-btn" id="btn-switch-cam" style="width: 48px; height: 48px; background: var(--color-surface); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm);" title="${t.switchCamTitle}">
          <i data-lucide="refresh-cw"></i>
        </button>
      </div>

      <div class="compliance-disclaimer">
        ${t.networkEngineDisclaimer}
      </div>
    </div>
  `;
}

function renderViewportForMode(mode, t) {
  if (mode === 'good') {
    // Mode 1: HD Video
    return `
      <div class="video-consult-container">
        <div style="position: absolute; top: 12px; left: 12px; background: rgba(0, 0, 0, 0.6); padding: 4px 10px; border-radius: var(--radius-full); font-size: 11px; display: flex; align-items: center; gap: 6px;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #1E9E5A;"></span>
          <span>${t.hdVideoOverlay}</span>
        </div>

        <div style="text-align: center;">
          <div class="video-avatar-placeholder" style="margin: 0 auto 10px auto;">
            <span>AS</span>
          </div>
          <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 700;">${t.docName}</div>
          <div style="font-size: 11px; opacity: 0.8;">${t.liveVideoStreamActive}</div>
        </div>

        <!-- Self PIP Camera -->
        <div class="video-self-pip">
          <div style="font-size: 10px; color: rgba(255, 255, 255, 0.7); text-align: center;">
            <i data-lucide="user" style="width: 20px; height: 20px; margin: 0 auto 2px auto; display: block;"></i>
            ${t.youPip}
          </div>
        </div>
      </div>
    `;
  } else if (mode === 'moderate') {
    // Mode 2: Low-Bandwidth Audio Waveform
    return `
      <div class="card" style="background: #151324; color: #FFFFFF; padding: 20px; border: none;">
        <div class="flex-between" style="margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span class="status-badge badge-warning" style="font-size: 9px;">${t.audioOnlyBadge}</span>
            <span style="font-size: 11px; color: rgba(255, 255, 255, 0.7);">${t.bandwidthAudioTag}</span>
          </div>
          <span style="font-size: 11px; color: var(--color-accent); font-weight: 700;">${t.audioTimer}</span>
        </div>

        <!-- Audio Waveform Visualizer -->
        <div class="audio-waveform-container" style="margin: 10px 0;">
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
        </div>

        <div style="text-align: center; margin-top: 8px;">
          <div style="font-size: 13px; font-weight: 700; color: #FFFFFF;">${t.doctorSpeaking}</div>
          <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6); margin-top: 2px;">${t.videoDisabledNotice}</div>
        </div>
      </div>
    `;
  } else {
    // Mode 3: Low-Bandwidth / Offline SMS & Asynchronous Text
    return `
      <div class="card" style="background: #FFF8E6; border: 1.5px solid #F59E0B; padding: 16px;">
        <div class="flex-between" style="margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span class="status-badge badge-danger" style="font-size: 9px;">${t.smsFallbackBadge}</span>
          </div>
          <span style="font-size: 10px; color: #92400E; font-weight: 700;">${t.offlineStoreForward}</span>
        </div>

        <p style="font-size: 12px; color: #78350F; line-height: 1.4; margin-bottom: 12px;">
          ${t.smsFallbackNotice}
        </p>

        <button class="btn btn-sm btn-primary btn-full" id="btn-open-chat-from-net" style="background: #D97706; border: none;">
          <i data-lucide="message-square"></i> ${t.openLightweightChatBtn}
        </button>
      </div>
    `;
  }
}
