/**
 * HEALER — Adaptive Teleconsultation Screen
 * Automatically adapts across VIDEO -> AUDIO -> SMS/TEXT based on network bandwidth.
 * Includes hysteresis stability buffering, live telemetry, and prototype simulation controls.
 */

import { locales } from '../data/locales.js';
import { networkMonitorService } from '../services/NetworkMonitorService.js';

export function renderNetworkConsultationScreen(state, extraState = {}) {
  const t = locales[state.currentLanguage] || locales.en;
  const netState = networkMonitorService.getState();
  const mode = netState.currentMode; // 'good' | 'moderate' | 'low'
  const profile = netState.profile;
  const isRxModalOpen = extraState.isRxModalOpen || false;
  const smsChatMessages = extraState.smsChatMessages || [
    { sender: 'doctor', text: 'Hello Ramesh ji, I have reviewed your vitals. How has the fever been since yesterday?', time: '10:31 AM', status: 'delivered' },
    { sender: 'patient', text: 'Doctor, body temperature reached 101.4°F in the night. Mild shivering.', time: '10:32 AM', status: 'delivered' },
    { sender: 'doctor', text: 'Understood. Please start Paracetamol 500mg TDS and keep yourself hydrated with ORS.', time: '10:33 AM', status: 'delivered' }
  ];

  // Dynamic status text according to active mode
  let modeTitle = t.goodConnVideo;
  let modeBadgeClass = 'badge-success';
  let modeIcon = 'video';
  if (mode === 'moderate') {
    modeTitle = t.modConnAudio;
    modeBadgeClass = 'badge-warning';
    modeIcon = 'phone-call';
  } else if (mode === 'low') {
    modeTitle = t.lowConnText;
    modeBadgeClass = 'badge-danger';
    modeIcon = 'message-square';
  }

  return `
    <div class="screen" id="screen-network-consultation" style="max-width: 1060px; margin: 0 auto; width: 100%;">
      
      <!-- Top Consultation Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="header-btn" id="btn-back-from-consult" title="${t.btnBack}">
            <i data-lucide="arrow-left"></i>
          </button>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h2 style="font-size: 19px; font-weight: 800; color: var(--color-text-primary); margin: 0;">
                ${t.consultDoctor}
              </h2>
              <span class="status-badge ${modeBadgeClass}" id="badge-network-active" style="font-size: 11px; padding: 3px 10px;">
                ${modeTitle}
              </span>
            </div>
            <div style="font-size: 12.5px; color: var(--color-text-secondary); margin-top: 2px;">
              ${t.liveConnectedHub} • <span style="font-weight: 700; color: var(--color-primary);">${netState.callDurationDisplay}</span>
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="btn btn-secondary btn-sm" id="btn-open-rx-drawer" title="${t.rxSummaryBtn}">
            <i data-lucide="file-text" style="width: 15px; height: 15px;"></i>
            <span>${t.rxSummaryBtn}</span>
          </button>
        </div>
      </div>

      <!-- Network Simulation & Telemetry Control Card -->
      <div class="card" style="padding: 16px 20px; background: #FAF9FD; border: 1.5px solid var(--color-border); margin-bottom: 18px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <i data-lucide="activity" style="color: var(--color-primary); width: 18px; height: 18px;"></i>
            <span style="font-size: 13px; font-weight: 800; color: var(--color-text-primary); text-transform: uppercase; letter-spacing: 0.5px;">
              ${t.simulateBandwidthTitle}
            </span>
          </div>

          <!-- Auto-Simulation Toggle Button -->
          <button class="btn ${netState.isAutoSimulating ? 'btn-primary' : 'btn-outline'} btn-sm" id="btn-toggle-auto-sim" style="font-size: 12px; padding: 6px 14px; border-radius: var(--radius-full);">
            <i data-lucide="${netState.isAutoSimulating ? 'refresh-cw' : 'play'}" class="${netState.isAutoSimulating ? 'spin-animation' : ''}" style="width: 14px; height: 14px;"></i>
            <span>${netState.isAutoSimulating ? t.autoSimulateActive : t.autoSimulateBtn}</span>
          </button>
        </div>

        <!-- 3 Manual Network Switch Buttons -->
        <div class="network-switch-control" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 12px;">
          <button class="net-switch-btn ${mode === 'good' ? 'active' : ''}" data-set-net="good" id="btn-net-good" style="border-color: ${mode === 'good' ? 'var(--color-primary)' : 'var(--color-border)'};">
            <i data-lucide="wifi" style="width: 18px; height: 18px; color: #286B4F;"></i>
            <div>
              <div style="font-weight: 800; font-size: 13px;">${t.goodSignal}</div>
              <div style="font-size: 11px; opacity: 0.8;">> 2.5 Mbps • Video</div>
            </div>
          </button>
          
          <button class="net-switch-btn ${mode === 'moderate' ? 'active' : ''}" data-set-net="moderate" id="btn-net-moderate" style="border-color: ${mode === 'moderate' ? '#D99A2B' : 'var(--color-border)'};">
            <i data-lucide="phone-call" style="width: 18px; height: 18px; color: #D99A2B;"></i>
            <div>
              <div style="font-weight: 800; font-size: 13px;">${t.moderateSignal}</div>
              <div style="font-size: 11px; opacity: 0.8;">128-400 kbps • Audio</div>
            </div>
          </button>
          
          <button class="net-switch-btn ${mode === 'low' ? 'active' : ''}" data-set-net="low" id="btn-net-low" style="border-color: ${mode === 'low' ? '#D64545' : 'var(--color-border)'};">
            <i data-lucide="message-square" style="width: 18px; height: 18px; color: #D64545;"></i>
            <div>
              <div style="font-weight: 800; font-size: 13px;">${t.lowSignal}</div>
              <div style="font-size: 11px; opacity: 0.8;">< 30 kbps • SMS/Text</div>
            </div>
          </button>
        </div>

        <!-- Live Network Telemetry Strip -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--color-surface); padding: 8px 14px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); flex-wrap: wrap; gap: 8px; font-size: 12px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="color: var(--color-text-secondary);">${t.speedLabel}:</span>
            <strong style="color: ${profile.color}; font-family: var(--font-heading); font-size: 13px;">${profile.bandwidthDisplay}</strong>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="color: var(--color-text-secondary);">${t.latencyLabel}:</span>
            <strong style="color: var(--color-text-primary);">${profile.latencyDisplay}</strong>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="color: var(--color-text-secondary);">${t.packetLossLabel}:</span>
            <strong style="color: ${profile.packetLossPct > 10 ? 'var(--color-danger)' : 'var(--color-text-primary)'};">${profile.packetLossDisplay}</strong>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="color: var(--color-text-secondary);">Status:</span>
            <span class="status-badge ${netState.isTransitioning ? 'badge-warning' : profile.badgeClass}" style="font-size: 10.5px;">
              ${netState.isTransitioning ? `Stabilizing (${netState.transitionCountdown}s)...` : 'Connection Active'}
            </span>
          </div>
        </div>
      </div>

      <!-- Hysteresis Stability Countdown Banner (When Transitioning) -->
      ${netState.isTransitioning ? `
        <div class="transition-countdown-banner" style="background: var(--color-warning-light); border: 1px solid var(--color-warning); border-radius: var(--radius-sm); padding: 12px 16px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="spin-animation" style="color: var(--color-warning); display: flex; align-items: center;">
              <i data-lucide="loader" style="width: 18px; height: 18px;"></i>
            </div>
            <div>
              <strong style="font-size: 13.5px; color: var(--color-text-primary); display: block;">
                ${t.evaluatingStability}
              </strong>
              <span style="font-size: 12px; color: var(--color-text-secondary);">
                Network fluctuation detected. Confirming signal stability in ${netState.transitionCountdown}s before switching mode...
              </span>
            </div>
          </div>
          <span class="status-badge badge-warning" style="font-size: 12px; font-weight: 800;">
            ${netState.transitionCountdown}s
          </span>
        </div>
      ` : ''}

      <!-- Mode Change Notification Banner (Clear explanation of reasons) -->
      ${netState.lastNotification && !netState.isTransitioning ? `
        <div class="network-alert-banner" style="background: ${netState.lastNotification.type === 'danger' ? 'var(--color-danger-light)' : (netState.lastNotification.type === 'warning' ? 'var(--color-warning-light)' : 'var(--color-primary-light)')}; border: 1px solid ${netState.lastNotification.type === 'danger' ? 'var(--color-danger)' : (netState.lastNotification.type === 'warning' ? 'var(--color-warning)' : 'var(--color-primary)')}; border-radius: var(--radius-sm); padding: 10px 16px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px;">
          <i data-lucide="${netState.lastNotification.type === 'danger' ? 'alert-octagon' : (netState.lastNotification.type === 'warning' ? 'alert-triangle' : 'check-circle')}" style="width: 18px; height: 18px; color: ${netState.lastNotification.type === 'danger' ? 'var(--color-danger)' : (netState.lastNotification.type === 'warning' ? 'var(--color-warning)' : 'var(--color-primary)')}; flex-shrink: 0;"></i>
          <span style="font-size: 13px; font-weight: 600; color: var(--color-text-primary);">
            ${netState.lastNotification.message}
          </span>
        </div>
      ` : ''}

      <!-- 2-Column Split: Dynamic Viewport + Clinical Info Panel -->
      <div class="split-2-1" style="align-items: start; gap: 20px;">
        
        <!-- Left Column: Adaptive Viewport (Video / Audio / SMS) -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          
          <div id="consultation-viewport-wrapper">
            ${renderViewportForMode(mode, netState, t, smsChatMessages)}
          </div>

          <!-- Common Call Controls Bar -->
          <div class="card flex-center" style="gap: 16px; padding: 14px 20px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
            <!-- Mic Toggle Button -->
            <button class="header-btn ${netState.isMicMuted ? 'btn-active-danger' : ''}" id="btn-mute-audio" style="width: 48px; height: 48px; border-radius: 50%;" title="${netState.isMicMuted ? t.unmuteAudioTitle : t.muteAudioTitle}">
              <i data-lucide="${netState.isMicMuted ? 'mic-off' : 'mic'}" style="width: 20px; height: 20px; color: ${netState.isMicMuted ? 'var(--color-danger)' : 'var(--color-primary)'};"></i>
            </button>

            <!-- Camera Toggle Button (Only active in Video mode, disabled in Audio/SMS) -->
            <button class="header-btn ${netState.isCameraOff ? 'btn-active-danger' : ''}" id="btn-toggle-cam" style="width: 48px; height: 48px; border-radius: 50%; ${mode !== 'good' ? 'opacity: 0.4; cursor: not-allowed;' : ''}" title="${netState.isCameraOff ? t.camOnTitle : t.camOffTitle}" ${mode !== 'good' ? 'disabled' : ''}>
              <i data-lucide="${netState.isCameraOff ? 'video-off' : 'video'}" style="width: 20px; height: 20px; color: ${netState.isCameraOff ? 'var(--color-danger)' : 'var(--color-primary)'};"></i>
            </button>

            <!-- End Consultation Button -->
            <button class="btn btn-danger" id="btn-end-consult-call" style="border-radius: var(--radius-full); width: 60px; height: 60px; padding: 0; box-shadow: var(--shadow-danger); display: flex; align-items: center; justify-content: center;" title="${t.endCallTitle}">
              <i data-lucide="phone-off" style="width: 24px; height: 24px;"></i>
            </button>

            <!-- Switch Camera Button -->
            <button class="header-btn" id="btn-switch-cam" style="width: 48px; height: 48px; border-radius: 50%; ${mode !== 'good' ? 'opacity: 0.4; cursor: not-allowed;' : ''}" title="${t.switchCamTitle}" ${mode !== 'good' ? 'disabled' : ''}>
              <i data-lucide="refresh-cw" style="width: 20px; height: 20px; color: var(--color-primary);"></i>
            </button>
          </div>

        </div>

        <!-- Right Column: Doctor Profile & Patient Vitals Snapshot -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          
          <!-- Doctor Information Card -->
          <div class="card" style="padding: 20px; border: 1px solid var(--color-border);">
            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 17px; font-weight: 800; flex-shrink: 0;">
                AS
              </div>
              <div>
                <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-text-primary);">${t.docName}</div>
                <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 1px;">${t.docSpecialtyHub}</div>
                <span class="status-badge badge-success" style="font-size: 9.5px; margin-top: 4px;">● ${t.onlineChatSubtitle}</span>
              </div>
            </div>

            <button class="btn btn-outline btn-full btn-sm" id="btn-quick-view-rx">
              <i data-lucide="file-text" style="width: 14px; height: 14px;"></i>
              <span>${t.rxSummaryBtn}</span>
            </button>
          </div>

          <!-- Patient Vitals Snapshot Card -->
          <div class="card" style="padding: 18px; background: #FAF9FD; border: 1px solid var(--color-border);">
            <h4 style="font-family: var(--font-heading); font-size: 13.5px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
              <i data-lucide="activity" style="width: 15px; height: 15px; color: var(--color-primary);"></i>
              <span>${t.patientVitalsTitle}</span>
            </h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
              <div style="background: var(--color-surface); padding: 8px 10px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
                <span style="color: var(--color-text-muted); display: block; font-size: 11px;">Blood Pressure</span>
                <strong style="font-size: 13px; color: var(--color-text-primary);">124/82 mmHg</strong>
              </div>
              <div style="background: var(--color-surface); padding: 8px 10px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
                <span style="color: var(--color-text-muted); display: block; font-size: 11px;">SpO2</span>
                <strong style="font-size: 13px; color: var(--color-success);">98% Normal</strong>
              </div>
              <div style="background: var(--color-surface); padding: 8px 10px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
                <span style="color: var(--color-text-muted); display: block; font-size: 11px;">Temperature</span>
                <strong style="font-size: 13px; color: var(--color-warning);">101.4°F</strong>
              </div>
              <div style="background: var(--color-surface); padding: 8px 10px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
                <span style="color: var(--color-text-muted); display: block; font-size: 11px;">Pulse Rate</span>
                <strong style="font-size: 13px; color: var(--color-text-primary);">78 bpm</strong>
              </div>
            </div>
          </div>

          <!-- Adaptive Quality Notice -->
          <div style="padding: 12px 14px; background: var(--color-surface); border-radius: var(--radius-sm); border: 1px dashed var(--color-border); font-size: 11.5px; color: var(--color-text-secondary); line-height: 1.4;">
            ${t.networkEngineDisclaimer}
          </div>

        </div>

      </div>

      <!-- Digital e-Prescription Modal Dialog -->
      ${isRxModalOpen ? `
        <div class="modal-overlay active" id="rx-modal-overlay">
          <div class="modal-dialog" style="max-width: 520px;">
            <div class="modal-header">
              <div style="display: flex; align-items: center; gap: 8px;">
                <i data-lucide="file-check" style="color: var(--color-primary); width: 22px; height: 22px;"></i>
                <h3 class="modal-title">${t.rxGeneratedTitle}</h3>
              </div>
              <button class="header-btn" id="btn-close-rx-modal">
                <i data-lucide="x"></i>
              </button>
            </div>

            <div style="padding: 14px; background: #FAF9FD; border-radius: var(--radius-sm); border: 1px solid var(--color-border); margin-bottom: 16px;">
              <div style="font-size: 13px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 4px;">
                ${t.docName} • PHC Rampur Community Health Centre
              </div>
              <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 12px;">
                Patient: Ramesh Kumar (42/M) • Token #B-14
              </div>

              <div style="border-top: 1px solid var(--color-border); padding-top: 10px; display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; justify-content: space-between; font-size: 12.5px;">
                  <strong>1. Tab Paracetamol 500mg</strong>
                  <span style="color: var(--color-primary); font-weight: 600;">1-1-1 (3 Days)</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12.5px;">
                  <strong>2. Tab Cetirizine 10mg</strong>
                  <span style="color: var(--color-primary); font-weight: 600;">0-0-1 (Night)</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12.5px;">
                  <strong>3. ORS Hydration Sachet</strong>
                  <span style="color: var(--color-primary); font-weight: 600;">2 Litres/Day</span>
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 10px;">
              <button class="btn btn-primary btn-full" id="btn-modal-journey">
                <i data-lucide="activity" style="width: 15px; height: 15px;"></i>
                <span>${t.trackInJourneyBtn}</span>
              </button>
              <button class="btn btn-secondary btn-full" id="btn-modal-close-only">
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      ` : ''}

    </div>
  `;
}

/**
 * Render the Consultation Viewport according to current active mode
 * (Mode 1: Good -> Video | Mode 2: Moderate -> Audio | Mode 3: Low -> SMS)
 */
function renderViewportForMode(mode, netState, t, smsChatMessages) {
  if (mode === 'good') {
    // Mode 1: HD Video Consultation
    return `
      <div class="video-consult-container">
        <!-- Live HD Overlay Badge -->
        <div style="position: absolute; top: 16px; left: 16px; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px); padding: 6px 14px; border-radius: var(--radius-full); font-size: 12px; display: flex; align-items: center; gap: 8px; z-index: 10; color: #FFFFFF;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #1E9E5A; display: inline-block;"></span>
          <span style="font-weight: 700;">${t.hdVideoOverlay}</span>
        </div>

        <!-- Doctor Video Area (Simulated animated feed) -->
        <div style="text-align: center; z-index: 5; color: #FFFFFF;">
          <div class="video-avatar-placeholder" style="margin: 0 auto 14px auto; width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #286B4F 0%, #1E543E 100%); display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 800; border: 3px solid rgba(255, 255, 255, 0.4); box-shadow: 0 0 24px rgba(40, 107, 79, 0.5);">
            <span>AS</span>
          </div>
          <div style="font-family: var(--font-heading); font-size: 19px; font-weight: 800;">${t.docName}</div>
          <div style="font-size: 13px; opacity: 0.85; margin-top: 3px; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: #286B4F;"></span>
            <span>${t.doctorSpeaking}</span>
          </div>
        </div>

        <!-- Patient PIP (Picture in Picture) Camera -->
        <div class="video-self-pip">
          ${netState.isCameraOff ? `
            <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6); text-align: center;">
              <i data-lucide="video-off" style="width: 20px; height: 20px; margin: 0 auto 4px auto; display: block; color: var(--color-danger);"></i>
              Camera Off
            </div>
          ` : `
            <div style="font-size: 11px; color: rgba(255, 255, 255, 0.9); text-align: center;">
              <i data-lucide="user" style="width: 22px; height: 22px; margin: 0 auto 4px auto; display: block; color: #FFFFFF;"></i>
              ${t.youPip}
            </div>
          `}
        </div>
      </div>
    `;
  } else if (mode === 'moderate') {
    // Mode 2: Low-Bandwidth Audio Waveform Consultation
    return `
      <div class="card" style="background: #151324; color: #FFFFFF; padding: 32px 24px; border: none; border-radius: var(--radius-lg); text-align: center; box-shadow: var(--shadow-md);">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="status-badge badge-warning" style="font-size: 10.5px;">${t.audioOnlyBadge}</span>
            <span style="font-size: 12px; color: rgba(255, 255, 255, 0.8);">${t.bandwidthAudioTag}</span>
          </div>
          <span style="font-size: 13px; color: var(--color-accent); font-weight: 800; font-family: var(--font-heading);">${netState.callDurationDisplay}</span>
        </div>

        <!-- Doctor Avatar with Voice Animation -->
        <div style="width: 90px; height: 90px; border-radius: 50%; background: linear-gradient(135deg, #D99A2B 0%, #A6731B 100%); margin: 0 auto 16px auto; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 800; border: 3px solid rgba(255, 255, 255, 0.2); box-shadow: 0 0 20px rgba(217, 154, 43, 0.4);">
          <span>AS</span>
        </div>

        <div style="font-family: var(--font-heading); font-size: 19px; font-weight: 800; margin-bottom: 4px;">
          ${t.docName}
        </div>
        <p style="font-size: 13px; opacity: 0.85; margin-bottom: 18px;">
          ${t.doctorSpeaking}
        </p>

        <!-- Dynamic Audio Waveform Visualizer -->
        <div class="audio-waveform-container" style="margin: 20px auto; max-width: 280px;">
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

        <div style="font-size: 11.5px; color: rgba(255, 255, 255, 0.6); margin-top: 14px; max-width: 420px; margin-left: auto; margin-right: auto; line-height: 1.4;">
          ${t.videoDisabledNotice}
        </div>
      </div>
    `;
  } else {
    // Mode 3: Edge SMS / Text Consultation
    return `
      <div class="card" style="background: var(--color-surface); border: 2px solid var(--color-danger); padding: 20px; border-radius: var(--radius-lg);">
        
        <!-- SMS Mode Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border); flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--color-danger-light); color: var(--color-danger); display: flex; align-items: center; justify-content: center;">
              <i data-lucide="message-square" style="width: 18px; height: 18px;"></i>
            </div>
            <div>
              <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-text-primary);">
                ${t.offlineStoreForward}
              </div>
              <span class="status-badge badge-danger" style="font-size: 9.5px; padding: 2px 6px;">${t.smsFallbackBadge}</span>
            </div>
          </div>

          <div style="font-size: 11.5px; color: var(--color-text-secondary);">
            <i data-lucide="shield-check" style="width: 13px; height: 13px; display: inline-block; vertical-align: middle; color: var(--color-success);"></i>
            <span>${t.sentViaSms}</span>
          </div>
        </div>

        <div style="font-size: 12px; color: var(--color-text-secondary); background: var(--color-surface-muted); padding: 8px 12px; border-radius: var(--radius-sm); margin-bottom: 14px; line-height: 1.4;">
          ${t.smsFallbackNotice}
        </div>

        <!-- Integrated SMS Chat Thread -->
        <div class="sms-chat-thread" id="sms-messages-container" style="max-height: 240px; min-height: 180px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; padding: 8px; background: #FAF9FD; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
          ${smsChatMessages.map(msg => `
            <div class="sms-bubble ${msg.sender === 'patient' ? 'sms-bubble-patient' : 'sms-bubble-doctor'}">
              <div style="font-size: 13px;">${msg.text}</div>
              <div style="display: flex; justify-content: flex-end; align-items: center; gap: 4px; font-size: 10px; opacity: 0.7; margin-top: 3px;">
                <span>${msg.time}</span>
                ${msg.sender === 'patient' ? `<i data-lucide="check-check" style="width: 11px; height: 11px;"></i>` : ''}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Quick Reply Chips -->
        <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px;">
          <button class="quick-sms-chip" data-quick-sms="${t.quickReply1}">${t.quickReply1}</button>
          <button class="quick-sms-chip" data-quick-sms="${t.quickReply2}">${t.quickReply2}</button>
          <button class="quick-sms-chip" data-quick-sms="${t.quickReply3}">${t.quickReply3}</button>
        </div>

        <!-- SMS Message Input Form -->
        <form id="form-sms-chat" style="display: flex; gap: 8px;">
          <input type="text" id="input-sms-text" class="input-field" placeholder="${t.smsPlaceholder}" style="padding: 10px 14px; font-size: 13px;" required />
          <button type="submit" class="btn btn-primary" id="btn-sms-send" style="padding: 0 16px; border-radius: var(--radius-sm); flex-shrink: 0;" title="${t.sendSmsBtn}">
            <i data-lucide="send" style="width: 16px; height: 16px;"></i>
          </button>
        </form>

      </div>
    `;
  }
}
