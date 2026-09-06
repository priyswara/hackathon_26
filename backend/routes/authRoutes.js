import express from 'express';
import crypto from 'crypto';

const router = express.Router();

/**
 * In-memory OTP record storage with automatic cleanup
 * Structure:
 * Map<email, {
 *   otpHash: string,
 *   expiresAt: number,
 *   attempts: number,
 *   maxAttempts: number,
 *   lastSentAt: number,
 *   sendHistory: number[]
 * }>
 */
const otpStore = new Map();

// Periodic cleanup of expired OTP entries (every 2 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [email, data] of otpStore.entries()) {
    if (now > data.expiresAt + 60000) {
      otpStore.delete(email);
    }
  }
}, 120000);

/**
 * Helper: Validate email format
 */
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * Helper: Hash OTP using SHA-256 for secure comparison
 */
function hashOtp(otp) {
  return crypto.createHash('sha256').update(otp.trim()).digest('hex');
}

/**
 * Helper: Safe timing-safe comparison of SHA-256 hashes
 */
function verifyOtpHash(inputOtp, storedHash) {
  const inputHash = hashOtp(inputOtp);
  const inputBuffer = Buffer.from(inputHash, 'utf-8');
  const storedBuffer = Buffer.from(storedHash, 'utf-8');
  if (inputBuffer.length !== storedBuffer.length) return false;
  return crypto.timingSafeEqual(inputBuffer, storedBuffer);
}

/**
 * Helper: Send email via Resend API
 */
async function sendResendOtpEmail(recipientEmail, otp) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    const errorMsg = 'RESEND_API_KEY environment variable is not configured on the server.';
    console.error(`❌ [Auth] Email delivery failed: ${errorMsg}`);
    throw new Error(errorMsg);
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'GraminArogya <onboarding@resend.dev>';
  
  const textContent = `GraminArogya\n\nYour verification code is: ${otp}\n\nThis code expires in 5 minutes.\n\nIf you did not request this code, you can ignore this email.`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GraminArogya Verification Code</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F4F7FB; margin: 0; padding: 24px; color: #1E293B;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #E2E8F0;">
        <!-- Header -->
        <tr>
          <td style="background-color: #0066CC; padding: 24px 32px; text-align: center;">
            <h1 style="color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">🏥 GraminArogya</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0 0; font-size: 13px;">Rural Healthcare Access Platform</p>
          </td>
        </tr>
        <!-- Content -->
        <tr>
          <td style="padding: 32px;">
            <h2 style="font-size: 18px; font-weight: 700; color: #0F172A; margin: 0 0 12px 0;">Authentication Code</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
              Your one-time verification code for accessing the GraminArogya healthcare portal is:
            </p>
            
            <!-- OTP Box -->
            <div style="background-color: #F0F7FF; border: 2px dashed #0066CC; border-radius: 8px; padding: 18px; text-align: center; margin-bottom: 24px;">
              <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #0066CC; font-family: monospace;">${otp}</span>
            </div>

            <p style="font-size: 13px; color: #64748B; line-height: 1.5; margin: 0 0 16px 0;">
              ⏱️ <strong>This code expires in 5 minutes.</strong>
            </p>
            <p style="font-size: 12px; color: #94A3B8; line-height: 1.5; margin: 0; border-top: 1px solid #F1F5F9; padding-top: 16px;">
              If you did not request this verification code, please ignore this email. Do not share this code with anyone.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background-color: #F8FAFC; padding: 16px 32px; text-align: center; font-size: 11px; color: #94A3B8; border-top: 1px solid #E2E8F0;">
            GraminArogya Healthcare Portal • Secure Tele-OPD & Continuity of Care
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [recipientEmail],
      subject: `GraminArogya Verification Code: ${otp}`,
      text: textContent,
      html: htmlContent
    })
  });

  const resData = await response.json();
  if (!response.ok) {
    const errMessage = resData?.message || `Resend API returned status ${response.status}`;
    console.error(`❌ [Auth] Resend API Error (${response.status}):`, errMessage);
    throw new Error(errMessage);
  }

  return resData;
}

/**
 * POST /api/auth/send-otp
 * Body: { email: string, portal?: string }
 */
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const now = Date.now();
    const COOLDOWN_MS = 60 * 1000; // 60 seconds cooldown
    const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 mins
    const MAX_SENDS_PER_WINDOW = 5;

    let record = otpStore.get(normalizedEmail);

    if (record) {
      // 1. Check Cooldown
      const timeSinceLastSent = now - record.lastSentAt;
      if (timeSinceLastSent < COOLDOWN_MS) {
        const remainingSeconds = Math.ceil((COOLDOWN_MS - timeSinceLastSent) / 1000);
        return res.status(429).json({
          success: false,
          message: `Please wait ${remainingSeconds} second(s) before requesting another code.`,
          cooldownRemaining: remainingSeconds
        });
      }

      // 2. Check Rate Limit (max sends in window)
      const recentSends = (record.sendHistory || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
      if (recentSends.length >= MAX_SENDS_PER_WINDOW) {
        return res.status(429).json({
          success: false,
          message: 'Too many OTP requests. Please try again after 15 minutes.'
        });
      }
    }

    // Generate secure 6-digit OTP (100000 - 999999)
    const otp = crypto.randomInt(100000, 1000000).toString();
    const otpHash = hashOtp(otp);
    const expiresAt = now + 5 * 60 * 1000; // 5 minutes expiry

    // Send email via Resend
    try {
      await sendResendOtpEmail(normalizedEmail, otp);
    } catch (emailErr) {
      return res.status(500).json({
        success: false,
        message: `Failed to send email: ${emailErr.message || 'Email service error'}. Please verify RESEND_API_KEY.`
      });
    }

    // Save/update OTP record in memory
    const sendHistory = record 
      ? [...(record.sendHistory || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS), now]
      : [now];

    otpStore.set(normalizedEmail, {
      otpHash,
      expiresAt,
      attempts: 0,
      maxAttempts: 5,
      lastSentAt: now,
      sendHistory
    });

    console.log(`✉️ [Auth] OTP sent successfully to ${normalizedEmail.slice(0, 3)}***@${normalizedEmail.split('@')[1] || ''}`);

    return res.json({
      success: true,
      message: 'A 6-digit verification code has been sent to your email.',
      cooldownSeconds: 60,
      expiresInMinutes: 5
    });

  } catch (error) {
    console.error('❌ [Auth] Unexpected error in /send-otp:', error.message);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while sending the verification code. Please try again.'
    });
  }
});

/**
 * POST /api/auth/verify-otp
 * Body: { email: string, otp: string, portal?: string }
 */
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp, portal } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address.'
      });
    }

    if (!otp || typeof otp !== 'string' || otp.trim().length !== 6) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 6-digit verification code.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedOtp = otp.trim();
    const now = Date.now();

    const record = otpStore.get(normalizedEmail);

    if (!record) {
      return res.status(400).json({
        success: false,
        message: 'No active OTP found or code expired. Please request a new code.'
      });
    }

    // Check expiry
    if (now > record.expiresAt) {
      otpStore.delete(normalizedEmail);
      return res.status(400).json({
        success: false,
        message: 'This verification code has expired. Please request a new one.'
      });
    }

    // Check brute force attempt limit
    if (record.attempts >= record.maxAttempts) {
      otpStore.delete(normalizedEmail);
      return res.status(400).json({
        success: false,
        message: 'Too many failed attempts. This OTP has been invalidated for security. Please request a new code.'
      });
    }

    // Compare hash securely
    const isMatch = verifyOtpHash(normalizedOtp, record.otpHash);

    if (!isMatch) {
      record.attempts += 1;
      const remainingAttempts = record.maxAttempts - record.attempts;

      if (remainingAttempts <= 0) {
        otpStore.delete(normalizedEmail);
        return res.status(400).json({
          success: false,
          message: 'Maximum attempts reached. Verification code invalidated. Please request a new code.'
        });
      }

      return res.status(400).json({
        success: false,
        message: `Incorrect code. You have ${remainingAttempts} attempt(s) remaining.`,
        attemptsRemaining: remainingAttempts
      });
    }

    // SUCCESS: Invalidate OTP immediately to prevent reuse
    otpStore.delete(normalizedEmail);

    // Generate secure session token
    const token = crypto.randomBytes(32).toString('hex');

    console.log(`✅ [Auth] Verification successful for ${normalizedEmail.slice(0, 3)}***@${normalizedEmail.split('@')[1] || ''}`);

    return res.json({
      success: true,
      message: 'Verification successful.',
      token,
      user: {
        email: normalizedEmail,
        verified: true,
        role: portal || 'patient',
        verifiedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ [Auth] Unexpected error in /verify-otp:', error.message);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during verification. Please try again.'
    });
  }
});

export default router;
