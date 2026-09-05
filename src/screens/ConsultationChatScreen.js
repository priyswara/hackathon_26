/**
 * Screen 6: Consultation Chat & Digital Prescription
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
        <button class="header-btn" id="btn-back-home" title="${t.back}">
          <i data-lucide="arrow-left"></i>
        </button>
        <div style="text-align: center;">
          <h2 style="font-family: var(--font-heading); font-size: 15px; font-weight: 700;">${t.docName}</h2>
          <span style="font-size: 10px; color: var(--color-success); font-weight: 600;">${t.onlineChatSubtitle}</span>
        </div>
        <button class="header-btn" id="btn-switch-to-video-call" title="${t.connectVideoAudioBtn}">
          <i data-lucide="video"></i>
        </button>
      </div>

      <!-- e-Prescription Summary Card -->
      <div class="card" style="background: linear-gradient(135deg, #F3EEFF 0%, #FAF9FD 100%); border: 1.5px dashed var(--color-primary);">
        <div class="flex-between" style="margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <i data-lucide="file-check" style="color: var(--color-primary); width: 18px; height: 18px;"></i>
            <span style="font-family: var(--font-heading); font-size: 13px; font-weight: 700; color: var(--color-primary-dark);">${t.rxGeneratedTitle}</span>
          </div>
          <span class="status-badge badge-success" style="font-size: 9px;">${t.verifiedBadge}</span>
        </div>
        <div style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.4;">
          ${t.rxDetailsSummary}
        </div>
        <div style="display: flex; gap: 8px; margin-top: 10px;">
          <button class="btn btn-sm btn-primary" id="btn-chat-view-journey" style="flex: 1; padding: 6px 10px; font-size: 11px;">
            <i data-lucide="activity"></i> ${t.trackInJourneyBtn}
          </button>
          <button class="btn btn-sm btn-secondary" id="btn-chat-check-pharmacy" style="flex: 1; padding: 6px 10px; font-size: 11px;">
            <i data-lucide="package"></i> ${t.checkPhcStockBtn}
          </button>
        </div>
      </div>

      <!-- Chat Bubble Thread -->
      <div class="chat-container" id="chat-messages-container" style="min-height: 280px;">
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
      <div class="card" style="padding: 8px 12px; background: var(--color-surface); margin-top: auto;">
        <form id="form-chat-send" style="display: flex; align-items: center; gap: 8px;">
          <button type="button" class="header-btn" id="btn-chat-voice" style="width: 38px; height: 38px;" title="${t.tapToSpeak}">
            <i data-lucide="mic" style="color: var(--color-primary);"></i>
          </button>
          
          <input type="text" class="input-field" id="input-chat-text" placeholder="${t.sendText}" style="padding: 10px 14px; font-size: 13px;" required />
          
          <button type="submit" class="btn btn-primary" style="min-height: 38px; width: 38px; padding: 0; border-radius: var(--radius-md);" title="${t.sendText}">
            <i data-lucide="send" style="width: 16px; height: 16px;"></i>
          </button>
        </form>
      </div>
    </div>
  `;
}
