async function runTests() {
  const base = 'http://localhost:8080';
  
  // 1. Test GET /api/patient
  const ptRes = await fetch(base + '/api/patient');
  const pt = await ptRes.json();
  console.log('1. GET /api/patient -> Success:', pt.success, '| Name:', pt.data.name, '| Active Token:', pt.data.activeToken);

  // 2. Test GET /api/queue
  const qRes = await fetch(base + '/api/queue');
  const q = await qRes.json();
  console.log('2. GET /api/queue -> Success:', q.success, '| Count:', q.data.length);

  // 3. Test GET /api/care-journey
  const cjRes = await fetch(base + '/api/care-journey');
  const cj = await cjRes.json();
  console.log('3. GET /api/care-journey -> Success:', cj.success, '| Count:', cj.data.length);

  // 4. Test POST /api/appointments
  const apptRes = await fetch(base + '/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      doctorName: 'Dr. Ananya Sharma',
      slotTime: '11:15 AM',
      facility: 'PHC Rampur Hub'
    })
  });
  const appt = await apptRes.json();
  console.log('4. POST /api/appointments -> Success:', appt.success, '| Generated Token:', appt.data.token, '| Updated Patient Token:', appt.data.patient.activeToken);

  // 5. Test POST /api/queue
  const addQRes = await fetch(base + '/api/queue', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: 'B-77',
      patientName: 'Devi Lal',
      priorityLevel: 'High',
      status: 'waiting',
      waitTime: '3 min'
    })
  });
  const addQ = await addQRes.json();
  console.log('5. POST /api/queue -> Success:', addQ.success, '| New Item ID:', addQ.data.id);

  // 6. Test POST /api/care-journey
  const addCjRes = await fetch(base + '/api/care-journey', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Prescription Dispensed: Paracetamol 650mg',
      provider: 'PHC Rampur Pharmacy',
      facility: 'PHC Rampur Hub',
      summary: 'Medications collected at pharmacy counter.'
    })
  });
  const addCj = await addCjRes.json();
  console.log('6. POST /api/care-journey -> Success:', addCj.success, '| Step ID:', addCj.data.id);

  // 7. Verify frontend HTML serves properly
  const htmlRes = await fetch(base + '/');
  const html = await htmlRes.text();
  console.log('7. GET / (Frontend HTML) -> Status:', htmlRes.status, '| Valid HTML:', html.includes('phone-app-root'));
}

runTests().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
