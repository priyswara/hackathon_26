/**
 * Central In-Memory Mock Database & Mutation Helpers
 * Rural Healthcare Access Platform
 */

import { fetchPatient, fetchQueue, fetchCareJourney, bookAppointment, addCareJourneyEvent } from '../services/api.js';

export const initialMockDB = {
  currentRole: 'patient', // 'patient' | 'health_worker' | 'doctor' | 'facility'
  selectedPortal: 'patient', // 'patient' | 'health_worker' | 'doctor' | 'facility'
  isVerified: false,
  userMobile: '+91 98765 43210',
  currentLanguage: 'en',
  networkMode: 'good', // 'good' | 'moderate' | 'low'
  
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
    queuePosition: 4,
    estimatedWaitMins: 14,
    priorityLevel: 'Medium'
  },
  
  queue: [
    { token: 'B-11', patientName: 'Ganga Ram', priorityLevel: 'High', status: 'serving', waitTime: '0 min' },
    { token: 'B-12', patientName: 'Anita Sharma', priorityLevel: 'High', status: 'waiting', waitTime: '4 min' },
    { token: 'B-13', patientName: 'Suresh Patel', priorityLevel: 'Medium', status: 'waiting', waitTime: '9 min' },
    { token: 'B-14', patientName: 'Ramesh Kumar', priorityLevel: 'Medium', status: 'waiting', waitTime: '14 min' },
    { token: 'B-15', patientName: 'Pooja Devi', priorityLevel: 'Low', status: 'waiting', waitTime: '20 min' },
    { token: 'B-16', patientName: 'Mohan Lal', priorityLevel: 'Low', status: 'waiting', waitTime: '26 min' }
  ],
  
  doctors: [
    {
      id: 'DOC-101',
      name: 'Dr. Ananya Sharma',
      specialty: 'General Medicine',
      experience: '8 Yrs Exp',
      location: 'PHC Rampur Tele-Hub',
      rating: 4.9,
      avatarInitials: 'AS',
      status: 'Online',
      availableSlots: ['10:30 AM', '11:15 AM', '02:00 PM', '03:30 PM']
    },
    {
      id: 'DOC-102',
      name: 'Dr. Rajiv Verma',
      specialty: 'Pediatrics / Child Specialist',
      experience: '12 Yrs Exp',
      location: 'CHC Kotra Rural Unit',
      rating: 4.8,
      avatarInitials: 'RV',
      status: 'Online',
      availableSlots: ['11:00 AM', '01:30 PM', '04:00 PM']
    },
    {
      id: 'DOC-103',
      name: 'Dr. Sneha Reddy',
      specialty: 'Obstetrics & Gynecology (Maternal)',
      experience: '10 Yrs Exp',
      location: 'District Tele-OPD',
      rating: 4.9,
      avatarInitials: 'SR',
      status: 'Busy (In Consult)',
      availableSlots: ['02:30 PM', '04:30 PM']
    }
  ],
  
  facilities: [
    {
      id: 'FAC-01',
      name: 'PHC Rampur Community Health Centre',
      type: 'Primary Health Centre',
      distance: '2.4 km',
      doctorsCount: 3,
      bedsTotal: 12,
      bedsOccupied: 8,
      icuAvailable: 2,
      todayFootfall: 68,
      avgWaitMins: 18,
      medicinesAvailableRate: '88%'
    },
    {
      id: 'FAC-02',
      name: 'CHC Kotra Block Hospital',
      type: 'Community Health Centre',
      distance: '14 km',
      doctorsCount: 7,
      bedsTotal: 30,
      bedsOccupied: 24,
      icuAvailable: 4,
      todayFootfall: 142,
      avgWaitMins: 32,
      medicinesAvailableRate: '92%'
    },
    {
      id: 'FAC-03',
      name: 'Shivpuri District Hospital',
      type: 'Tertiary Referral Centre',
      distance: '38 km',
      doctorsCount: 22,
      bedsTotal: 150,
      bedsOccupied: 128,
      icuAvailable: 12,
      todayFootfall: 480,
      avgWaitMins: 45,
      medicinesAvailableRate: '96%'
    }
  ],
  
  careJourney: [
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
  ],
  
  medicines: [
    {
      id: 'MED-1',
      name: 'Paracetamol 650mg Tablets',
      category: 'Analgesic / Antipyretic',
      dosage: '1 Tab TDS after meals',
      stockStatus: 'Available',
      stockUnits: '420 strips',
      facility: 'PHC Rampur Pharmacy',
      updatedMinsAgo: 15
    },
    {
      id: 'MED-2',
      name: 'Azithromycin 500mg',
      category: 'Broad-spectrum Antibiotic',
      dosage: '1 Tab OD for 3 days',
      stockStatus: 'Low Stock',
      stockUnits: '18 strips remaining',
      facility: 'PHC Rampur Pharmacy',
      updatedMinsAgo: 8
    },
    {
      id: 'MED-3',
      name: 'ORS Sachets (WHO Formula)',
      category: 'Oral Rehydration Salts',
      dosage: 'Mix in 1L clean water',
      stockStatus: 'Available',
      stockUnits: '850 packs',
      facility: 'PHC Rampur Pharmacy',
      updatedMinsAgo: 30
    },
    {
      id: 'MED-4',
      name: 'Metformin 500mg SR',
      category: 'Anti-Diabetic',
      dosage: '1 Tab BD with meals',
      stockStatus: 'Available',
      stockUnits: '240 strips',
      facility: 'PHC Rampur Pharmacy',
      updatedMinsAgo: 45
    },
    {
      id: 'MED-5',
      name: 'Iron & Folic Acid (IFA) Tablets',
      category: 'Maternal Nutrition',
      dosage: '1 Tab daily',
      stockStatus: 'Available',
      stockUnits: '600 strips',
      facility: 'PHC Rampur Pharmacy',
      updatedMinsAgo: 12
    },
    {
      id: 'MED-6',
      name: 'Amoxicillin + Clavulanic Acid 625mg',
      category: 'Antibiotic',
      dosage: '1 Tab BD',
      stockStatus: 'Unavailable',
      stockUnits: '0 strips (Restocking)',
      facility: 'PHC Rampur Pharmacy',
      updatedMinsAgo: 5
    }
  ],
  
  diagnostics: [
    {
      id: 'DIAG-1',
      testName: 'Complete Blood Count (CBC)',
      purpose: 'Fever, infection, hemoglobin levels',
      facility: 'PHC Rampur Diagnostic Lab',
      slotTime: 'Today, 11:30 AM',
      reportTurnaround: '2 Hours',
      cost: '₹0 (Free under PM-JAY)',
      status: 'Available'
    },
    {
      id: 'DIAG-2',
      testName: 'Rapid Malaria Antigen Test',
      purpose: 'Malarial parasite detection in 15 mins',
      facility: 'PHC Rampur Diagnostic Lab',
      slotTime: 'Today, 12:00 PM',
      reportTurnaround: '15 Mins',
      cost: '₹0 (Free under NVBDCP)',
      status: 'Available'
    },
    {
      id: 'DIAG-3',
      testName: 'Sputum Smear Microscopy (TB Check)',
      purpose: 'Tuberculosis diagnostic screening',
      facility: 'CHC Kotra Block Lab',
      slotTime: 'Today, 02:00 PM',
      reportTurnaround: '24 Hours',
      cost: '₹0 (Free under NTEP)',
      status: 'Available'
    },
    {
      id: 'DIAG-4',
      testName: 'Digital Chest X-Ray',
      purpose: 'Pneumonia / Respiratory imaging',
      facility: 'CHC Kotra Block Lab',
      slotTime: 'Tomorrow, 10:00 AM',
      reportTurnaround: '1 Hour',
      cost: '₹0 (Free under PM-JAY)',
      status: 'Available'
    }
  ],
  
  followUps: [
    {
      id: 'FU-01',
      title: 'ASHA Home Check-up & Vitals',
      workerName: 'Sunita Devi (ASHA)',
      workerPhone: '+91 94250 88219',
      dueDate: 'Tomorrow, 11:00 AM',
      purpose: 'Blood Pressure & Post-Consult adherence review',
      status: 'Confirmed'
    },
    {
      id: 'FU-02',
      title: 'Maternal ANC Second Trimester Check',
      workerName: 'Meena ANM Worker',
      workerPhone: '+91 98261 77310',
      dueDate: 'Friday, 10:00 AM',
      purpose: 'Ultrasound screening at CHC Kotra',
      status: 'Scheduled'
    },
    {
      id: 'FU-03',
      title: 'Diabetes HbA1c Quarterly Follow-up',
      workerName: 'Dr. Ananya Sharma',
      workerPhone: '+91 98765 11223',
      dueDate: 'Next Month, 15th Sep',
      purpose: 'Blood sugar stability review',
      status: 'Upcoming'
    }
  ],
  
  healthWorkerRoster: [
    {
      id: 'HW-P1',
      name: 'Kavita Bai',
      age: 26,
      category: 'High-Risk Maternal (32 Weeks)',
      vitals: 'BP 142/96 (Elevated)',
      village: 'Rampur Sub-centre',
      lastVisit: '2 days ago',
      urgency: 'high',
      status: 'Visit Required'
    },
    {
      id: 'HW-P2',
      name: 'Ramesh Kumar',
      age: 42,
      category: 'Acute Viral Fever & Cough',
      vitals: 'Temp 102.2°F, SpO2 97%',
      village: 'Rampur Kalan',
      lastVisit: 'Triage Today',
      urgency: 'medium',
      status: 'Teleconsult Active'
    },
    {
      id: 'HW-P3',
      name: 'Devki Nandan',
      age: 68,
      category: 'Hypertension & Chronic Care',
      vitals: 'BP 130/84, Adherence 95%',
      village: 'Kotra Tola',
      lastVisit: '1 week ago',
      urgency: 'low',
      status: 'Routine Sync'
    }
  ],
  
  schemes: [
    {
      id: 'SCH-1',
      name: 'Ayushman Bharat PM-JAY',
      coverage: '₹5,00,000 / Family / Year',
      status: 'Active & Verified',
      color: '#6C3CE9',
      benefits: ['Free cashless hospitalization', 'Covers secondary & tertiary care', 'Over 1,949 medical procedures']
    },
    {
      id: 'SCH-2',
      name: 'Janani Suraksha Yojana (JSY)',
      coverage: '₹1,400 Cash Incentive for Institutional Delivery',
      status: 'Eligible (Maternal)',
      color: '#00D2A0',
      benefits: ['Free transport by Janani Express', 'Free diet during hospital stay', 'Free drugs and consumables']
    },
    {
      id: 'SCH-3',
      name: 'Pradhan Mantri National Dialysis Program',
      coverage: '100% Free Hemodialysis at CHC/District Level',
      status: 'Active',
      color: '#E88C1F',
      benefits: ['Eliminates out-of-pocket travel expenses', 'Nearest center at CHC Kotra']
    }
  ],
  
  chatMessages: [
    {
      sender: 'doctor',
      text: 'Namaste Ramesh ji. I am Dr. Ananya. I see you reported a 102°F fever with cough in the triage system.',
      time: '10:31 AM'
    },
    {
      sender: 'patient',
      text: 'Yes doctor. It started 2 days ago with body ache and mild shivering.',
      time: '10:32 AM'
    },
    {
      sender: 'doctor',
      text: 'Understood. Are you experiencing any chest heaviness or breathing difficulty?',
      time: '10:33 AM'
    },
    {
      sender: 'patient',
      text: 'No breathing difficulty doctor, just weakness and fever.',
      time: '10:33 AM'
    }
  ]
};

// Global Store holding application state
export class MockStore {
  constructor() {
    this.state = JSON.parse(JSON.stringify(initialMockDB));
    this.listeners = [];
  }
  
  getState() {
    return this.state;
  }
  
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  notify() {
    this.listeners.forEach(l => l(this.state));
  }
  
  setRole(role) {
    this.state.currentRole = role;
    this.state.selectedPortal = role;
    this.notify();
  }
  
  selectPortal(portalId) {
    this.state.selectedPortal = portalId;
    this.notify();
  }

  setMobileNumber(mobile) {
    this.state.userMobile = mobile;
    this.notify();
  }

  verifyOTP(code) {
    if (code === '123456') {
      this.state.isVerified = true;
      this.state.currentRole = this.state.selectedPortal;
      this.notify();
      return true;
    }
    return false;
  }

  logout() {
    this.state.isVerified = false;
    this.notify();
  }

  switchPortal() {
    this.state.isVerified = false;
    this.notify();
  }
  
  setLanguage(langCode) {
    this.state.currentLanguage = langCode;
    this.notify();
  }
  
  setNetworkMode(mode) {
    this.state.networkMode = mode;
    this.notify();
  }

  // Load latest state from backend SQLite database
  async initFromBackend() {
    try {
      const [patientData, queueData, journeyData] = await Promise.all([
        fetchPatient(),
        fetchQueue(),
        fetchCareJourney()
      ]);

      let updated = false;

      if (patientData) {
        this.state.patient = {
          ...this.state.patient,
          ...patientData
        };
        updated = true;
      }

      if (queueData && Array.isArray(queueData) && queueData.length > 0) {
        this.state.queue = queueData;
        updated = true;
      }

      if (journeyData && Array.isArray(journeyData) && journeyData.length > 0) {
        this.state.careJourney = journeyData;
        updated = true;
      }

      if (updated) {
        console.log('✅ Loaded application state from backend database');
        this.notify();
      }
    } catch (error) {
      console.warn('⚠️ [Store] Using local mock state as fallback:', error.message);
    }
  }
  
  async addAppointment(doctorName, slotTime, facility) {
    try {
      // 1. Send appointment to backend API
      const response = await bookAppointment({
        doctorName,
        slotTime,
        facility: facility || 'PHC Rampur Tele-Hub',
        patientName: this.state.patient.name
      });

      if (response && response.success && response.data) {
        const { token, patient } = response.data;
        
        // Update patient info from backend
        if (patient) {
          this.state.patient = {
            ...this.state.patient,
            ...patient
          };
        } else {
          this.state.patient.activeToken = token;
          this.state.patient.queuePosition = 3;
          this.state.patient.estimatedWaitMins = 10;
        }

        // Fetch refreshed queue & care journey from backend
        const [freshQueue, freshJourney] = await Promise.all([
          fetchQueue(),
          fetchCareJourney()
        ]);

        if (freshQueue) this.state.queue = freshQueue;
        if (freshJourney) this.state.careJourney = freshJourney;

        this.notify();
        return token;
      }
    } catch (apiError) {
      console.warn('⚠️ [Store] Backend API call failed, falling back to local memory:', apiError.message);
    }

    // Fallback in-memory logic if backend is unavailable
    const newTokenNumber = `B-${Math.floor(Math.random() * 20) + 20}`;
    this.state.patient.activeToken = newTokenNumber;
    this.state.patient.queuePosition = 3;
    this.state.patient.estimatedWaitMins = 10;
    
    // Add to care journey
    this.state.careJourney.unshift({
      id: `STEP-${Date.now()}`,
      title: `Teleconsultation Booked (${doctorName})`,
      provider: doctorName,
      facility: facility || 'PHC Rampur Tele-Hub',
      date: `Today, ${slotTime}`,
      status: 'active',
      summary: `Confirmed slot at ${slotTime}. Token #${newTokenNumber} generated.`
    });
    
    // Push into queue
    this.state.queue.push({
      token: newTokenNumber,
      patientName: `${this.state.patient.name}`,
      priorityLevel: this.state.patient.priorityLevel || 'Medium',
      status: 'waiting',
      waitTime: '10 min'
    });
    
    this.notify();
    return newTokenNumber;
  }
  
  async submitTriageResult(priority, symptomsList) {
    this.state.patient.priorityLevel = priority;
    const summaryText = `Symptoms: ${symptomsList.join(', ')}. Urgency Score: ${priority} Priority.`;
    
    const localStepId = `STEP-${Date.now()}`;
    this.state.careJourney.unshift({
      id: localStepId,
      title: 'Digital Smart Triage Completed',
      provider: 'AI Decision Engine',
      facility: 'GraminArogya App',
      date: 'Just now',
      status: 'completed',
      summary: summaryText
    });
    this.notify();

    // Persist to backend asynchronously
    try {
      await addCareJourneyEvent({
        id: localStepId,
        title: 'Digital Smart Triage Completed',
        provider: 'AI Decision Engine',
        facility: 'GraminArogya App',
        date: 'Just now',
        status: 'completed',
        summary: summaryText
      });
    } catch (err) {
      console.warn('⚠️ [Store] Could not persist triage event to backend:', err.message);
    }
  }
  
  sendChatMessage(text) {
    const now = new Date();
    const timeStr = `${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
    
    this.state.chatMessages.push({
      sender: 'patient',
      text: text,
      time: timeStr
    });
    this.notify();
    
    // Auto mock doctor response after 1.2s
    setTimeout(() => {
      this.state.chatMessages.push({
        sender: 'doctor',
        text: 'I have reviewed your symptoms. I am ordering a Complete Blood Count (CBC) test at PHC Rampur and prescribing Paracetamol 650mg. Our ASHA worker Sunita will visit tomorrow for a follow-up.',
        time: timeStr
      });
      this.notify();
    }, 1200);
  }
  
  async bookDiagnosticTest(testName, facility) {
    const localStepId = `STEP-${Date.now()}`;
    const summaryText = `Token confirmed for ${testName}. Results will sync with your ABHA ID.`;

    this.state.careJourney.unshift({
      id: localStepId,
      title: `Diagnostic Booked: ${testName}`,
      provider: 'PHC Diagnostic Unit',
      facility: facility,
      date: 'Today, 11:30 AM',
      status: 'active',
      summary: summaryText
    });
    this.notify();

    // Persist to backend asynchronously
    try {
      await addCareJourneyEvent({
        id: localStepId,
        title: `Diagnostic Booked: ${testName}`,
        provider: 'PHC Diagnostic Unit',
        facility: facility,
        date: 'Today, 11:30 AM',
        status: 'active',
        summary: summaryText
      });
    } catch (err) {
      console.warn('⚠️ [Store] Could not persist diagnostic event to backend:', err.message);
    }
  }
  
  resetToInitial() {
    this.state = JSON.parse(JSON.stringify(initialMockDB));
    this.notify();
  }
}

export const appStore = new MockStore();
