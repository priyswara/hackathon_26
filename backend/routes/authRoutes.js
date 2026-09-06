import express from 'express';
import crypto from 'crypto';

const router = express.Router();

/**
 * Clean Mock OTP Authentication Router
 * Works reliably without any external API keys or email services.
 * Default Demo OTP: 123456
 */

/**
 * POST /api/auth/send-otp
 * Body: { email?: string, mobile?: string, portal?: string }
 */
router.post('/send-otp', (req, res) => {
  try {
    const { email, mobile, portal } = req.body;
    const identifier = (email || mobile || 'user@example.com').trim();

    // Clean mock OTP dispatch response
    return res.json({
      success: true,
      message: 'Demo OTP generated: 123456',
      otp: '123456',
      identifier,
      portal: portal || 'patient',
      expiresInMinutes: 10
    });
  } catch (error) {
    console.error('❌ [Auth] Error in /send-otp:', error.message);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while generating OTP.'
    });
  }
});

/**
 * POST /api/auth/verify-otp
 * Body: { email?: string, mobile?: string, otp: string, portal?: string }
 */
router.post('/verify-otp', (req, res) => {
  try {
    const { email, mobile, otp, portal } = req.body;
    const identifier = (email || mobile || 'user@example.com').trim();
    const enteredOtp = (otp || '').trim();

    // Accept 123456 (or any 6-digit code for flexible demo usage)
    if (enteredOtp === '123456' || enteredOtp.length === 6) {
      const token = crypto.randomBytes(24).toString('hex');
      return res.json({
        success: true,
        message: 'Verification successful.',
        token,
        user: {
          identifier,
          email: identifier.includes('@') ? identifier : `${identifier}@graminarogya.in`,
          verified: true,
          role: portal || 'patient',
          verifiedAt: new Date().toISOString()
        }
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Incorrect OTP. Use Demo OTP: 123456.'
    });
  } catch (error) {
    console.error('❌ [Auth] Error in /verify-otp:', error.message);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during verification.'
    });
  }
});

export default router;
