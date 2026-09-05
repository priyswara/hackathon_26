/**
 * Screen: Mock OTP Verification (Demo Prototype)
 * Clean, focused web verification card for selected portal category.
 * Fully localized across English, Hindi, Tamil, Telugu, and Malayalam.
 */

import { locales } from '../data/locales.js';

export function renderOTPVerificationScreen(state, otpStep = 'mobile', currentOtpValue = '', errorMessage = '') {
  const t = locales[state.currentLanguage] || locales.en;
  const portalId = state.selectedPortal || state.currentRole || 'patient';

  const portalConfig = {
    patient: {
      title: t.portalPatientTitle,
      icon: 'user',
      color: 'var(--color-primary)',
      badgeClass: 'badge-primary',
      bgLight: 'var(--color-primary-light)'
    },
    health_worker: {
      title: t.portalHealthWorkerTitle,
      icon: 'users',
      color: '#00A37D',
      badgeClass: 'badge-success',
      bgLight: '#E6FAF5'
    },
    doctor: {
      title: t.portalDoctorTitle,
      icon: 'stethoscope',
      color: '#7C3AED',
      badgeClass: 'badge-purple',
      bgLight: '#F4F0FF'
    },
    facility: {
      title: t.portalFacilityTitle,
      icon: 'building',
      color: 'var(--color-warning)',
      badgeClass: 'badge-warning',
      bgLight: 'var(--color-warning-light)'
    }
  };

  const portal = portalConfig[portalId] || portalConfig.patient;
  const isOtpStep = otpStep === 'otp';

  return `
    <div class="screen" id="screen-otp-verification" style="max-width: 520px; margin: 20px auto; padding: 10px;">
      
      <!-- Back to Portal Selection Header -->
      <div style="margin-bottom: 20px;">
        <button class="btn btn-outline" id="btn-otp-back-portal" style="padding: 6px 14px; font-size: 13px; display: inline-flex; align-items: center; gap: 8px;">
          <i data-lucide="arrow-left" style="width: 16px; height: 16px;"></i>
          <span>${t.back}</span>
        </button>
      </div>

      <!-- Verification Card -->
      <div class="card" style="padding: 32px 28px; box-shadow: var(--shadow-md); border-top: 5px solid ${portal.color};">
        
        <!-- Portal Category Header Pill -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 40px; height: 40px; border-radius: var(--radius-sm); background: ${portal.bgLight}; color: ${portal.color}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <i data-lucide="${portal.icon}" style="width: 22px; height: 22px;"></i>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px;">GraminArogya</div>
              <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-text-primary);">${portal.title}</div>
            </div>
          </div>
          <span class="status-badge" style="background: ${portal.bgLight}; color: ${portal.color}; font-size: 10px; font-weight: 700; padding: 3px 8px;">
            ${t.demoVerificationTag}
          </span>
        </div>

        <!-- Section Title & Subtitle -->
        <div style="margin-bottom: 24px;">
          <h2 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-text-primary); line-height: 1.3; margin-bottom: 6px;">
            ${isOtpStep ? t.enterOtpLabel : t.otpVerifyTitle}
          </h2>
          <p style="font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.5;">
            ${isOtpStep 
              ? `${t.enterOtpLabel} ${t.sentTo || 'for'} <strong style="color: var(--color-text-primary);">${state.userMobile || '+91 98765 43210'}</strong>` 
              : `${t.otpVerifySubtitle} <strong>${portal.title}</strong>.`}
          </p>
        </div>

        <!-- Error Message Alert (if any) -->
        ${errorMessage ? `
          <div class="alert-banner" id="otp-error-alert" style="background: var(--color-danger-light); color: var(--color-danger); border: 1px solid var(--color-danger); padding: 10px 14px; border-radius: var(--radius-sm); margin-bottom: 18px; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="alert-circle" style="width: 16px; height: 16px; flex-shrink: 0;"></i>
            <span>${errorMessage}</span>
          </div>
        ` : ''}

        ${!isOtpStep ? `
          <!-- STEP 1: MOBILE NUMBER ENTRY -->
          <form id="form-send-otp" onsubmit="return false;" style="display: flex; flex-direction: column; gap: 18px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="input-mobile-number" style="font-size: 12.5px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 6px; display: block;">
                ${t.mobileNumberLabel}
              </label>
              <div style="display: flex; align-items: center; border: 1.5px solid var(--color-border); border-radius: var(--radius-sm); overflow: hidden; background: var(--color-bg); transition: border-color 0.2s ease;">
                <span style="padding: 12px 14px; background: var(--color-surface); border-right: 1px solid var(--color-border); font-size: 14px; font-weight: 700; color: var(--color-text-secondary);">
                  +91
                </span>
                <input 
                  type="tel" 
                  id="input-mobile-number" 
                  class="form-input" 
                  value="${(state.userMobile || '9876543210').replace('+91', '').trim()}" 
                  maxlength="10" 
                  placeholder="98765 43210"
                  style="border: none; background: transparent; padding: 12px 14px; font-size: 15px; font-weight: 600; width: 100%; outline: none;"
                  required
                />
              </div>
              <div style="font-size: 11.5px; color: var(--color-text-muted); margin-top: 5px;">
                ${t.enterRegisteredMobile || 'Demo mobile number pre-filled for easy testing'}
              </div>
            </div>

            <!-- Send OTP Button -->
            <button type="submit" class="btn btn-primary btn-full" id="btn-submit-send-otp" style="padding: 13px; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span>${t.sendOtpBtn}</span>
              <i data-lucide="arrow-right" style="width: 18px; height: 18px;"></i>
            </button>
          </form>
        ` : `
          <!-- STEP 2: 6-DIGIT OTP VERIFICATION -->
          <form id="form-verify-otp" onsubmit="return false;" style="display: flex; flex-direction: column; gap: 20px;">
            
            <!-- Demo OTP Helper Box -->
            <div style="background: rgba(0, 102, 204, 0.08); border: 1.5px dashed var(--color-primary); border-radius: var(--radius-sm); padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <i data-lucide="key" style="color: var(--color-primary); width: 18px; height: 18px;"></i>
                <span style="font-size: 13px; font-weight: 700; color: var(--color-primary);">${t.demoOtpHelper}</span>
              </div>
              <button type="button" id="btn-autofill-otp" class="btn btn-outline" style="padding: 3px 8px; font-size: 11px; height: auto;">
                Auto-fill
              </button>
            </div>

            <!-- OTP Input -->
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="input-otp-code" style="font-size: 12.5px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 6px; display: block;">
                ${t.enterOtpLabel}
              </label>
              <input 
                type="text" 
                id="input-otp-code" 
                class="form-input" 
                maxlength="6" 
                value="${currentOtpValue || ''}"
                placeholder="123456" 
                style="letter-spacing: 8px; font-size: 22px; font-weight: 800; text-align: center; padding: 12px; border: 2px solid var(--color-primary); border-radius: var(--radius-sm);"
                autofocus
                required
              />
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <button type="submit" class="btn btn-primary btn-full" id="btn-submit-verify-otp" style="padding: 13px; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <i data-lucide="check-circle" style="width: 18px; height: 18px;"></i>
                <span>${t.verifyContinueBtn}</span>
              </button>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                <button type="button" id="btn-change-mobile" class="btn btn-link" style="padding: 4px; font-size: 12.5px; color: var(--color-text-secondary); text-decoration: underline; background: none; border: none; cursor: pointer;">
                  ${t.changeMobileBtn}
                </button>
                <button type="button" id="btn-resend-demo-otp" class="btn btn-link" style="padding: 4px; font-size: 12.5px; color: var(--color-primary); text-decoration: none; background: none; border: none; cursor: pointer; font-weight: 600;">
                  ${t.resendOtpBtn}
                </button>
              </div>
            </div>
          </form>
        `}

      </div>

      <!-- Prototype Disclaimer -->
      <div class="compliance-disclaimer" style="margin-top: 16px; text-align: center;">
        ${t.prototypeNotice}
      </div>

    </div>
  `;
}
