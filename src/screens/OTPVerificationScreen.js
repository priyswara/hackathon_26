/**
 * Screen: Mock OTP Verification (Palette 3 Design)
 * Clean, focused web verification card for selected portal category.
 * Simple Mock Authentication with Demo OTP: 123456
 * Fully localized across English, Hindi, Tamil, Telugu, and Malayalam.
 * 100% Responsive on Desktop & Mobile.
 */

import { locales } from '../data/locales.js';

export function renderOTPVerificationScreen(state, otpStep = 'identifier', currentOtpValue = '', errorMessage = '') {
  const t = locales[state.currentLanguage] || locales.en;
  const portalId = state.selectedPortal || state.currentRole || 'patient';

  const portalConfig = {
    patient: {
      title: t.portalPatientTitle || 'Patient Portal',
      icon: 'user',
      badge: t.roleCitizen || 'Citizen'
    },
    health_worker: {
      title: t.portalHealthWorkerTitle || 'Health Worker Portal',
      icon: 'users',
      badge: t.roleAsha || 'ASHA Worker'
    },
    doctor: {
      title: t.portalDoctorTitle || 'Doctor Portal',
      icon: 'stethoscope',
      badge: t.roleDocConsole || 'Dr. Console'
    },
    facility: {
      title: t.portalFacilityTitle || 'Facility Portal',
      icon: 'building',
      badge: t.rolePhcAdmin || 'PHC Admin'
    }
  };

  const portal = portalConfig[portalId] || portalConfig.patient;
  const isOtpStep = otpStep === 'otp';

  return `
    <div class="screen" id="screen-otp-verification" style="max-width: 480px; margin: 16px auto; width: 100%;">
      
      <!-- Back to Portal Selection Header -->
      <div style="margin-bottom: 14px;">
        <button class="btn btn-outline" id="btn-otp-back-portal" style="padding: 6px 14px; font-size: 13px; min-height: 36px; display: inline-flex; align-items: center; gap: 8px;">
          <i data-lucide="arrow-left" style="width: 15px; height: 15px;"></i>
          <span>${t.back || 'Back'}</span>
        </button>
      </div>

      <!-- Verification Card -->
      <div class="card" style="padding: 28px 24px; border-top: 4px solid var(--color-primary); box-shadow: var(--shadow-sm);">
        
        <!-- Portal Category Header Pill -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; gap: 8px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
            <div style="width: 38px; height: 38px; border-radius: var(--radius-sm); background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <i data-lucide="${portal.icon}" style="width: 20px; height: 20px;"></i>
            </div>
            <div style="min-width: 0;">
              <div style="font-size: 11px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px;">GraminArogya</div>
              <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--color-text-primary); line-height: 1.2;">${portal.title}</div>
            </div>
          </div>
          <span class="status-badge badge-primary">
            ${portal.badge}
          </span>
        </div>

        <!-- Section Title & Subtitle -->
        <div style="margin-bottom: 20px;">
          <h2 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--color-text-primary); line-height: 1.3; margin-bottom: 6px;">
            ${isOtpStep ? (t.enterOtpLabel || 'Enter 6-digit OTP') : (t.otpVerifyTitle || 'Sign in to Portal')}
          </h2>
          <p style="font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.5;">
            ${isOtpStep 
              ? `Enter the 6-digit verification code for <strong style="color: var(--color-text-primary);">${state.userMobile || state.userEmail || 'user@example.com'}</strong>` 
              : `Enter your mobile number or email address to access <strong>${portal.title}</strong>.`}
          </p>
        </div>

        <!-- Error Message Alert (if any) -->
        ${errorMessage ? `
          <div class="alert-banner" id="otp-error-alert" style="background: var(--color-danger-light); color: var(--color-danger); border: 1px solid rgba(214, 69, 69, 0.3);">
            <i data-lucide="alert-circle" style="width: 16px; height: 16px; flex-shrink: 0;"></i>
            <span>${errorMessage}</span>
          </div>
        ` : ''}

        ${!isOtpStep ? `
          <!-- STEP 1: MOBILE OR EMAIL ENTRY -->
          <form id="form-send-otp" onsubmit="return false;" style="display: flex; flex-direction: column; gap: 18px; width: 100%;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="input-user-identifier">
                ${t.mobileNumberLabel || 'Mobile Number or Email'}
              </label>
              <div style="display: flex; align-items: center; border: 1.5px solid var(--color-border); border-radius: var(--radius-sm); overflow: hidden; background: var(--color-surface); width: 100%;">
                <span style="padding: 10px 12px; background: var(--color-surface-muted); border-right: 1px solid var(--color-border); font-size: 13px; font-weight: 700; color: var(--color-text-secondary); flex-shrink: 0;">
                  +91
                </span>
                <input 
                  type="text" 
                  id="input-user-identifier" 
                  class="form-input" 
                  value="${(state.userMobile || '9876543210').replace('+91', '').trim()}" 
                  placeholder="98765 43210 or user@example.com"
                  style="border: none; background: transparent; padding: 11px 12px; font-size: 14.5px; font-weight: 600; width: 100%; outline: none;"
                  autofocus
                  required
                />
              </div>
              <div style="font-size: 11.5px; color: var(--color-text-muted); margin-top: 4px;">
                Demo pre-filled for quick prototyping & testing.
              </div>
            </div>

            <!-- Send OTP Button -->
            <button type="submit" class="btn btn-primary btn-full" id="btn-submit-send-otp" style="padding: 12px; font-size: 14.5px;">
              <span>${t.sendOtpBtn || 'Send OTP'}</span>
              <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </button>
          </form>
        ` : `
          <!-- STEP 2: 6-DIGIT MOCK OTP VERIFICATION -->
          <form id="form-verify-otp" onsubmit="return false;" style="display: flex; flex-direction: column; gap: 18px; width: 100%;">
            
            <!-- Demo OTP Helper Box -->
            <div style="background: var(--color-primary-light); border: 1.5px dashed var(--color-primary); border-radius: var(--radius-sm); padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <i data-lucide="key" style="color: var(--color-primary); width: 16px; height: 16px; flex-shrink: 0;"></i>
                <span style="font-size: 12.5px; font-weight: 700; color: var(--color-primary);">Demo OTP: 123456</span>
              </div>
              <button type="button" id="btn-autofill-otp" class="btn btn-outline" style="padding: 4px 10px; font-size: 11.5px; min-height: 28px; height: 28px;">
                Auto-fill
              </button>
            </div>

            <!-- OTP Input -->
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="input-otp-code">
                ${t.enterOtpLabel || 'Enter 6-digit OTP'}
              </label>
              <input 
                type="text" 
                id="input-otp-code" 
                class="form-input" 
                inputmode="numeric"
                maxlength="6" 
                value="${currentOtpValue || ''}"
                placeholder="123456" 
                style="letter-spacing: clamp(6px, 2.5vw, 10px); font-size: clamp(20px, 4.5vw, 24px); font-weight: 800; text-align: center; padding: 10px; border: 2px solid var(--color-primary); border-radius: var(--radius-sm); width: 100%; font-family: monospace;"
                autofocus
                required
              />
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
              <button type="submit" class="btn btn-primary btn-full" id="btn-submit-verify-otp" style="padding: 12px; font-size: 14.5px;">
                <i data-lucide="check-circle" style="width: 17px; height: 17px;"></i>
                <span>${t.verifyContinueBtn || 'Verify & Continue'}</span>
              </button>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; gap: 8px; flex-wrap: wrap;">
                <button type="button" id="btn-change-mobile" class="btn btn-ghost" style="padding: 4px; font-size: 12px; text-decoration: underline; cursor: pointer;">
                  ${t.changeMobileBtn || 'Change Number / Email'}
                </button>
                <button type="button" id="btn-resend-demo-otp" class="btn btn-ghost" style="padding: 4px; font-size: 12px; color: var(--color-primary); font-weight: 700; cursor: pointer;">
                  ${t.resendOtpBtn || 'Resend OTP'}
                </button>
              </div>
            </div>
          </form>
        `}

      </div>

      <!-- Prototype Disclaimer -->
      <div style="margin-top: 16px; text-align: center; font-size: 11.5px; color: var(--color-text-muted);">
        GraminArogya Prototype • Secured with Mock OTP (123456)
      </div>

    </div>
  `;
}
