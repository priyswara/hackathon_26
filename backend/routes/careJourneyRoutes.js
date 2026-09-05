import express from 'express';
import { dbAll, dbRun, dbGet } from '../database.js';

const router = express.Router();

/**
 * GET /api/care-journey
 * Fetch all events in the patient's care journey (newest first)
 */
router.get('/', async (req, res) => {
  try {
    const journey = await dbAll('SELECT * FROM care_journey ORDER BY createdAt DESC, id DESC');
    res.json({
      success: true,
      data: journey
    });
  } catch (error) {
    console.error('Error fetching care journey:', error);
    res.status(500).json({ success: false, message: 'Server error fetching care journey' });
  }
});

/**
 * POST /api/care-journey
 * Add an event to the care journey (e.g., triage result, prescription, follow-up)
 */
router.post('/', async (req, res) => {
  try {
    const { id, title, provider, facility, date, status = 'active', summary } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required for care journey event'
      });
    }

    const eventId = id || `STEP-${Date.now()}`;
    const eventDate = date || 'Today, Just now';

    await dbRun(`
      INSERT INTO care_journey (id, title, provider, facility, date, status, summary)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [eventId, title, provider || 'Healthcare Provider', facility || 'GraminArogya Platform', eventDate, status, summary || '']);

    const newEvent = await dbGet('SELECT * FROM care_journey WHERE id = ?', [eventId]);

    res.status(201).json({
      success: true,
      message: 'Care journey event added successfully',
      data: newEvent
    });
  } catch (error) {
    console.error('Error adding care journey event:', error);
    res.status(500).json({ success: false, message: 'Server error adding care journey event' });
  }
});

export default router;
