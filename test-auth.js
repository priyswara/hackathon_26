import http from 'http';

async function runAuthTests() {
  const base = 'http://localhost:8080';
  console.log('🧪 Starting GraminArogya Auth & Security Tests...\n');

  // Helper for requests
  async function postJson(endpoint, body) {
    const res = await fetch(`${base}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const json = await res.json().catch(() => ({}));
    return { status: res.status, ok: res.ok, data: json };
  }

  let passed = 0;
  let total = 0;

  function assert(name, condition, extra = '') {
    total++;
    if (condition) {
      console.log(`  ✅ [PASS] ${name} ${extra ? `(${extra})` : ''}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${name} ${extra ? `(${extra})` : ''}`);
    }
  }

  // 1. Invalid email format
  console.log('1. Testing Input Validation:');
  const inv1 = await postJson('/api/auth/send-otp', { email: 'not-an-email' });
  assert('Rejects invalid email format', inv1.status === 400 && inv1.data.success === false, `Status: ${inv1.status}`);

  const inv2 = await postJson('/api/auth/send-otp', { email: '' });
  assert('Rejects empty email', inv2.status === 400 && inv2.data.success === false, `Status: ${inv2.status}`);

  // 2. Verify without existing OTP
  console.log('\n2. Testing Verification of Non-existent / Expired OTP:');
  const verNon = await postJson('/api/auth/verify-otp', { email: 'nonexistent@example.com', otp: '123456' });
  assert('Rejects verification when no OTP requested', verNon.status === 400 && verNon.data.success === false, `Message: ${verNon.data.message}`);

  // 3. Verify OTP validation format
  const verBadFormat = await postJson('/api/auth/verify-otp', { email: 'valid@example.com', otp: '123' });
  assert('Rejects OTP shorter than 6 digits', verBadFormat.status === 400 && verBadFormat.data.success === false, `Status: ${verBadFormat.status}`);

  // 4. Test Resend Email Handler Error Handling when API key is unconfigured
  console.log('\n3. Testing Resend API Key Handling:');
  const sendRes = await postJson('/api/auth/send-otp', { email: 'doctor.test@example.com' });
  if (process.env.RESEND_API_KEY) {
    assert('Sends real email via Resend when API key is present', sendRes.ok && sendRes.data.success === true, sendRes.data.message);
  } else {
    assert('Returns clear error when RESEND_API_KEY is not configured', sendRes.status === 500 && sendRes.data.message.includes('RESEND_API_KEY'), sendRes.data.message);
  }

  // 5. Verify Frontend Serves OTP Screen & Resources
  console.log('\n4. Testing Frontend Integration:');
  const frontRes = await fetch(`${base}/index.html`);
  const frontHtml = await frontRes.text();
  assert('Frontend HTML loads cleanly', frontRes.ok && frontHtml.includes('phone-app-root'));

  console.log(`\n========================================`);
  console.log(`📊 Test Summary: ${passed}/${total} assertions passed`);
  console.log(`========================================\n`);

  if (passed !== total) {
    process.exit(1);
  }
}

// Start temporary server if not running, then test
async function main() {
  try {
    const res = await fetch('http://localhost:8080/api/patient').catch(() => null);
    if (!res) {
      console.log('Starting server in background for testing...');
      const { spawn } = await import('child_process');
      const srv = spawn('node', ['server.js'], { stdio: 'inherit' });
      await new Promise(r => setTimeout(r, 2000));
      await runAuthTests();
      srv.kill();
      process.exit(0);
    } else {
      await runAuthTests();
    }
  } catch (err) {
    console.error('Test execution failed:', err);
    process.exit(1);
  }
}

main();
