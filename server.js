/**
 * GraminArogya — Rural Healthcare Platform Backend & Static Server
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Database initializer
import { initDatabase } from './backend/database.js';

// API Routes
import patientRoutes from './backend/routes/patientRoutes.js';
import queueRoutes from './backend/routes/queueRoutes.js';
import appointmentRoutes from './backend/routes/appointmentRoutes.js';
import careJourneyRoutes from './backend/routes/careJourneyRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8080;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files (HTML, CSS, JS, Images, Icons)
app.use(express.static(__dirname));

// Initialize SQLite database & seed initial data
initDatabase();

// REST API Endpoints
app.use('/api/patient', patientRoutes);
app.use('/api/queue', queueRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/care-journey', careJourneyRoutes);

// Fallback route to serve index.html for any client-side routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🏥 GraminArogya Server running at: http://0.0.0.0:${PORT}/`);
  console.log(`📡 REST API active on: http://0.0.0.0:${PORT}/api/`);
  console.log(`====================================================`);
});
