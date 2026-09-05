import express from 'express';
import { dbGet, dbRun } from '../database.js';

const router = express.Router();

/**
 * GET /api/patient
 * Fetch default active patient profile
 */
router.get('/', async (req, res) => {
  try {
    const patient = await dbGet('SELECT * FROM patients LIMIT 1');
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // Convert SQLite 1/0 integer to boolean for frontend compatibility
    const formattedPatient = {
      ...patient,
      pmjayEligible: Boolean(patient.pmjayEligible)
    };

    res.json({
      success: true,
      data: formattedPatient
    });
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ success: false, message: 'Server error fetching patient data' });
  }
});

/**
 * PUT /api/patient
 * Update patient details (e.g. priority, active token, queue position)
 */
router.put('/', async (req, res) => {
  try {
    const { activeToken, queuePosition, estimatedWaitMins, priorityLevel } = req.body;
    
    await dbRun(`
      UPDATE patients
      SET activeToken = COALESCE(?, activeToken),
          queuePosition = COALESCE(?, queuePosition),
          estimatedWaitMins = COALESCE(?, estimatedWaitMins),
          priorityLevel = COALESCE(?, priorityLevel)
      WHERE id = (SELECT id FROM patients LIMIT 1)
    `, [activeToken, queuePosition, estimatedWaitMins, priorityLevel]);

    const updatedPatient = await dbGet('SELECT * FROM patients LIMIT 1');
    res.json({
      success: true,
      message: 'Patient updated successfully',
      data: {
        ...updatedPatient,
        pmjayEligible: Boolean(updatedPatient.pmjayEligible)
      }
    });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ success: false, message: 'Server error updating patient data' });
  }
});

export default router;
