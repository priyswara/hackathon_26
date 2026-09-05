/**
 * Pure-JavaScript File Persistence Engine
 * 100% Native-Free & Cross-Platform Compatible (Render, Linux, Windows, macOS)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbDir = path.join(__dirname, 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbFile = path.join(dbDir, 'healthcare.json');

// In-memory data store with file persistence
let store = {
  patients: [],
  appointments: [],
  queue: [],
  care_journey: [],
  _counters: {
    appointments: 0,
    queue: 0
  }
};

const initialSeed = {
  patients: [
    {
      id: 'P-9812',
      name: 'Ramesh Kumar',
      age: 42,
      gender: 'Male',
      village: 'Rampur Kalan',
      phone: '+91 98765 43210',
      abhaId: '91-4820-1928-44',
      pmjayEligible: 1,
      activeToken: 'B-14',
      queuePosition: 4,
      estimatedWaitMins: 14,
      priorityLevel: 'Medium'
    }
  ],
  appointments: [],
  queue: [
    { id: 1, token: 'B-11', patientName: 'Ganga Ram', priorityLevel: 'High', status: 'serving', waitTime: '0 min', createdAt: new Date().toISOString() },
    { id: 2, token: 'B-12', patientName: 'Anita Sharma', priorityLevel: 'High', status: 'waiting', waitTime: '4 min', createdAt: new Date().toISOString() },
    { id: 3, token: 'B-13', patientName: 'Suresh Patel', priorityLevel: 'Medium', status: 'waiting', waitTime: '9 min', createdAt: new Date().toISOString() },
    { id: 4, token: 'B-14', patientName: 'Ramesh Kumar', priorityLevel: 'Medium', status: 'waiting', waitTime: '14 min', createdAt: new Date().toISOString() },
    { id: 5, token: 'B-15', patientName: 'Pooja Devi', priorityLevel: 'Low', status: 'waiting', waitTime: '20 min', createdAt: new Date().toISOString() },
    { id: 6, token: 'B-16', patientName: 'Mohan Lal', priorityLevel: 'Low', status: 'waiting', waitTime: '26 min', createdAt: new Date().toISOString() }
  ],
  care_journey: [
    {
      id: 'STEP-1',
      title: 'Digital Symptom Triage',
      provider: 'AI Decision Support Assistant',
      facility: 'GraminArogya App',
      date: 'Today, 09:15 AM',
      status: 'completed',
      summary: 'Assessed fever (102.2°F), dry cough for 3 days. Classified as Medium Priority.',
      createdAt: '2026-09-05T04:00:00.000Z'
    },
    {
      id: 'STEP-2',
      title: 'Teleconsultation Appointment',
      provider: 'Dr. Ananya Sharma (General Medicine)',
      facility: 'PHC Rampur Tele-Hub',
      date: 'Today, 10:30 AM',
      status: 'active',
      summary: 'Network-adaptive consultation scheduled. Token #B-14 generated.',
      createdAt: '2026-09-05T04:10:00.000Z'
    },
    {
      id: 'STEP-3',
      title: 'Prescription & Diagnostic Order',
      provider: 'Dr. Ananya Sharma',
      facility: 'PHC Rampur Lab',
      date: 'Pending Consult',
      status: 'upcoming',
      summary: 'Complete Blood Count (CBC) and Paracetamol 650mg + Azithromycin.',
      createdAt: '2026-09-05T04:20:00.000Z'
    },
    {
      id: 'STEP-4',
      title: 'ASHA Home Follow-up Visit',
      provider: 'Sunita Devi (ASHA Worker)',
      facility: 'Rampur Village Sub-centre',
      date: 'Tomorrow, 11:00 AM',
      status: 'upcoming',
      summary: 'Field health worker vitals check & medication adherence review.',
      createdAt: '2026-09-05T04:30:00.000Z'
    }
  ],
  _counters: {
    appointments: 0,
    queue: 6
  }
};

function saveToDisk() {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('❌ Error saving database to disk:', err.message);
  }
}

export async function initDatabase() {
  try {
    if (fs.existsSync(dbFile)) {
      const raw = fs.readFileSync(dbFile, 'utf-8');
      store = JSON.parse(raw);
      console.log('✅ Loaded persistent database from:', dbFile);
    } else {
      store = JSON.parse(JSON.stringify(initialSeed));
      saveToDisk();
      console.log('🌱 Initialized and seeded fresh database at:', dbFile);
    }
    console.log('✅ Pure JavaScript Data Engine Ready (Zero Native Addons)');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    store = JSON.parse(JSON.stringify(initialSeed));
  }
}

/**
 * Emulated dbGet query helper
 */
export const dbGet = (sql, params = []) => {
  return new Promise((resolve) => {
    const s = sql.toLowerCase().trim();

    // SELECT * FROM patients
    if (s.includes('from patients')) {
      resolve(store.patients[0] ? { ...store.patients[0] } : null);
      return;
    }

    // SELECT COUNT(*) as count FROM ...
    if (s.includes('count(*)')) {
      if (s.includes('from queue')) resolve({ count: store.queue.length });
      else if (s.includes('from care_journey')) resolve({ count: store.care_journey.length });
      else if (s.includes('from appointments')) resolve({ count: store.appointments.length });
      else resolve({ count: 0 });
      return;
    }

    // SELECT * FROM appointments WHERE id = ?
    if (s.includes('from appointments where id = ?')) {
      const item = store.appointments.find(a => a.id === Number(params[0]));
      resolve(item ? { ...item } : null);
      return;
    }

    // SELECT * FROM queue WHERE id = ?
    if (s.includes('from queue where id = ?')) {
      const item = store.queue.find(q => q.id === Number(params[0]));
      resolve(item ? { ...item } : null);
      return;
    }

    // SELECT * FROM care_journey WHERE id = ?
    if (s.includes('from care_journey where id = ?')) {
      const item = store.care_journey.find(c => c.id === String(params[0]));
      resolve(item ? { ...item } : null);
      return;
    }

    resolve(null);
  });
};

/**
 * Emulated dbAll query helper
 */
export const dbAll = (sql, params = []) => {
  return new Promise((resolve) => {
    const s = sql.toLowerCase().trim();

    // SELECT * FROM queue
    if (s.includes('from queue')) {
      resolve([...store.queue]);
      return;
    }

    // SELECT * FROM care_journey
    if (s.includes('from care_journey')) {
      // Sort newest first
      const sorted = [...store.care_journey].reverse();
      resolve(sorted);
      return;
    }

    // SELECT * FROM appointments
    if (s.includes('from appointments')) {
      resolve([...store.appointments]);
      return;
    }

    // SELECT * FROM patients
    if (s.includes('from patients')) {
      resolve([...store.patients]);
      return;
    }

    resolve([]);
  });
};

/**
 * Emulated dbRun mutation helper
 */
export const dbRun = (sql, params = []) => {
  return new Promise((resolve) => {
    const s = sql.toLowerCase().trim();

    // UPDATE patients
    if (s.startsWith('update patients')) {
      if (store.patients.length > 0) {
        const p = store.patients[0];
        const [activeToken, queuePosition, estimatedWaitMins, priorityLevel] = params;
        if (activeToken !== undefined && activeToken !== null) p.activeToken = activeToken;
        if (queuePosition !== undefined && queuePosition !== null) p.queuePosition = queuePosition;
        if (estimatedWaitMins !== undefined && estimatedWaitMins !== null) p.estimatedWaitMins = estimatedWaitMins;
        if (priorityLevel !== undefined && priorityLevel !== null) p.priorityLevel = priorityLevel;
      }
      saveToDisk();
      resolve({ lastID: 1, changes: 1 });
      return;
    }

    // INSERT INTO appointments (token, doctorName, slotTime, facility, patientName, status)
    if (s.startsWith('insert into appointments')) {
      store._counters.appointments = (store._counters.appointments || 0) + 1;
      const newId = store._counters.appointments;
      const [token, doctorName, slotTime, facility, patientName, status] = params;
      const appt = {
        id: newId,
        token,
        doctorName,
        slotTime,
        facility,
        patientName: patientName || 'Ramesh Kumar',
        status: status || 'confirmed',
        createdAt: new Date().toISOString()
      };
      store.appointments.push(appt);
      saveToDisk();
      resolve({ lastID: newId, changes: 1 });
      return;
    }

    // INSERT INTO queue (token, patientName, priorityLevel, status, waitTime)
    if (s.startsWith('insert into queue')) {
      store._counters.queue = (store._counters.queue || store.queue.length || 0) + 1;
      const newId = store._counters.queue;
      const [token, patientName, priorityLevel, status, waitTime] = params;
      const item = {
        id: newId,
        token,
        patientName,
        priorityLevel: priorityLevel || 'Medium',
        status: status || 'waiting',
        waitTime: waitTime || '10 min',
        createdAt: new Date().toISOString()
      };
      store.queue.push(item);
      saveToDisk();
      resolve({ lastID: newId, changes: 1 });
      return;
    }

    // INSERT INTO care_journey (id, title, provider, facility, date, status, summary)
    if (s.startsWith('insert into care_journey')) {
      const [id, title, provider, facility, date, status, summary] = params;
      const event = {
        id,
        title,
        provider: provider || 'Healthcare Provider',
        facility: facility || 'GraminArogya Platform',
        date: date || 'Today, Just now',
        status: status || 'active',
        summary: summary || '',
        createdAt: new Date().toISOString()
      };
      // Keep unique or push
      store.care_journey = store.care_journey.filter(c => c.id !== id);
      store.care_journey.push(event);
      saveToDisk();
      resolve({ lastID: id, changes: 1 });
      return;
    }

    resolve({ lastID: 0, changes: 0 });
  });
};

export default store;
