// Main Application Orchestrator for MathLand Adventure
import { sounds } from './audio.js';
import { store } from './state.js';
import { mascot } from './mascot.js';
import { fireConfetti, showToast, renderStickerAlbum } from './rewards.js';

import { generateCountingQuestion, renderCountingStage } from './games/counting.js';
import { generateAdditionQuestion, renderAdditionStage } from './games/addition.js';
import { generateSubtractionQuestion, renderSubtractionStage } from './games/subtraction.js';
import { generateBondsQuestion, renderBondsStage } from './games/bonds.js';
import { generateCompareQuestion, renderCompareStage } from './games/compare.js';
import { generateShapesQuestion, renderShapesStage } from './games/shapes.js';
import { generateClockQuestion, renderClockStage } from './games/clock.js';
import { generateMeasurementQuestion, renderMeasurementStage } from './games/measurement.js';
import { generateWordProblemQuestion, renderWordProblemStage } from './games/wordproblems.js';
import { generateSpatialQuestion, renderSpatialStage } from './games/spatial.js';
import { generateTensQuestion, renderTensStage } from './games/tens.js';

const TOTAL_QUESTIONS_PER_ROUND = 5;

const ZONES = {
  counting: {
    id: 'counting',
    name: 'Các Số 0–10 & Khung 10 Ô',
    icon: '⭐️',
    desc: 'Đếm đồ vật đáng yêu & làm quen khung 10 ô nhé!',
    colorClass: 'card-counting',
    generator: generateCountingQuestion,
    renderer: renderCountingStage
  },
  compare: {
    id: 'compare',
    name: 'Nhiều Hơn, Ít Hơn & So Sánh Số',
    icon: '🐊',
    desc: 'Giúp bạn cá sấu ngoạm số lớn hơn: >, =, < !',
    colorClass: 'card-compare',
    generator: generateCompareQuestion,
    renderer: renderCompareStage
  },
  bonds: {
    id: 'bonds',
    name: 'Sơ Đồ Tách - Gộp (Mấy và Mấy)',
    icon: '🧩',
    desc: 'Điền số còn thiếu vào sơ đồ tròn như thám tử!',
    colorClass: 'card-bonds',
    generator: generateBondsQuestion,
    renderer: renderBondsStage
  },
  shapes: {
    id: 'shapes',
    name: 'Hình Phẳng & Xếp Hình',
    icon: '🔷',
    desc: 'Hình vuông, tròn, tam giác, chữ nhật & toa tàu quy luật!',
    colorClass: 'card-shapes',
    generator: generateShapesQuestion,
    renderer: renderShapesStage
  },
  addition: {
    id: 'addition',
    name: 'Phép Cộng Trong Phạm Vi 10',
    icon: '➕',
    desc: 'Cùng chú ếch nhảy tia số & gộp các nhóm lại!',
    colorClass: 'card-addition',
    generator: generateAdditionQuestion,
    renderer: renderAdditionStage
  },
  subtraction: {
    id: 'subtraction',
    name: 'Phép Trừ Trong Phạm Vi 10',
    icon: '➖',
    desc: 'Bấm nổ bóng bay & đếm số lượng còn lại!',
    colorClass: 'card-subtraction',
    generator: generateSubtractionQuestion,
    renderer: renderSubtractionStage
  },
  spatial: {
    id: 'spatial',
    name: 'Khối Lập Phương & Vị Trí Không Gian',
    icon: '📦',
    desc: 'Khối lập phương, khối hộp chữ nhật & Trên/Dưới, Trái/Phải!',
    colorClass: 'card-spatial',
    generator: generateSpatialQuestion,
    renderer: renderSpatialStage
  },
  tens: {
    id: 'tens',
    name: 'Số Có Hai Chữ Số & Số Tròn Chục',
    icon: '🔢',
    desc: 'Làm quen 1 chục = 10, các số từ 11 đến 20 & số tròn chục!',
    colorClass: 'card-tens',
    generator: generateTensQuestion,
    renderer: renderTensStage
  },
  measurement: {
    id: 'measurement',
    name: 'Dài Hơn - Ngắn Hơn & Đo cm',
    icon: '📏',
    desc: 'So sánh chiều dài & dùng thước đo xăng-ti-mét!',
    colorClass: 'card-measurement',
    generator: generateMeasurementQuestion,
    renderer: renderMeasurementStage
  },
  clock: {
    id: 'clock',
    name: 'Đồng Hồ & Thời Gian Trong Ngày',
    icon: '⏰',
    desc: 'Xem giờ đúng, giờ rưỡi & các buổi sáng, trưa, chiều, tối!',
    colorClass: 'card-clock',
    generator: generateClockQuestion,
    renderer: renderClockStage
  },
  wordproblems: {
    id: 'wordproblems',
    name: 'Giải Toán Có Lời Văn',
    icon: '📖',
    desc: 'Đố vui bài toán thực tế kèm hình ảnh sinh động!',
    colorClass: 'card-wordproblems',
    generator: generateWordProblemQuestion,
    renderer: renderWordProblemStage
  }
};

class App {
  constructor() {
    this.currentZone = null;
    this.questionIndex = 0;
    this.currentQuestion = null;
    this.answeringLocked = false;
  }

  init() {
    this.updateHeaderStats();
    mascot.init();
    this.bindGlobalEvents();
    this.initPlayerNamePrompt();
    this.renderHub();
  }

  updateHeaderStats() {
    const starCountEl = document.getElementById('header-stars-count');
    if (starCountEl) starCountEl.textContent = store.getStars();

    const stickerCountEl = document.getElementById('header-stickers-count');
    if (stickerCountEl) stickerCountEl.textContent = `${store.getStickerCount()} Nhãn dán`;

    const playerNameEl = document.getElementById('header-player-name');
    if (playerNameEl) playerNameEl.textContent = `Bé ${store.getPlayerName()}`;

    const playerAvatarEl = document.getElementById('header-player-avatar');
    if (playerAvatarEl) playerAvatarEl.textContent = store.getPlayerAvatar();
  }

  initPlayerNamePrompt() {
    const nameModal = document.getElementById('name-modal');
    const nameInput = document.getElementById('player-name-input');
    const submitBtn = document.getElementById('name-submit-btn');
    const avatarBtns = document.querySelectorAll('.avatar-pick-btn');
    let selectedAvatar = store.getPlayerAvatar() || '⭐️';

    avatarBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playPop();
        avatarBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedAvatar = btn.getAttribute('data-avatar');
      });
    });

    const saveName = () => {
      const val = nameInput.value.trim();
      const finalName = val.length > 0 ? val : 'Teppy';
      store.setPlayerName(finalName, selectedAvatar);
      this.updateHeaderStats();
      nameModal.classList.remove('open');
      sounds.playPop();
      mascot.say(`Chào bé ${finalName} nghen! Cô và bạn Cú Pip rất vui được học cùng bé!`, true);
    };

    if (submitBtn) {
      submitBtn.addEventListener('click', saveName);
    }

    if (nameInput) {
      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveName();
      });
    }

    // Profile button allows changing name anytime
    const profileBtn = document.getElementById('player-profile-btn');
    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        sounds.playPop();
        nameInput.value = store.getPlayerName();
        nameModal.classList.add('open');
        setTimeout(() => nameInput.focus(), 200);
      });
    }

    // If first visit and has no custom name, prompt modal!
    if (!store.hasCustomName()) {
      setTimeout(() => {
        nameModal.classList.add('open');
        nameInput.value = '';
        setTimeout(() => nameInput.focus(), 250);
      }, 400);
    }
  }

  bindGlobalEvents() {
    // Brand home link
    const brandBtn = document.getElementById('brand-btn');
    if (brandBtn) {
      brandBtn.addEventListener('click', () => {
        sounds.playPop();
        this.renderHub();
      });
    }

    // Sticker Album Modal triggers
    const stickerBtn = document.getElementById('stickers-modal-btn');
    const stickerModal = document.getElementById('sticker-modal');
    const stickerCloseBtn = document.getElementById('sticker-modal-close');

    if (stickerBtn && stickerModal) {
      stickerBtn.addEventListener('click', () => {
        sounds.playPop();
        renderStickerAlbum();
        stickerModal.classList.add('open');
      });
    }

    if (stickerCloseBtn && stickerModal) {
      stickerCloseBtn.addEventListener('click', () => {
        sounds.playPop();
        stickerModal.classList.remove('open');
      });
    }

    // Audio Sound FX Toggle
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        const isMuted = sounds.toggleMute();
        soundToggleBtn.classList.toggle('active', !isMuted);
        soundToggleBtn.textContent = isMuted ? '🔇' : '🔊';
        if (!isMuted) sounds.playPop();
      });
    }

    // Speech Narrator Toggle
    const speechToggleBtn = document.getElementById('speech-toggle-btn');
    if (speechToggleBtn) {
      speechToggleBtn.addEventListener('click', () => {
        const isEnabled = sounds.toggleSpeech();
        speechToggleBtn.classList.toggle('active', isEnabled);
        speechToggleBtn.textContent = isEnabled ? '🗣️' : '🤐';
        sounds.playPop();
      });
    }

    // Round Win Modal Continue Button
    const winContinueBtn = document.getElementById('win-continue-btn');
    const winModal = document.getElementById('win-modal');
    if (winContinueBtn && winModal) {
      winContinueBtn.addEventListener('click', () => {
        sounds.playPop();
        winModal.classList.remove('open');
        this.renderHub();
      });
    }
  }

  renderHub() {
    this.currentZone = null;
    const contentArea = document.getElementById('main-content');
    if (!contentArea) return;

    mascot.sayRandom('welcome');

    let html = `
      <div class="hub-view">
        <div class="section-title-wrap">
          <h2 class="section-title">✨ Chọn Thử Thách Toán Học Nào!</h2>
        </div>
        <div class="zones-grid">
    `;

    Object.values(ZONES).forEach(zone => {
      const plays = store.data.zoneStats[zone.id] || 0;
      html += `
        <div class="zone-card ${zone.colorClass}" data-zone-id="${zone.id}">
          <div class="zone-icon-box">${zone.icon}</div>
          <h3 class="zone-title">${zone.name}</h3>
          <p class="zone-desc">${zone.desc}</p>
          <div class="zone-progress-pill">
            <span>⭐️ Đã chơi: ${plays} lần</span>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    contentArea.innerHTML = html;

    // Attach click listeners to cards
    contentArea.querySelectorAll('.zone-card').forEach(card => {
      card.addEventListener('click', () => {
        const zoneId = card.getAttribute('data-zone-id');
        this.startZone(zoneId);
      });
    });
  }

  startZone(zoneId) {
    sounds.playPop();
    this.currentZone = ZONES[zoneId];
    this.questionIndex = 0;
    this.loadQuestion();
  }

  loadQuestion() {
    this.answeringLocked = false;
    const contentArea = document.getElementById('main-content');
    if (!contentArea || !this.currentZone) return;

    this.currentQuestion = this.currentZone.generator();

    // Hiển thị câu hỏi trên bóng thoại bạn Pip (không tự động đọc đè, bé có thể bấm loa để nghe)
    mascot.say(this.currentQuestion.promptText, false);

    contentArea.innerHTML = `
      <div class="game-view">
        <div class="game-topbar">
          <button id="game-back-btn" class="back-btn">
            <span>⬅️</span> <span>Chọn bài</span>
          </button>
          <div class="game-progress-dots">
            ${Array.from({ length: TOTAL_QUESTIONS_PER_ROUND }, (_, i) => {
              let cls = 'dot';
              if (i < this.questionIndex) cls += ' done';
              else if (i === this.questionIndex) cls += ' active';
              return `<div class="${cls}"></div>`;
            }).join('')}
          </div>
          <div style="font-family: var(--font-heading); font-size: 1.1rem; color: #475569; font-weight: 700;">
            ${this.questionIndex + 1} / ${TOTAL_QUESTIONS_PER_ROUND}
          </div>
        </div>

        <div class="prompt-card">
          <div class="prompt-instruction">
            <span>${this.currentQuestion.promptText}</span>
            <button id="prompt-speaker-btn" class="speak-btn" title="Nghe đọc câu hỏi">🔊</button>
          </div>
          <div class="prompt-hint">${this.currentQuestion.hintText}</div>
        </div>

        <div id="manipulative-stage" class="stage-arena"></div>
      </div>
    `;

    document.getElementById('game-back-btn').addEventListener('click', () => {
      sounds.playPop();
      this.renderHub();
    });

    document.getElementById('prompt-speaker-btn').addEventListener('click', () => {
      sounds.speak(this.currentQuestion.promptText);
    });

    const stageEl = document.getElementById('manipulative-stage');
    const stageContent = this.currentZone.renderer(this.currentQuestion, (isCorrect, btnEl) => {
      this.handleAnswer(isCorrect, btnEl);
    });
    stageEl.appendChild(stageContent);
  }

  handleAnswer(isCorrect, btnEl) {
    if (this.answeringLocked) return;

    // Ngắt ngay lập tức mọi âm thanh giọng đọc trước đó (chống xen lấn 100%)
    sounds.stopVoice();

    if (isCorrect) {
      this.answeringLocked = true;
      sounds.playCorrect();
      btnEl.classList.add('correct');

      // Mascot says and reads personalized praise out loud in Southern female voice completely!
      mascot.sayRandom('correct', true, () => {
        // Speech is completely finished!
        setTimeout(() => {
          this.questionIndex++;
          if (this.questionIndex >= TOTAL_QUESTIONS_PER_ROUND) {
            this.completeRound();
          } else {
            this.loadQuestion();
          }
        }, 300);
      });

      // Temporary floating praise badge on stage
      const stageEl = document.getElementById('manipulative-stage');
      if (stageEl) {
        const praiseEl = document.createElement('div');
        praiseEl.className = 'floating-praise-badge';
        praiseEl.textContent = mascot.currentText;
        stageEl.appendChild(praiseEl);
        setTimeout(() => {
          if (praiseEl.parentNode) praiseEl.parentNode.removeChild(praiseEl);
        }, 2200);
      }
    } else {
      sounds.playWrong();
      btnEl.classList.add('wrong');
      mascot.sayRandom('tryAgain', true);
      setTimeout(() => {
        btnEl.classList.remove('wrong');
      }, 600);
    }
  }

  completeRound() {
    sounds.stopVoice();
    sounds.playFanfare();
    fireConfetti(); // Triggers fireworks, sparkling flowers and explosion audio

    // Reward stars
    const newStickers = store.addStars(3);
    store.recordZonePlay(this.currentZone.id);
    this.updateHeaderStats();

    // Check newly unlocked stickers
    if (newStickers && newStickers.length > 0) {
      newStickers.forEach(stk => {
        showToast(`Mở khóa nhãn dán: ${stk.icon} ${stk.name}!`, '🎁');
      });
    }

    mascot.sayRandom('roundWin', true);

    const winModal = document.getElementById('win-modal');
    const winPlayerName = document.getElementById('win-player-name');
    if (winPlayerName) {
      winPlayerName.textContent = store.getPlayerName();
    }
    const winStarsMsg = document.getElementById('win-stars-msg');
    if (winStarsMsg) {
      winStarsMsg.textContent = `+3 Ngôi Sao Lấp Lánh!`;
    }
    if (winModal) {
      winModal.classList.add('open');
    }
  }
}

// Initialize Application when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
