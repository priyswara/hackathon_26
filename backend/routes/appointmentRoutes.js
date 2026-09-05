import express from 'express';
import { dbRun, dbGet } from '../database.js';

const router = express.Router();

/**
 * POST /api/appointments
 * Book a new teleconsultation appointment
 * Automatically coordinates with Appointments, Patients, Care Journey, and Queue tables
 */
router.post('/', async (req, res) => {
  try {
    const { doctorName = 'Dr. Ananya Sharma', slotTime = '10:30 AM', facility = 'PHC Rampur Tele-Hub', patientName } = req.body;

    // Get current patient info if patientName not explicitly provided
    let patient = await dbGet('SELECT * FROM patients LIMIT 1');
    const finalPatientName = patientName || (patient ? patient.name : 'Ramesh Kumar');

    // 1. Generate unique token number
    const newTokenNumber = `B-${Math.floor(Math.random() * 20) + 20}`;
    const waitTime = '10 min';

    // 2. Insert into appointments table
    const apptResult = await dbRun(`
      INSERT INTO appointments (token, doctorName, slotTime, facility, patientName, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [newTokenNumber, doctorName, slotTime, facility, finalPatientName, 'confirmed']);

    // 3. Update patient's active token, queue position, and estimated wait time
    await dbRun(`
      UPDATE patients
      SET activeToken = ?,
          queuePosition = 3,
          estimatedWaitMins = 10
      WHERE id = (SELECT id FROM patients LIMIT 1)
    `, [newTokenNumber]);

    // 4. Add care journey timeline step
    const journeyId = `STEP-${Date.now()}`;
    await dbRun(`
      INSERT INTO care_journey (id, title, provider, facility, date, status, summary)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      journeyId,
      `Teleconsultation Booked (${doctorName})`,
      doctorName,
      facility,
      `Today, ${slotTime}`,
      'active',
      `Confirmed slot at ${slotTime}. Token #${newTokenNumber} generated.`
    ]);

    // 5. Add to live queue
    await dbRun(`
      INSERT INTO queue (token, patientName, priorityLevel, status, waitTime)
      VALUES (?, ?, ?, ?, ?)
    `, [
      newTokenNumber,
      finalPatientName,
      patient ? patient.priorityLevel : 'Medium',
      'waiting',
      waitTime
    ]);

    const createdAppointment = await dbGet('SELECT * FROM appointments WHERE id = ?', [apptResult.lastID]);
    const updatedPatient = await dbGet('SELECT * FROM patients LIMIT 1');

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: {
        token: newTokenNumber,
        appointment: createdAppointment,
        patient: {
          ...updatedPatient,
          pmjayEligible: Boolean(updatedPatient.pmjayEligible)
        }
      }
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ success: false, message: 'Server error booking appointment' });
  }
});

export default router;
