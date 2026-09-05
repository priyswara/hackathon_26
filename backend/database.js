import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the db directory exists
const dbDir = path.join(__dirname, 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'healthcare.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error connecting to SQLite database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database at:', dbPath);
  }
});

// Promise wrappers for clean async/await syntax
export const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

export const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Initialize tables and initial seed data
export async function initDatabase() {
  try {
    // 1. Patient Table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS patients (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER,
        gender TEXT,
        village TEXT,
        phone TEXT,
        abhaId TEXT,
        pmjayEligible INTEGER,
        activeToken TEXT,
        queuePosition INTEGER,
        estimatedWaitMins INTEGER,
        priorityLevel TEXT
      )
    `);

    // 2. Appointments Table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT NOT NULL,
        doctorName TEXT NOT NULL,
        slotTime TEXT NOT NULL,
        facility TEXT NOT NULL,
        patientName TEXT,
        status TEXT DEFAULT 'confirmed',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Queue Table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT NOT NULL,
        patientName TEXT NOT NULL,
        priorityLevel TEXT DEFAULT 'Medium',
        status TEXT DEFAULT 'waiting',
        waitTime TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 4. Care Journey Table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS care_journey (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        provider TEXT,
        facility TEXT,
        date TEXT,
        status TEXT DEFAULT 'active',
        summary TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed initial patient if none exists
    const existingPatient = await dbGet('SELECT * FROM patients LIMIT 1');
    if (!existingPatient) {
      await dbRun(`
        INSERT INTO patients (id, name, age, gender, village, phone, abhaId, pmjayEligible, activeToken, queuePosition, estimatedWaitMins, priorityLevel)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        'P-9812',
        'Ramesh Kumar',
        42,
        'Male',
        'Rampur Kalan',
        '+91 98765 43210',
        '91-4820-1928-44',
        1,
        'B-14',
        4,
        14,
        'Medium'
      ]);
      console.log('🌱 Seeded default patient record');
    }

    // Seed initial queue if empty
    const queueCount = await dbGet('SELECT COUNT(*) as count FROM queue');
    if (queueCount && queueCount.count === 0) {
      const initialQueue = [
        { token: 'B-11', patientName: 'Ganga Ram', priorityLevel: 'High', status: 'serving', waitTime: '0 min' },
        { token: 'B-12', patientName: 'Anita Sharma', priorityLevel: 'High', status: 'waiting', waitTime: '4 min' },
        { token: 'B-13', patientName: 'Suresh Patel', priorityLevel: 'Medium', status: 'waiting', waitTime: '9 min' },
        { token: 'B-14', patientName: 'Ramesh Kumar', priorityLevel: 'Medium', status: 'waiting', waitTime: '14 min' },
        { token: 'B-15', patientName: 'Pooja Devi', priorityLevel: 'Low', status: 'waiting', waitTime: '20 min' },
        { token: 'B-16', patientName: 'Mohan Lal', priorityLevel: 'Low', status: 'waiting', waitTime: '26 min' }
      ];

      for (const item of initialQueue) {
        await dbRun(
          'INSERT INTO queue (token, patientName, priorityLevel, status, waitTime) VALUES (?, ?, ?, ?, ?)',
          [item.token, item.patientName, item.priorityLevel, item.status, item.waitTime]
        );
      }
      console.log('🌱 Seeded initial queue data');
    }

    // Seed initial care journey if empty
    const careJourneyCount = await dbGet('SELECT COUNT(*) as count FROM care_journey');
    if (careJourneyCount && careJourneyCount.count === 0) {
      const initialCareJourney = [
        {
          id: 'STEP-1',
          title: 'Digital Symptom Triage',
          provider: 'AI Decision Support Assistant',
          facility: 'GraminArogya App',
          date: 'Today, 09:15 AM',
          status: 'completed',
          summary: 'Assessed fever (102.2°F), dry cough for 3 days. Classified as Medium Priority.'
        },
        {
          id: 'STEP-2',
          title: 'Teleconsultation Appointment',
          provider: 'Dr. Ananya Sharma (General Medicine)',
          facility: 'PHC Rampur Tele-Hub',
          date: 'Today, 10:30 AM',
          status: 'active',
          summary: 'Network-adaptive consultation scheduled. Token #B-14 generated.'
        },
        {
          id: 'STEP-3',
          title: 'Prescription & Diagnostic Order',
          provider: 'Dr. Ananya Sharma',
          facility: 'PHC Rampur Lab',
          date: 'Pending Consult',
          status: 'upcoming',
          summary: 'Complete Blood Count (CBC) and Paracetamol 650mg + Azithromycin.'
        },
        {
          id: 'STEP-4',
          title: 'ASHA Home Follow-up Visit',
          provider: 'Sunita Devi (ASHA Worker)',
          facility: 'Rampur Village Sub-centre',
          date: 'Tomorrow, 11:00 AM',
          status: 'upcoming',
          summary: 'Field health worker vitals check & medication adherence review.'
        }
      ];

      for (const item of initialCareJourney) {
        await dbRun(
          'INSERT INTO care_journey (id, title, provider, facility, date, status, summary) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [item.id, item.title, item.provider, item.facility, item.date, item.status, item.summary]
        );
      }
      console.log('🌱 Seeded initial care journey data');
    }

    console.log('✅ SQLite Database tables initialized successfully.');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
}

export default db;
