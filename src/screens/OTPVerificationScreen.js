/**
 * Screen: Mock OTP Verification (Demo Prototype)
 * Clean, focused web verification card for selected portal category.
 * Fully localized across English, Hindi, Tamil, Telugu, and Malayalam.
 * 100% Responsive on Desktop & Mobile.
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
    <div class="screen" id="screen-otp-verification" style="max-width: 520px; margin: 10px auto; width: 100%; padding: 4px;">
      
      <!-- Back to Portal Selection Header -->
      <div style="margin-bottom: 16px;">
        <button class="btn btn-outline" id="btn-otp-back-portal" style="padding: 6px 14px; font-size: 13px; display: inline-flex; align-items: center; gap: 8px;">
          <i data-lucide="arrow-left" style="width: 16px; height: 16px;"></i>
          <span>${t.back}</span>
        </button>
      </div>

      <!-- Verification Card -->
      <div class="card" style="padding: 24px 20px; box-shadow: var(--shadow-md); border-top: 5px solid ${portal.color}; width: 100%;">
        
        <!-- Portal Category Header Pill -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; gap: 8px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
            <div style="width: 38px; height: 38px; border-radius: var(--radius-sm); background: ${portal.bgLight}; color: ${portal.color}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <i data-lucide="${portal.icon}" style="width: 20px; height: 20px;"></i>
            </div>
            <div style="min-width: 0;">
              <div style="font-size: 11px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px;">GraminArogya</div>
              <div style="font-family: var(--font-heading); font-size: 15.5px; font-weight: 800; color: var(--color-text-primary); line-height: 1.2;">${portal.title}</div>
            </div>
          </div>
          <span class="status-badge" style="background: ${portal.bgLight}; color: ${portal.color}; font-size: 10px; font-weight: 700; padding: 3px 8px;">
            ${t.demoVerificationTag}
          </span>
        </div>

        <!-- Section Title & Subtitle -->
        <div style="margin-bottom: 22px;">
          <h2 style="font-family: var(--font-heading); font-size: 19px; font-weight: 800; color: var(--color-text-primary); line-height: 1.3; margin-bottom: 6px;">
            ${isOtpStep ? t.enterOtpLabel : t.otpVerifyTitle}
          </h2>
          <p style="font-size: 13px; color: var(--color-text-secondary); line-height: 1.5;">
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
          <form id="form-send-otp" onsubmit="return false;" style="display: flex; flex-direction: column; gap: 18px; width: 100%;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="input-mobile-number" style="font-size: 12.5px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 6px; display: block;">
                ${t.mobileNumberLabel}
              </label>
              <div style="display: flex; align-items: center; border: 1.5px solid var(--color-border); border-radius: var(--radius-sm); overflow: hidden; background: var(--color-bg); width: 100%;">
                <span style="padding: 11px 12px; background: var(--color-surface); border-right: 1px solid var(--color-border); font-size: 13.5px; font-weight: 700; color: var(--color-text-secondary); flex-shrink: 0;">
                  +91
                </span>
                <input 
                  type="tel" 
                  id="input-mobile-number" 
                  class="form-input" 
                  value="${(state.userMobile || '9876543210').replace('+91', '').trim()}" 
                  maxlength="10" 
                  placeholder="98765 43210"
                  style="border: none; background: transparent; padding: 11px 12px; font-size: 15px; font-weight: 600; width: 100%; outline: none;"
                  required
                />
              </div>
              <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">
                ${t.enterRegisteredMobile || 'Demo mobile number pre-filled for easy testing'}
              </div>
            </div>

            <!-- Send OTP Button -->
            <button type="submit" class="btn btn-primary btn-full" id="btn-submit-send-otp" style="padding: 12px; font-size: 14.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span>${t.sendOtpBtn}</span>
              <i data-lucide="arrow-right" style="width: 17px; height: 17px;"></i>
            </button>
          </form>
        ` : `
          <!-- STEP 2: 6-DIGIT OTP VERIFICATION -->
          <form id="form-verify-otp" onsubmit="return false;" style="display: flex; flex-direction: column; gap: 18px; width: 100%;">
            
            <!-- Demo OTP Helper Box -->
            <div style="background: rgba(0, 102, 204, 0.08); border: 1.5px dashed var(--color-primary); border-radius: var(--radius-sm); padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <i data-lucide="key" style="color: var(--color-primary); width: 17px; height: 17px; flex-shrink: 0;"></i>
                <span style="font-size: 12.5px; font-weight: 700; color: var(--color-primary);">${t.demoOtpHelper}</span>
              </div>
              <button type="button" id="btn-autofill-otp" class="btn btn-outline" style="padding: 3px 8px; font-size: 11px; height: auto; min-height: 28px;">
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
                style="letter-spacing: clamp(4px, 2vw, 8px); font-size: clamp(18px, 4vw, 22px); font-weight: 800; text-align: center; padding: 10px; border: 2px solid var(--color-primary); border-radius: var(--radius-sm); width: 100%;"
                autofocus
                required
              />
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
              <button type="submit" class="btn btn-primary btn-full" id="btn-submit-verify-otp" style="padding: 12px; font-size: 14.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <i data-lucide="check-circle" style="width: 17px; height: 17px;"></i>
                <span>${t.verifyContinueBtn}</span>
              </button>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; gap: 8px; flex-wrap: wrap;">
                <button type="button" id="btn-change-mobile" class="btn btn-link" style="padding: 4px; font-size: 12px; color: var(--color-text-secondary); text-decoration: underline; background: none; border: none; cursor: pointer;">
                  ${t.changeMobileBtn}
                </button>
                <button type="button" id="btn-resend-demo-otp" class="btn btn-link" style="padding: 4px; font-size: 12px; color: var(--color-primary); text-decoration: none; background: none; border: none; cursor: pointer; font-weight: 600;">
                  ${t.resendOtpBtn}
                </button>
              </div>
            </div>
          </form>
        `}

      </div>

      <!-- Prototype Disclaimer -->
      <div class="compliance-disclaimer" style="margin-top: 14px; text-align: center;">
        ${t.prototypeNotice}
      </div>

    </div>
  `;
}
