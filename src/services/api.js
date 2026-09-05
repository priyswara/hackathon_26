/**
 * Frontend API Service Layer
 * Connects GraminArogya frontend to Express + SQLite backend
 */

// Base API URL configuration (defaults to same-origin /api or localhost:8080/api)
export const API_BASE_URL = typeof window !== 'undefined' && window.location.origin 
  ? `${window.location.origin}/api` 
  : 'http://localhost:8080/api';

/**
 * 1. Fetch current patient profile from backend
 */
export async function fetchPatient() {
  try {
    const response = await fetch(`${API_BASE_URL}/patient`);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: Failed to fetch patient`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.warn('⚠️ [API] Could not fetch patient from backend, using fallback:', error.message);
    return null;
  }
}

/**
 * 2. Fetch live queue list from backend
 */
export async function fetchQueue() {
  try {
    const response = await fetch(`${API_BASE_URL}/queue`);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: Failed to fetch queue`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.warn('⚠️ [API] Could not fetch queue from backend, using fallback:', error.message);
    return null;
  }
}

/**
 * 3. Fetch patient's care journey timeline from backend
 */
export async function fetchCareJourney() {
  try {
    const response = await fetch(`${API_BASE_URL}/care-journey`);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: Failed to fetch care journey`);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.warn('⚠️ [API] Could not fetch care journey from backend, using fallback:', error.message);
    return null;
  }
}

/**
 * 4. Book a teleconsultation appointment
 * Sends appointment to backend, generates token, updates patient, queue, and timeline
 */
export async function bookAppointment({ doctorName, slotTime, facility, patientName }) {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        doctorName: doctorName || 'Dr. Ananya Sharma',
        slotTime: slotTime || '10:30 AM',
        facility: facility || 'PHC Rampur Tele-Hub',
        patientName
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: Failed to book appointment`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('❌ [API] Failed to book appointment:', error.message);
    throw error;
  }
}

/**
 * 5. Add an item directly to the queue
 */
export async function addQueueItem(queueData) {
  try {
    const response = await fetch(`${API_BASE_URL}/queue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(queueData)
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: Failed to add queue item`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('❌ [API] Failed to add queue item:', error.message);
    throw error;
  }
}

/**
 * 6. Add an event to the patient's care journey timeline
 */
export async function addCareJourneyEvent(eventData) {
  try {
    const response = await fetch(`${API_BASE_URL}/care-journey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: Failed to add care journey event`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('❌ [API] Failed to add care journey event:', error.message);
    throw error;
  }
}
