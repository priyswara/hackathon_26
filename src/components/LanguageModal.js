/**
 * LanguageModal & Voice Assistant Component
 * 5 Languages with native script and interactive Voice Recognition Mock
 */

import { locales } from '../data/locales.js';

export function renderLanguageModal(currentLang) {
  const t = locales[currentLang] || locales.en;

  const languages = [
    { code: 'en', name: 'English', native: 'English', region: locales[currentLang].regionPanIndia || 'Default / Pan-India' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी', region: locales[currentLang].regionNorthIndia || 'उत्तर भारत (North India)' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', region: locales[currentLang].regionTamilNadu || 'தமிழ்நாடு (Tamil Nadu)' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', region: locales[currentLang].regionApTs || 'ఆంధ్రప్రదేశ్ / తెలంగాణ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം', region: locales[currentLang].regionKerala || 'കേരളം (Kerala)' }
  ];

  return `
    <div class="modal-overlay" id="language-modal-overlay">
      <div class="bottom-sheet" id="language-bottom-sheet">
        <div class="sheet-drag-handle"></div>
        
        <div class="flex-between" style="margin-bottom: 16px;">
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 700;">${t.selectLanguage}</h3>
            <p style="font-size: 12px; color: var(--color-text-secondary);">${t.selectLanguageSub}</p>
          </div>
          <button class="header-btn" id="btn-close-lang" style="width: 32px; height: 32px;" title="${t.close}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <!-- Voice Assistant Mock -->
        <div class="card" style="background: linear-gradient(135deg, #F3EEFF 0%, #EBE3FC 100%); border-color: rgba(108, 60, 233, 0.2); margin-bottom: 20px; text-align: center;">
          <div class="voice-mic-container">
            <button class="voice-mic-button" id="btn-voice-mic" title="${t.tapToSpeak}">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            </button>
            <div>
              <h4 id="voice-status-heading" style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--color-primary-dark);">${t.tapToSpeak}</h4>
              <p id="voice-status-sub" style="font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;">${t.voiceHelperSub}</p>
            </div>
          </div>
        </div>

        <!-- Language List -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${languages.map(lang => `
            <div class="card card-clickable flex-between lang-option-card ${lang.code === currentLang ? 'selected-lang' : ''}" 
                 data-lang="${lang.code}" 
                 style="padding: 12px 16px; border: 1.5px solid ${lang.code === currentLang ? 'var(--color-primary)' : 'var(--color-border)'}; background: ${lang.code === currentLang ? 'var(--color-primary-light)' : 'var(--color-surface)'};">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 38px; height: 38px; border-radius: 50%; background: ${lang.code === currentLang ? 'var(--color-primary)' : '#ECEAF3'}; color: ${lang.code === currentLang ? '#FFFFFF' : 'var(--color-text-primary)'}; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-weight: 700; font-size: 14px;">
                  ${lang.code.toUpperCase()}
                </div>
                <div>
                  <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--color-text-primary);">${lang.native} <span style="font-size: 13px; font-weight: 500; color: var(--color-text-secondary);">(${lang.name})</span></div>
                  <div style="font-size: 11px; color: var(--color-text-muted);">${lang.region}</div>
                </div>
              </div>
              
              ${lang.code === currentLang ? `
                <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--color-primary); color: #FFFFFF; display: flex; align-items: center; justify-content: center;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
              ` : `
                <div style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid #D9D6E8;"></div>
              `}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
