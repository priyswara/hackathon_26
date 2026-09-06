/**
 * Screen: Real Email OTP Verification
 * Clean, focused web verification card for selected portal category.
 * Fully localized across English, Hindi, Tamil, Telugu, and Malayalam.
 * 100% Responsive on Desktop & Mobile.
 */

import { locales } from '../data/locales.js';

export function renderOTPVerificationScreen(state, otpStep = 'email', currentOtpValue = '', errorMessage = '', cooldownSeconds = 0, isLoading = false) {
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
            <i data-lucide="shield-check" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle; margin-right: 3px;"></i>
            ${t.secureAuthTag || 'Email OTP'}
          </span>
        </div>

        <!-- Section Title & Subtitle -->
        <div style="margin-bottom: 20px;">
          <h2 style="font-family: var(--font-heading); font-size: 19px; font-weight: 800; color: var(--color-text-primary); line-height: 1.3; margin-bottom: 6px;">
            ${isOtpStep ? (t.checkEmailTitle || 'Check your email') : (t.otpVerifyTitle || 'Email Verification')}
          </h2>
          <p style="font-size: 13px; color: var(--color-text-secondary); line-height: 1.5;">
            ${isOtpStep 
              ? `${t.otpSentToEmail || 'We sent a 6-digit code to'} <strong style="color: var(--color-text-primary); word-break: break-all;">${state.userEmail || ''}</strong>.` 
              : `${t.otpVerifySubtitle || 'Enter your email address to receive a secure 6-digit OTP for'} <strong>${portal.title}</strong>.`}
          </p>
        </div>

        <!-- Error Message Alert (if any) -->
        ${errorMessage ? `
          <div class="alert-banner" id="otp-error-alert" style="background: var(--color-danger-light); color: var(--color-danger); border: 1px solid var(--color-danger); padding: 10px 14px; border-radius: var(--radius-sm); margin-bottom: 18px; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="alert-circle" style="width: 16px; height: 16px; flex-shrink: 0;"></i>
            <span style="word-break: break-word;">${errorMessage}</span>
          </div>
        ` : ''}

        ${!isOtpStep ? `
          <!-- STEP 1: EMAIL ADDRESS ENTRY -->
          <form id="form-send-otp" onsubmit="return false;" style="display: flex; flex-direction: column; gap: 18px; width: 100%;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="input-email-address" style="font-size: 12.5px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 6px; display: block;">
                ${t.emailAddressLabel || 'Email Address'}
              </label>
              <div style="display: flex; align-items: center; border: 1.5px solid var(--color-border); border-radius: var(--radius-sm); overflow: hidden; background: var(--color-bg); width: 100%;">
                <span style="padding: 11px 12px; background: var(--color-surface); border-right: 1px solid var(--color-border); color: var(--color-text-muted); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <i data-lucide="mail" style="width: 17px; height: 17px;"></i>
                </span>
                <input 
                  type="email" 
                  id="input-email-address" 
                  class="form-input" 
                  value="${state.userEmail || ''}" 
                  placeholder="${t.emailPlaceholder || 'you@example.com'}"
                  style="border: none; background: transparent; padding: 11px 12px; font-size: 14.5px; font-weight: 600; width: 100%; outline: none;"
                  autocomplete="email"
                  autofocus
                  required
                />
              </div>
              <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 5px; display: flex; align-items: center; gap: 4px;">
                <i data-lucide="clock" style="width: 12px; height: 12px;"></i>
                <span>OTP expires in 5 minutes after delivery</span>
              </div>
            </div>

            <!-- Send OTP Button -->
            <button type="submit" class="btn btn-primary btn-full" id="btn-submit-send-otp" ${isLoading ? 'disabled' : ''} style="padding: 12px; font-size: 14.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
              ${isLoading ? `
                <div class="spinner-inline" style="width: 16px; height: 16px; border: 2px solid #FFFFFF; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
                <span>Sending OTP...</span>
              ` : `
                <span>${t.sendOtpBtn || 'Send OTP'}</span>
                <i data-lucide="arrow-right" style="width: 17px; height: 17px;"></i>
              `}
            </button>
          </form>
        ` : `
          <!-- STEP 2: 6-DIGIT EMAIL OTP VERIFICATION -->
          <form id="form-verify-otp" onsubmit="return false;" style="display: flex; flex-direction: column; gap: 18px; width: 100%;">
            
            <!-- Email Delivery Helper Note -->
            <div style="background: rgba(0, 102, 204, 0.07); border: 1.5px solid rgba(0, 102, 204, 0.25); border-radius: var(--radius-sm); padding: 10px 14px; display: flex; align-items: center; gap: 10px;">
              <i data-lucide="inbox" style="color: var(--color-primary); width: 18px; height: 18px; flex-shrink: 0;"></i>
              <span style="font-size: 12px; font-weight: 600; color: var(--color-text-secondary); line-height: 1.4;">
                ${t.emailOtpNotice || 'Please check your inbox or spam folder for the 6-digit code.'}
              </span>
            </div>

            <!-- OTP Input -->
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="input-otp-code" style="font-size: 12.5px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 6px; display: block;">
                ${t.enterOtpLabel || 'Enter 6-digit verification code'}
              </label>
              <input 
                type="text" 
                id="input-otp-code" 
                class="form-input" 
                inputmode="numeric"
                pattern="[0-9]*"
                maxlength="6" 
                value="${currentOtpValue || ''}"
                placeholder="••••••" 
                style="letter-spacing: clamp(6px, 2.5vw, 10px); font-size: clamp(20px, 4.5vw, 24px); font-weight: 800; text-align: center; padding: 10px; border: 2px solid var(--color-primary); border-radius: var(--radius-sm); width: 100%; font-family: monospace;"
                autofocus
                required
              />
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
              <button type="submit" class="btn btn-primary btn-full" id="btn-submit-verify-otp" ${isLoading ? 'disabled' : ''} style="padding: 12px; font-size: 14.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
                ${isLoading ? `
                  <div class="spinner-inline" style="width: 16px; height: 16px; border: 2px solid #FFFFFF; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
                  <span>Verifying...</span>
                ` : `
                  <i data-lucide="check-circle" style="width: 17px; height: 17px;"></i>
                  <span>${t.verifyContinueBtn || 'Verify & Continue'}</span>
                `}
              </button>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; gap: 8px; flex-wrap: wrap;">
                <button type="button" id="btn-change-email" class="btn btn-link" style="padding: 4px; font-size: 12px; color: var(--color-text-secondary); text-decoration: underline; background: none; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                  <i data-lucide="edit-3" style="width: 12px; height: 12px;"></i>
                  <span>${t.changeEmailBtn || 'Change email'}</span>
                </button>
                
                <button 
                  type="button" 
                  id="btn-resend-otp" 
                  class="btn btn-link" 
                  ${cooldownSeconds > 0 ? 'disabled' : ''}
                  style="padding: 4px; font-size: 12px; color: ${cooldownSeconds > 0 ? 'var(--color-text-muted)' : 'var(--color-primary)'}; text-decoration: none; background: none; border: none; cursor: ${cooldownSeconds > 0 ? 'not-allowed' : 'pointer'}; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;"
                >
                  <i data-lucide="refresh-cw" style="width: 12px; height: 12px;"></i>
                  <span>${cooldownSeconds > 0 ? `${t.resendOtpIn || 'Resend in'} ${cooldownSeconds}s` : (t.resendOtpBtn || 'Resend OTP')}</span>
                </button>
              </div>
            </div>
          </form>
        `}

      </div>

      <!-- Prototype Disclaimer -->
      <div class="compliance-disclaimer" style="margin-top: 14px; text-align: center; font-size: 11px; color: var(--color-text-muted);">
        ${t.prototypeNotice}
      </div>

    </div>
  `;
}
