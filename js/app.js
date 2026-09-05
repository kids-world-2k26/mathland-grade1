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
    semester: 1,
    generator: generateCountingQuestion,
    renderer: renderCountingStage
  },
  compare: {
    id: 'compare',
    name: 'Nhiều Hơn, Ít Hơn & So Sánh Số',
    icon: '🐊',
    desc: 'Giúp bạn cá sấu ngoạm số lớn hơn: >, =, < !',
    colorClass: 'card-compare',
    semester: 1,
    generator: generateCompareQuestion,
    renderer: renderCompareStage
  },
  bonds: {
    id: 'bonds',
    name: 'Sơ Đồ Tách - Gộp (Mấy và Mấy)',
    icon: '🧩',
    desc: 'Điền số còn thiếu vào sơ đồ tròn như thám tử!',
    colorClass: 'card-bonds',
    semester: 1,
    generator: generateBondsQuestion,
    renderer: renderBondsStage
  },
  shapes: {
    id: 'shapes',
    name: 'Hình Phẳng & Xếp Hình',
    icon: '🔷',
    desc: 'Hình vuông, tròn, tam giác, chữ nhật & toa tàu quy luật!',
    colorClass: 'card-shapes',
    semester: 'both',
    generator: generateShapesQuestion,
    renderer: renderShapesStage
  },
  addition: {
    id: 'addition',
    name: 'Phép Cộng Trong Phạm Vi 10',
    icon: '➕',
    desc: 'Cùng chú ếch nhảy tia số & gộp các nhóm lại!',
    colorClass: 'card-addition',
    semester: 1,
    generator: generateAdditionQuestion,
    renderer: renderAdditionStage
  },
  subtraction: {
    id: 'subtraction',
    name: 'Phép Trừ Trong Phạm Vi 10',
    icon: '➖',
    desc: 'Bấm nổ bóng bay & đếm số lượng còn lại!',
    colorClass: 'card-subtraction',
    semester: 1,
    generator: generateSubtractionQuestion,
    renderer: renderSubtractionStage
  },
  spatial: {
    id: 'spatial',
    name: 'Khối Lập Phương & Vị Trí Không Gian',
    icon: '📦',
    desc: 'Khối lập phương, khối hộp chữ nhật & Trên/Dưới, Trái/Phải!',
    colorClass: 'card-spatial',
    semester: 1,
    generator: generateSpatialQuestion,
    renderer: renderSpatialStage
  },
  tens: {
    id: 'tens',
    name: 'Số Có Hai Chữ Số & Phép Tính Đến 100',
    icon: '🔢',
    desc: 'Làm quen 1 chục = 10, số đến 100 & phép cộng trừ không nhớ!',
    colorClass: 'card-tens',
    semester: 2,
    generator: generateTensQuestion,
    renderer: renderTensStage
  },
  measurement: {
    id: 'measurement',
    name: 'Dài Hơn - Ngắn Hơn & Đo cm',
    icon: '📏',
    desc: 'So sánh chiều dài & dùng thước đo xăng-ti-mét!',
    colorClass: 'card-measurement',
    semester: 2,
    generator: generateMeasurementQuestion,
    renderer: renderMeasurementStage
  },
  clock: {
    id: 'clock',
    name: 'Đồng Hồ, Giờ & Các Ngày Trong Tuần',
    icon: '⏰',
    desc: 'Xem giờ đúng, các buổi trong ngày & Thứ Hai đến Chủ Nhật!',
    colorClass: 'card-clock',
    semester: 2,
    generator: generateClockQuestion,
    renderer: renderClockStage
  },
  wordproblems: {
    id: 'wordproblems',
    name: 'Giải Toán Có Lời Văn & Ôn Tổng Hợp',
    icon: '📖',
    desc: 'Đố vui bài toán thực tế kèm hình ảnh sinh động!',
    colorClass: 'card-wordproblems',
    semester: 'both',
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
    this.semesterFilter = 'all';
    this.curriculumData = null;
    this.currModalTab = 'all';
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

    // Curriculum SGK Modal triggers
    const currBtn = document.getElementById('curriculum-modal-btn');
    const currModal = document.getElementById('curriculum-modal');
    const currCloseBtn = document.getElementById('curriculum-modal-close');

    if (currBtn && currModal) {
      currBtn.addEventListener('click', () => {
        sounds.playPop();
        this.openCurriculumModal(this.currModalTab || 'all');
      });
    }

    if (currCloseBtn && currModal) {
      currCloseBtn.addEventListener('click', () => {
        sounds.playPop();
        currModal.classList.remove('open');
      });
    }

    // Curriculum internal tabs
    const tabAll = document.getElementById('curr-tab-all');
    const tabTap1 = document.getElementById('curr-tab-tap1');
    const tabTap2 = document.getElementById('curr-tab-tap2');

    const setCurrTabStyle = (activeTab) => {
      [tabAll, tabTap1, tabTap2].forEach(btn => {
        if (!btn) return;
        btn.style.background = '#f1f5f9';
        btn.style.color = '#475569';
        btn.style.border = '1px solid #cbd5e1';
      });
      if (activeTab === 'all' && tabAll) {
        tabAll.style.background = '#6366f1';
        tabAll.style.color = 'white';
        tabAll.style.border = 'none';
      } else if (activeTab === 'tap_1' && tabTap1) {
        tabTap1.style.background = '#0284c7';
        tabTap1.style.color = 'white';
        tabTap1.style.border = 'none';
      } else if (activeTab === 'tap_2' && tabTap2) {
        tabTap2.style.background = '#ea580c';
        tabTap2.style.color = 'white';
        tabTap2.style.border = 'none';
      }
    };

    if (tabAll) {
      tabAll.addEventListener('click', () => {
        sounds.playPop();
        this.currModalTab = 'all';
        setCurrTabStyle('all');
        this.renderCurriculumTree('all');
      });
    }
    if (tabTap1) {
      tabTap1.addEventListener('click', () => {
        sounds.playPop();
        this.currModalTab = 'tap_1';
        setCurrTabStyle('tap_1');
        this.renderCurriculumTree('tap_1');
      });
    }
    if (tabTap2) {
      tabTap2.addEventListener('click', () => {
        sounds.playPop();
        this.currModalTab = 'tap_2';
        setCurrTabStyle('tap_2');
        this.renderCurriculumTree('tap_2');
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

  async openCurriculumModal(tab = 'all') {
    const modal = document.getElementById('curriculum-modal');
    if (!modal) return;
    this.currModalTab = tab;

    const tabAll = document.getElementById('curr-tab-all');
    const tabTap1 = document.getElementById('curr-tab-tap1');
    const tabTap2 = document.getElementById('curr-tab-tap2');
    [tabAll, tabTap1, tabTap2].forEach(btn => {
      if (!btn) return;
      btn.style.background = '#f1f5f9';
      btn.style.color = '#475569';
      btn.style.border = '1px solid #cbd5e1';
    });
    if (tab === 'all' && tabAll) {
      tabAll.style.background = '#6366f1';
      tabAll.style.color = 'white';
      tabAll.style.border = 'none';
    } else if (tab === 'tap_1' && tabTap1) {
      tabTap1.style.background = '#0284c7';
      tabTap1.style.color = 'white';
      tabTap1.style.border = 'none';
    } else if (tab === 'tap_2' && tabTap2) {
      tabTap2.style.background = '#ea580c';
      tabTap2.style.color = 'white';
      tabTap2.style.border = 'none';
    }

    modal.classList.add('open');

    if (!this.curriculumData) {
      try {
        const res = await fetch('data/curriculum_grade1.json');
        if (res.ok) {
          this.curriculumData = await res.json();
        }
      } catch (err) {
        console.error('Error fetching curriculum:', err);
      }
    }

    this.renderCurriculumTree(tab);
  }

  renderCurriculumTree(tab = 'all') {
    const container = document.getElementById('curriculum-tree-container');
    if (!container) return;

    if (!this.curriculumData) {
      container.innerHTML = `<div style="text-align: center; padding: 30px; color: #64748b;">Đang tải danh mục 41 bài học SGK...</div>`;
      return;
    }

    const data = this.curriculumData;
    let html = '';

    const renderTap = (tapKey, tapObj, badgeColor, borderColor) => {
      let tapHtml = `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 1.25rem; color: #1e293b; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
            <span style="background: ${badgeColor}; color: white; padding: 4px 12px; border-radius: 14px; font-size: 0.95rem;">${tapObj.title}</span>
            <span style="font-size: 0.88rem; color: #64748b; font-weight: 500;">(${tapObj.pages} trang)</span>
          </h3>
      `;

      Object.entries(tapObj).forEach(([k, theme]) => {
        if (typeof theme !== 'object' || !theme.lessons) return;
        tapHtml += `
          <div class="curr-theme-block" style="border-color: ${borderColor};">
            <div class="curr-theme-header">
              <span>${theme.title}</span>
              <span class="curr-theme-badge">Bắt đầu trang ${theme.page_start}</span>
            </div>
            <div class="curr-lessons-list">
        `;

        theme.lessons.forEach(les => {
          const zoneObj = les.zone ? ZONES[les.zone] : null;
          tapHtml += `
            <div class="curr-lesson-item">
              <div class="curr-lesson-title">
                <span style="font-size: 1.3rem;">${zoneObj ? zoneObj.icon : '📝'}</span>
                <div>
                  <div style="color: #1e293b;">${les.title}</div>
                  <div class="curr-lesson-page">Sách giáo khoa trang ${les.page}</div>
                </div>
              </div>
              <div>
                ${les.zone ? `
                  <button class="curr-lesson-play-btn" data-zone="${les.zone}">
                    <span>🚀</span> <span>Luyện tập</span>
                  </button>
                ` : `
                  <span style="font-size: 0.85rem; color: #94a3b8; font-weight: 600;">Lý thuyết SGK</span>
                `}
              </div>
            </div>
          `;
        });

        tapHtml += `
            </div>
          </div>
        `;
      });

      tapHtml += `</div>`;
      return tapHtml;
    };

    if (tab === 'all' || tab === 'tap_1') {
      if (data.tap_1) html += renderTap('tap_1', data.tap_1, '#0284c7', '#bae6fd');
    }
    if (tab === 'all' || tab === 'tap_2') {
      if (data.tap_2) html += renderTap('tap_2', data.tap_2, '#ea580c', '#fed7aa');
    }

    container.innerHTML = html;

    // Attach click listeners to "Luyện tập" buttons inside modal
    container.querySelectorAll('.curr-lesson-play-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const zoneId = btn.getAttribute('data-zone');
        const modal = document.getElementById('curriculum-modal');
        if (modal) modal.classList.remove('open');
        this.startZone(zoneId);
      });
    });
  }

  renderHub() {
    this.currentZone = null;
    const contentArea = document.getElementById('main-content');
    if (!contentArea) return;

    mascot.sayRandom('welcome');

    // Filter zones by semester
    const filteredZones = Object.values(ZONES).filter(zone => {
      if (this.semesterFilter === '1') {
        return zone.semester === 1 || zone.semester === 'both';
      } else if (this.semesterFilter === '2') {
        return zone.semester === 2 || zone.semester === 'both';
      }
      return true; // 'all'
    });

    let html = `
      <div class="hub-view">
        <div class="hub-controls-bar">
          <div class="semester-tabs">
            <button class="semester-tab-btn ${this.semesterFilter === 'all' ? 'active' : ''}" data-filter="all">
              <span>🌟</span> <span>Tất cả (${Object.keys(ZONES).length} Khu Vực)</span>
            </button>
            <button class="semester-tab-btn ${this.semesterFilter === '1' ? 'active' : ''}" data-filter="1">
              <span>📘</span> <span>Tập 1: Học Kì 1</span>
            </button>
            <button class="semester-tab-btn ${this.semesterFilter === '2' ? 'active' : ''}" data-filter="2">
              <span>📙</span> <span>Tập 2: Học Kì 2</span>
            </button>
          </div>

          <button id="hub-sgk-btn" class="btn-open-sgk" title="Xem khung 41 bài SGK Kết Nối Tri Thức">
            <span>📖</span> <span>Khung SGK Chuẩn (41 Bài)</span>
          </button>
        </div>

        <div class="section-title-wrap" style="margin-bottom: 20px;">
          <h2 class="section-title">
            ${this.semesterFilter === '1' ? '📘 Toán Lớp 1 - Tập 1 (Học Kì 1)' :
              this.semesterFilter === '2' ? '📙 Toán Lớp 1 - Tập 2 (Học Kì 2)' :
              '✨ Khám Phá Vương Quốc Toán Lớp 1'}
          </h2>
        </div>

        <div class="zones-grid">
    `;

    filteredZones.forEach(zone => {
      const plays = store.data.zoneStats[zone.id] || 0;
      const semBadge = zone.semester === 1 ? '📘 Tập 1' : zone.semester === 2 ? '📙 Tập 2' : '🌟 Cả 2 Tập';
      html += `
        <div class="zone-card ${zone.colorClass}" data-zone-id="${zone.id}">
          <div style="position: absolute; top: 12px; right: 12px; font-size: 0.75rem; font-weight: 700; background: rgba(255,255,255,0.85); padding: 3px 8px; border-radius: 12px; color: #475569; backdrop-filter: blur(4px);">
            ${semBadge}
          </div>
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

    // Semester filter button listeners
    contentArea.querySelectorAll('.semester-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playPop();
        this.semesterFilter = btn.getAttribute('data-filter');
        this.renderHub();
      });
    });

    // Hub SGK button
    const hubSgkBtn = document.getElementById('hub-sgk-btn');
    if (hubSgkBtn) {
      hubSgkBtn.addEventListener('click', () => {
        sounds.playPop();
        this.openCurriculumModal(this.semesterFilter === '1' ? 'tap_1' : this.semesterFilter === '2' ? 'tap_2' : 'all');
      });
    }
  }

  startZone(zoneId) {
    sounds.playPop();
    this.currentZone = ZONES[zoneId];
    this.questionIndex = 0;
    this.loadQuestion();
  }

  loadQuestion() {
    this.answeringLocked = false;
    this.questionStartTime = Date.now();
    this.attemptNumber = 1;
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

      const responseTimeMs = Date.now() - (this.questionStartTime || Date.now());
      this.streak = (this.streak || 0) + 1;

      // Khen ngợi thông minh theo ngữ cảnh hành vi của bé (nhanh, kiên trì, tư duy, xuất sắc)
      mascot.sayPraise({
        name: store.getPlayerName(),
        correct: true,
        responseTimeMs: responseTimeMs,
        attemptNumber: this.attemptNumber || 1,
        streak: this.streak,
        zoneId: this.currentZone ? this.currentZone.id : 'counting',
        difficulty: this.currentQuestion.difficulty || 'medium'
      }, true, () => {
        // Speech is completely finished!
        setTimeout(() => {
          this.questionIndex++;
          if (this.questionIndex >= TOTAL_QUESTIONS_PER_ROUND) {
            this.completeRound();
          } else {
            this.loadQuestion();
          }
        }, 250);
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
      this.attemptNumber = (this.attemptNumber || 1) + 1;
      this.streak = 0;
      sounds.playWrong();
      btnEl.classList.add('wrong');
      mascot.sayRandom('EFFORT', true);
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
