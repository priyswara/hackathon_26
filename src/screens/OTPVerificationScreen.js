/**
 * Screen: HEALER Account Verification
 * Clean, calm login screen with mock OTP 123456.
 */

import { locales } from '../data/locales.js';

export function renderOTPVerificationScreen(state, otpStep = 'identifier', currentOtpValue = '', errorMessage = '') {
  const t = locales[state.currentLanguage] || locales.en;
  const portalId = state.selectedPortal || state.currentRole || 'patient';

  const portalConfig = {
    patient: { title: t.portalPatientTitle || 'Patient', icon: 'user' },
    health_worker: { title: t.portalHealthWorkerTitle || 'Health Worker', icon: 'users' },
    doctor: { title: t.portalDoctorTitle || 'Doctor', icon: 'stethoscope' },
    facility: { title: t.portalFacilityTitle || 'Facility', icon: 'building' }
  };

  const portal = portalConfig[portalId] || portalConfig.patient;
  const isOtpStep = otpStep === 'otp';

  return `
    <div class="screen" id="screen-otp-verification" style="max-width: 440px; margin: 24px auto; width: 100%;">
      
      <!-- Back to Landing -->
      <div style="margin-bottom: 16px;">
        <button class="btn btn-outline btn-sm" id="btn-otp-back-portal">
          <i data-lucide="arrow-left" style="width: 14px; height: 14px;"></i>
          <span>${t.btnBack || 'Back'}</span>
        </button>
      </div>

      <!-- Main Login Card -->
      <div class="card" style="padding: 28px 24px;">
        
        <!-- Portal Tag -->
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
          <div style="width: 36px; height: 36px; border-radius: var(--radius-sm); background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center;">
            <i data-lucide="${portal.icon}" style="width: 18px; height: 18px;"></i>
          </div>
          <div>
            <div style="font-size: 11px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">${t.appTitle}</div>
            <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-text-primary);">${portal.title}</div>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 20px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 6px;">
            ${t.verifyAccount}
          </h2>
          <p style="font-size: 13.5px; color: var(--color-text-secondary);">
            ${isOtpStep ? t.enterOtpInstruction : `${t.mobileOrEmail}:`}
          </p>
        </div>

        ${errorMessage ? `
          <div style="background: var(--color-danger-light); color: var(--color-danger); border: 1px solid rgba(214, 69, 69, 0.25); padding: 10px 14px; border-radius: var(--radius-sm); font-size: 13px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="alert-circle" style="width: 16px; height: 16px; flex-shrink: 0;"></i>
            <span>${errorMessage}</span>
          </div>
        ` : ''}

        ${!isOtpStep ? `
          <!-- Step 1: Identifier Entry -->
          <form id="form-send-otp" onsubmit="return false;" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="input-user-identifier">${t.mobileOrEmail}</label>
              <div style="display: flex; align-items: center; border: 1.5px solid var(--color-border); border-radius: var(--radius-sm); overflow: hidden; background: var(--color-surface);">
                <span style="padding: 11px 12px; background: var(--color-surface-muted); border-right: 1px solid var(--color-border); font-size: 13px; font-weight: 700; color: var(--color-text-secondary);">
                  +91
                </span>
                <input 
                  type="text" 
                  id="input-user-identifier" 
                  class="form-input" 
                  value="${(state.userMobile || '9876543210').replace('+91', '').trim()}" 
                  placeholder="98765 43210"
                  style="border: none; padding: 11px 12px; font-size: 14.5px; font-weight: 600;"
                  autofocus
                  required
                />
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-full" id="btn-submit-send-otp">
              <span>${t.sendCode}</span>
              <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </button>
          </form>
        ` : `
          <!-- Step 2: 6-Digit OTP Entry -->
          <form id="form-verify-otp" onsubmit="return false;" style="display: flex; flex-direction: column; gap: 16px;">
            
            <!-- Demo OTP Banner -->
            <div style="background: var(--color-primary-light); border: 1px dashed var(--color-primary); border-radius: var(--radius-sm); padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <i data-lucide="key" style="color: var(--color-primary); width: 16px; height: 16px;"></i>
                <span style="font-size: 12.5px; font-weight: 700; color: var(--color-primary);">${t.demoOtpNote}</span>
              </div>
              <button type="button" id="btn-autofill-otp" class="btn btn-outline btn-sm" style="padding: 3px 8px; font-size: 11px; min-height: 26px;">
                Fill 123456
              </button>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <input 
                type="text" 
                id="input-otp-code" 
                class="form-input" 
                inputmode="numeric"
                maxlength="6" 
                value="${currentOtpValue || ''}"
                placeholder="123456" 
                style="letter-spacing: 10px; font-size: 24px; font-weight: 800; text-align: center; padding: 10px; border: 2px solid var(--color-primary); font-family: monospace;"
                autofocus
                required
              />
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              <button type="submit" class="btn btn-primary btn-full" id="btn-submit-verify-otp">
                <i data-lucide="check-circle" style="width: 16px; height: 16px;"></i>
                <span>${t.verify}</span>
              </button>

              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-top: 4px;">
                <button type="button" id="btn-change-mobile" class="btn btn-ghost" style="padding: 4px; font-size: 12px;">
                  ${t.changeNumber}
                </button>
                <button type="button" id="btn-resend-demo-otp" class="btn btn-ghost" style="padding: 4px; font-size: 12px; color: var(--color-primary); font-weight: 700;">
                  ${t.resendOtp}
                </button>
              </div>
            </div>
          </form>
        `}

      </div>
    </div>
  `;
}
