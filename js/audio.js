// Web Audio API Synthesizer & Speech Synthesis for MathLand Adventure

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.speechEnabled = true;
    this.audioPlayer = new Audio();
    this.currentVoiceSession = 0;
    this.audioManifest = null;
    this.initAudioContext();
    this.loadManifest();
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

  // Stop any active speech or voice synthesis immediately
  stopVoice() {
    this.currentVoiceSession = (this.currentVoiceSession || 0) + 1;
    if (this.audioPlayer) {
      try {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
        this.audioPlayer.removeAttribute('src');
        this.audioPlayer.onended = null;
        this.audioPlayer.onerror = null;
      } catch (e) {}
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  // Load pre-rendered audio manifest for 0ms instant playback
  async loadManifest() {
    if (this.audioManifest) return;
    try {
      const res = await fetch('audio/tts/manifest.json');
      if (res.ok) {
        this.audioManifest = await res.json();
      }
    } catch (e) {
      this.audioManifest = {};
    }
  }

  // Text-To-Speech Read-Aloud Helper - Giọng Nữ Miền Nam Việt Nam (Cô Hoài My)
  // Đảm bảo: KHÔNG trễ, KHÔNG xen lấn, KHÔNG lặp lại, đọc to rõ trọn vẹn
  speak(text, onEndCallback = null) {
    if (!this.speechEnabled) {
      if (onEndCallback) onEndCallback();
      return;
    }

    // 1. Dừng ngay lập tức mọi âm thanh giọng đọc đang phát trước đó (Không bao giờ xen lấn!)
    this.stopVoice();

    // Làm sạch chuỗi: loại bỏ icon/emoji và ký tự markdown
    const cleanText = text
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}]/gu, '')
      .replace(/[\{\}\[\]\*\#]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      if (onEndCallback) onEndCallback();
      return;
    }

    if (!this.audioPlayer) {
      this.audioPlayer = new Audio();
    }

    const sessionId = this.currentVoiceSession;
    let finished = false;

    const onComplete = () => {
      if (this.currentVoiceSession !== sessionId) return; // Stale session, bỏ qua
      if (!finished) {
        finished = true;
        this.audioPlayer.onended = null;
        this.audioPlayer.onerror = null;
        if (onEndCallback) onEndCallback();
      }
    };

    // 2. Tìm tệp âm thanh tĩnh đã kết xuất sẵn (Độ trễ = 0ms!)
    let audioSrc = null;
    if (this.audioManifest) {
      if (this.audioManifest[cleanText]) {
        audioSrc = this.audioManifest[cleanText];
      } else {
        // Chuẩn hóa tên riêng thành 'bé' để dùng âm thanh ngọt ngào của cô giáo đã thu sẵn
        const normalized = cleanText
          .replace(/Bé\s+[^\s\,\!\.\?]+/gi, 'Bé')
          .replace(/[^\s\,\!\.\?]+\s+của cô/gi, 'Bé của cô')
          .replace(/[^\s\,\!\.\?]+\s+ơi/gi, 'bé ơi')
          .replace(/[^\s\,\!\.\?]+\s+nha/gi, 'bé nha')
          .replace(/\s+/g, ' ')
          .trim();
        if (this.audioManifest[normalized]) {
          audioSrc = this.audioManifest[normalized];
        }
      }
    }

    // Nếu không có trong manifest thì gọi endpoint dynamic /api/tts
    if (!audioSrc) {
      audioSrc = `/api/tts?text=${encodeURIComponent(cleanText)}`;
    }

    this.audioPlayer.src = audioSrc;
    this.audioPlayer.volume = 1.0;
    this.audioPlayer.playbackRate = 1.0;
    this.audioPlayer.onended = onComplete;

    this.audioPlayer.onerror = () => {
      if (this.currentVoiceSession !== sessionId) return;
      console.warn('Không phát được âm thanh từ server, kết thúc an toàn');
      onComplete();
    };

    const playPromise = this.audioPlayer.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        // Nếu bị huỷ bởi lượt đọc mới (AbortError) thì bỏ qua
        if (this.currentVoiceSession !== sessionId) return;
        if (err.name === 'AbortError') return;
        console.warn('Audio play error:', err.name);
        onComplete();
      });
    }
  }
}

export const sounds = new SoundManager();
