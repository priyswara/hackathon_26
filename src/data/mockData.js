/**
 * HEALER Central Data Store & State Management
 * Pure Vanilla JavaScript ES Module State Store
 * Connects with backend APIs while maintaining robust offline/mock fallback.
 */

import { fetchPatient, fetchQueue, fetchCareJourney, bookAppointment, addCareJourneyEvent } from '../services/api.js';

export const initialMockDB = {
  currentRole: 'patient', // 'patient' | 'health_worker' | 'doctor' | 'facility'
  selectedPortal: 'patient',
  isVerified: false,
  userEmail: '',
  userMobile: '+91 98765 43210',
  authToken: null,
  currentLanguage: 'en',
  networkMode: 'good',
  hasDismissedWelcome: false,

  patient: {
    id: 'P-9812',
    name: 'Ramesh Kumar',
    age: 42,
    gender: 'Male',
    village: 'Rampur Kalan',
    phone: '+91 98765 43210',
    abhaId: '91-4820-1928-44',
    pmjayEligible: true,
    activeToken: 'B-14',
    queuePosition: 3,
    estimatedWaitMins: 12,
    priorityLevel: 'Medium'
  },

  services: [
    {
      id: 'srv-1',
      name: 'General OPD Consultation',
      code: 'serviceGeneralOpd',
      desc: 'serviceGeneralOpdDesc',
      icon: 'stethoscope',
      duration: '15 mins'
    },
    {
      id: 'srv-2',
      name: 'Maternal & Child Health',
      code: 'serviceMaternal',
      desc: 'serviceMaternalDesc',
      icon: 'baby',
      duration: '20 mins'
    },
    {
      id: 'srv-3',
      name: 'Pediatrics Care',
      code: 'servicePediatrics',
      desc: 'servicePediatricsDesc',
      icon: 'heart-pulse',
      duration: '15 mins'
    },
    {
      id: 'srv-4',
      name: 'Chronic Care & Diabetes',
      code: 'serviceChronic',
      desc: 'serviceChronicDesc',
      icon: 'activity',
      duration: '20 mins'
    },
    {
      id: 'srv-5',
      name: 'Diagnostics & Lab Tests',
      code: 'serviceDiagnostic',
      desc: 'serviceDiagnosticDesc',
      icon: 'flask-conical',
      duration: '10 mins'
    }
  ],

  facilities: [
    {
      id: 'FAC-01',
      name: 'PHC Rampur Community Health Centre',
      type: 'Primary Health Centre',
      category: 'phc',
      distance: '2.4 km',
      doctorsCount: 3,
      bedsTotal: 12,
      bedsOccupied: 8,
      avgWaitMins: 14,
      status: 'Open',
      hours: '08:00 AM - 04:00 PM',
      phone: '+91 751 245 8891',
      lat: 25.432,
      lng: 78.567,
      address: 'Near Block Development Office, Rampur Kalan',
      services: ['General OPD', 'Maternal & Child', 'Diagnostics & Lab Tests']
    },
    {
      id: 'FAC-02',
      name: 'CHC Kotra Block Hospital',
      type: 'Community Health Centre',
      category: 'chc',
      distance: '14 km',
      doctorsCount: 7,
      bedsTotal: 30,
      bedsOccupied: 22,
      avgWaitMins: 25,
      status: 'Open 24/7',
      hours: '24 Hours Emergency & OPD',
      phone: '+91 751 288 3341',
      lat: 25.489,
      lng: 78.612,
      address: 'Main Highway Junction, Kotra Block',
      services: ['General OPD', 'Pediatrics Care', 'Chronic Care', 'Emergency']
    },
    {
      id: 'FAC-03',
      name: 'Ayushman Arogya Mandir (Rampur Sub-Centre)',
      type: 'Health & Wellness Centre',
      category: 'clinic',
      distance: '0.8 km',
      doctorsCount: 1,
      bedsTotal: 4,
      bedsOccupied: 1,
      avgWaitMins: 8,
      status: 'Open',
      hours: '09:00 AM - 02:00 PM',
      phone: '+91 751 211 4452',
      lat: 25.418,
      lng: 78.552,
      address: 'Village Panchayat Bhawan, Rampur',
      services: ['General OPD', 'Maternal & Child', 'Immunization']
    },
    {
      id: 'FAC-04',
      name: 'Shivpuri District Hospital',
      type: 'District Hospital',
      category: 'hospital',
      distance: '38 km',
      doctorsCount: 24,
      bedsTotal: 150,
      bedsOccupied: 126,
      avgWaitMins: 40,
      status: 'Open 24/7',
      hours: '24 Hours Multi-Specialty',
      phone: '+91 751 290 0011',
      lat: 25.612,
      lng: 78.789,
      address: 'Hospital Road, Civil Lines, Shivpuri',
      services: ['General OPD', 'Pediatrics Care', 'Maternal Health', 'Surgery', 'Chronic Care']
    },
    {
      id: 'FAC-05',
      name: 'Jan Aushadhi Pharmacy Rampur',
      type: 'Pharmacy',
      category: 'pharmacy',
      distance: '1.2 km',
      doctorsCount: 0,
      bedsTotal: 0,
      bedsOccupied: 0,
      avgWaitMins: 5,
      status: 'Open',
      hours: '08:30 AM - 08:30 PM',
      phone: '+91 751 245 1199',
      lat: 25.426,
      lng: 78.561,
      address: 'Opposite Bus Stand, Rampur Market',
      services: ['Essential Medicines', 'Generic Drugs', 'First Aid']
    },
    {
      id: 'FAC-06',
      name: 'Rampur Diagnostic & Blood Test Centre',
      type: 'Diagnostic Centre',
      category: 'diagnostic',
      distance: '2.1 km',
      doctorsCount: 2,
      bedsTotal: 0,
      bedsOccupied: 0,
      avgWaitMins: 10,
      status: 'Open',
      hours: '07:30 AM - 05:00 PM',
      phone: '+91 751 245 4488',
      lat: 25.435,
      lng: 78.572,
      address: 'Near PHC Gate, Hospital Road, Rampur',
      services: ['Blood Tests', 'CBC Panel', 'Malaria Screening', 'X-Ray']
    }
  ],

  doctors: [
    {
      id: 'DOC-101',
      name: 'Dr. Ananya Sharma',
      specialty: 'General Medicine & Family Physician',
      experience: '8 Yrs Experience',
      location: 'PHC Rampur Community Health Centre',
      rating: 4.9,
      avatarInitials: 'AS',
      availableSlots: ['10:30 AM', '11:15 AM', '02:00 PM', '03:30 PM']
    },
    {
      id: 'DOC-102',
      name: 'Dr. Rajiv Verma',
      specialty: 'Pediatrics / Child Specialist',
      experience: '12 Yrs Experience',
      location: 'CHC Kotra Block Hospital',
      rating: 4.8,
      avatarInitials: 'RV',
      availableSlots: ['11:00 AM', '01:30 PM', '04:00 PM']
    },
    {
      id: 'DOC-103',
      name: 'Dr. Sneha Reddy',
      specialty: 'Obstetrics & Maternal Care',
      experience: '10 Yrs Experience',
      location: 'PHC Rampur Community Health Centre',
      rating: 4.9,
      avatarInitials: 'SR',
      availableSlots: ['10:00 AM', '02:30 PM', '04:30 PM']
    }
  ],

  appointments: [
    {
      id: 'APPT-101',
      token: 'B-14',
      facility: 'PHC Rampur Community Health Centre',
      service: 'General OPD Consultation',
      doctor: 'Dr. Ananya Sharma',
      date: 'Today',
      time: '10:30 AM',
      status: 'confirmed',
      patientName: 'Ramesh Kumar',
      isUpcoming: true
    },
    {
      id: 'APPT-100',
      token: 'A-08',
      facility: 'Ayushman Arogya Mandir (Rampur Sub-Centre)',
      service: 'Diagnostics & Lab Tests',
      doctor: 'Dr. Ananya Sharma',
      date: '28 Aug 2026',
      time: '09:15 AM',
      status: 'completed',
      patientName: 'Ramesh Kumar',
      isUpcoming: false
    }
  ],

  careJourney: [
    {
      id: 'STEP-1',
      title: 'Digital Symptom Triage',
      provider: 'HEALER Assistant',
      facility: 'HEALER Platform',
      date: 'Today, 09:15 AM',
      status: 'completed',
      summary: 'Assessed fever (101.4°F) and seasonal cough. Classified as Routine Consultation.'
    },
    {
      id: 'STEP-2',
      title: 'Appointment Booked',
      provider: 'Dr. Ananya Sharma',
      facility: 'PHC Rampur Community Health Centre',
      date: 'Today, 10:30 AM',
      status: 'active',
      summary: 'General OPD Consultation booked. Token #B-14 issued.'
    },
    {
      id: 'STEP-3',
      title: 'Prescription & Diagnostic Order',
      provider: 'Dr. Ananya Sharma',
      facility: 'PHC Rampur Pharmacy',
      date: 'Upcoming',
      status: 'upcoming',
      summary: 'Routine health panel and prescribed medication follow-up.'
    },
    {
      id: 'STEP-4',
      title: 'Health Follow-up',
      provider: 'Sunita Devi (Health Worker)',
      facility: 'Rampur Sub-Centre',
      date: 'Tomorrow, 11:00 AM',
      status: 'upcoming',
      summary: 'Vitals verification and recovery check.'
    }
  ],

  queue: [
    { token: 'B-11', patientName: 'Ganga Ram', priorityLevel: 'High', status: 'serving', waitTime: '0 min' },
    { token: 'B-12', patientName: 'Anita Sharma', priorityLevel: 'High', status: 'waiting', waitTime: '4 min' },
    { token: 'B-13', patientName: 'Suresh Patel', priorityLevel: 'Medium', status: 'waiting', waitTime: '8 min' },
    { token: 'B-14', patientName: 'Ramesh Kumar', priorityLevel: 'Medium', status: 'waiting', waitTime: '12 min' }
  ]
};

class MockStore {
  constructor() {
    // Load persisted state if exists in localStorage
    let saved = null;
    if (typeof localStorage !== 'undefined') {
      saved = localStorage.getItem('healer_state');
    }
    if (saved) {
      try {
        this.state = JSON.parse(saved);
      } catch (e) {
        this.state = JSON.parse(JSON.stringify(initialMockDB));
      }
    } else {
      this.state = JSON.parse(JSON.stringify(initialMockDB));
    }
    this.listeners = [];
  }

  save() {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('healer_state', JSON.stringify(this.state));
      } catch (e) {
        // Ignore quota errors
      }
    }
  }

  getState() {
    return this.state;
  }

  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== fn);
    };
  }

  notify() {
    this.save();
    this.listeners.forEach(fn => fn(this.state));
  }

  async initFromBackend() {
    try {
      const patientData = await fetchPatient();
      if (patientData && patientData.data) {
        this.state.patient = {
          ...this.state.patient,
          ...patientData.data
        };
      }

      const queueData = await fetchQueue();
      if (queueData && queueData.data && queueData.data.length > 0) {
        this.state.queue = queueData.data;
      }

      const journeyData = await fetchCareJourney();
      if (journeyData && journeyData.data && journeyData.data.length > 0) {
        this.state.careJourney = journeyData.data;
      }

      this.notify();
    } catch (err) {
      // Backend not running or offline, fallback to in-memory state
    }
  }

  setRole(role) {
    this.state.currentRole = role;
    this.notify();
  }

  selectPortal(portal) {
    this.state.selectedPortal = portal;
    this.state.currentRole = portal;
    this.notify();
  }

  setLanguage(langCode) {
    this.state.currentLanguage = langCode;
    this.notify();
  }

  dismissWelcomeBanner() {
    this.state.hasDismissedWelcome = true;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('healer_welcome_dismissed', 'true');
    }
    this.notify();
  }

  isWelcomeDismissed() {
    return this.state.hasDismissedWelcome || (typeof localStorage !== 'undefined' && localStorage.getItem('healer_welcome_dismissed') === 'true');
  }

  setAuthenticatedSession(token, userDetails = {}) {
    this.state.isVerified = true;
    this.state.authToken = token;
    if (userDetails.identifier) {
      if (userDetails.identifier.includes('@')) {
        this.state.userEmail = userDetails.identifier;
      } else {
        this.state.userMobile = userDetails.identifier;
      }
    }
    if (userDetails.role) {
      this.state.currentRole = userDetails.role;
      this.state.selectedPortal = userDetails.role;
    }
    this.notify();
  }

  logout() {
    this.state.isVerified = false;
    this.state.authToken = null;
    this.state.selectedPortal = 'patient';
    this.state.currentRole = 'patient';
    this.notify();
  }

  switchPortal() {
    this.state.isVerified = false;
    this.state.authToken = null;
    this.notify();
  }

  async addAppointment(facilityName, serviceName, doctorName, dateStr, timeSlot) {
    const newTokenNumber = `B-${Math.floor(Math.random() * 30) + 15}`;
    const newAppointment = {
      id: `APPT-${Date.now()}`,
      token: newTokenNumber,
      facility: facilityName || 'PHC Rampur Community Health Centre',
      service: serviceName || 'General OPD Consultation',
      doctor: doctorName || 'Dr. Ananya Sharma',
      date: dateStr || 'Today',
      time: timeSlot || '10:30 AM',
      status: 'confirmed',
      patientName: this.state.patient.name || 'Ramesh Kumar',
      isUpcoming: true
    };

    // Add to local appointments
    this.state.appointments.unshift(newAppointment);

    // Update patient active token
    this.state.patient.activeToken = newTokenNumber;
    this.state.patient.queuePosition = 3;
    this.state.patient.estimatedWaitMins = 12;

    // Add to Care Journey
    this.state.careJourney.unshift({
      id: `STEP-${Date.now()}`,
      title: 'Appointment Booked',
      provider: doctorName,
      facility: facilityName,
      date: `${dateStr}, ${timeSlot}`,
      status: 'active',
      summary: `${serviceName} confirmed. Token #${newTokenNumber} issued.`
    });

    // Add to Queue
    this.state.queue.push({
      token: newTokenNumber,
      patientName: this.state.patient.name,
      priorityLevel: 'Medium',
      status: 'waiting',
      waitTime: '12 min'
    });

    this.notify();

    // Persist to backend if accessible
    try {
      await bookAppointment({
        doctorName: doctorName,
        slotTime: timeSlot,
        facility: facilityName,
        patientName: this.state.patient.name
      });
    } catch (err) {
      // Backend request fallback is fine
    }

    return newAppointment;
  }

  cancelAppointment(apptId) {
    const appt = this.state.appointments.find(a => a.id === apptId);
    if (appt) {
      appt.status = 'cancelled';
      appt.isUpcoming = false;
      if (this.state.patient.activeToken === appt.token) {
        this.state.patient.activeToken = null;
      }
      this.notify();
    }
  }

  resetToInitial() {
    this.state = JSON.parse(JSON.stringify(initialMockDB));
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('healer_state');
      localStorage.removeItem('healer_welcome_dismissed');
    }
    this.notify();
  }
}

export const appStore = new MockStore();
