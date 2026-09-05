// Web Audio API Synthesizer & Speech Synthesis for MathLand Adventure

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.speechEnabled = true;
    this.initAudioContext();
  }

  initAudioContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  toggleSpeech() {
    this.speechEnabled = !this.speechEnabled;
    if (!this.speechEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    return this.speechEnabled;
  }

  // Play bubbly tap / pop sound
  playPop() {
    if (this.muted) return;
    this.initAudioContext();
    this.resume();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';

      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      console.warn('Audio error', e);
    }
  }

  // Play high joyful correct chime (C5 -> E5 -> G5)
  playCorrect() {
    if (this.muted) return;
    this.initAudioContext();
    this.resume();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.26);
    });
  }

  // Gentle soft boing for incorrect (kid friendly, not punishing)
  playWrong() {
    if (this.muted) return;
    this.initAudioContext();
    this.resume();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';

      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.22);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.24);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.warn('Audio error', e);
    }
  }

  // Celebratory victory fanfare arpeggio
  playFanfare() {
    if (this.muted) return;
    this.initAudioContext();
    this.resume();
    if (!this.ctx) return;

    const chord = [
      { f: 523.25, t: 0 },
      { f: 659.25, t: 0.1 },
      { f: 783.99, t: 0.2 },
      { f: 1046.50, t: 0.3 },
      { f: 1046.50, t: 0.45 },
      { f: 1046.50, t: 0.6 }
    ];

    const now = this.ctx.currentTime;
    chord.forEach(item => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, now + item.t);

      gain.gain.setValueAtTime(0.25, now + item.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + item.t + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + item.t);
      osc.stop(now + item.t + 0.36);
    });
  }

  // Sound of firework rocket launch & burst
  playFireworkBurst() {
    if (this.muted) return;
    this.initAudioContext();
    this.resume();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // 1. Whistle rise
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.21);

      // 2. Boom explosion after rise
      setTimeout(() => {
        if (!this.ctx || this.muted) return;
        const boomTime = this.ctx.currentTime;
        const noise = this.ctx.createBufferSource();
        const bufferSize = this.ctx.sampleRate * 0.4;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
        }
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, boomTime);
        filter.frequency.linearRampToValueAtTime(80, boomTime + 0.35);

        const boomGain = this.ctx.createGain();
        boomGain.gain.setValueAtTime(0.4, boomTime);
        boomGain.gain.exponentialRampToValueAtTime(0.01, boomTime + 0.38);

        noise.connect(filter);
        filter.connect(boomGain);
        boomGain.connect(this.ctx.destination);
        noise.start(boomTime);
      }, 180);
    } catch (e) {
      console.warn('Firework audio error', e);
    }
  }

  // Sparkling magical chime for flowers & stars
  playSparkle() {
    if (this.muted) return;
    this.initAudioContext();
    this.resume();
    if (!this.ctx) return;

    const pitches = [1046.50, 1318.51, 1567.98, 2093.00, 2637.02];
    const now = this.ctx.currentTime;
    pitches.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + idx * 0.04);
      gain.gain.setValueAtTime(0.12, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.2);
    });
  }

  // Text-To-Speech Read-Aloud Helper - Giọng Nữ Miền Nam Việt Nam
  speak(text) {
    if (!this.speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    
    // Tinh chỉnh giọng nữ ngọt ngào, ấm áp, tốc độ vừa phải cho bé miền Nam
    utterance.rate = 0.93; // Tốc độ hơi chậm, rõ ràng cho bé lớp 1
    utterance.pitch = 1.25; // Cao độ thanh thoát, nữ tính, ngọt ngào

    // Tìm kiếm giọng nữ tiếng Việt (ưu tiên giọng Nam/giọng Nữ miền Nam như HoaiMy, Linh, Mai, Google Tiếng Việt)
    const voices = window.speechSynthesis.getVoices();
    const southernFemaleVoice = voices.find(v => 
      (v.lang.startsWith('vi') || v.lang.includes('VIE')) && 
      (v.name.toLowerCase().includes('hoaimy') || 
       v.name.toLowerCase().includes('linh') || 
       v.name.toLowerCase().includes('mai') || 
       v.name.toLowerCase().includes('female') ||
       v.name.toLowerCase().includes('google'))
    ) || voices.find(v => v.lang.startsWith('vi') || v.lang.includes('VIE'));

    if (southernFemaleVoice) {
      utterance.voice = southernFemaleVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
}

export const sounds = new SoundManager();
