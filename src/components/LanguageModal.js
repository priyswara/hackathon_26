/**
 * HEALER Language Selection Modal
 * Clean, accessible dialog supporting English, Hindi, Tamil, Telugu, and Malayalam.
 */

import { locales } from '../data/locales.js';

export function renderLanguageModal(currentLang = 'en') {
  const t = locales[currentLang] || locales.en;

  const languages = [
    { code: 'en', native: 'English', english: 'English' },
    { code: 'hi', native: 'हिंदी', english: 'Hindi' },
    { code: 'ta', native: 'தமிழ்', english: 'Tamil' },
    { code: 'te', native: 'తెలుగు', english: 'Telugu' },
    { code: 'ml', native: 'മലയാളം', english: 'Malayalam' }
  ];

  return `
    <div class="modal-overlay" id="language-modal-overlay">
      <div class="modal-dialog" id="language-modal-dialog">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <i data-lucide="globe" style="width: 20px; height: 20px; color: var(--color-primary);"></i>
            <h3 class="modal-title">${t.selectLanguage || 'Select Language'}</h3>
          </div>
          <button class="btn btn-ghost btn-sm" id="btn-close-lang" style="padding: 4px; border-radius: 50%; width: 32px; height: 32px;">
            <i data-lucide="x" style="width: 18px; height: 18px;"></i>
          </button>
        </div>

        <div class="lang-modal-grid">
          ${languages.map(lang => `
            <div class="lang-modal-card ${lang.code === currentLang ? 'selected' : ''}" data-lang="${lang.code}">
              <div class="lang-native-name">${lang.native}</div>
              <div class="lang-english-name">${lang.english}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
