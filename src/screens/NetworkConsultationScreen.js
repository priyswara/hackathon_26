/**
 * Screen 5: Network-Aware Consultation (Hero Feature)
 * Dynamic 3-mode auto-adaptation for rural bandwidth realities
 * Professional 2-Column Teleconsultation Web Console
 */

import { locales } from '../data/locales.js';

export function renderNetworkConsultationScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const mode = state.networkMode || 'good';

  return `
    <div class="screen" id="screen-network-consultation">
      <!-- Screen Header -->
      <div class="flex-between">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="header-btn" id="btn-back-home" title="${t.back}">
            <i data-lucide="arrow-left"></i>
          </button>
          <div>
            <h2 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-text-primary);">${t.consultDoctor}</h2>
            <div style="font-size: 12px; color: var(--color-success); font-weight: 600;">${t.liveConnectedHub}</div>
          </div>
        </div>

        <button class="btn btn-secondary" id="btn-toggle-chat-mode" title="${t.rxSummaryBtn}">
          <i data-lucide="message-square"></i>
          <span>${t.navChatRx || 'Chat & Rx'}</span>
        </button>
      </div>

      <!-- Network Mode Simulator Switcher -->
      <div class="card" style="padding: 16px 20px; background: #FAF9FD;">
        <div class="flex-between" style="margin-bottom: 10px;">
          <span style="font-size: 12px; font-weight: 800; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">
            <i data-lucide="activity" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i>
            ${t.simulateBandwidthTitle}
          </span>
          <span class="status-badge ${mode === 'good' ? 'badge-success' : (mode === 'moderate' ? 'badge-warning' : 'badge-danger')}" style="font-size: 11px; padding: 3px 10px;">
            ${mode.toUpperCase()} ${t.modeLabel}
          </span>
        </div>

        <div class="network-switch-control">
          <button class="net-switch-btn ${mode === 'good' ? 'active' : ''}" data-set-net="good" id="btn-net-good">
            <i data-lucide="wifi" style="width: 17px; height: 17px;"></i>
            <span>${t.goodSignal}</span>
          </button>
          
          <button class="net-switch-btn ${mode === 'moderate' ? 'active' : ''}" data-set-net="moderate" id="btn-net-moderate">
            <i data-lucide="phone-call" style="width: 17px; height: 17px;"></i>
            <span>${t.moderateSignal}</span>
          </button>
          
          <button class="net-switch-btn ${mode === 'low' ? 'active' : ''}" data-set-net="low" id="btn-net-low">
            <i data-lucide="message-circle" style="width: 17px; height: 17px;"></i>
            <span>${t.lowSignal}</span>
          </button>
        </div>
      </div>

      <!-- 2-Column Split: Teleconsult Viewport + Clinical Info Panel -->
      <div class="split-2-1" style="align-items: start; gap: 24px;">
        
        <!-- Left Column: Dynamic Consultation Viewport & Controls -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <!-- Hero Viewport Container: Changes dynamically based on mode -->
          <div id="consultation-viewport-container">
            ${renderViewportForMode(mode, t)}
          </div>

          <!-- Call Controls Bar -->
          <div class="card flex-center" style="gap: 20px; padding: 16px; background: var(--color-surface);">
            <button class="header-btn" id="btn-mute-audio" style="width: 52px; height: 52px; border-radius: 50%;" title="${t.muteAudioTitle}">
              <i data-lucide="mic" style="width: 22px; height: 22px;"></i>
            </button>
            
            <button class="btn btn-danger" id="btn-end-consult-call" style="border-radius: var(--radius-full); width: 68px; height: 68px; padding: 0; box-shadow: var(--shadow-danger);" title="${t.endCallTitle}">
              <i data-lucide="phone-off" style="width: 28px; height: 28px;"></i>
            </button>
            
            <button class="header-btn" id="btn-switch-cam" style="width: 52px; height: 52px; border-radius: 50%;" title="${t.switchCamTitle}">
              <i data-lucide="refresh-cw" style="width: 22px; height: 22px;"></i>
            </button>
          </div>
        </div>

        <!-- Right Column: Doctor Profile & Clinical Actions -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <!-- Doctor Profile Information -->
          <div class="card" style="padding: 22px;">
            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
              <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 18px; font-weight: 800; flex-shrink: 0;">
                AS
              </div>
              <div>
                <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-text-primary);">${t.docName}</div>
                <div style="font-size: 12.5px; color: var(--color-text-secondary); margin-top: 2px;">${t.docSpecialtyHub}</div>
                <span class="status-badge badge-success" style="font-size: 9.5px; margin-top: 6px;">● ${t.onlineChatSubtitle || 'Online Medical Officer'}</span>
              </div>
            </div>

            <button class="btn btn-primary btn-full" id="btn-open-rx-drawer" style="padding: 11px;">
              <i data-lucide="file-text"></i> ${t.rxSummaryBtn}
            </button>
          </div>

          <!-- Clinical Vitals Overview Card -->
          <div class="card" style="padding: 20px; background: #FAF9FD;">
            <h4 style="font-family: var(--font-heading); font-size: 14px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 12px;">
              Patient Vitals Snapshot
            </h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12px;">
              <div style="background: var(--color-surface); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
                <span style="color: var(--color-text-muted); display: block;">Blood Pressure</span>
                <strong style="font-size: 14px; color: var(--color-text-primary);">124/82 mmHg</strong>
              </div>
              <div style="background: var(--color-surface); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
                <span style="color: var(--color-text-muted); display: block;">SpO2</span>
                <strong style="font-size: 14px; color: var(--color-success);">98% Normal</strong>
              </div>
              <div style="background: var(--color-surface); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
                <span style="color: var(--color-text-muted); display: block;">Temperature</span>
                <strong style="font-size: 14px; color: var(--color-warning);">101.4°F</strong>
              </div>
              <div style="background: var(--color-surface); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
                <span style="color: var(--color-text-muted); display: block;">Pulse Rate</span>
                <strong style="font-size: 14px; color: var(--color-text-primary);">78 bpm</strong>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="compliance-disclaimer" style="margin-top: 10px;">
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
        <div style="position: absolute; top: 16px; left: 16px; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(8px); padding: 6px 14px; border-radius: var(--radius-full); font-size: 12px; display: flex; align-items: center; gap: 8px; z-index: 10;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #1E9E5A;"></span>
          <span style="font-weight: 700;">${t.hdVideoOverlay}</span>
        </div>

        <div style="text-align: center; z-index: 5;">
          <div class="video-avatar-placeholder" style="margin: 0 auto 14px auto;">
            <span>AS</span>
          </div>
          <div style="font-family: var(--font-heading); font-size: 18px; font-weight: 800;">${t.docName}</div>
          <div style="font-size: 13px; opacity: 0.85; margin-top: 2px;">${t.liveVideoStreamActive}</div>
        </div>

        <!-- Self PIP Camera -->
        <div class="video-self-pip">
          <div style="font-size: 11px; color: rgba(255, 255, 255, 0.8); text-align: center;">
            <i data-lucide="user" style="width: 22px; height: 22px; margin: 0 auto 4px auto; display: block;"></i>
            ${t.youPip}
          </div>
        </div>
      </div>
    `;
  } else if (mode === 'moderate') {
    // Mode 2: Low-Bandwidth Audio Waveform
    return `
      <div class="card" style="background: #151324; color: #FFFFFF; padding: 32px 24px; border: none; border-radius: var(--radius-lg); text-align: center;">
        <div class="flex-between" style="margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="status-badge badge-warning" style="font-size: 10px;">${t.audioOnlyBadge}</span>
            <span style="font-size: 12px; color: rgba(255, 255, 255, 0.8);">${t.bandwidthAudioTag}</span>
          </div>
          <span style="font-size: 13px; color: var(--color-accent); font-weight: 800;">${t.audioTimer}</span>
        </div>

        <!-- Audio Waveform Visualizer -->
        <div class="audio-waveform-container" style="margin: 24px 0;">
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

        <div style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; margin-bottom: 4px;">
          ${t.docName}
        </div>
        <p style="font-size: 13px; opacity: 0.8;">
          ${t.doctorSpeaking}
        </p>
        <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 8px;">
          ${t.videoDisabledNotice}
        </div>
      </div>
    `;
  } else {
    // Mode 3: Edge SMS / Asynchronous Text Consult
    return `
      <div class="card" style="background: #FAF9FD; border: 2px dashed var(--color-danger); padding: 28px 24px; text-align: center;">
        <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--color-danger-light); color: var(--color-danger); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
          <i data-lucide="message-square-dashed" style="width: 24px; height: 24px;"></i>
        </div>

        <div class="status-badge badge-danger" style="margin-bottom: 8px; font-size: 10px;">${t.smsFallbackBadge}</div>
        
        <h3 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 6px;">
          ${t.offlineStoreForward}
        </h3>
        <p style="font-size: 13px; color: var(--color-text-secondary); max-width: 480px; margin: 0 auto 18px auto; line-height: 1.5;">
          ${t.smsFallbackNotice}
        </p>

        <button class="btn btn-primary" id="btn-open-chat-from-net" style="padding: 10px 20px;">
          <i data-lucide="message-square"></i>
          ${t.openLightweightChatBtn}
        </button>
      </div>
    `;
  }
}
