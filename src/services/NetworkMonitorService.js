/**
 * HEALER — Network Monitor Service
 * Modular Network Quality Monitor & Adaptive Controller
 * Provides simulated network telemetry, hysteresis stability delay,
 * and automatic mode adaptation (VIDEO -> AUDIO -> SMS/TEXT).
 */

export const NETWORK_PROFILES = {
  good: {
    mode: 'good',
    name: 'Good Connection (4G/5G/Fiber)',
    bandwidthMbps: 4.8,
    bandwidthDisplay: '4.8 Mbps',
    latencyMs: 28,
    latencyDisplay: '28 ms',
    packetLossPct: 0.1,
    packetLossDisplay: '0.1%',
    signalBars: 4,
    consultationType: 'video',
    badgeClass: 'badge-success',
    color: '#286B4F'
  },
  moderate: {
    mode: 'moderate',
    name: 'Low Bandwidth (3G/Poor 4G)',
    bandwidthMbps: 0.38,
    bandwidthDisplay: '380 kbps',
    latencyMs: 185,
    latencyDisplay: '185 ms',
    packetLossPct: 4.2,
    packetLossDisplay: '4.2%',
    signalBars: 2,
    consultationType: 'audio',
    badgeClass: 'badge-warning',
    color: '#D99A2B'
  },
  low: {
    mode: 'low',
    name: 'Very Low Bandwidth (2G/Edge)',
    bandwidthMbps: 0.024,
    bandwidthDisplay: '24 kbps',
    latencyMs: 820,
    latencyDisplay: '820 ms',
    packetLossPct: 24.5,
    packetLossDisplay: '24.5%',
    signalBars: 1,
    consultationType: 'sms',
    badgeClass: 'badge-danger',
    color: '#D64545'
  }
};

class NetworkMonitorService {
  constructor() {
    this.currentMode = 'good'; // 'good' | 'moderate' | 'low'
    this.targetMode = 'good';
    this.isTransitioning = false;
    this.transitionCountdown = 0;
    this.transitionTimer = null;
    this.stabilityDurationSec = 2.5; // Hysteresis buffer in seconds

    this.isAutoSimulating = false;
    this.autoSimTimer = null;
    this.autoSimStep = 0; // 0: good -> 1: moderate -> 2: low -> 3: moderate -> 4: good

    this.callDurationSec = 45; // Start with initial active call elapsed
    this.callTimer = null;
    this.isMicMuted = false;
    this.isCameraOff = false;
    this.facingMode = 'user'; // 'user' | 'environment'

    this.listeners = [];
    this.notificationHistory = [];
    this.lastNotification = null;

    // Start call timer
    this.startCallDurationTimer();
  }

  getState() {
    const profile = NETWORK_PROFILES[this.currentMode] || NETWORK_PROFILES.good;
    const targetProfile = NETWORK_PROFILES[this.targetMode] || profile;

    return {
      currentMode: this.currentMode,
      targetMode: this.targetMode,
      profile,
      targetProfile,
      isTransitioning: this.isTransitioning,
      transitionCountdown: this.transitionCountdown,
      isAutoSimulating: this.isAutoSimulating,
      callDurationSec: this.callDurationSec,
      callDurationDisplay: this.formatCallTime(this.callDurationSec),
      isMicMuted: this.isMicMuted,
      isCameraOff: this.isCameraOff,
      facingMode: this.facingMode,
      lastNotification: this.lastNotification,
      notificationHistory: this.notificationHistory
    };
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach(cb => cb(state));
  }

  formatCallTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  startCallDurationTimer() {
    if (this.callTimer) clearInterval(this.callTimer);
    this.callTimer = setInterval(() => {
      this.callDurationSec++;
      this.notify();
    }, 1000);
  }

  stopCallDurationTimer() {
    if (this.callTimer) {
      clearInterval(this.callTimer);
      this.callTimer = null;
    }
  }

  toggleMic() {
    this.isMicMuted = !this.isMicMuted;
    this.notify();
    return this.isMicMuted;
  }

  toggleCamera() {
    this.isCameraOff = !this.isCameraOff;
    this.notify();
    return this.isCameraOff;
  }

  switchCamera() {
    this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
    this.notify();
    return this.facingMode;
  }

  /**
   * Request a network quality switch with stability delay (hysteresis).
   * Prevents rapid mode flicker on temporary fluctuations.
   */
  setNetworkQuality(newMode, immediate = false) {
    if (!NETWORK_PROFILES[newMode]) return;
    if (this.currentMode === newMode && !this.isTransitioning) return;

    this.targetMode = newMode;

    if (immediate || this.stabilityDurationSec <= 0) {
      this.applyModeChange(newMode);
      return;
    }

    // Begin stability verification countdown
    this.isTransitioning = true;
    this.transitionCountdown = 2; // 2 seconds countdown

    if (this.transitionTimer) clearInterval(this.transitionTimer);

    this.notify();

    this.transitionTimer = setInterval(() => {
      this.transitionCountdown--;
      if (this.transitionCountdown <= 0) {
        clearInterval(this.transitionTimer);
        this.transitionTimer = null;
        this.applyModeChange(this.targetMode);
      } else {
        this.notify();
      }
    }, 1000);
  }

  applyModeChange(mode) {
    const prevMode = this.currentMode;
    this.currentMode = mode;
    this.targetMode = mode;
    this.isTransitioning = false;
    this.transitionCountdown = 0;

    let reason = '';
    let alertType = 'info';

    if (prevMode === 'good' && mode === 'moderate') {
      reason = 'Network is weak. Switching to audio to maintain your consultation.';
      alertType = 'warning';
    } else if ((prevMode === 'good' || prevMode === 'moderate') && mode === 'low') {
      reason = 'Network is very weak. Switching to text consultation.';
      alertType = 'danger';
    } else if (prevMode === 'low' && mode === 'moderate') {
      reason = 'Network improved. Reconnecting audio consultation channel.';
      alertType = 'info';
    } else if ((prevMode === 'low' || prevMode === 'moderate') && mode === 'good') {
      reason = 'High-speed connection restored. Resuming HD video consultation.';
      alertType = 'success';
    } else {
      reason = `Network quality updated to ${mode.toUpperCase()}.`;
    }

    this.lastNotification = {
      message: reason,
      type: alertType,
      timestamp: new Date().toLocaleTimeString(),
      fromMode: prevMode,
      toMode: mode
    };

    this.notificationHistory.unshift(this.lastNotification);
    if (this.notificationHistory.length > 5) this.notificationHistory.pop();

    this.notify();
  }

  /**
   * Toggle automated simulation cycle for live judge presentations.
   * Auto cycles: Good (8s) -> Moderate (8s) -> Low (8s) -> Moderate (8s) -> Good (8s)...
   */
  toggleAutoSimulation() {
    this.isAutoSimulating = !this.isAutoSimulating;

    if (this.isAutoSimulating) {
      this.autoSimStep = 0;
      this.runNextAutoSimStep();
    } else {
      if (this.autoSimTimer) {
        clearTimeout(this.autoSimTimer);
        this.autoSimTimer = null;
      }
      this.notify();
    }
  }

  runNextAutoSimStep() {
    if (!this.isAutoSimulating) return;

    const sequence = ['good', 'moderate', 'low', 'moderate'];
    const currentTarget = sequence[this.autoSimStep % sequence.length];
    
    this.setNetworkQuality(currentTarget);
    this.autoSimStep++;

    this.autoSimTimer = setTimeout(() => {
      this.runNextAutoSimStep();
    }, 9000); // 9 seconds interval per demo mode phase
  }

  reset() {
    if (this.transitionTimer) clearInterval(this.transitionTimer);
    if (this.autoSimTimer) clearTimeout(this.autoSimTimer);
    this.currentMode = 'good';
    this.targetMode = 'good';
    this.isTransitioning = false;
    this.isAutoSimulating = false;
    this.callDurationSec = 45;
    this.isMicMuted = false;
    this.isCameraOff = false;
    this.notify();
  }
}

export const networkMonitorService = new NetworkMonitorService();
