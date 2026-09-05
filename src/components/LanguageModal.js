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
      <div class="modal-dialog" id="language-modal-dialog">
        <div class="flex-between" style="margin-bottom: 20px;">
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-text-primary);">${t.selectLanguage}</h3>
            <p style="font-size: 13px; color: var(--color-text-secondary); margin-top: 2px;">${t.selectLanguageSub}</p>
          </div>
          <button class="header-btn" id="btn-close-lang" style="width: 36px; height: 36px;" title="${t.close}">
            <i data-lucide="x"></i>
          </button>
        </div>

        <!-- Voice Assistant Mock -->
        <div class="card" style="background: linear-gradient(135deg, #F3EEFF 0%, #EBE3FC 100%); border: 1px solid rgba(108, 60, 233, 0.2); margin-bottom: 20px; text-align: center; padding: 20px;">
          <div class="voice-mic-container">
            <button class="voice-mic-button" id="btn-voice-mic" title="${t.tapToSpeak}">
              <i data-lucide="mic" style="width: 28px; height: 28px;"></i>
            </button>
            <div>
              <h4 id="voice-status-heading" style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; color: var(--color-primary-dark);">${t.tapToSpeak}</h4>
              <p id="voice-status-sub" style="font-size: 12.5px; color: var(--color-text-secondary); margin-top: 2px;">${t.voiceHelperSub}</p>
            </div>
          </div>
        </div>

        <!-- Language List Grid -->
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${languages.map(lang => `
            <div class="card card-clickable flex-between lang-option-card ${lang.code === currentLang ? 'selected-lang' : ''}" 
                 data-lang="${lang.code}" 
                 style="padding: 14px 18px; border: 1.5px solid ${lang.code === currentLang ? 'var(--color-primary)' : 'var(--color-border)'}; background: ${lang.code === currentLang ? 'var(--color-primary-light)' : 'var(--color-surface)'};">
              <div style="display: flex; align-items: center; gap: 14px;">
                <div style="width: 42px; height: 42px; border-radius: var(--radius-sm); background: ${lang.code === currentLang ? 'var(--color-primary)' : '#ECEAF3'}; color: ${lang.code === currentLang ? '#FFFFFF' : 'var(--color-text-primary)'}; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-weight: 800; font-size: 15px;">
                  ${lang.code.toUpperCase()}
                </div>
                <div>
                  <div style="font-family: var(--font-heading); font-size: 15.5px; font-weight: 700; color: var(--color-text-primary);">${lang.native} <span style="font-size: 13px; font-weight: 500; color: var(--color-text-secondary);">(${lang.name})</span></div>
                  <div style="font-size: 11.5px; color: var(--color-text-muted); margin-top: 1px;">${lang.region}</div>
                </div>
              </div>
              
              ${lang.code === currentLang ? `
                <div style="width: 26px; height: 26px; border-radius: 50%; background: var(--color-primary); color: #FFFFFF; display: flex; align-items: center; justify-content: center;">
                  <i data-lucide="check" style="width: 16px; height: 16px;"></i>
                </div>
              ` : `
                <div style="width: 22px; height: 22px; border-radius: 50%; border: 2px solid #D9D6E8;"></div>
              `}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
