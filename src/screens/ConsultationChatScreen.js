/**
 * Screen 6: Consultation Chat & Digital Prescription
 * 2-Column Responsive Layout for Live Doctor Consultation Chat & Digital Rx
 */

import { locales } from '../data/locales.js';

export function renderConsultationChatScreen(state) {
  const t = locales[state.currentLanguage] || locales.en;
  const rawMessages = state.chatMessages || [];

  // Mapping standard mock dialogs to current locale
  const messageKeyMap = [
    t.chatDoctorMsg1,
    t.chatPatientMsg1,
    t.chatDoctorMsg2,
    t.chatPatientMsg2,
    t.chatDoctorMsg3
  ];

  return `
    <div class="screen" id="screen-consultation-chat">
      <!-- Screen Header -->
      <div class="flex-between">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="header-btn" id="btn-back-home" title="${t.back}">
            <i data-lucide="arrow-left"></i>
          </button>
          <div>
            <h2 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-text-primary);">${t.docName}</h2>
            <div style="font-size: 12px; color: var(--color-success); font-weight: 600;">● ${t.onlineChatSubtitle}</div>
          </div>
        </div>
        <button class="btn btn-secondary" id="btn-switch-to-video-call" title="${t.connectVideoAudioBtn}">
          <i data-lucide="video"></i>
          <span>${t.connectVideoAudioBtn || 'Switch to Video/Audio Call'}</span>
        </button>
      </div>

      <!-- 2-Column Responsive Layout -->
      <div class="split-1-2" style="align-items: start; gap: 24px;">
        
        <!-- Left Column: e-Prescription Summary Card -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div class="card" style="background: linear-gradient(135deg, #F3EEFF 0%, #FAF9FD 100%); border: 1.5px dashed var(--color-primary); padding: 22px;">
            <div class="flex-between" style="margin-bottom: 10px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <i data-lucide="file-check" style="color: var(--color-primary); width: 20px; height: 20px;"></i>
                <span style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--color-primary-dark);">${t.rxGeneratedTitle}</span>
              </div>
              <span class="status-badge badge-success" style="font-size: 10px;">${t.verifiedBadge}</span>
            </div>
            
            <div style="font-size: 13px; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 16px;">
              ${t.rxDetailsSummary}
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px;">
              <button class="btn btn-primary btn-full" id="btn-chat-view-journey" style="padding: 10px; font-size: 12.5px;">
                <i data-lucide="activity"></i> ${t.trackInJourneyBtn}
              </button>
              <button class="btn btn-secondary btn-full" id="btn-chat-check-pharmacy" style="padding: 10px; font-size: 12.5px;">
                <i data-lucide="package"></i> ${t.checkPhcStockBtn}
              </button>
            </div>
          </div>

          <!-- Quick Consultation Tips -->
          <div class="card" style="background: var(--color-surface); padding: 18px;">
            <div style="font-family: var(--font-heading); font-size: 13.5px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 6px;">
              ⚡ Asynchronous Message Sync
            </div>
            <p style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.4;">
              Messages and prescriptions remain offline-cached and automatically sync when network is restored.
            </p>
          </div>
        </div>

        <!-- Right Column: Live Chat Messenger Thread -->
        <div class="card" style="padding: 20px; display: flex; flex-direction: column; gap: 14px; min-height: 520px;">
          <div class="chat-container" id="chat-messages-container" style="flex: 1; min-height: 380px;">
            ${rawMessages.map((msg, idx) => {
              const displayText = (idx < messageKeyMap.length && messageKeyMap[idx]) ? messageKeyMap[idx] : msg.text;
              return `
                <div class="chat-bubble ${msg.sender}">
                  <div>${displayText}</div>
                  <span class="msg-time">${msg.time}</span>
                </div>
              `;
            }).join('')}
            
            <!-- Typing Indicator (Simulated) -->
            <div class="typing-indicator" id="chat-typing-indicator" style="display: none;">
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
            </div>
          </div>

          <!-- Chat Input Area -->
          <form id="form-chat-send" style="display: flex; align-items: center; gap: 10px; margin-top: auto;">
            <button type="button" class="header-btn" id="btn-chat-voice" style="width: 44px; height: 44px; flex-shrink: 0;" title="${t.tapToSpeak}">
              <i data-lucide="mic" style="color: var(--color-primary); width: 20px; height: 20px;"></i>
            </button>
            
            <input type="text" class="input-field" id="input-chat-text" placeholder="${t.sendText}" style="padding: 12px 16px; font-size: 14px;" required />
            
            <button type="submit" class="btn btn-primary" style="min-height: 44px; padding: 0 20px; border-radius: var(--radius-sm); flex-shrink: 0;" title="${t.sendText}">
              <i data-lucide="send" style="width: 18px; height: 18px;"></i>
            </button>
          </form>
        </div>

      </div>
    </div>
  `;
}
