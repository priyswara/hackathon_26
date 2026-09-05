import express from 'express';
import { dbAll, dbRun, dbGet } from '../database.js';

const router = express.Router();

/**
 * GET /api/queue
 * Fetch all patients in the live queue
 */
router.get('/', async (req, res) => {
  try {
    const queue = await dbAll('SELECT * FROM queue ORDER BY id ASC');
    res.json({
      success: true,
      data: queue
    });
  } catch (error) {
    console.error('Error fetching queue:', error);
    res.status(500).json({ success: false, message: 'Server error fetching queue' });
  }
});

/**
 * POST /api/queue
 * Add a patient to the live queue
 */
router.post('/', async (req, res) => {
  try {
    const { token, patientName, priorityLevel = 'Medium', status = 'waiting', waitTime = '15 min' } = req.body;

    if (!token || !patientName) {
      return res.status(400).json({
        success: false,
        message: 'Token and patientName are required'
      });
    }

    const result = await dbRun(`
      INSERT INTO queue (token, patientName, priorityLevel, status, waitTime)
      VALUES (?, ?, ?, ?, ?)
    `, [token, patientName, priorityLevel, status, waitTime]);

    const newItem = await dbGet('SELECT * FROM queue WHERE id = ?', [result.lastID]);

    res.status(201).json({
      success: true,
      message: 'Queue item added successfully',
      data: newItem
    });
  } catch (error) {
    console.error('Error adding to queue:', error);
    res.status(500).json({ success: false, message: 'Server error adding to queue' });
  }
});

export default router;
