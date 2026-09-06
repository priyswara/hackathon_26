async function runAuthTests() {
  const base = 'http://localhost:8080';
  console.log('🧪 Starting GraminArogya Mock Auth Tests...\n');

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

  // 1. Send Mock OTP
  console.log('1. Testing Mock OTP Generation:');
  const sendRes = await postJson('/api/auth/send-otp', { mobile: '9876543210', portal: 'patient' });
  assert('Generates mock OTP cleanly', sendRes.ok && sendRes.data.success === true, `OTP: ${sendRes.data.otp}`);

  // 2. Verify with correct OTP
  console.log('\n2. Testing Verification with 123456:');
  const verRes = await postJson('/api/auth/verify-otp', { mobile: '9876543210', otp: '123456', portal: 'patient' });
  assert('Verifies 123456 and issues session token', verRes.ok && verRes.data.token && verRes.data.user.verified === true, `User: ${verRes.data.user.identifier}`);

  // 3. Reject invalid OTP
  console.log('\n3. Testing Rejection of Invalid OTP:');
  const badRes = await postJson('/api/auth/verify-otp', { mobile: '9876543210', otp: '000' });
  assert('Rejects invalid short OTP', badRes.status === 400 && badRes.data.success === false, badRes.data.message);

  // 4. Test Frontend HTML
  console.log('\n4. Testing Frontend Serving:');
  const htmlRes = await fetch(`${base}/`);
  const html = await htmlRes.text();
  assert('Frontend HTML loads cleanly', htmlRes.ok && html.includes('phone-app-root'));

  console.log(`\n========================================`);
  console.log(`📊 Test Summary: ${passed}/${total} assertions passed`);
  console.log(`========================================\n`);

  if (passed !== total) {
    process.exit(1);
  }
}

runAuthTests().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
